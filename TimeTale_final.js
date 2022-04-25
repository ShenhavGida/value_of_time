(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"TimeTale_final_atlas_1", frames: [[0,1621,1971,158],[1230,841,623,541],[0,1384,1363,235],[0,842,1208,250],[0,1094,1135,257],[0,1781,1135,257],[1230,0,613,839],[0,0,613,840],[615,0,613,840]]},
		{name:"TimeTale_final_atlas_2", frames: [[0,0,1808,1537]]},
		{name:"TimeTale_final_atlas_3", frames: [[0,0,1614,1519]]},
		{name:"TimeTale_final_atlas_4", frames: [[0,0,1614,1519]]},
		{name:"TimeTale_final_atlas_5", frames: [[0,0,1614,1519]]},
		{name:"TimeTale_final_atlas_6", frames: [[0,0,1404,1148]]},
		{name:"TimeTale_final_atlas_7", frames: [[0,0,1082,1276]]},
		{name:"TimeTale_final_atlas_8", frames: [[1233,0,614,841],[617,0,614,842],[0,0,615,842],[0,844,615,842],[617,844,614,840],[1233,843,614,841]]},
		{name:"TimeTale_final_atlas_9", frames: [[0,0,1427,736],[0,738,1278,757]]},
		{name:"TimeTale_final_atlas_10", frames: [[939,593,733,888],[0,593,937,860],[0,1483,1356,472],[0,0,1549,591]]},
		{name:"TimeTale_final_atlas_11", frames: [[0,1236,1205,488],[1207,1236,735,735],[0,0,1488,410],[0,412,1488,410],[0,824,1488,410]]},
		{name:"TimeTale_final_atlas_12", frames: [[618,0,615,843],[1235,0,615,843],[618,845,615,843],[1235,845,615,843],[0,0,616,844],[0,846,616,844]]},
		{name:"TimeTale_final_atlas_13", frames: [[0,0,616,844],[0,846,616,844],[618,0,616,844],[1236,0,616,844],[618,846,616,844],[1236,846,616,844]]},
		{name:"TimeTale_final_atlas_14", frames: [[0,1213,1731,660],[0,0,968,1211]]},
		{name:"TimeTale_final_atlas_15", frames: [[0,0,1877,1524]]},
		{name:"TimeTale_final_atlas_16", frames: [[1340,1367,244,245],[1670,1120,224,245],[499,1826,505,162],[1176,968,505,150],[1006,1826,505,162],[833,1383,505,162],[0,1690,1458,134],[1849,154,110,62],[833,814,303,303],[922,259,131,74],[1794,1367,42,98],[1245,341,361,361],[833,1119,341,262],[1138,814,79,83],[1245,704,341,262],[599,259,321,471],[580,741,251,369],[1586,1367,206,290],[922,341,321,471],[580,1112,251,369],[1513,1659,206,290],[1721,1659,71,314],[580,1483,125,71],[1849,0,160,152],[1608,341,347,347],[1137,0,710,339],[1608,690,264,148],[1176,1120,245,245],[1423,1120,245,245],[0,1216,578,472],[0,1826,497,170],[0,259,597,480],[0,741,578,473],[0,0,1135,257]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_74 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(img.CachedBmp_72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2393,658);


(lib.CachedBmp_71 = function() {
	this.initialize(img.CachedBmp_71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2701,3720);


(lib.CachedBmp_70 = function() {
	this.initialize(img.CachedBmp_70);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2973,4121);


(lib.CachedBmp_82 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(img.CachedBmp_65);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2561,913);


(lib.CachedBmp_64 = function() {
	this.initialize(img.CachedBmp_64);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3462,1071);


(lib.CachedBmp_63 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["TimeTale_final_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["TimeTale_final_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["TimeTale_final_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["TimeTale_final_atlas_11"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["TimeTale_final_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["TimeTale_final_atlas_14"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(img.CachedBmp_51);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3881,2585);


(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2705,152);


(lib.CachedBmp_47 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["TimeTale_final_atlas_10"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["TimeTale_final_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["TimeTale_final_atlas_10"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["TimeTale_final_atlas_10"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["TimeTale_final_atlas_10"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["TimeTale_final_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["TimeTale_final_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(img.CachedBmp_21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3838,2158);


(lib.CachedBmp_19 = function() {
	this.initialize(img.CachedBmp_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2232,402);


(lib.CachedBmp_18 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["TimeTale_final_atlas_9"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["TimeTale_final_atlas_11"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["TimeTale_final_atlas_11"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["TimeTale_final_atlas_11"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["TimeTale_final_atlas_16"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["TimeTale_final_atlas_11"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["TimeTale_final_atlas_14"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4379,2819);


(lib.CachedBmp_2 = function() {
	this.initialize(ss["TimeTale_final_atlas_15"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4925,2651);


(lib.Bitmap10 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap11 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap12 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap13 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap14 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap15 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap16 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap17 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap18 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap19 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap20 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap21 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap22 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap23 = function() {
	this.initialize(ss["TimeTale_final_atlas_13"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap24 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap25 = function() {
	this.initialize(ss["TimeTale_final_atlas_12"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap6 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["TimeTale_final_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap8 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap9 = function() {
	this.initialize(ss["TimeTale_final_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-25.15,-25.15,0.2056,0.2056);

	this.instance_1 = new lib.CachedBmp_73();
	this.instance_1.setTransform(-22.85,-25.15,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.1,-25.1,50.1,50.400000000000006);


(lib.text_end = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-246,-67.65,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246,-67.6,492.1,135.3);


(lib.open_wink_botttom = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(1,0,0,10,true).p("ADVg6QgPAXgVAWQhJBIhnAAQhmAAhJhIQgXgXgPgZ");
	this.shape.setTransform(0.025,0.1183);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1C750").s().p("AiugMQgXgWgPgZIANAJQAzAeA4APQCcAnCVhbQgPAXgVAWQhJBIhnAAQhmAAhJhIg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.3,-7,44.7,14.1);


(lib.open_wink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(1,0,0,10,true).p("AjjBCQACgDACgEQARggAcgbQBJhKBnAAQBmAABJBKQAZAYARAcQAHANAGAN");
	this.shape.setTransform(0,-0.1202);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1C750").s().p("AhyAXQg6APg3AbIAEgHQARghAcgbQBKhJBmAAQBmAABJBJQAZAYAQAdIAOAZQibhli7Awg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.7,-8.6,47.5,17.299999999999997);


(lib.line = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("Aj4AMQA9gSBdgIQC6gRCdAy");
	this.shape.setTransform(0,0.0109);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.9,-2.9,51.8,5.8);


(lib.closing_wink_bottom = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(1,0,0,10,true).p("ADVg6QgPAXgVAWQhJBIhnAAQhmAAhJhIQgXgXgPgZ");
	this.shape.setTransform(-13.875,0.1183);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1C750").s().p("AiugMQgXgWgPgZQAGABCQAOQAuABA5gBQBzgDA5gKQgPAXgVAWQhJBIhnAAQhmAAhJhIg");
	this.shape_1.setTransform(-13.875,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.2,-7,44.7,14.1);


(lib.closing_wink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(1,0,0,10,true).p("AjkBBIAEgHQAfg7A6glQA9glBHAAQBDAAA7AjQA6AiAgA5QADAEAJAMQAGAKgFgB");
	this.shape.setTransform(0.0351,0.0263);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1C750").s().p("ADiBMQiWgWimADIiKAIIAEgHQAfg7A6glQA9glBHAAQBDAAA7AjQA6AiAgA5IAMAQQAGAJgEAAIgBAAg");
	this.shape_1.setTransform(0.0087,0.0263);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.8,-8.6,47.7,17.299999999999997);


(lib.light_tv = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// light_tv
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,346.8).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape.setTransform(1285.7,463.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,356.7).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_1.setTransform(1285.7,463.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,366.6).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_2.setTransform(1285.7,463.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,376.5).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_3.setTransform(1285.7,463.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,386.4).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_4.setTransform(1285.7,463.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,396.3).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_5.setTransform(1285.7,463.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,406.2).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_6.setTransform(1285.7,463.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,416.1).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_7.setTransform(1285.7,463.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,426).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_8.setTransform(1285.7,463.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,435.9).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_9.setTransform(1285.7,463.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,445.8).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_10.setTransform(1285.7,463.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,455.6).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_11.setTransform(1285.7,463.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,465.5).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_12.setTransform(1285.7,463.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,475.4).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_13.setTransform(1285.7,463.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,485.3).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_14.setTransform(1285.7,463.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,495.2).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_15.setTransform(1285.7,463.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,505.1).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_16.setTransform(1285.7,463.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,515).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_17.setTransform(1285.7,463.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,524.9).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_18.setTransform(1285.7,463.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,534.8).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_19.setTransform(1285.7,463.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,544.7).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_20.setTransform(1285.7,463.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,534.3).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_21.setTransform(1285.7,463.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,523.8).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_22.setTransform(1285.7,463.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,513.4).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_23.setTransform(1285.7,463.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,503).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_24.setTransform(1285.7,463.575);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,492.6).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_25.setTransform(1285.7,463.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,482.2).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_26.setTransform(1285.7,463.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,471.8).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_27.setTransform(1285.7,463.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,461.4).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_28.setTransform(1285.7,463.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,451).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_29.setTransform(1285.7,463.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,440.5).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_30.setTransform(1285.7,463.575);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,430.1).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_31.setTransform(1285.7,463.575);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,419.7).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_32.setTransform(1285.7,463.575);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,409.3).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_33.setTransform(1285.7,463.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,398.9).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_34.setTransform(1285.7,463.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,388.5).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_35.setTransform(1285.7,463.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,378.1).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_36.setTransform(1285.7,463.575);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,367.7).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_37.setTransform(1285.7,463.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.rf(["rgba(231,64,46,0.8)","rgba(231,64,46,0)"],[0,1],-49.8,-56,0,-49.8,-56,357.2).s().p("EiD9BdWMgE/itHMEH8gNkMAJ9C6rgEgouAJDMA/QAAAMAAAgl+Mg/QAAAg");
	this.shape_38.setTransform(1285.7,463.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(409.3,-133.8,1752.8999999999999,1194.8);


(lib.light_blub_ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// light
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,149.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape.setTransform(-1.55,-113,1,1,0,0,0,-7.5,-144.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,150.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_1.setTransform(5.95,31.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,151.3).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_2.setTransform(5.95,31.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,152).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_3.setTransform(5.95,31.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,152.8).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_4.setTransform(5.95,31.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,153.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_5.setTransform(5.95,31.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,154.3).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_6.setTransform(5.95,31.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,155).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_7.setTransform(5.95,31.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,155.7).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_8.setTransform(5.95,31.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,156.4).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_9.setTransform(5.95,31.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,157.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_10.setTransform(5.95,31.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,157.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_11.setTransform(5.95,31.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,158.6).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_12.setTransform(5.95,31.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,159.3).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_13.setTransform(5.95,31.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,160).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_14.setTransform(5.95,31.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,160.8).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_15.setTransform(5.95,31.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,161.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_16.setTransform(5.95,31.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,162.2).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_17.setTransform(5.95,31.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,163).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_18.setTransform(5.95,31.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,163.7).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_19.setTransform(5.95,31.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,164.4).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_20.setTransform(5.95,31.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,165.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_21.setTransform(5.95,31.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,165.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_22.setTransform(5.95,31.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,166.6).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_23.setTransform(5.95,31.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,167.3).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_24.setTransform(5.95,31.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,168).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_25.setTransform(5.95,31.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,168.8).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_26.setTransform(5.95,31.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,169.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_27.setTransform(5.95,31.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,170.3).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_28.setTransform(5.95,31.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,171).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_29.setTransform(5.95,31.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,171.7).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_30.setTransform(5.95,31.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,172.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_31.setTransform(5.95,31.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,173.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_32.setTransform(-1.55,-113,1,1,0,0,0,-7.5,-144.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,171.8).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_33.setTransform(5.95,31.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,171.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_34.setTransform(5.95,31.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,170.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_35.setTransform(5.95,31.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,169.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_36.setTransform(5.95,31.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,169.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_37.setTransform(5.95,31.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,168.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_38.setTransform(5.95,31.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,167.8).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_39.setTransform(5.95,31.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,167.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_40.setTransform(5.95,31.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,166.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_41.setTransform(5.95,31.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,164.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_42.setTransform(5.95,31.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,163.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_43.setTransform(5.95,31.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,163.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_44.setTransform(5.95,31.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,162.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_45.setTransform(5.95,31.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,161.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_46.setTransform(5.95,31.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,161.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_47.setTransform(5.95,31.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,160.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_48.setTransform(5.95,31.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,159.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_49.setTransform(5.95,31.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,159.2).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_50.setTransform(5.95,31.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,158.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_51.setTransform(5.95,31.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,156.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_52.setTransform(5.95,31.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,155.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_53.setTransform(5.95,31.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,155.2).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_54.setTransform(5.95,31.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,154.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_55.setTransform(5.95,31.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,153.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_56.setTransform(5.95,31.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,153.1).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_57.setTransform(5.95,31.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,152.5).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_58.setTransform(5.95,31.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,151.9).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_59.setTransform(5.95,31.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.rf(["rgba(252,255,131,0.498)","rgba(231,231,231,0)"],[0,1],-5.9,-90.8,0,-5.9,-90.8,151.2).s().p("Ego6AWkMAgGgtGIPVAAMAiaAtGg");
	this.shape_60.setTransform(5.95,31.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255.9,-113,523.8,288.7);


(lib.text_enter = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-255.7,-115.6,0.3616,0.3616);

	this.instance_1 = new lib.CachedBmp_54();
	this.instance_1.setTransform(-312.95,-150.35,0.3616,0.3616);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.9,-150.3,626,300.9);


(lib.pen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#696F75").s().p("Aq8tRIV5KyI05Pxg");
	this.shape.setTransform(-338.525,644.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCCCC").s().p("A0zH5IguzJIgJjyIgHi6IgNgGIAKgnIGGDAIEyCWIHMDjIEyCWIHeDrIJqEvID1B5IgYAgIgMgGIlRD+IvELZg");
	this.shape_1.setTransform(-275.425,509.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C49E2D").s().p("EgY8BgZMBWDiu/ID1B5MhWDCu+gEgqEBX+MBWDiu/IHeDrMhWDCu/gEg2DBSFMBWEiu/IHMDjMhWECu+gEhA7BMvMBWDivAIGGDBMhWDCu+g");
	this.shape_2.setTransform(0.5,-101);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F4D81F").s().p("EgjvBbFMBWEiu/IJqEwMhWECu/gEgv/BVEMBWDiu/IEzCWMhWECu/gEg7+BPLMBWEiu/IEyCWMhWDCu/g");
	this.shape_3.setTransform(7.725,-97.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FBF7CF").s().p("EgiMAJ2IAAzrMBEZAAAIAATrg");
	this.shape_4.setTransform(-618.35,705.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-837.3,-729.9,1253.4,1498.9);


(lib.legs_stat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// legs
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-112.55,-98.3,0.3616,0.3616);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.5,-98.3,225.3,195.7);


(lib.full_body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-133.6,-162.45,0.3655,0.3655);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133.6,-162.4,267.9,324.5);


(lib.child_handBROKE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-62.15,-48.55,0.361,0.361);

	this.instance_1 = new lib.CachedBmp_43();
	this.instance_1.setTransform(-40.95,-35,0.361,0.361);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.1,-48.5,123.1,94.6);


(lib.child_hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-62.15,-48.55,0.361,0.361);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.1,-48.5,123.1,94.6);


(lib.zzz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// zzz
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(0,100.35,0.3624,0.3624);

	this.instance_1 = new lib.CachedBmp_37();
	this.instance_1.setTransform(40.35,47.2,0.3624,0.3624);

	this.instance_2 = new lib.CachedBmp_38();
	this.instance_2.setTransform(100.25,0,0.3624,0.3624);

	this.instance_3 = new lib.CachedBmp_39();
	this.instance_3.setTransform(0,100.35,0.3624,0.3624);

	this.instance_4 = new lib.CachedBmp_40();
	this.instance_4.setTransform(40.35,47.2,0.3624,0.3624);

	this.instance_5 = new lib.CachedBmp_41();
	this.instance_5.setTransform(100.25,0,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},20).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_3}]},15).to({state:[{t:this.instance_4}]},20).to({state:[{t:this.instance_5}]},20).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,216.6,205.5);


(lib.spider = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-13.1,-81.7,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.1,-81.7,25.799999999999997,113.80000000000001);


(lib.sleepingman = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-2.65,57.6,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sleepingman, new cjs.Rectangle(-2.6,57.6,655.2,557), null);


(lib.office_text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-244.8,1.5,0.3624,0.3624);

	this.instance_1 = new lib.CachedBmp_29();
	this.instance_1.setTransform(-221.55,-88.9,0.3624,0.3624);

	this.instance_2 = new lib.CachedBmp_28();
	this.instance_2.setTransform(-282.4,-107.75,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-282.4,-107.7,561.4,214.10000000000002);


(lib.mouth_S = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-30.3,-28.5,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.3,-28.5,58,55.1);


(lib.top = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-111.3,-131.2,0.2055,0.2055);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-111.3,-131.2,222.3,262.2);


(lib.tail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-73.1,-35.1,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.1,-35.1,146,69.7);


(lib.shell = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-144.2,-117.65,0.2055,0.2055);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.2,-117.6,288.6,235.89999999999998);


(lib.eye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mask2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AivCwQhJhJAAhnQAAhmBJhJQBJhJBmAAQBnAABJBJQBJBJAABmQAABnhJBJQhJBJhnAAQhmAAhJhJg");
	var mask_graphics_19 = new cjs.Graphics().p("AivCwQhJhJAAhnQAAhmBJhJQBJhJBmAAQBnAABJBJQBJBJAABmQAABnhJBJQhJBJhnAAQhmAAhJhJg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-0.0835,y:-0.1465}).wait(19).to({graphics:mask_graphics_19,x:-0.0835,y:-0.1465}).wait(1));

	// down
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1C750").s().p("AnGCkIAAlHIONAAIAAFHg");
	this.shape.setTransform(3.275,45.675);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({y:44.075},0).wait(1).to({y:42.475},0).wait(1).to({y:40.875},0).wait(1).to({y:39.275},0).wait(1).to({y:37.675},0).wait(1).to({y:36.075},0).wait(1).to({y:34.475},0).wait(1).to({y:32.875},0).wait(1).to({y:31.275},0).wait(1).to({y:29.675},0).wait(1).to({y:28.075},0).wait(1).to({y:26.475},0).wait(1).to({y:24.875},0).wait(1).to({y:23.275},0).wait(1).to({y:27.775},0).wait(1).to({y:32.225},0).wait(1).to({y:36.725},0).wait(1).to({y:41.175},0).wait(1).to({y:45.675},0).wait(1));

	// mask_idn (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AivCwQhJhJAAhnQAAhmBJhJQBJhJBmAAQBnAABJBJQBJBJAABmQAABnhJBJQhJBJhnAAQhmAAhJhJg");
	var mask_1_graphics_19 = new cjs.Graphics().p("AivCwQhJhJAAhnQAAhmBJhJQBJhJBmAAQBnAABJBJQBJBJAABmQAABnhJBJQhJBJhnAAQhmAAhJhJg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:-0.0835,y:-0.1465}).wait(19).to({graphics:mask_1_graphics_19,x:-0.0835,y:-0.1465}).wait(1));

	// top
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9QpGiEozCEg");
	this.shape_1.setTransform(4.6,-43.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpFh6o0B6g");
	this.shape_2.setTransform(4.6,-41.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpEhwo1Bwg");
	this.shape_3.setTransform(4.6,-39.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A1C750").s().p("Ao8DeIAAm8IR5AAIAAG8QpEhno1Bng");
	this.shape_4.setTransform(4.6,-37.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9QpDhfo2Bfg");
	this.shape_5.setTransform(4.6,-35.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9QpDhVo2BVg");
	this.shape_6.setTransform(4.6,-33.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpChLo3BLg");
	this.shape_7.setTransform(4.6,-31.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpBhCo4BCg");
	this.shape_8.setTransform(4.6,-29.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9QpAg5o5A5g");
	this.shape_9.setTransform(4.6,-27.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9Qo/gwo6Awg");
	this.shape_10.setTransform(4.6,-25.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7Qo/glo6Alg");
	this.shape_11.setTransform(4.6,-23.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7Qo+gco7Acg");
	this.shape_12.setTransform(4.6,-21.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#A1C750").s().p("Ao8DeIAAm8IR5AAIAAG8Qo9gSo8ASg");
	this.shape_13.setTransform(4.6,-19.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9Qo9gKo8AKg");
	this.shape_14.setTransform(4.6,-17.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9g");
	this.shape_15.setTransform(4.6,-15.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A1C750").s().p("Ao8DfIAAm9IR5AAIAAG9Qo+gbo7Abg");
	this.shape_16.setTransform(4.6,-21.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#A1C750").s().p("Ao8DeIAAm8IR5AAIAAG8QpAg0o5A0g");
	this.shape_17.setTransform(4.6,-26.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpChPo3BPg");
	this.shape_18.setTransform(4.6,-32.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#A1C750").s().p("Ao8DeIAAm7IR5AAIAAG7QpEhpo1Bpg");
	this.shape_19.setTransform(4.6,-38);

	var maskedShapeInstanceList = [this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_1}]},1).wait(1));

	// eye
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-25.2,-25.25,0.2056,0.2056);

	this.instance_1 = new lib.CachedBmp_18();
	this.instance_1.setTransform(-25.2,-25.25,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.2,-25.2,50.4,50.4);


(lib.cloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// cloud
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-339,-207.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-339,-207.4,639,378.5);


(lib.clock_needle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAAnRIAAOj");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-47.5,2,95.1);


(lib.start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// start_shell
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-144.6,-118.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_12();
	this.instance_1.setTransform(-144.6,-118.2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_14();
	this.instance_2.setTransform(-144.6,-117.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_13();
	this.instance_3.setTransform(-136.4,-118.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.6,-118.3,298.5,240.1);


(lib.play_again = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// button
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-284.6,-55.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-371.95,-102.4,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-284.6,-55.9,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_7();
	this.instance_3.setTransform(-371.95,-102.4,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_10();
	this.instance_4.setTransform(-284.6,-55.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_9();
	this.instance_5.setTransform(-371.95,-102.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-371.9,-102.4,744,205);


(lib.full_eye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.line("synched",0);
	this.instance.setTransform(0.05,0.1);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(0.05,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.8,-25.1,51.8,50.400000000000006);


(lib.clock9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// red_center
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8542A").s().p("AhZgBQAAgiAZgdQAdgZAiAAQAlAAAZAZQAdAdAAAiQAAAlgdAdQgZAZglAAQhYAAAAhbg");
	this.shape.setTransform(1.05,1,1,1,0,0,0,-0.2,-0.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AAJAAQAAAEgDADQgCACgEAAQgIAAAAgJQAAgDACgDQADgCADAAQAEAAACACQADADAAADg");
	this.shape_1.setTransform(1.275,-2.775,9.7027,9.7027);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8542A").s().p("AgIAAQAAgDACgDQADgCADAAQAEAAACACQADADAAADQAAAEgDADQgCACgEAAQgIAAAAgJg");
	this.shape_2.setTransform(1.275,-2.775,9.7027,9.7027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},25).wait(575));

	// needle
	this.instance = new lib.clock_needle();
	this.instance.setTransform(0.5,-0.9,1,1,0,0,0,-1.1,26.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:0,rotation:0.602,x:1.8773,y:-27.2875},0).wait(1).to({rotation:1.204,x:2.1545,y:-27.2721},0).wait(1).to({rotation:1.806,x:2.4315,y:-27.2538},0).wait(1).to({rotation:2.408,x:2.7083,y:-27.2326},0).wait(1).to({rotation:3.01,x:2.9848,y:-27.2084},0).wait(1).to({rotation:3.612,x:3.2611,y:-27.1814},0).wait(1).to({rotation:4.214,x:3.5371,y:-27.1515},0).wait(1).to({rotation:4.8161,x:3.8128,y:-27.1186},0).wait(1).to({rotation:5.4181,x:4.0881,y:-27.0829},0).wait(1).to({rotation:6.0201,x:4.363,y:-27.0443},0).wait(1).to({rotation:6.6221,x:4.6374,y:-27.0028},0).wait(1).to({rotation:7.2241,x:4.9115,y:-26.9584},0).wait(1).to({rotation:7.8261,x:5.185,y:-26.9111},0).wait(1).to({rotation:8.4281,x:5.4581,y:-26.861},0).wait(1).to({rotation:9.0301,x:5.7306,y:-26.808},0).wait(1).to({rotation:9.6321,x:6.0025,y:-26.7521},0).wait(1).to({rotation:10.2341,x:6.2738,y:-26.6934},0).wait(1).to({rotation:10.8361,x:6.5445,y:-26.6319},0).wait(1).to({rotation:11.4381,x:6.8145,y:-26.5675},0).wait(1).to({rotation:12.0401,x:7.0839,y:-26.5002},0).wait(1).to({rotation:12.6421,x:7.3525,y:-26.4302},0).wait(1).to({rotation:13.2441,x:7.6203,y:-26.3573},0).wait(1).to({rotation:13.8462,x:7.8874,y:-26.2816},0).wait(1).to({rotation:14.4482,x:8.1537,y:-26.2031},0).wait(1).to({rotation:15.0502,x:8.4191,y:-26.1218},0).wait(1).to({rotation:15.6522,x:8.6837,y:-26.0377},0).wait(1).to({rotation:16.2542,x:8.9474,y:-25.9509},0).wait(1).to({rotation:16.8562,x:9.2101,y:-25.8613},0).wait(1).to({rotation:17.4582,x:9.4719,y:-25.7689},0).wait(1).to({rotation:18.0602,x:9.7327,y:-25.6738},0).wait(1).to({rotation:18.6622,x:9.9925,y:-25.5759},0).wait(1).to({rotation:19.2642,x:10.2512,y:-25.4754},0).wait(1).to({rotation:19.8662,x:10.5089,y:-25.3721},0).wait(1).to({rotation:20.4682,x:10.7655,y:-25.2661},0).wait(1).to({rotation:21.0702,x:11.0209,y:-25.1574},0).wait(1).to({rotation:21.6722,x:11.2752,y:-25.0461},0).wait(1).to({rotation:22.2742,x:11.5283,y:-24.932},0).wait(1).to({rotation:22.8763,x:11.7802,y:-24.8154},0).wait(1).to({rotation:23.4783,x:12.0309,y:-24.6961},0).wait(1).to({rotation:24.0803,x:12.2802,y:-24.5741},0).wait(1).to({rotation:24.6823,x:12.5283,y:-24.4496},0).wait(1).to({rotation:25.2843,x:12.7751,y:-24.3224},0).wait(1).to({rotation:25.8863,x:13.0205,y:-24.1927},0).wait(1).to({rotation:26.4883,x:13.2646,y:-24.0604},0).wait(1).to({rotation:27.0903,x:13.5072,y:-23.9255},0).wait(1).to({rotation:27.6923,x:13.7484,y:-23.7881},0).wait(1).to({rotation:28.2943,x:13.9882,y:-23.6481},0).wait(1).to({rotation:28.8963,x:14.2264,y:-23.5057},0).wait(1).to({rotation:29.4983,x:14.4632,y:-23.3608},0).wait(1).to({rotation:30.1003,x:14.6984,y:-23.2133},0).wait(1).to({rotation:30.7023,x:14.9321,y:-23.0634},0).wait(1).to({rotation:31.3043,x:15.1642,y:-22.9111},0).wait(1).to({rotation:31.9064,x:15.3946,y:-22.7563},0).wait(1).to({rotation:32.5084,x:15.6234,y:-22.5992},0).wait(1).to({rotation:33.1104,x:15.8506,y:-22.4396},0).wait(1).to({rotation:33.7124,x:16.0761,y:-22.2776},0).wait(1).to({rotation:34.3144,x:16.2998,y:-22.1133},0).wait(1).to({rotation:34.9164,x:16.5218,y:-21.9467},0).wait(1).to({rotation:35.5184,x:16.7421,y:-21.7777},0).wait(1).to({rotation:36.1204,x:16.9605,y:-21.6064},0).wait(1).to({rotation:36.7224,x:17.1772,y:-21.4329},0).wait(1).to({rotation:37.3244,x:17.392,y:-21.257},0).wait(1).to({rotation:37.9264,x:17.605,y:-21.079},0).wait(1).to({rotation:38.5284,x:17.816,y:-20.8987},0).wait(1).to({rotation:39.1304,x:18.0252,y:-20.7161},0).wait(1).to({rotation:39.7324,x:18.2325,y:-20.5314},0).wait(1).to({rotation:40.3344,x:18.4377,y:-20.3446},0).wait(1).to({rotation:40.9365,x:18.6411,y:-20.1555},0).wait(1).to({rotation:41.5385,x:18.8424,y:-19.9644},0).wait(1).to({rotation:42.1405,x:19.0417,y:-19.7712},0).wait(1).to({rotation:42.7425,x:19.2389,y:-19.5758},0).wait(1).to({rotation:43.3445,x:19.4341,y:-19.3784},0).wait(1).to({rotation:43.9465,x:19.6272,y:-19.179},0).wait(1).to({rotation:44.5485,x:19.8182,y:-18.9776},0).wait(1).to({rotation:45.1505,x:20.0071,y:-18.7741},0).wait(1).to({rotation:45.7525,x:20.1938,y:-18.5687},0).wait(1).to({rotation:46.3545,x:20.3784,y:-18.3613},0).wait(1).to({rotation:46.9565,x:20.5608,y:-18.152},0).wait(1).to({rotation:47.5585,x:20.7409,y:-17.9408},0).wait(1).to({rotation:48.1605,x:20.9188,y:-17.7277},0).wait(1).to({rotation:48.7625,x:21.0945,y:-17.5128},0).wait(1).to({rotation:49.3645,x:21.2679,y:-17.296},0).wait(1).to({rotation:49.9666,x:21.4391,y:-17.0774},0).wait(1).to({rotation:50.5686,x:21.6079,y:-16.8571},0).wait(1).to({rotation:51.1706,x:21.7744,y:-16.6349},0).wait(1).to({rotation:51.7726,x:21.9385,y:-16.4111},0).wait(1).to({rotation:52.3746,x:22.1003,y:-16.1855},0).wait(1).to({rotation:52.9766,x:22.2597,y:-15.9582},0).wait(1).to({rotation:53.5786,x:22.4167,y:-15.7293},0).wait(1).to({rotation:54.1806,x:22.5713,y:-15.4987},0).wait(1).to({rotation:54.7826,x:22.7235,y:-15.2665},0).wait(1).to({rotation:55.3846,x:22.8732,y:-15.0328},0).wait(1).to({rotation:55.9866,x:23.0205,y:-14.7975},0).wait(1).to({rotation:56.5886,x:23.1653,y:-14.5606},0).wait(1).to({rotation:57.1906,x:23.3076,y:-14.3222},0).wait(1).to({rotation:57.7926,x:23.4473,y:-14.0824},0).wait(1).to({rotation:58.3946,x:23.5846,y:-13.8411},0).wait(1).to({rotation:58.9967,x:23.7193,y:-13.5983},0).wait(1).to({rotation:59.5987,x:23.8514,y:-13.3542},0).wait(1).to({rotation:60.2007,x:23.981,y:-13.1087},0).wait(1).to({rotation:60.8027,x:24.108,y:-12.8618},0).wait(1).to({rotation:61.4047,x:24.2323,y:-12.6136},0).wait(1).to({rotation:62.0067,x:24.3541,y:-12.3642},0).wait(1).to({rotation:62.6087,x:24.4732,y:-12.1134},0).wait(1).to({rotation:63.2107,x:24.5897,y:-11.8615},0).wait(1).to({rotation:63.8127,x:24.7036,y:-11.6083},0).wait(1).to({rotation:64.4147,x:24.8148,y:-11.3539},0).wait(1).to({rotation:65.0167,x:24.9233,y:-11.0984},0).wait(1).to({rotation:65.6187,x:25.0291,y:-10.8417},0).wait(1).to({rotation:66.2207,x:25.1322,y:-10.584},0).wait(1).to({rotation:66.8227,x:25.2326,y:-10.3252},0).wait(1).to({rotation:67.4247,x:25.3302,y:-10.0653},0).wait(1).to({rotation:68.0268,x:25.4252,y:-9.8045},0).wait(1).to({rotation:68.6288,x:25.5173,y:-9.5426},0).wait(1).to({rotation:69.2308,x:25.6068,y:-9.2798},0).wait(1).to({rotation:69.8328,x:25.6934,y:-9.0161},0).wait(1).to({rotation:70.4348,x:25.7773,y:-8.7514},0).wait(1).to({rotation:71.0368,x:25.8584,y:-8.486},0).wait(1).to({rotation:71.6388,x:25.9367,y:-8.2196},0).wait(1).to({rotation:72.2408,x:26.0122,y:-7.9525},0).wait(1).to({rotation:72.8428,x:26.0849,y:-7.6846},0).wait(1).to({rotation:73.4448,x:26.1548,y:-7.4159},0).wait(1).to({rotation:74.0468,x:26.2218,y:-7.1465},0).wait(1).to({rotation:74.6488,x:26.2861,y:-6.8765},0).wait(1).to({rotation:75.2508,x:26.3474,y:-6.6057},0).wait(1).to({rotation:75.8528,x:26.406,y:-6.3344},0).wait(1).to({rotation:76.4548,x:26.4616,y:-6.0624},0).wait(1).to({rotation:77.0569,x:26.5144,y:-5.7899},0).wait(1).to({rotation:77.6589,x:26.5644,y:-5.5168},0).wait(1).to({rotation:78.2609,x:26.6114,y:-5.2432},0).wait(1).to({rotation:78.8629,x:26.6556,y:-4.9691},0).wait(1).to({rotation:79.4649,x:26.697,y:-4.6946},0).wait(1).to({rotation:80.0669,x:26.7354,y:-4.4197},0).wait(1).to({rotation:80.6689,x:26.7709,y:-4.1444},0).wait(1).to({rotation:81.2709,x:26.8036,y:-3.8687},0).wait(1).to({rotation:81.8729,x:26.8333,y:-3.5927},0).wait(1).to({rotation:82.4749,x:26.8601,y:-3.3164},0).wait(1).to({rotation:83.0769,x:26.8841,y:-3.0398},0).wait(1).to({rotation:83.6789,x:26.9051,y:-2.763},0).wait(1).to({rotation:84.2809,x:26.9232,y:-2.486},0).wait(1).to({rotation:84.8829,x:26.9384,y:-2.2088},0).wait(1).to({rotation:85.4849,x:26.9507,y:-1.9315},0).wait(1).to({rotation:86.087,x:26.9601,y:-1.654},0).wait(1).to({rotation:86.689,x:26.9666,y:-1.3765},0).wait(1).to({rotation:87.291,x:26.9701,y:-1.0989},0).wait(1).to({rotation:87.893,x:26.9708,y:-0.8213},0).wait(1).to({rotation:88.495,x:26.9685,y:-0.5437},0).wait(1).to({rotation:89.097,x:26.9633,y:-0.2662},0).wait(1).to({rotation:89.699,x:26.9552,y:0.0113},0).wait(1).to({rotation:90.301,x:26.9441,y:0.2887},0).wait(1).to({rotation:90.903,x:26.9302,y:0.5659},0).wait(1).to({rotation:91.505,x:26.9133,y:0.843},0).wait(1).to({rotation:92.107,x:26.8935,y:1.1199},0).wait(1).to({rotation:92.709,x:26.8709,y:1.3966},0).wait(1).to({rotation:93.311,x:26.8453,y:1.673},0).wait(1).to({rotation:93.913,x:26.8168,y:1.9492},0).wait(1).to({rotation:94.5151,x:26.7854,y:2.225},0).wait(1).to({rotation:95.1171,x:26.7511,y:2.5005},0).wait(1).to({rotation:95.7191,x:26.714,y:2.7756},0).wait(1).to({rotation:96.3211,x:26.6739,y:3.0503},0).wait(1).to({rotation:96.9231,x:26.631,y:3.3245},0).wait(1).to({rotation:97.5251,x:26.5851,y:3.5983},0).wait(1).to({rotation:98.1271,x:26.5364,y:3.8716},0).wait(1).to({rotation:98.7291,x:26.4849,y:4.1444},0).wait(1).to({rotation:99.3311,x:26.4304,y:4.4166},0).wait(1).to({rotation:99.9331,x:26.3731,y:4.6882},0).wait(1).to({rotation:100.5351,x:26.313,y:4.9592},0).wait(1).to({rotation:101.1371,x:26.25,y:5.2296},0).wait(1).to({rotation:101.7391,x:26.1842,y:5.4993},0).wait(1).to({rotation:102.3411,x:26.1155,y:5.7683},0).wait(1).to({rotation:102.9431,x:26.0441,y:6.0365},0).wait(1).to({rotation:103.5452,x:25.9698,y:6.304},0).wait(1).to({rotation:104.1472,x:25.8927,y:6.5707},0).wait(1).to({rotation:104.7492,x:25.8128,y:6.8365},0).wait(1).to({rotation:105.3512,x:25.7301,y:7.1015},0).wait(1).to({rotation:105.9532,x:25.6447,y:7.3656},0).wait(1).to({rotation:106.5552,x:25.5564,y:7.6289},0).wait(1).to({rotation:107.1572,x:25.4654,y:7.8911},0).wait(1).to({rotation:107.7592,x:25.3717,y:8.1524},0).wait(1).to({rotation:108.3612,x:25.2752,y:8.4127},0).wait(1).to({rotation:108.9632,x:25.176,y:8.672},0).wait(1).to({rotation:109.5652,x:25.0741,y:8.9302},0).wait(1).to({rotation:110.1672,x:24.9694,y:9.1873},0).wait(1).to({rotation:110.7692,x:24.8621,y:9.4433},0).wait(1).to({rotation:111.3712,x:24.7521,y:9.6982},0).wait(1).to({rotation:111.9732,x:24.6394,y:9.9519},0).wait(1).to({rotation:112.5753,x:24.524,y:10.2044},0).wait(1).to({rotation:113.1773,x:24.406,y:10.4557},0).wait(1).to({rotation:113.7793,x:24.2854,y:10.7057},0).wait(1).to({rotation:114.3813,x:24.1622,y:10.9545},0).wait(1).to({rotation:114.9833,x:24.0363,y:11.2019},0).wait(1).to({rotation:115.5853,x:23.9079,y:11.448},0).wait(1).to({rotation:116.1873,x:23.7768,y:11.6927},0).wait(1).to({rotation:116.7893,x:23.6432,y:11.9361},0).wait(1).to({rotation:117.3913,x:23.5071,y:12.178},0).wait(1).to({rotation:117.9933,x:23.3684,y:12.4185},0).wait(1).to({rotation:118.5953,x:23.2272,y:12.6575},0).wait(1).to({rotation:119.1973,x:23.0835,y:12.895},0).wait(1).to({rotation:119.7993,x:22.9373,y:13.131},0).wait(1).to({rotation:120.4013,x:22.7887,y:13.3654},0).wait(1).to({rotation:121.0033,x:22.6376,y:13.5983},0).wait(1).to({rotation:121.6054,x:22.484,y:13.8296},0).wait(1).to({rotation:122.2074,x:22.3281,y:14.0592},0).wait(1).to({rotation:122.8094,x:22.1697,y:14.2872},0).wait(1).to({rotation:123.4114,x:22.0089,y:14.5135},0).wait(1).to({rotation:124.0134,x:21.8458,y:14.7382},0).wait(1).to({rotation:124.6154,x:21.6803,y:14.961},0).wait(1).to({rotation:125.2174,x:21.5125,y:15.1822},0).wait(1).to({rotation:125.8194,x:21.3424,y:15.4015},0).wait(1).to({rotation:126.4214,x:21.1699,y:15.6191},0).wait(1).to({rotation:127.0234,x:20.9952,y:15.8348},0).wait(1).to({rotation:127.6254,x:20.8183,y:16.0487},0).wait(1).to({rotation:128.2274,x:20.6391,y:16.2607},0).wait(1).to({rotation:128.8294,x:20.4577,y:16.4709},0).wait(1).to({rotation:129.4314,x:20.2741,y:16.6791},0).wait(1).to({rotation:130.0334,x:20.0883,y:16.8853},0).wait(1).to({rotation:130.6355,x:19.9003,y:17.0897},0).wait(1).to({rotation:131.2375,x:19.7102,y:17.292},0).wait(1).to({rotation:131.8395,x:19.518,y:17.4923},0).wait(1).to({rotation:132.4415,x:19.3238,y:17.6906},0).wait(1).to({rotation:133.0435,x:19.1274,y:17.8868},0).wait(1).to({rotation:133.6455,x:18.929,y:18.0809},0).wait(1).to({rotation:134.2475,x:18.7285,y:18.273},0).wait(1).to({rotation:134.8495,x:18.5261,y:18.4629},0).wait(1).to({rotation:135.4515,x:18.3216,y:18.6507},0).wait(1).to({rotation:136.0535,x:18.1152,y:18.8364},0).wait(1).to({rotation:136.6555,x:17.9069,y:19.0198},0).wait(1).to({rotation:137.2575,x:17.6967,y:19.2011},0).wait(1).to({rotation:137.8595,x:17.4845,y:19.3802},0).wait(1).to({rotation:138.4615,x:17.2705,y:19.557},0).wait(1).to({rotation:139.0635,x:17.0546,y:19.7315},0).wait(1).to({rotation:139.6656,x:16.837,y:19.9038},0).wait(1).to({rotation:140.2676,x:16.6175,y:20.0738},0).wait(1).to({rotation:140.8696,x:16.3962,y:20.2414},0).wait(1).to({rotation:141.4716,x:16.1732,y:20.4067},0).wait(1).to({rotation:142.0736,x:15.9485,y:20.5697},0).wait(1).to({rotation:142.6756,x:15.7221,y:20.7303},0).wait(1).to({rotation:143.2776,x:15.494,y:20.8885},0).wait(1).to({rotation:143.8796,x:15.2642,y:21.0444},0).wait(1).to({rotation:144.4816,x:15.0328,y:21.1977},0).wait(1).to({rotation:145.0836,x:14.7999,y:21.3487},0).wait(1).to({rotation:145.6856,x:14.5653,y:21.4972},0).wait(1).to({rotation:146.2876,x:14.3292,y:21.6432},0).wait(1).to({rotation:146.8896,x:14.0916,y:21.7867},0).wait(1).to({rotation:147.4916,x:13.8525,y:21.9278},0).wait(1).to({rotation:148.0936,x:13.6119,y:22.0663},0).wait(1).to({rotation:148.6957,x:13.3699,y:22.2022},0).wait(1).to({rotation:149.2977,x:13.1264,y:22.3357},0).wait(1).to({rotation:149.8997,x:12.8816,y:22.4665},0).wait(1).to({rotation:150.5017,x:12.6354,y:22.5948},0).wait(1).to({rotation:151.1037,x:12.3879,y:22.7205},0).wait(1).to({rotation:151.7057,x:12.1391,y:22.8435},0).wait(1).to({rotation:152.3077,x:11.889,y:22.964},0).wait(1).to({rotation:152.9097,x:11.6376,y:23.0818},0).wait(1).to({rotation:153.5117,x:11.385,y:23.197},0).wait(1).to({rotation:154.1137,x:11.1312,y:23.3095},0).wait(1).to({rotation:154.7157,x:10.8763,y:23.4193},0).wait(1).to({rotation:155.3177,x:10.6202,y:23.5265},0).wait(1).to({rotation:155.9197,x:10.363,y:23.631},0).wait(1).to({rotation:156.5217,x:10.1047,y:23.7327},0).wait(1).to({rotation:157.1237,x:9.8454,y:23.8317},0).wait(1).to({rotation:157.7258,x:9.585,y:23.928},0).wait(1).to({rotation:158.3278,x:9.3237,y:24.0216},0).wait(1).to({rotation:158.9298,x:9.0613,y:24.1124},0).wait(1).to({rotation:159.5318,x:8.7981,y:24.2004},0).wait(1).to({rotation:160.1338,x:8.5339,y:24.2857},0).wait(1).to({rotation:160.7358,x:8.2688,y:24.3682},0).wait(1).to({rotation:161.3378,x:8.0029,y:24.4479},0).wait(1).to({rotation:161.9398,x:7.7362,y:24.5248},0).wait(1).to({rotation:162.5418,x:7.4686,y:24.5989},0).wait(1).to({rotation:163.1438,x:7.2003,y:24.6702},0).wait(1).to({rotation:163.7458,x:6.9313,y:24.7387},0).wait(1).to({rotation:164.3478,x:6.6616,y:24.8043},0).wait(1).to({rotation:164.9498,x:6.3912,y:24.8671},0).wait(1).to({rotation:165.5518,x:6.1201,y:24.927},0).wait(1).to({rotation:166.1538,x:5.8484,y:24.9841},0).wait(1).to({rotation:166.7559,x:5.5762,y:25.0384},0).wait(1).to({rotation:167.3579,x:5.3034,y:25.0898},0).wait(1).to({rotation:167.9599,x:5.0301,y:25.1383},0).wait(1).to({rotation:168.5619,x:4.7562,y:25.1839},0).wait(1).to({rotation:169.1639,x:4.4819,y:25.2267},0).wait(1).to({rotation:169.7659,x:4.2072,y:25.2665},0).wait(1).to({rotation:170.3679,x:3.9321,y:25.3035},0).wait(1).to({rotation:170.9699,x:3.6566,y:25.3376},0).wait(1).to({rotation:171.5719,x:3.3807,y:25.3688},0).wait(1).to({rotation:172.1739,x:3.1046,y:25.3971},0).wait(1).to({rotation:172.7759,x:2.8281,y:25.4225},0).wait(1).to({rotation:173.3779,x:2.5514,y:25.445},0).wait(1).to({rotation:173.9799,x:2.2745,y:25.4645},0).wait(1).to({rotation:174.5819,x:1.9974,y:25.4812},0).wait(1).to({rotation:175.1839,x:1.7202,y:25.4949},0).wait(1).to({rotation:175.786,x:1.4428,y:25.5058},0).wait(1).to({rotation:176.388,x:1.1653,y:25.5137},0).wait(1).to({rotation:176.99,x:0.8877,y:25.5187},0).wait(1).to({rotation:177.592,x:0.6101,y:25.5208},0).wait(1).to({rotation:178.194,x:0.3325,y:25.52},0).wait(1).to({rotation:178.796,x:0.055,y:25.5162},0).wait(1).to({rotation:179.398,x:-0.2226,y:25.5096},0).wait(1).to({rotation:180,x:-0.5,y:25.5},0).wait(1).to({rotation:180.602,x:-0.7773,y:25.4875},0).wait(1).to({rotation:181.204,x:-1.0545,y:25.4721},0).wait(1).to({rotation:181.806,x:-1.3315,y:25.4538},0).wait(1).to({rotation:182.408,x:-1.6083,y:25.4326},0).wait(1).to({rotation:183.01,x:-1.8848,y:25.4084},0).wait(1).to({rotation:183.612,x:-2.1611,y:25.3814},0).wait(1).to({rotation:184.214,x:-2.4371,y:25.3515},0).wait(1).to({rotation:184.8161,x:-2.7128,y:25.3186},0).wait(1).to({rotation:185.4181,x:-2.9881,y:25.2829},0).wait(1).to({rotation:186.0201,x:-3.263,y:25.2443},0).wait(1).to({rotation:186.6221,x:-3.5374,y:25.2028},0).wait(1).to({rotation:187.2241,x:-3.8115,y:25.1584},0).wait(1).to({rotation:187.8261,x:-4.085,y:25.1111},0).wait(1).to({rotation:188.4281,x:-4.3581,y:25.061},0).wait(1).to({rotation:189.0301,x:-4.6306,y:25.008},0).wait(1).to({rotation:189.6321,x:-4.9025,y:24.9521},0).wait(1).to({rotation:190.2341,x:-5.1738,y:24.8934},0).wait(1).to({rotation:190.8361,x:-5.4445,y:24.8319},0).wait(1).to({rotation:191.4381,x:-5.7145,y:24.7675},0).wait(1).to({rotation:192.0401,x:-5.9839,y:24.7002},0).wait(1).to({rotation:192.6421,x:-6.2525,y:24.6302},0).wait(1).to({rotation:193.2441,x:-6.5203,y:24.5573},0).wait(1).to({rotation:193.8462,x:-6.7874,y:24.4816},0).wait(1).to({rotation:194.4482,x:-7.0537,y:24.4031},0).wait(1).to({rotation:195.0502,x:-7.3191,y:24.3218},0).wait(1).to({rotation:195.6522,x:-7.5837,y:24.2377},0).wait(1).to({rotation:196.2542,x:-7.8474,y:24.1509},0).wait(1).to({rotation:196.8562,x:-8.1101,y:24.0613},0).wait(1).to({rotation:197.4582,x:-8.3719,y:23.9689},0).wait(1).to({rotation:198.0602,x:-8.6327,y:23.8738},0).wait(1).to({rotation:198.6622,x:-8.8925,y:23.7759},0).wait(1).to({rotation:199.2642,x:-9.1512,y:23.6754},0).wait(1).to({rotation:199.8662,x:-9.4089,y:23.5721},0).wait(1).to({rotation:200.4682,x:-9.6655,y:23.4661},0).wait(1).to({rotation:201.0702,x:-9.9209,y:23.3574},0).wait(1).to({rotation:201.6722,x:-10.1752,y:23.2461},0).wait(1).to({rotation:202.2742,x:-10.4283,y:23.132},0).wait(1).to({rotation:202.8763,x:-10.6802,y:23.0154},0).wait(1).to({rotation:203.4783,x:-10.9309,y:22.8961},0).wait(1).to({rotation:204.0803,x:-11.1802,y:22.7741},0).wait(1).to({rotation:204.6823,x:-11.4283,y:22.6496},0).wait(1).to({rotation:205.2843,x:-11.6751,y:22.5224},0).wait(1).to({rotation:205.8863,x:-11.9205,y:22.3927},0).wait(1).to({rotation:206.4883,x:-12.1646,y:22.2604},0).wait(1).to({rotation:207.0903,x:-12.4072,y:22.1255},0).wait(1).to({rotation:207.6923,x:-12.6484,y:21.9881},0).wait(1).to({rotation:208.2943,x:-12.8882,y:21.8481},0).wait(1).to({rotation:208.8963,x:-13.1264,y:21.7057},0).wait(1).to({rotation:209.4983,x:-13.3632,y:21.5608},0).wait(1).to({rotation:210.1003,x:-13.5984,y:21.4133},0).wait(1).to({rotation:210.7023,x:-13.8321,y:21.2634},0).wait(1).to({rotation:211.3043,x:-14.0642,y:21.1111},0).wait(1).to({rotation:211.9064,x:-14.2946,y:20.9563},0).wait(1).to({rotation:212.5084,x:-14.5234,y:20.7992},0).wait(1).to({rotation:213.1104,x:-14.7506,y:20.6396},0).wait(1).to({rotation:213.7124,x:-14.9761,y:20.4776},0).wait(1).to({rotation:214.3144,x:-15.1998,y:20.3133},0).wait(1).to({rotation:214.9164,x:-15.4218,y:20.1467},0).wait(1).to({rotation:215.5184,x:-15.6421,y:19.9777},0).wait(1).to({rotation:216.1204,x:-15.8605,y:19.8064},0).wait(1).to({rotation:216.7224,x:-16.0772,y:19.6329},0).wait(1).to({rotation:217.3244,x:-16.292,y:19.457},0).wait(1).to({rotation:217.9264,x:-16.505,y:19.279},0).wait(1).to({rotation:218.5284,x:-16.716,y:19.0987},0).wait(1).to({rotation:219.1304,x:-16.9252,y:18.9161},0).wait(1).to({rotation:219.7324,x:-17.1325,y:18.7314},0).wait(1).to({rotation:220.3344,x:-17.3377,y:18.5446},0).wait(1).to({rotation:220.9365,x:-17.5411,y:18.3555},0).wait(1).to({rotation:221.5385,x:-17.7424,y:18.1644},0).wait(1).to({rotation:222.1405,x:-17.9417,y:17.9712},0).wait(1).to({rotation:222.7425,x:-18.1389,y:17.7758},0).wait(1).to({rotation:223.3445,x:-18.3341,y:17.5784},0).wait(1).to({rotation:223.9465,x:-18.5272,y:17.379},0).wait(1).to({rotation:224.5485,x:-18.7182,y:17.1776},0).wait(1).to({rotation:225.1505,x:-18.9071,y:16.9741},0).wait(1).to({rotation:225.7525,x:-19.0938,y:16.7687},0).wait(1).to({rotation:226.3545,x:-19.2784,y:16.5613},0).wait(1).to({rotation:226.9565,x:-19.4608,y:16.352},0).wait(1).to({rotation:227.5585,x:-19.6409,y:16.1408},0).wait(1).to({rotation:228.1605,x:-19.8188,y:15.9277},0).wait(1).to({rotation:228.7625,x:-19.9945,y:15.7128},0).wait(1).to({rotation:229.3645,x:-20.1679,y:15.496},0).wait(1).to({rotation:229.9666,x:-20.3391,y:15.2774},0).wait(1).to({rotation:230.5686,x:-20.5079,y:15.0571},0).wait(1).to({rotation:231.1706,x:-20.6744,y:14.8349},0).wait(1).to({rotation:231.7726,x:-20.8385,y:14.6111},0).wait(1).to({rotation:232.3746,x:-21.0003,y:14.3855},0).wait(1).to({rotation:232.9766,x:-21.1597,y:14.1582},0).wait(1).to({rotation:233.5786,x:-21.3167,y:13.9293},0).wait(1).to({rotation:234.1806,x:-21.4713,y:13.6987},0).wait(1).to({rotation:234.7826,x:-21.6235,y:13.4665},0).wait(1).to({rotation:235.3846,x:-21.7732,y:13.2328},0).wait(1).to({rotation:235.9866,x:-21.9205,y:12.9975},0).wait(1).to({rotation:236.5886,x:-22.0653,y:12.7606},0).wait(1).to({rotation:237.1906,x:-22.2076,y:12.5222},0).wait(1).to({rotation:237.7926,x:-22.3473,y:12.2824},0).wait(1).to({rotation:238.3946,x:-22.4846,y:12.0411},0).wait(1).to({rotation:238.9967,x:-22.6193,y:11.7983},0).wait(1).to({rotation:239.5987,x:-22.7514,y:11.5542},0).wait(1).to({rotation:240.2007,x:-22.881,y:11.3087},0).wait(1).to({rotation:240.8027,x:-23.008,y:11.0618},0).wait(1).to({rotation:241.4047,x:-23.1323,y:10.8136},0).wait(1).to({rotation:242.0067,x:-23.2541,y:10.5642},0).wait(1).to({rotation:242.6087,x:-23.3732,y:10.3134},0).wait(1).to({rotation:243.2107,x:-23.4897,y:10.0615},0).wait(1).to({rotation:243.8127,x:-23.6036,y:9.8083},0).wait(1).to({rotation:244.4147,x:-23.7148,y:9.5539},0).wait(1).to({rotation:245.0167,x:-23.8233,y:9.2984},0).wait(1).to({rotation:245.6187,x:-23.9291,y:9.0417},0).wait(1).to({rotation:246.2207,x:-24.0322,y:8.784},0).wait(1).to({rotation:246.8227,x:-24.1326,y:8.5252},0).wait(1).to({rotation:247.4247,x:-24.2302,y:8.2653},0).wait(1).to({rotation:248.0268,x:-24.3252,y:8.0045},0).wait(1).to({rotation:248.6288,x:-24.4173,y:7.7426},0).wait(1).to({rotation:249.2308,x:-24.5068,y:7.4798},0).wait(1).to({rotation:249.8328,x:-24.5934,y:7.2161},0).wait(1).to({rotation:250.4348,x:-24.6773,y:6.9514},0).wait(1).to({rotation:251.0368,x:-24.7584,y:6.686},0).wait(1).to({rotation:251.6388,x:-24.8367,y:6.4196},0).wait(1).to({rotation:252.2408,x:-24.9122,y:6.1525},0).wait(1).to({rotation:252.8428,x:-24.9849,y:5.8846},0).wait(1).to({rotation:253.4448,x:-25.0548,y:5.6159},0).wait(1).to({rotation:254.0468,x:-25.1218,y:5.3465},0).wait(1).to({rotation:254.6488,x:-25.1861,y:5.0765},0).wait(1).to({rotation:255.2508,x:-25.2474,y:4.8057},0).wait(1).to({rotation:255.8528,x:-25.306,y:4.5344},0).wait(1).to({rotation:256.4548,x:-25.3616,y:4.2624},0).wait(1).to({rotation:257.0569,x:-25.4144,y:3.9899},0).wait(1).to({rotation:257.6589,x:-25.4644,y:3.7168},0).wait(1).to({rotation:258.2609,x:-25.5114,y:3.4432},0).wait(1).to({rotation:258.8629,x:-25.5556,y:3.1691},0).wait(1).to({rotation:259.4649,x:-25.597,y:2.8946},0).wait(1).to({rotation:260.0669,x:-25.6354,y:2.6197},0).wait(1).to({rotation:260.6689,x:-25.6709,y:2.3444},0).wait(1).to({rotation:261.2709,x:-25.7036,y:2.0687},0).wait(1).to({rotation:261.8729,x:-25.7333,y:1.7927},0).wait(1).to({rotation:262.4749,x:-25.7601,y:1.5164},0).wait(1).to({rotation:263.0769,x:-25.7841,y:1.2398},0).wait(1).to({rotation:263.6789,x:-25.8051,y:0.963},0).wait(1).to({rotation:264.2809,x:-25.8232,y:0.686},0).wait(1).to({rotation:264.8829,x:-25.8384,y:0.4088},0).wait(1).to({rotation:265.4849,x:-25.8507,y:0.1315},0).wait(1).to({rotation:266.087,x:-25.8601,y:-0.146},0).wait(1).to({rotation:266.689,x:-25.8666,y:-0.4235},0).wait(1).to({rotation:267.291,x:-25.8701,y:-0.7011},0).wait(1).to({rotation:267.893,x:-25.8708,y:-0.9787},0).wait(1).to({rotation:268.495,x:-25.8685,y:-1.2563},0).wait(1).to({rotation:269.097,x:-25.8633,y:-1.5338},0).wait(1).to({rotation:269.699,x:-25.8552,y:-1.8113},0).wait(1).to({rotation:270.301,x:-25.8441,y:-2.0887},0).wait(1).to({rotation:270.903,x:-25.8302,y:-2.3659},0).wait(1).to({rotation:271.505,x:-25.8133,y:-2.643},0).wait(1).to({rotation:272.107,x:-25.7935,y:-2.9199},0).wait(1).to({rotation:272.709,x:-25.7709,y:-3.1966},0).wait(1).to({rotation:273.311,x:-25.7453,y:-3.473},0).wait(1).to({rotation:273.913,x:-25.7168,y:-3.7492},0).wait(1).to({rotation:274.5151,x:-25.6854,y:-4.025},0).wait(1).to({rotation:275.1171,x:-25.6511,y:-4.3005},0).wait(1).to({rotation:275.7191,x:-25.614,y:-4.5756},0).wait(1).to({rotation:276.3211,x:-25.5739,y:-4.8503},0).wait(1).to({rotation:276.9231,x:-25.531,y:-5.1245},0).wait(1).to({rotation:277.5251,x:-25.4851,y:-5.3983},0).wait(1).to({rotation:278.1271,x:-25.4364,y:-5.6716},0).wait(1).to({rotation:278.7291,x:-25.3849,y:-5.9444},0).wait(1).to({rotation:279.3311,x:-25.3304,y:-6.2166},0).wait(1).to({rotation:279.9331,x:-25.2731,y:-6.4882},0).wait(1).to({rotation:280.5351,x:-25.213,y:-6.7592},0).wait(1).to({rotation:281.1371,x:-25.15,y:-7.0296},0).wait(1).to({rotation:281.7391,x:-25.0842,y:-7.2993},0).wait(1).to({rotation:282.3411,x:-25.0155,y:-7.5683},0).wait(1).to({rotation:282.9431,x:-24.9441,y:-7.8365},0).wait(1).to({rotation:283.5452,x:-24.8698,y:-8.104},0).wait(1).to({rotation:284.1472,x:-24.7927,y:-8.3707},0).wait(1).to({rotation:284.7492,x:-24.7128,y:-8.6365},0).wait(1).to({rotation:285.3512,x:-24.6301,y:-8.9015},0).wait(1).to({rotation:285.9532,x:-24.5447,y:-9.1656},0).wait(1).to({rotation:286.5552,x:-24.4564,y:-9.4289},0).wait(1).to({rotation:287.1572,x:-24.3654,y:-9.6911},0).wait(1).to({rotation:287.7592,x:-24.2717,y:-9.9524},0).wait(1).to({rotation:288.3612,x:-24.1752,y:-10.2127},0).wait(1).to({rotation:288.9632,x:-24.076,y:-10.472},0).wait(1).to({rotation:289.5652,x:-23.9741,y:-10.7302},0).wait(1).to({rotation:290.1672,x:-23.8694,y:-10.9873},0).wait(1).to({rotation:290.7692,x:-23.7621,y:-11.2433},0).wait(1).to({rotation:291.3712,x:-23.6521,y:-11.4982},0).wait(1).to({rotation:291.9732,x:-23.5394,y:-11.7519},0).wait(1).to({rotation:292.5753,x:-23.424,y:-12.0044},0).wait(1).to({rotation:293.1773,x:-23.306,y:-12.2557},0).wait(1).to({rotation:293.7793,x:-23.1854,y:-12.5057},0).wait(1).to({rotation:294.3813,x:-23.0622,y:-12.7545},0).wait(1).to({rotation:294.9833,x:-22.9363,y:-13.0019},0).wait(1).to({rotation:295.5853,x:-22.8079,y:-13.248},0).wait(1).to({rotation:296.1873,x:-22.6768,y:-13.4927},0).wait(1).to({rotation:296.7893,x:-22.5432,y:-13.7361},0).wait(1).to({rotation:297.3913,x:-22.4071,y:-13.978},0).wait(1).to({rotation:297.9933,x:-22.2684,y:-14.2185},0).wait(1).to({rotation:298.5953,x:-22.1272,y:-14.4575},0).wait(1).to({rotation:299.1973,x:-21.9835,y:-14.695},0).wait(1).to({rotation:299.7993,x:-21.8373,y:-14.931},0).wait(1).to({rotation:300.4013,x:-21.6887,y:-15.1654},0).wait(1).to({rotation:301.0033,x:-21.5376,y:-15.3983},0).wait(1).to({rotation:301.6054,x:-21.384,y:-15.6296},0).wait(1).to({rotation:302.2074,x:-21.2281,y:-15.8592},0).wait(1).to({rotation:302.8094,x:-21.0697,y:-16.0872},0).wait(1).to({rotation:303.4114,x:-20.9089,y:-16.3135},0).wait(1).to({rotation:304.0134,x:-20.7458,y:-16.5382},0).wait(1).to({rotation:304.6154,x:-20.5803,y:-16.761},0).wait(1).to({rotation:305.2174,x:-20.4125,y:-16.9822},0).wait(1).to({rotation:305.8194,x:-20.2424,y:-17.2015},0).wait(1).to({rotation:306.4214,x:-20.0699,y:-17.4191},0).wait(1).to({rotation:307.0234,x:-19.8952,y:-17.6348},0).wait(1).to({rotation:307.6254,x:-19.7183,y:-17.8487},0).wait(1).to({rotation:308.2274,x:-19.5391,y:-18.0607},0).wait(1).to({rotation:308.8294,x:-19.3577,y:-18.2709},0).wait(1).to({rotation:309.4314,x:-19.1741,y:-18.4791},0).wait(1).to({rotation:310.0334,x:-18.9883,y:-18.6853},0).wait(1).to({rotation:310.6355,x:-18.8003,y:-18.8897},0).wait(1).to({rotation:311.2375,x:-18.6102,y:-19.092},0).wait(1).to({rotation:311.8395,x:-18.418,y:-19.2923},0).wait(1).to({rotation:312.4415,x:-18.2238,y:-19.4906},0).wait(1).to({rotation:313.0435,x:-18.0274,y:-19.6868},0).wait(1).to({rotation:313.6455,x:-17.829,y:-19.8809},0).wait(1).to({rotation:314.2475,x:-17.6285,y:-20.073},0).wait(1).to({rotation:314.8495,x:-17.4261,y:-20.2629},0).wait(1).to({rotation:315.4515,x:-17.2216,y:-20.4507},0).wait(1).to({rotation:316.0535,x:-17.0152,y:-20.6364},0).wait(1).to({rotation:316.6555,x:-16.8069,y:-20.8198},0).wait(1).to({rotation:317.2575,x:-16.5967,y:-21.0011},0).wait(1).to({rotation:317.8595,x:-16.3845,y:-21.1802},0).wait(1).to({rotation:318.4615,x:-16.1705,y:-21.357},0).wait(1).to({rotation:319.0635,x:-15.9546,y:-21.5315},0).wait(1).to({rotation:319.6656,x:-15.737,y:-21.7038},0).wait(1).to({rotation:320.2676,x:-15.5175,y:-21.8738},0).wait(1).to({rotation:320.8696,x:-15.2962,y:-22.0414},0).wait(1).to({rotation:321.4716,x:-15.0732,y:-22.2067},0).wait(1).to({rotation:322.0736,x:-14.8485,y:-22.3697},0).wait(1).to({rotation:322.6756,x:-14.6221,y:-22.5303},0).wait(1).to({rotation:323.2776,x:-14.394,y:-22.6885},0).wait(1).to({rotation:323.8796,x:-14.1642,y:-22.8444},0).wait(1).to({rotation:324.4816,x:-13.9328,y:-22.9977},0).wait(1).to({rotation:325.0836,x:-13.6999,y:-23.1487},0).wait(1).to({rotation:325.6856,x:-13.4653,y:-23.2972},0).wait(1).to({rotation:326.2876,x:-13.2292,y:-23.4432},0).wait(1).to({rotation:326.8896,x:-12.9916,y:-23.5867},0).wait(1).to({rotation:327.4916,x:-12.7525,y:-23.7278},0).wait(1).to({rotation:328.0936,x:-12.5119,y:-23.8663},0).wait(1).to({rotation:328.6957,x:-12.2699,y:-24.0022},0).wait(1).to({rotation:329.2977,x:-12.0264,y:-24.1357},0).wait(1).to({rotation:329.8997,x:-11.7816,y:-24.2665},0).wait(1).to({rotation:330.5017,x:-11.5354,y:-24.3948},0).wait(1).to({rotation:331.1037,x:-11.2879,y:-24.5205},0).wait(1).to({rotation:331.7057,x:-11.0391,y:-24.6435},0).wait(1).to({rotation:332.3077,x:-10.789,y:-24.764},0).wait(1).to({rotation:332.9097,x:-10.5376,y:-24.8818},0).wait(1).to({rotation:333.5117,x:-10.285,y:-24.997},0).wait(1).to({rotation:334.1137,x:-10.0312,y:-25.1095},0).wait(1).to({rotation:334.7157,x:-9.7763,y:-25.2193},0).wait(1).to({rotation:335.3177,x:-9.5202,y:-25.3265},0).wait(1).to({rotation:335.9197,x:-9.263,y:-25.431},0).wait(1).to({rotation:336.5217,x:-9.0047,y:-25.5327},0).wait(1).to({rotation:337.1237,x:-8.7454,y:-25.6317},0).wait(1).to({rotation:337.7258,x:-8.485,y:-25.728},0).wait(1).to({rotation:338.3278,x:-8.2237,y:-25.8216},0).wait(1).to({rotation:338.9298,x:-7.9613,y:-25.9124},0).wait(1).to({rotation:339.5318,x:-7.6981,y:-26.0004},0).wait(1).to({rotation:340.1338,x:-7.4339,y:-26.0857},0).wait(1).to({rotation:340.7358,x:-7.1688,y:-26.1682},0).wait(1).to({rotation:341.3378,x:-6.9029,y:-26.2479},0).wait(1).to({rotation:341.9398,x:-6.6362,y:-26.3248},0).wait(1).to({rotation:342.5418,x:-6.3686,y:-26.3989},0).wait(1).to({rotation:343.1438,x:-6.1003,y:-26.4702},0).wait(1).to({rotation:343.7458,x:-5.8313,y:-26.5387},0).wait(1).to({rotation:344.3478,x:-5.5616,y:-26.6043},0).wait(1).to({rotation:344.9498,x:-5.2912,y:-26.6671},0).wait(1).to({rotation:345.5518,x:-5.0201,y:-26.727},0).wait(1).to({rotation:346.1538,x:-4.7484,y:-26.7841},0).wait(1).to({rotation:346.7559,x:-4.4762,y:-26.8384},0).wait(1).to({rotation:347.3579,x:-4.2034,y:-26.8898},0).wait(1).to({rotation:347.9599,x:-3.9301,y:-26.9383},0).wait(1).to({rotation:348.5619,x:-3.6562,y:-26.9839},0).wait(1).to({rotation:349.1639,x:-3.3819,y:-27.0267},0).wait(1).to({rotation:349.7659,x:-3.1072,y:-27.0665},0).wait(1).to({rotation:350.3679,x:-2.8321,y:-27.1035},0).wait(1).to({rotation:350.9699,x:-2.5566,y:-27.1376},0).wait(1).to({rotation:351.5719,x:-2.2807,y:-27.1688},0).wait(1).to({rotation:352.1739,x:-2.0046,y:-27.1971},0).wait(1).to({rotation:352.7759,x:-1.7281,y:-27.2225},0).wait(1).to({rotation:353.3779,x:-1.4514,y:-27.245},0).wait(1).to({rotation:353.9799,x:-1.1745,y:-27.2645},0).wait(1).to({rotation:354.5819,x:-0.8974,y:-27.2812},0).wait(1).to({rotation:355.1839,x:-0.6202,y:-27.2949},0).wait(1).to({rotation:355.786,x:-0.3428,y:-27.3058},0).wait(1).to({rotation:356.388,x:-0.0653,y:-27.3137},0).wait(1).to({rotation:356.99,x:0.2123,y:-27.3187},0).wait(1).to({rotation:357.592,x:0.4899,y:-27.3208},0).wait(1).to({rotation:358.194,x:0.7675,y:-27.32},0).wait(1).to({rotation:358.796,x:1.045,y:-27.3162},0).wait(1).to({rotation:359.398,x:1.3226,y:-27.3096},0).wait(1).to({rotation:360,x:1.6,y:-27.3},0).wait(2));

	// body
	this.instance_1 = new lib.CachedBmp_56();
	this.instance_1.setTransform(-75.85,-75.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(600));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.8,-75.8,151.5,151.5);


(lib.clock6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// red_center
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8542A").s().p("AhZgBQAAgiAZgdQAdgZAiAAQAlAAAZAZQAdAdAAAiQAAAlgdAdQgZAZglAAQhYAAAAhbg");
	this.shape.setTransform(1.275,1.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AAJAAQAAAEgDADQgCACgEAAQgIAAAAgJQAAgDACgDQADgCADAAQAEAAACACQADADAAADg");
	this.shape_1.setTransform(1.275,-2.775,9.7027,9.7027);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8542A").s().p("AgIAAQAAgDACgDQADgCADAAQAEAAACACQADADAAADQAAAEgDADQgCACgEAAQgIAAAAgJg");
	this.shape_2.setTransform(1.275,-2.775,9.7027,9.7027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},25).wait(575));

	// needle
	this.instance = new lib.clock_needle();
	this.instance.setTransform(0.5,-0.9,1,1,0,0,0,-1.1,26.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:0,rotation:0.602,x:1.8773,y:-27.2875},0).wait(1).to({rotation:1.204,x:2.1545,y:-27.2721},0).wait(1).to({rotation:1.806,x:2.4315,y:-27.2538},0).wait(1).to({rotation:2.408,x:2.7083,y:-27.2326},0).wait(1).to({rotation:3.01,x:2.9848,y:-27.2084},0).wait(1).to({rotation:3.612,x:3.2611,y:-27.1814},0).wait(1).to({rotation:4.214,x:3.5371,y:-27.1515},0).wait(1).to({rotation:4.8161,x:3.8128,y:-27.1186},0).wait(1).to({rotation:5.4181,x:4.0881,y:-27.0829},0).wait(1).to({rotation:6.0201,x:4.363,y:-27.0443},0).wait(1).to({rotation:6.6221,x:4.6374,y:-27.0028},0).wait(1).to({rotation:7.2241,x:4.9115,y:-26.9584},0).wait(1).to({rotation:7.8261,x:5.185,y:-26.9111},0).wait(1).to({rotation:8.4281,x:5.4581,y:-26.861},0).wait(1).to({rotation:9.0301,x:5.7306,y:-26.808},0).wait(1).to({rotation:9.6321,x:6.0025,y:-26.7521},0).wait(1).to({rotation:10.2341,x:6.2738,y:-26.6934},0).wait(1).to({rotation:10.8361,x:6.5445,y:-26.6319},0).wait(1).to({rotation:11.4381,x:6.8145,y:-26.5675},0).wait(1).to({rotation:12.0401,x:7.0839,y:-26.5002},0).wait(1).to({rotation:12.6421,x:7.3525,y:-26.4302},0).wait(1).to({rotation:13.2441,x:7.6203,y:-26.3573},0).wait(1).to({rotation:13.8462,x:7.8874,y:-26.2816},0).wait(1).to({rotation:14.4482,x:8.1537,y:-26.2031},0).wait(1).to({rotation:15.0502,x:8.4191,y:-26.1218},0).wait(1).to({rotation:15.6522,x:8.6837,y:-26.0377},0).wait(1).to({rotation:16.2542,x:8.9474,y:-25.9509},0).wait(1).to({rotation:16.8562,x:9.2101,y:-25.8613},0).wait(1).to({rotation:17.4582,x:9.4719,y:-25.7689},0).wait(1).to({rotation:18.0602,x:9.7327,y:-25.6738},0).wait(1).to({rotation:18.6622,x:9.9925,y:-25.5759},0).wait(1).to({rotation:19.2642,x:10.2512,y:-25.4754},0).wait(1).to({rotation:19.8662,x:10.5089,y:-25.3721},0).wait(1).to({rotation:20.4682,x:10.7655,y:-25.2661},0).wait(1).to({rotation:21.0702,x:11.0209,y:-25.1574},0).wait(1).to({rotation:21.6722,x:11.2752,y:-25.0461},0).wait(1).to({rotation:22.2742,x:11.5283,y:-24.932},0).wait(1).to({rotation:22.8763,x:11.7802,y:-24.8154},0).wait(1).to({rotation:23.4783,x:12.0309,y:-24.6961},0).wait(1).to({rotation:24.0803,x:12.2802,y:-24.5741},0).wait(1).to({rotation:24.6823,x:12.5283,y:-24.4496},0).wait(1).to({rotation:25.2843,x:12.7751,y:-24.3224},0).wait(1).to({rotation:25.8863,x:13.0205,y:-24.1927},0).wait(1).to({rotation:26.4883,x:13.2646,y:-24.0604},0).wait(1).to({rotation:27.0903,x:13.5072,y:-23.9255},0).wait(1).to({rotation:27.6923,x:13.7484,y:-23.7881},0).wait(1).to({rotation:28.2943,x:13.9882,y:-23.6481},0).wait(1).to({rotation:28.8963,x:14.2264,y:-23.5057},0).wait(1).to({rotation:29.4983,x:14.4632,y:-23.3608},0).wait(1).to({rotation:30.1003,x:14.6984,y:-23.2133},0).wait(1).to({rotation:30.7023,x:14.9321,y:-23.0634},0).wait(1).to({rotation:31.3043,x:15.1642,y:-22.9111},0).wait(1).to({rotation:31.9064,x:15.3946,y:-22.7563},0).wait(1).to({rotation:32.5084,x:15.6234,y:-22.5992},0).wait(1).to({rotation:33.1104,x:15.8506,y:-22.4396},0).wait(1).to({rotation:33.7124,x:16.0761,y:-22.2776},0).wait(1).to({rotation:34.3144,x:16.2998,y:-22.1133},0).wait(1).to({rotation:34.9164,x:16.5218,y:-21.9467},0).wait(1).to({rotation:35.5184,x:16.7421,y:-21.7777},0).wait(1).to({rotation:36.1204,x:16.9605,y:-21.6064},0).wait(1).to({rotation:36.7224,x:17.1772,y:-21.4329},0).wait(1).to({rotation:37.3244,x:17.392,y:-21.257},0).wait(1).to({rotation:37.9264,x:17.605,y:-21.079},0).wait(1).to({rotation:38.5284,x:17.816,y:-20.8987},0).wait(1).to({rotation:39.1304,x:18.0252,y:-20.7161},0).wait(1).to({rotation:39.7324,x:18.2325,y:-20.5314},0).wait(1).to({rotation:40.3344,x:18.4377,y:-20.3446},0).wait(1).to({rotation:40.9365,x:18.6411,y:-20.1555},0).wait(1).to({rotation:41.5385,x:18.8424,y:-19.9644},0).wait(1).to({rotation:42.1405,x:19.0417,y:-19.7712},0).wait(1).to({rotation:42.7425,x:19.2389,y:-19.5758},0).wait(1).to({rotation:43.3445,x:19.4341,y:-19.3784},0).wait(1).to({rotation:43.9465,x:19.6272,y:-19.179},0).wait(1).to({rotation:44.5485,x:19.8182,y:-18.9776},0).wait(1).to({rotation:45.1505,x:20.0071,y:-18.7741},0).wait(1).to({rotation:45.7525,x:20.1938,y:-18.5687},0).wait(1).to({rotation:46.3545,x:20.3784,y:-18.3613},0).wait(1).to({rotation:46.9565,x:20.5608,y:-18.152},0).wait(1).to({rotation:47.5585,x:20.7409,y:-17.9408},0).wait(1).to({rotation:48.1605,x:20.9188,y:-17.7277},0).wait(1).to({rotation:48.7625,x:21.0945,y:-17.5128},0).wait(1).to({rotation:49.3645,x:21.2679,y:-17.296},0).wait(1).to({rotation:49.9666,x:21.4391,y:-17.0774},0).wait(1).to({rotation:50.5686,x:21.6079,y:-16.8571},0).wait(1).to({rotation:51.1706,x:21.7744,y:-16.6349},0).wait(1).to({rotation:51.7726,x:21.9385,y:-16.4111},0).wait(1).to({rotation:52.3746,x:22.1003,y:-16.1855},0).wait(1).to({rotation:52.9766,x:22.2597,y:-15.9582},0).wait(1).to({rotation:53.5786,x:22.4167,y:-15.7293},0).wait(1).to({rotation:54.1806,x:22.5713,y:-15.4987},0).wait(1).to({rotation:54.7826,x:22.7235,y:-15.2665},0).wait(1).to({rotation:55.3846,x:22.8732,y:-15.0328},0).wait(1).to({rotation:55.9866,x:23.0205,y:-14.7975},0).wait(1).to({rotation:56.5886,x:23.1653,y:-14.5606},0).wait(1).to({rotation:57.1906,x:23.3076,y:-14.3222},0).wait(1).to({rotation:57.7926,x:23.4473,y:-14.0824},0).wait(1).to({rotation:58.3946,x:23.5846,y:-13.8411},0).wait(1).to({rotation:58.9967,x:23.7193,y:-13.5983},0).wait(1).to({rotation:59.5987,x:23.8514,y:-13.3542},0).wait(1).to({rotation:60.2007,x:23.981,y:-13.1087},0).wait(1).to({rotation:60.8027,x:24.108,y:-12.8618},0).wait(1).to({rotation:61.4047,x:24.2323,y:-12.6136},0).wait(1).to({rotation:62.0067,x:24.3541,y:-12.3642},0).wait(1).to({rotation:62.6087,x:24.4732,y:-12.1134},0).wait(1).to({rotation:63.2107,x:24.5897,y:-11.8615},0).wait(1).to({rotation:63.8127,x:24.7036,y:-11.6083},0).wait(1).to({rotation:64.4147,x:24.8148,y:-11.3539},0).wait(1).to({rotation:65.0167,x:24.9233,y:-11.0984},0).wait(1).to({rotation:65.6187,x:25.0291,y:-10.8417},0).wait(1).to({rotation:66.2207,x:25.1322,y:-10.584},0).wait(1).to({rotation:66.8227,x:25.2326,y:-10.3252},0).wait(1).to({rotation:67.4247,x:25.3302,y:-10.0653},0).wait(1).to({rotation:68.0268,x:25.4252,y:-9.8045},0).wait(1).to({rotation:68.6288,x:25.5173,y:-9.5426},0).wait(1).to({rotation:69.2308,x:25.6068,y:-9.2798},0).wait(1).to({rotation:69.8328,x:25.6934,y:-9.0161},0).wait(1).to({rotation:70.4348,x:25.7773,y:-8.7514},0).wait(1).to({rotation:71.0368,x:25.8584,y:-8.486},0).wait(1).to({rotation:71.6388,x:25.9367,y:-8.2196},0).wait(1).to({rotation:72.2408,x:26.0122,y:-7.9525},0).wait(1).to({rotation:72.8428,x:26.0849,y:-7.6846},0).wait(1).to({rotation:73.4448,x:26.1548,y:-7.4159},0).wait(1).to({rotation:74.0468,x:26.2218,y:-7.1465},0).wait(1).to({rotation:74.6488,x:26.2861,y:-6.8765},0).wait(1).to({rotation:75.2508,x:26.3474,y:-6.6057},0).wait(1).to({rotation:75.8528,x:26.406,y:-6.3344},0).wait(1).to({rotation:76.4548,x:26.4616,y:-6.0624},0).wait(1).to({rotation:77.0569,x:26.5144,y:-5.7899},0).wait(1).to({rotation:77.6589,x:26.5644,y:-5.5168},0).wait(1).to({rotation:78.2609,x:26.6114,y:-5.2432},0).wait(1).to({rotation:78.8629,x:26.6556,y:-4.9691},0).wait(1).to({rotation:79.4649,x:26.697,y:-4.6946},0).wait(1).to({rotation:80.0669,x:26.7354,y:-4.4197},0).wait(1).to({rotation:80.6689,x:26.7709,y:-4.1444},0).wait(1).to({rotation:81.2709,x:26.8036,y:-3.8687},0).wait(1).to({rotation:81.8729,x:26.8333,y:-3.5927},0).wait(1).to({rotation:82.4749,x:26.8601,y:-3.3164},0).wait(1).to({rotation:83.0769,x:26.8841,y:-3.0398},0).wait(1).to({rotation:83.6789,x:26.9051,y:-2.763},0).wait(1).to({rotation:84.2809,x:26.9232,y:-2.486},0).wait(1).to({rotation:84.8829,x:26.9384,y:-2.2088},0).wait(1).to({rotation:85.4849,x:26.9507,y:-1.9315},0).wait(1).to({rotation:86.087,x:26.9601,y:-1.654},0).wait(1).to({rotation:86.689,x:26.9666,y:-1.3765},0).wait(1).to({rotation:87.291,x:26.9701,y:-1.0989},0).wait(1).to({rotation:87.893,x:26.9708,y:-0.8213},0).wait(1).to({rotation:88.495,x:26.9685,y:-0.5437},0).wait(1).to({rotation:89.097,x:26.9633,y:-0.2662},0).wait(1).to({rotation:89.699,x:26.9552,y:0.0113},0).wait(1).to({rotation:90.301,x:26.9441,y:0.2887},0).wait(1).to({rotation:90.903,x:26.9302,y:0.5659},0).wait(1).to({rotation:91.505,x:26.9133,y:0.843},0).wait(1).to({rotation:92.107,x:26.8935,y:1.1199},0).wait(1).to({rotation:92.709,x:26.8709,y:1.3966},0).wait(1).to({rotation:93.311,x:26.8453,y:1.673},0).wait(1).to({rotation:93.913,x:26.8168,y:1.9492},0).wait(1).to({rotation:94.5151,x:26.7854,y:2.225},0).wait(1).to({rotation:95.1171,x:26.7511,y:2.5005},0).wait(1).to({rotation:95.7191,x:26.714,y:2.7756},0).wait(1).to({rotation:96.3211,x:26.6739,y:3.0503},0).wait(1).to({rotation:96.9231,x:26.631,y:3.3245},0).wait(1).to({rotation:97.5251,x:26.5851,y:3.5983},0).wait(1).to({rotation:98.1271,x:26.5364,y:3.8716},0).wait(1).to({rotation:98.7291,x:26.4849,y:4.1444},0).wait(1).to({rotation:99.3311,x:26.4304,y:4.4166},0).wait(1).to({rotation:99.9331,x:26.3731,y:4.6882},0).wait(1).to({rotation:100.5351,x:26.313,y:4.9592},0).wait(1).to({rotation:101.1371,x:26.25,y:5.2296},0).wait(1).to({rotation:101.7391,x:26.1842,y:5.4993},0).wait(1).to({rotation:102.3411,x:26.1155,y:5.7683},0).wait(1).to({rotation:102.9431,x:26.0441,y:6.0365},0).wait(1).to({rotation:103.5452,x:25.9698,y:6.304},0).wait(1).to({rotation:104.1472,x:25.8927,y:6.5707},0).wait(1).to({rotation:104.7492,x:25.8128,y:6.8365},0).wait(1).to({rotation:105.3512,x:25.7301,y:7.1015},0).wait(1).to({rotation:105.9532,x:25.6447,y:7.3656},0).wait(1).to({rotation:106.5552,x:25.5564,y:7.6289},0).wait(1).to({rotation:107.1572,x:25.4654,y:7.8911},0).wait(1).to({rotation:107.7592,x:25.3717,y:8.1524},0).wait(1).to({rotation:108.3612,x:25.2752,y:8.4127},0).wait(1).to({rotation:108.9632,x:25.176,y:8.672},0).wait(1).to({rotation:109.5652,x:25.0741,y:8.9302},0).wait(1).to({rotation:110.1672,x:24.9694,y:9.1873},0).wait(1).to({rotation:110.7692,x:24.8621,y:9.4433},0).wait(1).to({rotation:111.3712,x:24.7521,y:9.6982},0).wait(1).to({rotation:111.9732,x:24.6394,y:9.9519},0).wait(1).to({rotation:112.5753,x:24.524,y:10.2044},0).wait(1).to({rotation:113.1773,x:24.406,y:10.4557},0).wait(1).to({rotation:113.7793,x:24.2854,y:10.7057},0).wait(1).to({rotation:114.3813,x:24.1622,y:10.9545},0).wait(1).to({rotation:114.9833,x:24.0363,y:11.2019},0).wait(1).to({rotation:115.5853,x:23.9079,y:11.448},0).wait(1).to({rotation:116.1873,x:23.7768,y:11.6927},0).wait(1).to({rotation:116.7893,x:23.6432,y:11.9361},0).wait(1).to({rotation:117.3913,x:23.5071,y:12.178},0).wait(1).to({rotation:117.9933,x:23.3684,y:12.4185},0).wait(1).to({rotation:118.5953,x:23.2272,y:12.6575},0).wait(1).to({rotation:119.1973,x:23.0835,y:12.895},0).wait(1).to({rotation:119.7993,x:22.9373,y:13.131},0).wait(1).to({rotation:120.4013,x:22.7887,y:13.3654},0).wait(1).to({rotation:121.0033,x:22.6376,y:13.5983},0).wait(1).to({rotation:121.6054,x:22.484,y:13.8296},0).wait(1).to({rotation:122.2074,x:22.3281,y:14.0592},0).wait(1).to({rotation:122.8094,x:22.1697,y:14.2872},0).wait(1).to({rotation:123.4114,x:22.0089,y:14.5135},0).wait(1).to({rotation:124.0134,x:21.8458,y:14.7382},0).wait(1).to({rotation:124.6154,x:21.6803,y:14.961},0).wait(1).to({rotation:125.2174,x:21.5125,y:15.1822},0).wait(1).to({rotation:125.8194,x:21.3424,y:15.4015},0).wait(1).to({rotation:126.4214,x:21.1699,y:15.6191},0).wait(1).to({rotation:127.0234,x:20.9952,y:15.8348},0).wait(1).to({rotation:127.6254,x:20.8183,y:16.0487},0).wait(1).to({rotation:128.2274,x:20.6391,y:16.2607},0).wait(1).to({rotation:128.8294,x:20.4577,y:16.4709},0).wait(1).to({rotation:129.4314,x:20.2741,y:16.6791},0).wait(1).to({rotation:130.0334,x:20.0883,y:16.8853},0).wait(1).to({rotation:130.6355,x:19.9003,y:17.0897},0).wait(1).to({rotation:131.2375,x:19.7102,y:17.292},0).wait(1).to({rotation:131.8395,x:19.518,y:17.4923},0).wait(1).to({rotation:132.4415,x:19.3238,y:17.6906},0).wait(1).to({rotation:133.0435,x:19.1274,y:17.8868},0).wait(1).to({rotation:133.6455,x:18.929,y:18.0809},0).wait(1).to({rotation:134.2475,x:18.7285,y:18.273},0).wait(1).to({rotation:134.8495,x:18.5261,y:18.4629},0).wait(1).to({rotation:135.4515,x:18.3216,y:18.6507},0).wait(1).to({rotation:136.0535,x:18.1152,y:18.8364},0).wait(1).to({rotation:136.6555,x:17.9069,y:19.0198},0).wait(1).to({rotation:137.2575,x:17.6967,y:19.2011},0).wait(1).to({rotation:137.8595,x:17.4845,y:19.3802},0).wait(1).to({rotation:138.4615,x:17.2705,y:19.557},0).wait(1).to({rotation:139.0635,x:17.0546,y:19.7315},0).wait(1).to({rotation:139.6656,x:16.837,y:19.9038},0).wait(1).to({rotation:140.2676,x:16.6175,y:20.0738},0).wait(1).to({rotation:140.8696,x:16.3962,y:20.2414},0).wait(1).to({rotation:141.4716,x:16.1732,y:20.4067},0).wait(1).to({rotation:142.0736,x:15.9485,y:20.5697},0).wait(1).to({rotation:142.6756,x:15.7221,y:20.7303},0).wait(1).to({rotation:143.2776,x:15.494,y:20.8885},0).wait(1).to({rotation:143.8796,x:15.2642,y:21.0444},0).wait(1).to({rotation:144.4816,x:15.0328,y:21.1977},0).wait(1).to({rotation:145.0836,x:14.7999,y:21.3487},0).wait(1).to({rotation:145.6856,x:14.5653,y:21.4972},0).wait(1).to({rotation:146.2876,x:14.3292,y:21.6432},0).wait(1).to({rotation:146.8896,x:14.0916,y:21.7867},0).wait(1).to({rotation:147.4916,x:13.8525,y:21.9278},0).wait(1).to({rotation:148.0936,x:13.6119,y:22.0663},0).wait(1).to({rotation:148.6957,x:13.3699,y:22.2022},0).wait(1).to({rotation:149.2977,x:13.1264,y:22.3357},0).wait(1).to({rotation:149.8997,x:12.8816,y:22.4665},0).wait(1).to({rotation:150.5017,x:12.6354,y:22.5948},0).wait(1).to({rotation:151.1037,x:12.3879,y:22.7205},0).wait(1).to({rotation:151.7057,x:12.1391,y:22.8435},0).wait(1).to({rotation:152.3077,x:11.889,y:22.964},0).wait(1).to({rotation:152.9097,x:11.6376,y:23.0818},0).wait(1).to({rotation:153.5117,x:11.385,y:23.197},0).wait(1).to({rotation:154.1137,x:11.1312,y:23.3095},0).wait(1).to({rotation:154.7157,x:10.8763,y:23.4193},0).wait(1).to({rotation:155.3177,x:10.6202,y:23.5265},0).wait(1).to({rotation:155.9197,x:10.363,y:23.631},0).wait(1).to({rotation:156.5217,x:10.1047,y:23.7327},0).wait(1).to({rotation:157.1237,x:9.8454,y:23.8317},0).wait(1).to({rotation:157.7258,x:9.585,y:23.928},0).wait(1).to({rotation:158.3278,x:9.3237,y:24.0216},0).wait(1).to({rotation:158.9298,x:9.0613,y:24.1124},0).wait(1).to({rotation:159.5318,x:8.7981,y:24.2004},0).wait(1).to({rotation:160.1338,x:8.5339,y:24.2857},0).wait(1).to({rotation:160.7358,x:8.2688,y:24.3682},0).wait(1).to({rotation:161.3378,x:8.0029,y:24.4479},0).wait(1).to({rotation:161.9398,x:7.7362,y:24.5248},0).wait(1).to({rotation:162.5418,x:7.4686,y:24.5989},0).wait(1).to({rotation:163.1438,x:7.2003,y:24.6702},0).wait(1).to({rotation:163.7458,x:6.9313,y:24.7387},0).wait(1).to({rotation:164.3478,x:6.6616,y:24.8043},0).wait(1).to({rotation:164.9498,x:6.3912,y:24.8671},0).wait(1).to({rotation:165.5518,x:6.1201,y:24.927},0).wait(1).to({rotation:166.1538,x:5.8484,y:24.9841},0).wait(1).to({rotation:166.7559,x:5.5762,y:25.0384},0).wait(1).to({rotation:167.3579,x:5.3034,y:25.0898},0).wait(1).to({rotation:167.9599,x:5.0301,y:25.1383},0).wait(1).to({rotation:168.5619,x:4.7562,y:25.1839},0).wait(1).to({rotation:169.1639,x:4.4819,y:25.2267},0).wait(1).to({rotation:169.7659,x:4.2072,y:25.2665},0).wait(1).to({rotation:170.3679,x:3.9321,y:25.3035},0).wait(1).to({rotation:170.9699,x:3.6566,y:25.3376},0).wait(1).to({rotation:171.5719,x:3.3807,y:25.3688},0).wait(1).to({rotation:172.1739,x:3.1046,y:25.3971},0).wait(1).to({rotation:172.7759,x:2.8281,y:25.4225},0).wait(1).to({rotation:173.3779,x:2.5514,y:25.445},0).wait(1).to({rotation:173.9799,x:2.2745,y:25.4645},0).wait(1).to({rotation:174.5819,x:1.9974,y:25.4812},0).wait(1).to({rotation:175.1839,x:1.7202,y:25.4949},0).wait(1).to({rotation:175.786,x:1.4428,y:25.5058},0).wait(1).to({rotation:176.388,x:1.1653,y:25.5137},0).wait(1).to({rotation:176.99,x:0.8877,y:25.5187},0).wait(1).to({rotation:177.592,x:0.6101,y:25.5208},0).wait(1).to({rotation:178.194,x:0.3325,y:25.52},0).wait(1).to({rotation:178.796,x:0.055,y:25.5162},0).wait(1).to({rotation:179.398,x:-0.2226,y:25.5096},0).wait(1).to({rotation:180,x:-0.5,y:25.5},0).wait(1).to({rotation:180.602,x:-0.7773,y:25.4875},0).wait(1).to({rotation:181.204,x:-1.0545,y:25.4721},0).wait(1).to({rotation:181.806,x:-1.3315,y:25.4538},0).wait(1).to({rotation:182.408,x:-1.6083,y:25.4326},0).wait(1).to({rotation:183.01,x:-1.8848,y:25.4084},0).wait(1).to({rotation:183.612,x:-2.1611,y:25.3814},0).wait(1).to({rotation:184.214,x:-2.4371,y:25.3515},0).wait(1).to({rotation:184.8161,x:-2.7128,y:25.3186},0).wait(1).to({rotation:185.4181,x:-2.9881,y:25.2829},0).wait(1).to({rotation:186.0201,x:-3.263,y:25.2443},0).wait(1).to({rotation:186.6221,x:-3.5374,y:25.2028},0).wait(1).to({rotation:187.2241,x:-3.8115,y:25.1584},0).wait(1).to({rotation:187.8261,x:-4.085,y:25.1111},0).wait(1).to({rotation:188.4281,x:-4.3581,y:25.061},0).wait(1).to({rotation:189.0301,x:-4.6306,y:25.008},0).wait(1).to({rotation:189.6321,x:-4.9025,y:24.9521},0).wait(1).to({rotation:190.2341,x:-5.1738,y:24.8934},0).wait(1).to({rotation:190.8361,x:-5.4445,y:24.8319},0).wait(1).to({rotation:191.4381,x:-5.7145,y:24.7675},0).wait(1).to({rotation:192.0401,x:-5.9839,y:24.7002},0).wait(1).to({rotation:192.6421,x:-6.2525,y:24.6302},0).wait(1).to({rotation:193.2441,x:-6.5203,y:24.5573},0).wait(1).to({rotation:193.8462,x:-6.7874,y:24.4816},0).wait(1).to({rotation:194.4482,x:-7.0537,y:24.4031},0).wait(1).to({rotation:195.0502,x:-7.3191,y:24.3218},0).wait(1).to({rotation:195.6522,x:-7.5837,y:24.2377},0).wait(1).to({rotation:196.2542,x:-7.8474,y:24.1509},0).wait(1).to({rotation:196.8562,x:-8.1101,y:24.0613},0).wait(1).to({rotation:197.4582,x:-8.3719,y:23.9689},0).wait(1).to({rotation:198.0602,x:-8.6327,y:23.8738},0).wait(1).to({rotation:198.6622,x:-8.8925,y:23.7759},0).wait(1).to({rotation:199.2642,x:-9.1512,y:23.6754},0).wait(1).to({rotation:199.8662,x:-9.4089,y:23.5721},0).wait(1).to({rotation:200.4682,x:-9.6655,y:23.4661},0).wait(1).to({rotation:201.0702,x:-9.9209,y:23.3574},0).wait(1).to({rotation:201.6722,x:-10.1752,y:23.2461},0).wait(1).to({rotation:202.2742,x:-10.4283,y:23.132},0).wait(1).to({rotation:202.8763,x:-10.6802,y:23.0154},0).wait(1).to({rotation:203.4783,x:-10.9309,y:22.8961},0).wait(1).to({rotation:204.0803,x:-11.1802,y:22.7741},0).wait(1).to({rotation:204.6823,x:-11.4283,y:22.6496},0).wait(1).to({rotation:205.2843,x:-11.6751,y:22.5224},0).wait(1).to({rotation:205.8863,x:-11.9205,y:22.3927},0).wait(1).to({rotation:206.4883,x:-12.1646,y:22.2604},0).wait(1).to({rotation:207.0903,x:-12.4072,y:22.1255},0).wait(1).to({rotation:207.6923,x:-12.6484,y:21.9881},0).wait(1).to({rotation:208.2943,x:-12.8882,y:21.8481},0).wait(1).to({rotation:208.8963,x:-13.1264,y:21.7057},0).wait(1).to({rotation:209.4983,x:-13.3632,y:21.5608},0).wait(1).to({rotation:210.1003,x:-13.5984,y:21.4133},0).wait(1).to({rotation:210.7023,x:-13.8321,y:21.2634},0).wait(1).to({rotation:211.3043,x:-14.0642,y:21.1111},0).wait(1).to({rotation:211.9064,x:-14.2946,y:20.9563},0).wait(1).to({rotation:212.5084,x:-14.5234,y:20.7992},0).wait(1).to({rotation:213.1104,x:-14.7506,y:20.6396},0).wait(1).to({rotation:213.7124,x:-14.9761,y:20.4776},0).wait(1).to({rotation:214.3144,x:-15.1998,y:20.3133},0).wait(1).to({rotation:214.9164,x:-15.4218,y:20.1467},0).wait(1).to({rotation:215.5184,x:-15.6421,y:19.9777},0).wait(1).to({rotation:216.1204,x:-15.8605,y:19.8064},0).wait(1).to({rotation:216.7224,x:-16.0772,y:19.6329},0).wait(1).to({rotation:217.3244,x:-16.292,y:19.457},0).wait(1).to({rotation:217.9264,x:-16.505,y:19.279},0).wait(1).to({rotation:218.5284,x:-16.716,y:19.0987},0).wait(1).to({rotation:219.1304,x:-16.9252,y:18.9161},0).wait(1).to({rotation:219.7324,x:-17.1325,y:18.7314},0).wait(1).to({rotation:220.3344,x:-17.3377,y:18.5446},0).wait(1).to({rotation:220.9365,x:-17.5411,y:18.3555},0).wait(1).to({rotation:221.5385,x:-17.7424,y:18.1644},0).wait(1).to({rotation:222.1405,x:-17.9417,y:17.9712},0).wait(1).to({rotation:222.7425,x:-18.1389,y:17.7758},0).wait(1).to({rotation:223.3445,x:-18.3341,y:17.5784},0).wait(1).to({rotation:223.9465,x:-18.5272,y:17.379},0).wait(1).to({rotation:224.5485,x:-18.7182,y:17.1776},0).wait(1).to({rotation:225.1505,x:-18.9071,y:16.9741},0).wait(1).to({rotation:225.7525,x:-19.0938,y:16.7687},0).wait(1).to({rotation:226.3545,x:-19.2784,y:16.5613},0).wait(1).to({rotation:226.9565,x:-19.4608,y:16.352},0).wait(1).to({rotation:227.5585,x:-19.6409,y:16.1408},0).wait(1).to({rotation:228.1605,x:-19.8188,y:15.9277},0).wait(1).to({rotation:228.7625,x:-19.9945,y:15.7128},0).wait(1).to({rotation:229.3645,x:-20.1679,y:15.496},0).wait(1).to({rotation:229.9666,x:-20.3391,y:15.2774},0).wait(1).to({rotation:230.5686,x:-20.5079,y:15.0571},0).wait(1).to({rotation:231.1706,x:-20.6744,y:14.8349},0).wait(1).to({rotation:231.7726,x:-20.8385,y:14.6111},0).wait(1).to({rotation:232.3746,x:-21.0003,y:14.3855},0).wait(1).to({rotation:232.9766,x:-21.1597,y:14.1582},0).wait(1).to({rotation:233.5786,x:-21.3167,y:13.9293},0).wait(1).to({rotation:234.1806,x:-21.4713,y:13.6987},0).wait(1).to({rotation:234.7826,x:-21.6235,y:13.4665},0).wait(1).to({rotation:235.3846,x:-21.7732,y:13.2328},0).wait(1).to({rotation:235.9866,x:-21.9205,y:12.9975},0).wait(1).to({rotation:236.5886,x:-22.0653,y:12.7606},0).wait(1).to({rotation:237.1906,x:-22.2076,y:12.5222},0).wait(1).to({rotation:237.7926,x:-22.3473,y:12.2824},0).wait(1).to({rotation:238.3946,x:-22.4846,y:12.0411},0).wait(1).to({rotation:238.9967,x:-22.6193,y:11.7983},0).wait(1).to({rotation:239.5987,x:-22.7514,y:11.5542},0).wait(1).to({rotation:240.2007,x:-22.881,y:11.3087},0).wait(1).to({rotation:240.8027,x:-23.008,y:11.0618},0).wait(1).to({rotation:241.4047,x:-23.1323,y:10.8136},0).wait(1).to({rotation:242.0067,x:-23.2541,y:10.5642},0).wait(1).to({rotation:242.6087,x:-23.3732,y:10.3134},0).wait(1).to({rotation:243.2107,x:-23.4897,y:10.0615},0).wait(1).to({rotation:243.8127,x:-23.6036,y:9.8083},0).wait(1).to({rotation:244.4147,x:-23.7148,y:9.5539},0).wait(1).to({rotation:245.0167,x:-23.8233,y:9.2984},0).wait(1).to({rotation:245.6187,x:-23.9291,y:9.0417},0).wait(1).to({rotation:246.2207,x:-24.0322,y:8.784},0).wait(1).to({rotation:246.8227,x:-24.1326,y:8.5252},0).wait(1).to({rotation:247.4247,x:-24.2302,y:8.2653},0).wait(1).to({rotation:248.0268,x:-24.3252,y:8.0045},0).wait(1).to({rotation:248.6288,x:-24.4173,y:7.7426},0).wait(1).to({rotation:249.2308,x:-24.5068,y:7.4798},0).wait(1).to({rotation:249.8328,x:-24.5934,y:7.2161},0).wait(1).to({rotation:250.4348,x:-24.6773,y:6.9514},0).wait(1).to({rotation:251.0368,x:-24.7584,y:6.686},0).wait(1).to({rotation:251.6388,x:-24.8367,y:6.4196},0).wait(1).to({rotation:252.2408,x:-24.9122,y:6.1525},0).wait(1).to({rotation:252.8428,x:-24.9849,y:5.8846},0).wait(1).to({rotation:253.4448,x:-25.0548,y:5.6159},0).wait(1).to({rotation:254.0468,x:-25.1218,y:5.3465},0).wait(1).to({rotation:254.6488,x:-25.1861,y:5.0765},0).wait(1).to({rotation:255.2508,x:-25.2474,y:4.8057},0).wait(1).to({rotation:255.8528,x:-25.306,y:4.5344},0).wait(1).to({rotation:256.4548,x:-25.3616,y:4.2624},0).wait(1).to({rotation:257.0569,x:-25.4144,y:3.9899},0).wait(1).to({rotation:257.6589,x:-25.4644,y:3.7168},0).wait(1).to({rotation:258.2609,x:-25.5114,y:3.4432},0).wait(1).to({rotation:258.8629,x:-25.5556,y:3.1691},0).wait(1).to({rotation:259.4649,x:-25.597,y:2.8946},0).wait(1).to({rotation:260.0669,x:-25.6354,y:2.6197},0).wait(1).to({rotation:260.6689,x:-25.6709,y:2.3444},0).wait(1).to({rotation:261.2709,x:-25.7036,y:2.0687},0).wait(1).to({rotation:261.8729,x:-25.7333,y:1.7927},0).wait(1).to({rotation:262.4749,x:-25.7601,y:1.5164},0).wait(1).to({rotation:263.0769,x:-25.7841,y:1.2398},0).wait(1).to({rotation:263.6789,x:-25.8051,y:0.963},0).wait(1).to({rotation:264.2809,x:-25.8232,y:0.686},0).wait(1).to({rotation:264.8829,x:-25.8384,y:0.4088},0).wait(1).to({rotation:265.4849,x:-25.8507,y:0.1315},0).wait(1).to({rotation:266.087,x:-25.8601,y:-0.146},0).wait(1).to({rotation:266.689,x:-25.8666,y:-0.4235},0).wait(1).to({rotation:267.291,x:-25.8701,y:-0.7011},0).wait(1).to({rotation:267.893,x:-25.8708,y:-0.9787},0).wait(1).to({rotation:268.495,x:-25.8685,y:-1.2563},0).wait(1).to({rotation:269.097,x:-25.8633,y:-1.5338},0).wait(1).to({rotation:269.699,x:-25.8552,y:-1.8113},0).wait(1).to({rotation:270.301,x:-25.8441,y:-2.0887},0).wait(1).to({rotation:270.903,x:-25.8302,y:-2.3659},0).wait(1).to({rotation:271.505,x:-25.8133,y:-2.643},0).wait(1).to({rotation:272.107,x:-25.7935,y:-2.9199},0).wait(1).to({rotation:272.709,x:-25.7709,y:-3.1966},0).wait(1).to({rotation:273.311,x:-25.7453,y:-3.473},0).wait(1).to({rotation:273.913,x:-25.7168,y:-3.7492},0).wait(1).to({rotation:274.5151,x:-25.6854,y:-4.025},0).wait(1).to({rotation:275.1171,x:-25.6511,y:-4.3005},0).wait(1).to({rotation:275.7191,x:-25.614,y:-4.5756},0).wait(1).to({rotation:276.3211,x:-25.5739,y:-4.8503},0).wait(1).to({rotation:276.9231,x:-25.531,y:-5.1245},0).wait(1).to({rotation:277.5251,x:-25.4851,y:-5.3983},0).wait(1).to({rotation:278.1271,x:-25.4364,y:-5.6716},0).wait(1).to({rotation:278.7291,x:-25.3849,y:-5.9444},0).wait(1).to({rotation:279.3311,x:-25.3304,y:-6.2166},0).wait(1).to({rotation:279.9331,x:-25.2731,y:-6.4882},0).wait(1).to({rotation:280.5351,x:-25.213,y:-6.7592},0).wait(1).to({rotation:281.1371,x:-25.15,y:-7.0296},0).wait(1).to({rotation:281.7391,x:-25.0842,y:-7.2993},0).wait(1).to({rotation:282.3411,x:-25.0155,y:-7.5683},0).wait(1).to({rotation:282.9431,x:-24.9441,y:-7.8365},0).wait(1).to({rotation:283.5452,x:-24.8698,y:-8.104},0).wait(1).to({rotation:284.1472,x:-24.7927,y:-8.3707},0).wait(1).to({rotation:284.7492,x:-24.7128,y:-8.6365},0).wait(1).to({rotation:285.3512,x:-24.6301,y:-8.9015},0).wait(1).to({rotation:285.9532,x:-24.5447,y:-9.1656},0).wait(1).to({rotation:286.5552,x:-24.4564,y:-9.4289},0).wait(1).to({rotation:287.1572,x:-24.3654,y:-9.6911},0).wait(1).to({rotation:287.7592,x:-24.2717,y:-9.9524},0).wait(1).to({rotation:288.3612,x:-24.1752,y:-10.2127},0).wait(1).to({rotation:288.9632,x:-24.076,y:-10.472},0).wait(1).to({rotation:289.5652,x:-23.9741,y:-10.7302},0).wait(1).to({rotation:290.1672,x:-23.8694,y:-10.9873},0).wait(1).to({rotation:290.7692,x:-23.7621,y:-11.2433},0).wait(1).to({rotation:291.3712,x:-23.6521,y:-11.4982},0).wait(1).to({rotation:291.9732,x:-23.5394,y:-11.7519},0).wait(1).to({rotation:292.5753,x:-23.424,y:-12.0044},0).wait(1).to({rotation:293.1773,x:-23.306,y:-12.2557},0).wait(1).to({rotation:293.7793,x:-23.1854,y:-12.5057},0).wait(1).to({rotation:294.3813,x:-23.0622,y:-12.7545},0).wait(1).to({rotation:294.9833,x:-22.9363,y:-13.0019},0).wait(1).to({rotation:295.5853,x:-22.8079,y:-13.248},0).wait(1).to({rotation:296.1873,x:-22.6768,y:-13.4927},0).wait(1).to({rotation:296.7893,x:-22.5432,y:-13.7361},0).wait(1).to({rotation:297.3913,x:-22.4071,y:-13.978},0).wait(1).to({rotation:297.9933,x:-22.2684,y:-14.2185},0).wait(1).to({rotation:298.5953,x:-22.1272,y:-14.4575},0).wait(1).to({rotation:299.1973,x:-21.9835,y:-14.695},0).wait(1).to({rotation:299.7993,x:-21.8373,y:-14.931},0).wait(1).to({rotation:300.4013,x:-21.6887,y:-15.1654},0).wait(1).to({rotation:301.0033,x:-21.5376,y:-15.3983},0).wait(1).to({rotation:301.6054,x:-21.384,y:-15.6296},0).wait(1).to({rotation:302.2074,x:-21.2281,y:-15.8592},0).wait(1).to({rotation:302.8094,x:-21.0697,y:-16.0872},0).wait(1).to({rotation:303.4114,x:-20.9089,y:-16.3135},0).wait(1).to({rotation:304.0134,x:-20.7458,y:-16.5382},0).wait(1).to({rotation:304.6154,x:-20.5803,y:-16.761},0).wait(1).to({rotation:305.2174,x:-20.4125,y:-16.9822},0).wait(1).to({rotation:305.8194,x:-20.2424,y:-17.2015},0).wait(1).to({rotation:306.4214,x:-20.0699,y:-17.4191},0).wait(1).to({rotation:307.0234,x:-19.8952,y:-17.6348},0).wait(1).to({rotation:307.6254,x:-19.7183,y:-17.8487},0).wait(1).to({rotation:308.2274,x:-19.5391,y:-18.0607},0).wait(1).to({rotation:308.8294,x:-19.3577,y:-18.2709},0).wait(1).to({rotation:309.4314,x:-19.1741,y:-18.4791},0).wait(1).to({rotation:310.0334,x:-18.9883,y:-18.6853},0).wait(1).to({rotation:310.6355,x:-18.8003,y:-18.8897},0).wait(1).to({rotation:311.2375,x:-18.6102,y:-19.092},0).wait(1).to({rotation:311.8395,x:-18.418,y:-19.2923},0).wait(1).to({rotation:312.4415,x:-18.2238,y:-19.4906},0).wait(1).to({rotation:313.0435,x:-18.0274,y:-19.6868},0).wait(1).to({rotation:313.6455,x:-17.829,y:-19.8809},0).wait(1).to({rotation:314.2475,x:-17.6285,y:-20.073},0).wait(1).to({rotation:314.8495,x:-17.4261,y:-20.2629},0).wait(1).to({rotation:315.4515,x:-17.2216,y:-20.4507},0).wait(1).to({rotation:316.0535,x:-17.0152,y:-20.6364},0).wait(1).to({rotation:316.6555,x:-16.8069,y:-20.8198},0).wait(1).to({rotation:317.2575,x:-16.5967,y:-21.0011},0).wait(1).to({rotation:317.8595,x:-16.3845,y:-21.1802},0).wait(1).to({rotation:318.4615,x:-16.1705,y:-21.357},0).wait(1).to({rotation:319.0635,x:-15.9546,y:-21.5315},0).wait(1).to({rotation:319.6656,x:-15.737,y:-21.7038},0).wait(1).to({rotation:320.2676,x:-15.5175,y:-21.8738},0).wait(1).to({rotation:320.8696,x:-15.2962,y:-22.0414},0).wait(1).to({rotation:321.4716,x:-15.0732,y:-22.2067},0).wait(1).to({rotation:322.0736,x:-14.8485,y:-22.3697},0).wait(1).to({rotation:322.6756,x:-14.6221,y:-22.5303},0).wait(1).to({rotation:323.2776,x:-14.394,y:-22.6885},0).wait(1).to({rotation:323.8796,x:-14.1642,y:-22.8444},0).wait(1).to({rotation:324.4816,x:-13.9328,y:-22.9977},0).wait(1).to({rotation:325.0836,x:-13.6999,y:-23.1487},0).wait(1).to({rotation:325.6856,x:-13.4653,y:-23.2972},0).wait(1).to({rotation:326.2876,x:-13.2292,y:-23.4432},0).wait(1).to({rotation:326.8896,x:-12.9916,y:-23.5867},0).wait(1).to({rotation:327.4916,x:-12.7525,y:-23.7278},0).wait(1).to({rotation:328.0936,x:-12.5119,y:-23.8663},0).wait(1).to({rotation:328.6957,x:-12.2699,y:-24.0022},0).wait(1).to({rotation:329.2977,x:-12.0264,y:-24.1357},0).wait(1).to({rotation:329.8997,x:-11.7816,y:-24.2665},0).wait(1).to({rotation:330.5017,x:-11.5354,y:-24.3948},0).wait(1).to({rotation:331.1037,x:-11.2879,y:-24.5205},0).wait(1).to({rotation:331.7057,x:-11.0391,y:-24.6435},0).wait(1).to({rotation:332.3077,x:-10.789,y:-24.764},0).wait(1).to({rotation:332.9097,x:-10.5376,y:-24.8818},0).wait(1).to({rotation:333.5117,x:-10.285,y:-24.997},0).wait(1).to({rotation:334.1137,x:-10.0312,y:-25.1095},0).wait(1).to({rotation:334.7157,x:-9.7763,y:-25.2193},0).wait(1).to({rotation:335.3177,x:-9.5202,y:-25.3265},0).wait(1).to({rotation:335.9197,x:-9.263,y:-25.431},0).wait(1).to({rotation:336.5217,x:-9.0047,y:-25.5327},0).wait(1).to({rotation:337.1237,x:-8.7454,y:-25.6317},0).wait(1).to({rotation:337.7258,x:-8.485,y:-25.728},0).wait(1).to({rotation:338.3278,x:-8.2237,y:-25.8216},0).wait(1).to({rotation:338.9298,x:-7.9613,y:-25.9124},0).wait(1).to({rotation:339.5318,x:-7.6981,y:-26.0004},0).wait(1).to({rotation:340.1338,x:-7.4339,y:-26.0857},0).wait(1).to({rotation:340.7358,x:-7.1688,y:-26.1682},0).wait(1).to({rotation:341.3378,x:-6.9029,y:-26.2479},0).wait(1).to({rotation:341.9398,x:-6.6362,y:-26.3248},0).wait(1).to({rotation:342.5418,x:-6.3686,y:-26.3989},0).wait(1).to({rotation:343.1438,x:-6.1003,y:-26.4702},0).wait(1).to({rotation:343.7458,x:-5.8313,y:-26.5387},0).wait(1).to({rotation:344.3478,x:-5.5616,y:-26.6043},0).wait(1).to({rotation:344.9498,x:-5.2912,y:-26.6671},0).wait(1).to({rotation:345.5518,x:-5.0201,y:-26.727},0).wait(1).to({rotation:346.1538,x:-4.7484,y:-26.7841},0).wait(1).to({rotation:346.7559,x:-4.4762,y:-26.8384},0).wait(1).to({rotation:347.3579,x:-4.2034,y:-26.8898},0).wait(1).to({rotation:347.9599,x:-3.9301,y:-26.9383},0).wait(1).to({rotation:348.5619,x:-3.6562,y:-26.9839},0).wait(1).to({rotation:349.1639,x:-3.3819,y:-27.0267},0).wait(1).to({rotation:349.7659,x:-3.1072,y:-27.0665},0).wait(1).to({rotation:350.3679,x:-2.8321,y:-27.1035},0).wait(1).to({rotation:350.9699,x:-2.5566,y:-27.1376},0).wait(1).to({rotation:351.5719,x:-2.2807,y:-27.1688},0).wait(1).to({rotation:352.1739,x:-2.0046,y:-27.1971},0).wait(1).to({rotation:352.7759,x:-1.7281,y:-27.2225},0).wait(1).to({rotation:353.3779,x:-1.4514,y:-27.245},0).wait(1).to({rotation:353.9799,x:-1.1745,y:-27.2645},0).wait(1).to({rotation:354.5819,x:-0.8974,y:-27.2812},0).wait(1).to({rotation:355.1839,x:-0.6202,y:-27.2949},0).wait(1).to({rotation:355.786,x:-0.3428,y:-27.3058},0).wait(1).to({rotation:356.388,x:-0.0653,y:-27.3137},0).wait(1).to({rotation:356.99,x:0.2123,y:-27.3187},0).wait(1).to({rotation:357.592,x:0.4899,y:-27.3208},0).wait(1).to({rotation:358.194,x:0.7675,y:-27.32},0).wait(1).to({rotation:358.796,x:1.045,y:-27.3162},0).wait(1).to({rotation:359.398,x:1.3226,y:-27.3096},0).wait(1).to({rotation:360,x:1.6,y:-27.3},0).wait(2));

	// body
	this.instance_1 = new lib.CachedBmp_45();
	this.instance_1.setTransform(-75.75,-75.75,0.4193,0.4193);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(600));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.7,-75.7,151.3,151.3);


(lib.child_broken = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hand
	this.instance = new lib.child_handBROKE("synched",0);
	this.instance.setTransform(200,240,1,1.0001,0,0.7265,1.1463,47.4,-13.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:47.7,regY:-13.1,scaleX:1.0044,scaleY:1.0125,skewX:-17.7457,skewY:-7.2507,x:200.25},9).to({regX:47.5,regY:-13.2,scaleY:1.0028,skewX:-0.3557,x:200.1,y:239.95},16).to({regX:47.4,regY:-13.4,scaleX:1,scaleY:1.0001,skewX:0.7265,skewY:1.1463,x:200,y:240},12).wait(1));

	// child
	this.instance_1 = new lib.full_body("synched",0);
	this.instance_1.setTransform(99.5,275.7,1,1,0,0,0,-7.1,113.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:-7,scaleY:1.0001,skewX:0.9249},11).to({regX:-7.1,scaleY:1,skewX:0},17).to({startPosition:0},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.8,-0.4,273.1,324.59999999999997);


(lib.child = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hand
	this.instance = new lib.child_hand("synched",0);
	this.instance.setTransform(200,240,1,1.0001,0,0.7265,1.1463,47.4,-13.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:47.7,regY:-13.1,scaleX:1.0044,scaleY:1.0125,skewX:-17.7457,skewY:-7.2507,x:200.25},9).to({regX:47.5,regY:-13.2,scaleY:1.0028,skewX:-0.3557,x:200.1,y:239.95},16).to({regX:47.4,regY:-13.4,scaleX:1,scaleY:1.0001,skewX:0.7265,skewY:1.1463,x:200,y:240},12).wait(1));

	// child
	this.instance_1 = new lib.full_body("synched",0);
	this.instance_1.setTransform(99.5,275.7,1,1,0,0,0,-7.1,113.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:-7,scaleY:1.0001,skewX:0.9249},11).to({regX:-7.1,scaleY:1,skewX:0},17).to({startPosition:0},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.8,-0.4,273.1,324.59999999999997);


(lib.sleeping_man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouth
	this.instance = new lib.mouth_S("synched",0);
	this.instance.setTransform(50.85,-73.35,1,1,0,0,0,-1.2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:0.2,scaleX:0.748,scaleY:0.748,x:46.65,y:-72.65},21).to({regY:0.3,scaleX:1,scaleY:1,x:50.85,y:-73.35},20).wait(1));

	// all_idn
	this.instance_1 = new lib.CachedBmp_32();
	this.instance_1.setTransform(-173.5,-158.85,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(42));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-158.8,339.6,311.6);


(lib.clock3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// red_center
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8542A").s().p("AhZgBQAAgiAZgdQAdgZAiAAQAlAAAZAZQAdAdAAAiQAAAlgdAdQgZAZglAAQhYAAAAhbg");
	this.shape.setTransform(1.275,1.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AAJAAQAAAEgDADQgCACgEAAQgIAAAAgJQAAgDACgDQADgCADAAQAEAAACACQADADAAADg");
	this.shape_1.setTransform(1.275,-2.775,9.7027,9.7027);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8542A").s().p("AgIAAQAAgDACgDQADgCADAAQAEAAACACQADADAAADQAAAEgDADQgCACgEAAQgIAAAAgJg");
	this.shape_2.setTransform(1.275,-2.775,9.7027,9.7027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},25).wait(575));

	// needle
	this.instance = new lib.clock_needle();
	this.instance.setTransform(0.5,-0.9,1,1,0,0,0,-1.1,26.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:0,rotation:0.602,x:1.8773,y:-27.2875},0).wait(1).to({rotation:1.204,x:2.1545,y:-27.2721},0).wait(1).to({rotation:1.806,x:2.4315,y:-27.2538},0).wait(1).to({rotation:2.408,x:2.7083,y:-27.2326},0).wait(1).to({rotation:3.01,x:2.9848,y:-27.2084},0).wait(1).to({rotation:3.612,x:3.2611,y:-27.1814},0).wait(1).to({rotation:4.214,x:3.5371,y:-27.1515},0).wait(1).to({rotation:4.8161,x:3.8128,y:-27.1186},0).wait(1).to({rotation:5.4181,x:4.0881,y:-27.0829},0).wait(1).to({rotation:6.0201,x:4.363,y:-27.0443},0).wait(1).to({rotation:6.6221,x:4.6374,y:-27.0028},0).wait(1).to({rotation:7.2241,x:4.9115,y:-26.9584},0).wait(1).to({rotation:7.8261,x:5.185,y:-26.9111},0).wait(1).to({rotation:8.4281,x:5.4581,y:-26.861},0).wait(1).to({rotation:9.0301,x:5.7306,y:-26.808},0).wait(1).to({rotation:9.6321,x:6.0025,y:-26.7521},0).wait(1).to({rotation:10.2341,x:6.2738,y:-26.6934},0).wait(1).to({rotation:10.8361,x:6.5445,y:-26.6319},0).wait(1).to({rotation:11.4381,x:6.8145,y:-26.5675},0).wait(1).to({rotation:12.0401,x:7.0839,y:-26.5002},0).wait(1).to({rotation:12.6421,x:7.3525,y:-26.4302},0).wait(1).to({rotation:13.2441,x:7.6203,y:-26.3573},0).wait(1).to({rotation:13.8462,x:7.8874,y:-26.2816},0).wait(1).to({rotation:14.4482,x:8.1537,y:-26.2031},0).wait(1).to({rotation:15.0502,x:8.4191,y:-26.1218},0).wait(1).to({rotation:15.6522,x:8.6837,y:-26.0377},0).wait(1).to({rotation:16.2542,x:8.9474,y:-25.9509},0).wait(1).to({rotation:16.8562,x:9.2101,y:-25.8613},0).wait(1).to({rotation:17.4582,x:9.4719,y:-25.7689},0).wait(1).to({rotation:18.0602,x:9.7327,y:-25.6738},0).wait(1).to({rotation:18.6622,x:9.9925,y:-25.5759},0).wait(1).to({rotation:19.2642,x:10.2512,y:-25.4754},0).wait(1).to({rotation:19.8662,x:10.5089,y:-25.3721},0).wait(1).to({rotation:20.4682,x:10.7655,y:-25.2661},0).wait(1).to({rotation:21.0702,x:11.0209,y:-25.1574},0).wait(1).to({rotation:21.6722,x:11.2752,y:-25.0461},0).wait(1).to({rotation:22.2742,x:11.5283,y:-24.932},0).wait(1).to({rotation:22.8763,x:11.7802,y:-24.8154},0).wait(1).to({rotation:23.4783,x:12.0309,y:-24.6961},0).wait(1).to({rotation:24.0803,x:12.2802,y:-24.5741},0).wait(1).to({rotation:24.6823,x:12.5283,y:-24.4496},0).wait(1).to({rotation:25.2843,x:12.7751,y:-24.3224},0).wait(1).to({rotation:25.8863,x:13.0205,y:-24.1927},0).wait(1).to({rotation:26.4883,x:13.2646,y:-24.0604},0).wait(1).to({rotation:27.0903,x:13.5072,y:-23.9255},0).wait(1).to({rotation:27.6923,x:13.7484,y:-23.7881},0).wait(1).to({rotation:28.2943,x:13.9882,y:-23.6481},0).wait(1).to({rotation:28.8963,x:14.2264,y:-23.5057},0).wait(1).to({rotation:29.4983,x:14.4632,y:-23.3608},0).wait(1).to({rotation:30.1003,x:14.6984,y:-23.2133},0).wait(1).to({rotation:30.7023,x:14.9321,y:-23.0634},0).wait(1).to({rotation:31.3043,x:15.1642,y:-22.9111},0).wait(1).to({rotation:31.9064,x:15.3946,y:-22.7563},0).wait(1).to({rotation:32.5084,x:15.6234,y:-22.5992},0).wait(1).to({rotation:33.1104,x:15.8506,y:-22.4396},0).wait(1).to({rotation:33.7124,x:16.0761,y:-22.2776},0).wait(1).to({rotation:34.3144,x:16.2998,y:-22.1133},0).wait(1).to({rotation:34.9164,x:16.5218,y:-21.9467},0).wait(1).to({rotation:35.5184,x:16.7421,y:-21.7777},0).wait(1).to({rotation:36.1204,x:16.9605,y:-21.6064},0).wait(1).to({rotation:36.7224,x:17.1772,y:-21.4329},0).wait(1).to({rotation:37.3244,x:17.392,y:-21.257},0).wait(1).to({rotation:37.9264,x:17.605,y:-21.079},0).wait(1).to({rotation:38.5284,x:17.816,y:-20.8987},0).wait(1).to({rotation:39.1304,x:18.0252,y:-20.7161},0).wait(1).to({rotation:39.7324,x:18.2325,y:-20.5314},0).wait(1).to({rotation:40.3344,x:18.4377,y:-20.3446},0).wait(1).to({rotation:40.9365,x:18.6411,y:-20.1555},0).wait(1).to({rotation:41.5385,x:18.8424,y:-19.9644},0).wait(1).to({rotation:42.1405,x:19.0417,y:-19.7712},0).wait(1).to({rotation:42.7425,x:19.2389,y:-19.5758},0).wait(1).to({rotation:43.3445,x:19.4341,y:-19.3784},0).wait(1).to({rotation:43.9465,x:19.6272,y:-19.179},0).wait(1).to({rotation:44.5485,x:19.8182,y:-18.9776},0).wait(1).to({rotation:45.1505,x:20.0071,y:-18.7741},0).wait(1).to({rotation:45.7525,x:20.1938,y:-18.5687},0).wait(1).to({rotation:46.3545,x:20.3784,y:-18.3613},0).wait(1).to({rotation:46.9565,x:20.5608,y:-18.152},0).wait(1).to({rotation:47.5585,x:20.7409,y:-17.9408},0).wait(1).to({rotation:48.1605,x:20.9188,y:-17.7277},0).wait(1).to({rotation:48.7625,x:21.0945,y:-17.5128},0).wait(1).to({rotation:49.3645,x:21.2679,y:-17.296},0).wait(1).to({rotation:49.9666,x:21.4391,y:-17.0774},0).wait(1).to({rotation:50.5686,x:21.6079,y:-16.8571},0).wait(1).to({rotation:51.1706,x:21.7744,y:-16.6349},0).wait(1).to({rotation:51.7726,x:21.9385,y:-16.4111},0).wait(1).to({rotation:52.3746,x:22.1003,y:-16.1855},0).wait(1).to({rotation:52.9766,x:22.2597,y:-15.9582},0).wait(1).to({rotation:53.5786,x:22.4167,y:-15.7293},0).wait(1).to({rotation:54.1806,x:22.5713,y:-15.4987},0).wait(1).to({rotation:54.7826,x:22.7235,y:-15.2665},0).wait(1).to({rotation:55.3846,x:22.8732,y:-15.0328},0).wait(1).to({rotation:55.9866,x:23.0205,y:-14.7975},0).wait(1).to({rotation:56.5886,x:23.1653,y:-14.5606},0).wait(1).to({rotation:57.1906,x:23.3076,y:-14.3222},0).wait(1).to({rotation:57.7926,x:23.4473,y:-14.0824},0).wait(1).to({rotation:58.3946,x:23.5846,y:-13.8411},0).wait(1).to({rotation:58.9967,x:23.7193,y:-13.5983},0).wait(1).to({rotation:59.5987,x:23.8514,y:-13.3542},0).wait(1).to({rotation:60.2007,x:23.981,y:-13.1087},0).wait(1).to({rotation:60.8027,x:24.108,y:-12.8618},0).wait(1).to({rotation:61.4047,x:24.2323,y:-12.6136},0).wait(1).to({rotation:62.0067,x:24.3541,y:-12.3642},0).wait(1).to({rotation:62.6087,x:24.4732,y:-12.1134},0).wait(1).to({rotation:63.2107,x:24.5897,y:-11.8615},0).wait(1).to({rotation:63.8127,x:24.7036,y:-11.6083},0).wait(1).to({rotation:64.4147,x:24.8148,y:-11.3539},0).wait(1).to({rotation:65.0167,x:24.9233,y:-11.0984},0).wait(1).to({rotation:65.6187,x:25.0291,y:-10.8417},0).wait(1).to({rotation:66.2207,x:25.1322,y:-10.584},0).wait(1).to({rotation:66.8227,x:25.2326,y:-10.3252},0).wait(1).to({rotation:67.4247,x:25.3302,y:-10.0653},0).wait(1).to({rotation:68.0268,x:25.4252,y:-9.8045},0).wait(1).to({rotation:68.6288,x:25.5173,y:-9.5426},0).wait(1).to({rotation:69.2308,x:25.6068,y:-9.2798},0).wait(1).to({rotation:69.8328,x:25.6934,y:-9.0161},0).wait(1).to({rotation:70.4348,x:25.7773,y:-8.7514},0).wait(1).to({rotation:71.0368,x:25.8584,y:-8.486},0).wait(1).to({rotation:71.6388,x:25.9367,y:-8.2196},0).wait(1).to({rotation:72.2408,x:26.0122,y:-7.9525},0).wait(1).to({rotation:72.8428,x:26.0849,y:-7.6846},0).wait(1).to({rotation:73.4448,x:26.1548,y:-7.4159},0).wait(1).to({rotation:74.0468,x:26.2218,y:-7.1465},0).wait(1).to({rotation:74.6488,x:26.2861,y:-6.8765},0).wait(1).to({rotation:75.2508,x:26.3474,y:-6.6057},0).wait(1).to({rotation:75.8528,x:26.406,y:-6.3344},0).wait(1).to({rotation:76.4548,x:26.4616,y:-6.0624},0).wait(1).to({rotation:77.0569,x:26.5144,y:-5.7899},0).wait(1).to({rotation:77.6589,x:26.5644,y:-5.5168},0).wait(1).to({rotation:78.2609,x:26.6114,y:-5.2432},0).wait(1).to({rotation:78.8629,x:26.6556,y:-4.9691},0).wait(1).to({rotation:79.4649,x:26.697,y:-4.6946},0).wait(1).to({rotation:80.0669,x:26.7354,y:-4.4197},0).wait(1).to({rotation:80.6689,x:26.7709,y:-4.1444},0).wait(1).to({rotation:81.2709,x:26.8036,y:-3.8687},0).wait(1).to({rotation:81.8729,x:26.8333,y:-3.5927},0).wait(1).to({rotation:82.4749,x:26.8601,y:-3.3164},0).wait(1).to({rotation:83.0769,x:26.8841,y:-3.0398},0).wait(1).to({rotation:83.6789,x:26.9051,y:-2.763},0).wait(1).to({rotation:84.2809,x:26.9232,y:-2.486},0).wait(1).to({rotation:84.8829,x:26.9384,y:-2.2088},0).wait(1).to({rotation:85.4849,x:26.9507,y:-1.9315},0).wait(1).to({rotation:86.087,x:26.9601,y:-1.654},0).wait(1).to({rotation:86.689,x:26.9666,y:-1.3765},0).wait(1).to({rotation:87.291,x:26.9701,y:-1.0989},0).wait(1).to({rotation:87.893,x:26.9708,y:-0.8213},0).wait(1).to({rotation:88.495,x:26.9685,y:-0.5437},0).wait(1).to({rotation:89.097,x:26.9633,y:-0.2662},0).wait(1).to({rotation:89.699,x:26.9552,y:0.0113},0).wait(1).to({rotation:90.301,x:26.9441,y:0.2887},0).wait(1).to({rotation:90.903,x:26.9302,y:0.5659},0).wait(1).to({rotation:91.505,x:26.9133,y:0.843},0).wait(1).to({rotation:92.107,x:26.8935,y:1.1199},0).wait(1).to({rotation:92.709,x:26.8709,y:1.3966},0).wait(1).to({rotation:93.311,x:26.8453,y:1.673},0).wait(1).to({rotation:93.913,x:26.8168,y:1.9492},0).wait(1).to({rotation:94.5151,x:26.7854,y:2.225},0).wait(1).to({rotation:95.1171,x:26.7511,y:2.5005},0).wait(1).to({rotation:95.7191,x:26.714,y:2.7756},0).wait(1).to({rotation:96.3211,x:26.6739,y:3.0503},0).wait(1).to({rotation:96.9231,x:26.631,y:3.3245},0).wait(1).to({rotation:97.5251,x:26.5851,y:3.5983},0).wait(1).to({rotation:98.1271,x:26.5364,y:3.8716},0).wait(1).to({rotation:98.7291,x:26.4849,y:4.1444},0).wait(1).to({rotation:99.3311,x:26.4304,y:4.4166},0).wait(1).to({rotation:99.9331,x:26.3731,y:4.6882},0).wait(1).to({rotation:100.5351,x:26.313,y:4.9592},0).wait(1).to({rotation:101.1371,x:26.25,y:5.2296},0).wait(1).to({rotation:101.7391,x:26.1842,y:5.4993},0).wait(1).to({rotation:102.3411,x:26.1155,y:5.7683},0).wait(1).to({rotation:102.9431,x:26.0441,y:6.0365},0).wait(1).to({rotation:103.5452,x:25.9698,y:6.304},0).wait(1).to({rotation:104.1472,x:25.8927,y:6.5707},0).wait(1).to({rotation:104.7492,x:25.8128,y:6.8365},0).wait(1).to({rotation:105.3512,x:25.7301,y:7.1015},0).wait(1).to({rotation:105.9532,x:25.6447,y:7.3656},0).wait(1).to({rotation:106.5552,x:25.5564,y:7.6289},0).wait(1).to({rotation:107.1572,x:25.4654,y:7.8911},0).wait(1).to({rotation:107.7592,x:25.3717,y:8.1524},0).wait(1).to({rotation:108.3612,x:25.2752,y:8.4127},0).wait(1).to({rotation:108.9632,x:25.176,y:8.672},0).wait(1).to({rotation:109.5652,x:25.0741,y:8.9302},0).wait(1).to({rotation:110.1672,x:24.9694,y:9.1873},0).wait(1).to({rotation:110.7692,x:24.8621,y:9.4433},0).wait(1).to({rotation:111.3712,x:24.7521,y:9.6982},0).wait(1).to({rotation:111.9732,x:24.6394,y:9.9519},0).wait(1).to({rotation:112.5753,x:24.524,y:10.2044},0).wait(1).to({rotation:113.1773,x:24.406,y:10.4557},0).wait(1).to({rotation:113.7793,x:24.2854,y:10.7057},0).wait(1).to({rotation:114.3813,x:24.1622,y:10.9545},0).wait(1).to({rotation:114.9833,x:24.0363,y:11.2019},0).wait(1).to({rotation:115.5853,x:23.9079,y:11.448},0).wait(1).to({rotation:116.1873,x:23.7768,y:11.6927},0).wait(1).to({rotation:116.7893,x:23.6432,y:11.9361},0).wait(1).to({rotation:117.3913,x:23.5071,y:12.178},0).wait(1).to({rotation:117.9933,x:23.3684,y:12.4185},0).wait(1).to({rotation:118.5953,x:23.2272,y:12.6575},0).wait(1).to({rotation:119.1973,x:23.0835,y:12.895},0).wait(1).to({rotation:119.7993,x:22.9373,y:13.131},0).wait(1).to({rotation:120.4013,x:22.7887,y:13.3654},0).wait(1).to({rotation:121.0033,x:22.6376,y:13.5983},0).wait(1).to({rotation:121.6054,x:22.484,y:13.8296},0).wait(1).to({rotation:122.2074,x:22.3281,y:14.0592},0).wait(1).to({rotation:122.8094,x:22.1697,y:14.2872},0).wait(1).to({rotation:123.4114,x:22.0089,y:14.5135},0).wait(1).to({rotation:124.0134,x:21.8458,y:14.7382},0).wait(1).to({rotation:124.6154,x:21.6803,y:14.961},0).wait(1).to({rotation:125.2174,x:21.5125,y:15.1822},0).wait(1).to({rotation:125.8194,x:21.3424,y:15.4015},0).wait(1).to({rotation:126.4214,x:21.1699,y:15.6191},0).wait(1).to({rotation:127.0234,x:20.9952,y:15.8348},0).wait(1).to({rotation:127.6254,x:20.8183,y:16.0487},0).wait(1).to({rotation:128.2274,x:20.6391,y:16.2607},0).wait(1).to({rotation:128.8294,x:20.4577,y:16.4709},0).wait(1).to({rotation:129.4314,x:20.2741,y:16.6791},0).wait(1).to({rotation:130.0334,x:20.0883,y:16.8853},0).wait(1).to({rotation:130.6355,x:19.9003,y:17.0897},0).wait(1).to({rotation:131.2375,x:19.7102,y:17.292},0).wait(1).to({rotation:131.8395,x:19.518,y:17.4923},0).wait(1).to({rotation:132.4415,x:19.3238,y:17.6906},0).wait(1).to({rotation:133.0435,x:19.1274,y:17.8868},0).wait(1).to({rotation:133.6455,x:18.929,y:18.0809},0).wait(1).to({rotation:134.2475,x:18.7285,y:18.273},0).wait(1).to({rotation:134.8495,x:18.5261,y:18.4629},0).wait(1).to({rotation:135.4515,x:18.3216,y:18.6507},0).wait(1).to({rotation:136.0535,x:18.1152,y:18.8364},0).wait(1).to({rotation:136.6555,x:17.9069,y:19.0198},0).wait(1).to({rotation:137.2575,x:17.6967,y:19.2011},0).wait(1).to({rotation:137.8595,x:17.4845,y:19.3802},0).wait(1).to({rotation:138.4615,x:17.2705,y:19.557},0).wait(1).to({rotation:139.0635,x:17.0546,y:19.7315},0).wait(1).to({rotation:139.6656,x:16.837,y:19.9038},0).wait(1).to({rotation:140.2676,x:16.6175,y:20.0738},0).wait(1).to({rotation:140.8696,x:16.3962,y:20.2414},0).wait(1).to({rotation:141.4716,x:16.1732,y:20.4067},0).wait(1).to({rotation:142.0736,x:15.9485,y:20.5697},0).wait(1).to({rotation:142.6756,x:15.7221,y:20.7303},0).wait(1).to({rotation:143.2776,x:15.494,y:20.8885},0).wait(1).to({rotation:143.8796,x:15.2642,y:21.0444},0).wait(1).to({rotation:144.4816,x:15.0328,y:21.1977},0).wait(1).to({rotation:145.0836,x:14.7999,y:21.3487},0).wait(1).to({rotation:145.6856,x:14.5653,y:21.4972},0).wait(1).to({rotation:146.2876,x:14.3292,y:21.6432},0).wait(1).to({rotation:146.8896,x:14.0916,y:21.7867},0).wait(1).to({rotation:147.4916,x:13.8525,y:21.9278},0).wait(1).to({rotation:148.0936,x:13.6119,y:22.0663},0).wait(1).to({rotation:148.6957,x:13.3699,y:22.2022},0).wait(1).to({rotation:149.2977,x:13.1264,y:22.3357},0).wait(1).to({rotation:149.8997,x:12.8816,y:22.4665},0).wait(1).to({rotation:150.5017,x:12.6354,y:22.5948},0).wait(1).to({rotation:151.1037,x:12.3879,y:22.7205},0).wait(1).to({rotation:151.7057,x:12.1391,y:22.8435},0).wait(1).to({rotation:152.3077,x:11.889,y:22.964},0).wait(1).to({rotation:152.9097,x:11.6376,y:23.0818},0).wait(1).to({rotation:153.5117,x:11.385,y:23.197},0).wait(1).to({rotation:154.1137,x:11.1312,y:23.3095},0).wait(1).to({rotation:154.7157,x:10.8763,y:23.4193},0).wait(1).to({rotation:155.3177,x:10.6202,y:23.5265},0).wait(1).to({rotation:155.9197,x:10.363,y:23.631},0).wait(1).to({rotation:156.5217,x:10.1047,y:23.7327},0).wait(1).to({rotation:157.1237,x:9.8454,y:23.8317},0).wait(1).to({rotation:157.7258,x:9.585,y:23.928},0).wait(1).to({rotation:158.3278,x:9.3237,y:24.0216},0).wait(1).to({rotation:158.9298,x:9.0613,y:24.1124},0).wait(1).to({rotation:159.5318,x:8.7981,y:24.2004},0).wait(1).to({rotation:160.1338,x:8.5339,y:24.2857},0).wait(1).to({rotation:160.7358,x:8.2688,y:24.3682},0).wait(1).to({rotation:161.3378,x:8.0029,y:24.4479},0).wait(1).to({rotation:161.9398,x:7.7362,y:24.5248},0).wait(1).to({rotation:162.5418,x:7.4686,y:24.5989},0).wait(1).to({rotation:163.1438,x:7.2003,y:24.6702},0).wait(1).to({rotation:163.7458,x:6.9313,y:24.7387},0).wait(1).to({rotation:164.3478,x:6.6616,y:24.8043},0).wait(1).to({rotation:164.9498,x:6.3912,y:24.8671},0).wait(1).to({rotation:165.5518,x:6.1201,y:24.927},0).wait(1).to({rotation:166.1538,x:5.8484,y:24.9841},0).wait(1).to({rotation:166.7559,x:5.5762,y:25.0384},0).wait(1).to({rotation:167.3579,x:5.3034,y:25.0898},0).wait(1).to({rotation:167.9599,x:5.0301,y:25.1383},0).wait(1).to({rotation:168.5619,x:4.7562,y:25.1839},0).wait(1).to({rotation:169.1639,x:4.4819,y:25.2267},0).wait(1).to({rotation:169.7659,x:4.2072,y:25.2665},0).wait(1).to({rotation:170.3679,x:3.9321,y:25.3035},0).wait(1).to({rotation:170.9699,x:3.6566,y:25.3376},0).wait(1).to({rotation:171.5719,x:3.3807,y:25.3688},0).wait(1).to({rotation:172.1739,x:3.1046,y:25.3971},0).wait(1).to({rotation:172.7759,x:2.8281,y:25.4225},0).wait(1).to({rotation:173.3779,x:2.5514,y:25.445},0).wait(1).to({rotation:173.9799,x:2.2745,y:25.4645},0).wait(1).to({rotation:174.5819,x:1.9974,y:25.4812},0).wait(1).to({rotation:175.1839,x:1.7202,y:25.4949},0).wait(1).to({rotation:175.786,x:1.4428,y:25.5058},0).wait(1).to({rotation:176.388,x:1.1653,y:25.5137},0).wait(1).to({rotation:176.99,x:0.8877,y:25.5187},0).wait(1).to({rotation:177.592,x:0.6101,y:25.5208},0).wait(1).to({rotation:178.194,x:0.3325,y:25.52},0).wait(1).to({rotation:178.796,x:0.055,y:25.5162},0).wait(1).to({rotation:179.398,x:-0.2226,y:25.5096},0).wait(1).to({rotation:180,x:-0.5,y:25.5},0).wait(1).to({rotation:180.602,x:-0.7773,y:25.4875},0).wait(1).to({rotation:181.204,x:-1.0545,y:25.4721},0).wait(1).to({rotation:181.806,x:-1.3315,y:25.4538},0).wait(1).to({rotation:182.408,x:-1.6083,y:25.4326},0).wait(1).to({rotation:183.01,x:-1.8848,y:25.4084},0).wait(1).to({rotation:183.612,x:-2.1611,y:25.3814},0).wait(1).to({rotation:184.214,x:-2.4371,y:25.3515},0).wait(1).to({rotation:184.8161,x:-2.7128,y:25.3186},0).wait(1).to({rotation:185.4181,x:-2.9881,y:25.2829},0).wait(1).to({rotation:186.0201,x:-3.263,y:25.2443},0).wait(1).to({rotation:186.6221,x:-3.5374,y:25.2028},0).wait(1).to({rotation:187.2241,x:-3.8115,y:25.1584},0).wait(1).to({rotation:187.8261,x:-4.085,y:25.1111},0).wait(1).to({rotation:188.4281,x:-4.3581,y:25.061},0).wait(1).to({rotation:189.0301,x:-4.6306,y:25.008},0).wait(1).to({rotation:189.6321,x:-4.9025,y:24.9521},0).wait(1).to({rotation:190.2341,x:-5.1738,y:24.8934},0).wait(1).to({rotation:190.8361,x:-5.4445,y:24.8319},0).wait(1).to({rotation:191.4381,x:-5.7145,y:24.7675},0).wait(1).to({rotation:192.0401,x:-5.9839,y:24.7002},0).wait(1).to({rotation:192.6421,x:-6.2525,y:24.6302},0).wait(1).to({rotation:193.2441,x:-6.5203,y:24.5573},0).wait(1).to({rotation:193.8462,x:-6.7874,y:24.4816},0).wait(1).to({rotation:194.4482,x:-7.0537,y:24.4031},0).wait(1).to({rotation:195.0502,x:-7.3191,y:24.3218},0).wait(1).to({rotation:195.6522,x:-7.5837,y:24.2377},0).wait(1).to({rotation:196.2542,x:-7.8474,y:24.1509},0).wait(1).to({rotation:196.8562,x:-8.1101,y:24.0613},0).wait(1).to({rotation:197.4582,x:-8.3719,y:23.9689},0).wait(1).to({rotation:198.0602,x:-8.6327,y:23.8738},0).wait(1).to({rotation:198.6622,x:-8.8925,y:23.7759},0).wait(1).to({rotation:199.2642,x:-9.1512,y:23.6754},0).wait(1).to({rotation:199.8662,x:-9.4089,y:23.5721},0).wait(1).to({rotation:200.4682,x:-9.6655,y:23.4661},0).wait(1).to({rotation:201.0702,x:-9.9209,y:23.3574},0).wait(1).to({rotation:201.6722,x:-10.1752,y:23.2461},0).wait(1).to({rotation:202.2742,x:-10.4283,y:23.132},0).wait(1).to({rotation:202.8763,x:-10.6802,y:23.0154},0).wait(1).to({rotation:203.4783,x:-10.9309,y:22.8961},0).wait(1).to({rotation:204.0803,x:-11.1802,y:22.7741},0).wait(1).to({rotation:204.6823,x:-11.4283,y:22.6496},0).wait(1).to({rotation:205.2843,x:-11.6751,y:22.5224},0).wait(1).to({rotation:205.8863,x:-11.9205,y:22.3927},0).wait(1).to({rotation:206.4883,x:-12.1646,y:22.2604},0).wait(1).to({rotation:207.0903,x:-12.4072,y:22.1255},0).wait(1).to({rotation:207.6923,x:-12.6484,y:21.9881},0).wait(1).to({rotation:208.2943,x:-12.8882,y:21.8481},0).wait(1).to({rotation:208.8963,x:-13.1264,y:21.7057},0).wait(1).to({rotation:209.4983,x:-13.3632,y:21.5608},0).wait(1).to({rotation:210.1003,x:-13.5984,y:21.4133},0).wait(1).to({rotation:210.7023,x:-13.8321,y:21.2634},0).wait(1).to({rotation:211.3043,x:-14.0642,y:21.1111},0).wait(1).to({rotation:211.9064,x:-14.2946,y:20.9563},0).wait(1).to({rotation:212.5084,x:-14.5234,y:20.7992},0).wait(1).to({rotation:213.1104,x:-14.7506,y:20.6396},0).wait(1).to({rotation:213.7124,x:-14.9761,y:20.4776},0).wait(1).to({rotation:214.3144,x:-15.1998,y:20.3133},0).wait(1).to({rotation:214.9164,x:-15.4218,y:20.1467},0).wait(1).to({rotation:215.5184,x:-15.6421,y:19.9777},0).wait(1).to({rotation:216.1204,x:-15.8605,y:19.8064},0).wait(1).to({rotation:216.7224,x:-16.0772,y:19.6329},0).wait(1).to({rotation:217.3244,x:-16.292,y:19.457},0).wait(1).to({rotation:217.9264,x:-16.505,y:19.279},0).wait(1).to({rotation:218.5284,x:-16.716,y:19.0987},0).wait(1).to({rotation:219.1304,x:-16.9252,y:18.9161},0).wait(1).to({rotation:219.7324,x:-17.1325,y:18.7314},0).wait(1).to({rotation:220.3344,x:-17.3377,y:18.5446},0).wait(1).to({rotation:220.9365,x:-17.5411,y:18.3555},0).wait(1).to({rotation:221.5385,x:-17.7424,y:18.1644},0).wait(1).to({rotation:222.1405,x:-17.9417,y:17.9712},0).wait(1).to({rotation:222.7425,x:-18.1389,y:17.7758},0).wait(1).to({rotation:223.3445,x:-18.3341,y:17.5784},0).wait(1).to({rotation:223.9465,x:-18.5272,y:17.379},0).wait(1).to({rotation:224.5485,x:-18.7182,y:17.1776},0).wait(1).to({rotation:225.1505,x:-18.9071,y:16.9741},0).wait(1).to({rotation:225.7525,x:-19.0938,y:16.7687},0).wait(1).to({rotation:226.3545,x:-19.2784,y:16.5613},0).wait(1).to({rotation:226.9565,x:-19.4608,y:16.352},0).wait(1).to({rotation:227.5585,x:-19.6409,y:16.1408},0).wait(1).to({rotation:228.1605,x:-19.8188,y:15.9277},0).wait(1).to({rotation:228.7625,x:-19.9945,y:15.7128},0).wait(1).to({rotation:229.3645,x:-20.1679,y:15.496},0).wait(1).to({rotation:229.9666,x:-20.3391,y:15.2774},0).wait(1).to({rotation:230.5686,x:-20.5079,y:15.0571},0).wait(1).to({rotation:231.1706,x:-20.6744,y:14.8349},0).wait(1).to({rotation:231.7726,x:-20.8385,y:14.6111},0).wait(1).to({rotation:232.3746,x:-21.0003,y:14.3855},0).wait(1).to({rotation:232.9766,x:-21.1597,y:14.1582},0).wait(1).to({rotation:233.5786,x:-21.3167,y:13.9293},0).wait(1).to({rotation:234.1806,x:-21.4713,y:13.6987},0).wait(1).to({rotation:234.7826,x:-21.6235,y:13.4665},0).wait(1).to({rotation:235.3846,x:-21.7732,y:13.2328},0).wait(1).to({rotation:235.9866,x:-21.9205,y:12.9975},0).wait(1).to({rotation:236.5886,x:-22.0653,y:12.7606},0).wait(1).to({rotation:237.1906,x:-22.2076,y:12.5222},0).wait(1).to({rotation:237.7926,x:-22.3473,y:12.2824},0).wait(1).to({rotation:238.3946,x:-22.4846,y:12.0411},0).wait(1).to({rotation:238.9967,x:-22.6193,y:11.7983},0).wait(1).to({rotation:239.5987,x:-22.7514,y:11.5542},0).wait(1).to({rotation:240.2007,x:-22.881,y:11.3087},0).wait(1).to({rotation:240.8027,x:-23.008,y:11.0618},0).wait(1).to({rotation:241.4047,x:-23.1323,y:10.8136},0).wait(1).to({rotation:242.0067,x:-23.2541,y:10.5642},0).wait(1).to({rotation:242.6087,x:-23.3732,y:10.3134},0).wait(1).to({rotation:243.2107,x:-23.4897,y:10.0615},0).wait(1).to({rotation:243.8127,x:-23.6036,y:9.8083},0).wait(1).to({rotation:244.4147,x:-23.7148,y:9.5539},0).wait(1).to({rotation:245.0167,x:-23.8233,y:9.2984},0).wait(1).to({rotation:245.6187,x:-23.9291,y:9.0417},0).wait(1).to({rotation:246.2207,x:-24.0322,y:8.784},0).wait(1).to({rotation:246.8227,x:-24.1326,y:8.5252},0).wait(1).to({rotation:247.4247,x:-24.2302,y:8.2653},0).wait(1).to({rotation:248.0268,x:-24.3252,y:8.0045},0).wait(1).to({rotation:248.6288,x:-24.4173,y:7.7426},0).wait(1).to({rotation:249.2308,x:-24.5068,y:7.4798},0).wait(1).to({rotation:249.8328,x:-24.5934,y:7.2161},0).wait(1).to({rotation:250.4348,x:-24.6773,y:6.9514},0).wait(1).to({rotation:251.0368,x:-24.7584,y:6.686},0).wait(1).to({rotation:251.6388,x:-24.8367,y:6.4196},0).wait(1).to({rotation:252.2408,x:-24.9122,y:6.1525},0).wait(1).to({rotation:252.8428,x:-24.9849,y:5.8846},0).wait(1).to({rotation:253.4448,x:-25.0548,y:5.6159},0).wait(1).to({rotation:254.0468,x:-25.1218,y:5.3465},0).wait(1).to({rotation:254.6488,x:-25.1861,y:5.0765},0).wait(1).to({rotation:255.2508,x:-25.2474,y:4.8057},0).wait(1).to({rotation:255.8528,x:-25.306,y:4.5344},0).wait(1).to({rotation:256.4548,x:-25.3616,y:4.2624},0).wait(1).to({rotation:257.0569,x:-25.4144,y:3.9899},0).wait(1).to({rotation:257.6589,x:-25.4644,y:3.7168},0).wait(1).to({rotation:258.2609,x:-25.5114,y:3.4432},0).wait(1).to({rotation:258.8629,x:-25.5556,y:3.1691},0).wait(1).to({rotation:259.4649,x:-25.597,y:2.8946},0).wait(1).to({rotation:260.0669,x:-25.6354,y:2.6197},0).wait(1).to({rotation:260.6689,x:-25.6709,y:2.3444},0).wait(1).to({rotation:261.2709,x:-25.7036,y:2.0687},0).wait(1).to({rotation:261.8729,x:-25.7333,y:1.7927},0).wait(1).to({rotation:262.4749,x:-25.7601,y:1.5164},0).wait(1).to({rotation:263.0769,x:-25.7841,y:1.2398},0).wait(1).to({rotation:263.6789,x:-25.8051,y:0.963},0).wait(1).to({rotation:264.2809,x:-25.8232,y:0.686},0).wait(1).to({rotation:264.8829,x:-25.8384,y:0.4088},0).wait(1).to({rotation:265.4849,x:-25.8507,y:0.1315},0).wait(1).to({rotation:266.087,x:-25.8601,y:-0.146},0).wait(1).to({rotation:266.689,x:-25.8666,y:-0.4235},0).wait(1).to({rotation:267.291,x:-25.8701,y:-0.7011},0).wait(1).to({rotation:267.893,x:-25.8708,y:-0.9787},0).wait(1).to({rotation:268.495,x:-25.8685,y:-1.2563},0).wait(1).to({rotation:269.097,x:-25.8633,y:-1.5338},0).wait(1).to({rotation:269.699,x:-25.8552,y:-1.8113},0).wait(1).to({rotation:270.301,x:-25.8441,y:-2.0887},0).wait(1).to({rotation:270.903,x:-25.8302,y:-2.3659},0).wait(1).to({rotation:271.505,x:-25.8133,y:-2.643},0).wait(1).to({rotation:272.107,x:-25.7935,y:-2.9199},0).wait(1).to({rotation:272.709,x:-25.7709,y:-3.1966},0).wait(1).to({rotation:273.311,x:-25.7453,y:-3.473},0).wait(1).to({rotation:273.913,x:-25.7168,y:-3.7492},0).wait(1).to({rotation:274.5151,x:-25.6854,y:-4.025},0).wait(1).to({rotation:275.1171,x:-25.6511,y:-4.3005},0).wait(1).to({rotation:275.7191,x:-25.614,y:-4.5756},0).wait(1).to({rotation:276.3211,x:-25.5739,y:-4.8503},0).wait(1).to({rotation:276.9231,x:-25.531,y:-5.1245},0).wait(1).to({rotation:277.5251,x:-25.4851,y:-5.3983},0).wait(1).to({rotation:278.1271,x:-25.4364,y:-5.6716},0).wait(1).to({rotation:278.7291,x:-25.3849,y:-5.9444},0).wait(1).to({rotation:279.3311,x:-25.3304,y:-6.2166},0).wait(1).to({rotation:279.9331,x:-25.2731,y:-6.4882},0).wait(1).to({rotation:280.5351,x:-25.213,y:-6.7592},0).wait(1).to({rotation:281.1371,x:-25.15,y:-7.0296},0).wait(1).to({rotation:281.7391,x:-25.0842,y:-7.2993},0).wait(1).to({rotation:282.3411,x:-25.0155,y:-7.5683},0).wait(1).to({rotation:282.9431,x:-24.9441,y:-7.8365},0).wait(1).to({rotation:283.5452,x:-24.8698,y:-8.104},0).wait(1).to({rotation:284.1472,x:-24.7927,y:-8.3707},0).wait(1).to({rotation:284.7492,x:-24.7128,y:-8.6365},0).wait(1).to({rotation:285.3512,x:-24.6301,y:-8.9015},0).wait(1).to({rotation:285.9532,x:-24.5447,y:-9.1656},0).wait(1).to({rotation:286.5552,x:-24.4564,y:-9.4289},0).wait(1).to({rotation:287.1572,x:-24.3654,y:-9.6911},0).wait(1).to({rotation:287.7592,x:-24.2717,y:-9.9524},0).wait(1).to({rotation:288.3612,x:-24.1752,y:-10.2127},0).wait(1).to({rotation:288.9632,x:-24.076,y:-10.472},0).wait(1).to({rotation:289.5652,x:-23.9741,y:-10.7302},0).wait(1).to({rotation:290.1672,x:-23.8694,y:-10.9873},0).wait(1).to({rotation:290.7692,x:-23.7621,y:-11.2433},0).wait(1).to({rotation:291.3712,x:-23.6521,y:-11.4982},0).wait(1).to({rotation:291.9732,x:-23.5394,y:-11.7519},0).wait(1).to({rotation:292.5753,x:-23.424,y:-12.0044},0).wait(1).to({rotation:293.1773,x:-23.306,y:-12.2557},0).wait(1).to({rotation:293.7793,x:-23.1854,y:-12.5057},0).wait(1).to({rotation:294.3813,x:-23.0622,y:-12.7545},0).wait(1).to({rotation:294.9833,x:-22.9363,y:-13.0019},0).wait(1).to({rotation:295.5853,x:-22.8079,y:-13.248},0).wait(1).to({rotation:296.1873,x:-22.6768,y:-13.4927},0).wait(1).to({rotation:296.7893,x:-22.5432,y:-13.7361},0).wait(1).to({rotation:297.3913,x:-22.4071,y:-13.978},0).wait(1).to({rotation:297.9933,x:-22.2684,y:-14.2185},0).wait(1).to({rotation:298.5953,x:-22.1272,y:-14.4575},0).wait(1).to({rotation:299.1973,x:-21.9835,y:-14.695},0).wait(1).to({rotation:299.7993,x:-21.8373,y:-14.931},0).wait(1).to({rotation:300.4013,x:-21.6887,y:-15.1654},0).wait(1).to({rotation:301.0033,x:-21.5376,y:-15.3983},0).wait(1).to({rotation:301.6054,x:-21.384,y:-15.6296},0).wait(1).to({rotation:302.2074,x:-21.2281,y:-15.8592},0).wait(1).to({rotation:302.8094,x:-21.0697,y:-16.0872},0).wait(1).to({rotation:303.4114,x:-20.9089,y:-16.3135},0).wait(1).to({rotation:304.0134,x:-20.7458,y:-16.5382},0).wait(1).to({rotation:304.6154,x:-20.5803,y:-16.761},0).wait(1).to({rotation:305.2174,x:-20.4125,y:-16.9822},0).wait(1).to({rotation:305.8194,x:-20.2424,y:-17.2015},0).wait(1).to({rotation:306.4214,x:-20.0699,y:-17.4191},0).wait(1).to({rotation:307.0234,x:-19.8952,y:-17.6348},0).wait(1).to({rotation:307.6254,x:-19.7183,y:-17.8487},0).wait(1).to({rotation:308.2274,x:-19.5391,y:-18.0607},0).wait(1).to({rotation:308.8294,x:-19.3577,y:-18.2709},0).wait(1).to({rotation:309.4314,x:-19.1741,y:-18.4791},0).wait(1).to({rotation:310.0334,x:-18.9883,y:-18.6853},0).wait(1).to({rotation:310.6355,x:-18.8003,y:-18.8897},0).wait(1).to({rotation:311.2375,x:-18.6102,y:-19.092},0).wait(1).to({rotation:311.8395,x:-18.418,y:-19.2923},0).wait(1).to({rotation:312.4415,x:-18.2238,y:-19.4906},0).wait(1).to({rotation:313.0435,x:-18.0274,y:-19.6868},0).wait(1).to({rotation:313.6455,x:-17.829,y:-19.8809},0).wait(1).to({rotation:314.2475,x:-17.6285,y:-20.073},0).wait(1).to({rotation:314.8495,x:-17.4261,y:-20.2629},0).wait(1).to({rotation:315.4515,x:-17.2216,y:-20.4507},0).wait(1).to({rotation:316.0535,x:-17.0152,y:-20.6364},0).wait(1).to({rotation:316.6555,x:-16.8069,y:-20.8198},0).wait(1).to({rotation:317.2575,x:-16.5967,y:-21.0011},0).wait(1).to({rotation:317.8595,x:-16.3845,y:-21.1802},0).wait(1).to({rotation:318.4615,x:-16.1705,y:-21.357},0).wait(1).to({rotation:319.0635,x:-15.9546,y:-21.5315},0).wait(1).to({rotation:319.6656,x:-15.737,y:-21.7038},0).wait(1).to({rotation:320.2676,x:-15.5175,y:-21.8738},0).wait(1).to({rotation:320.8696,x:-15.2962,y:-22.0414},0).wait(1).to({rotation:321.4716,x:-15.0732,y:-22.2067},0).wait(1).to({rotation:322.0736,x:-14.8485,y:-22.3697},0).wait(1).to({rotation:322.6756,x:-14.6221,y:-22.5303},0).wait(1).to({rotation:323.2776,x:-14.394,y:-22.6885},0).wait(1).to({rotation:323.8796,x:-14.1642,y:-22.8444},0).wait(1).to({rotation:324.4816,x:-13.9328,y:-22.9977},0).wait(1).to({rotation:325.0836,x:-13.6999,y:-23.1487},0).wait(1).to({rotation:325.6856,x:-13.4653,y:-23.2972},0).wait(1).to({rotation:326.2876,x:-13.2292,y:-23.4432},0).wait(1).to({rotation:326.8896,x:-12.9916,y:-23.5867},0).wait(1).to({rotation:327.4916,x:-12.7525,y:-23.7278},0).wait(1).to({rotation:328.0936,x:-12.5119,y:-23.8663},0).wait(1).to({rotation:328.6957,x:-12.2699,y:-24.0022},0).wait(1).to({rotation:329.2977,x:-12.0264,y:-24.1357},0).wait(1).to({rotation:329.8997,x:-11.7816,y:-24.2665},0).wait(1).to({rotation:330.5017,x:-11.5354,y:-24.3948},0).wait(1).to({rotation:331.1037,x:-11.2879,y:-24.5205},0).wait(1).to({rotation:331.7057,x:-11.0391,y:-24.6435},0).wait(1).to({rotation:332.3077,x:-10.789,y:-24.764},0).wait(1).to({rotation:332.9097,x:-10.5376,y:-24.8818},0).wait(1).to({rotation:333.5117,x:-10.285,y:-24.997},0).wait(1).to({rotation:334.1137,x:-10.0312,y:-25.1095},0).wait(1).to({rotation:334.7157,x:-9.7763,y:-25.2193},0).wait(1).to({rotation:335.3177,x:-9.5202,y:-25.3265},0).wait(1).to({rotation:335.9197,x:-9.263,y:-25.431},0).wait(1).to({rotation:336.5217,x:-9.0047,y:-25.5327},0).wait(1).to({rotation:337.1237,x:-8.7454,y:-25.6317},0).wait(1).to({rotation:337.7258,x:-8.485,y:-25.728},0).wait(1).to({rotation:338.3278,x:-8.2237,y:-25.8216},0).wait(1).to({rotation:338.9298,x:-7.9613,y:-25.9124},0).wait(1).to({rotation:339.5318,x:-7.6981,y:-26.0004},0).wait(1).to({rotation:340.1338,x:-7.4339,y:-26.0857},0).wait(1).to({rotation:340.7358,x:-7.1688,y:-26.1682},0).wait(1).to({rotation:341.3378,x:-6.9029,y:-26.2479},0).wait(1).to({rotation:341.9398,x:-6.6362,y:-26.3248},0).wait(1).to({rotation:342.5418,x:-6.3686,y:-26.3989},0).wait(1).to({rotation:343.1438,x:-6.1003,y:-26.4702},0).wait(1).to({rotation:343.7458,x:-5.8313,y:-26.5387},0).wait(1).to({rotation:344.3478,x:-5.5616,y:-26.6043},0).wait(1).to({rotation:344.9498,x:-5.2912,y:-26.6671},0).wait(1).to({rotation:345.5518,x:-5.0201,y:-26.727},0).wait(1).to({rotation:346.1538,x:-4.7484,y:-26.7841},0).wait(1).to({rotation:346.7559,x:-4.4762,y:-26.8384},0).wait(1).to({rotation:347.3579,x:-4.2034,y:-26.8898},0).wait(1).to({rotation:347.9599,x:-3.9301,y:-26.9383},0).wait(1).to({rotation:348.5619,x:-3.6562,y:-26.9839},0).wait(1).to({rotation:349.1639,x:-3.3819,y:-27.0267},0).wait(1).to({rotation:349.7659,x:-3.1072,y:-27.0665},0).wait(1).to({rotation:350.3679,x:-2.8321,y:-27.1035},0).wait(1).to({rotation:350.9699,x:-2.5566,y:-27.1376},0).wait(1).to({rotation:351.5719,x:-2.2807,y:-27.1688},0).wait(1).to({rotation:352.1739,x:-2.0046,y:-27.1971},0).wait(1).to({rotation:352.7759,x:-1.7281,y:-27.2225},0).wait(1).to({rotation:353.3779,x:-1.4514,y:-27.245},0).wait(1).to({rotation:353.9799,x:-1.1745,y:-27.2645},0).wait(1).to({rotation:354.5819,x:-0.8974,y:-27.2812},0).wait(1).to({rotation:355.1839,x:-0.6202,y:-27.2949},0).wait(1).to({rotation:355.786,x:-0.3428,y:-27.3058},0).wait(1).to({rotation:356.388,x:-0.0653,y:-27.3137},0).wait(1).to({rotation:356.99,x:0.2123,y:-27.3187},0).wait(1).to({rotation:357.592,x:0.4899,y:-27.3208},0).wait(1).to({rotation:358.194,x:0.7675,y:-27.32},0).wait(1).to({rotation:358.796,x:1.045,y:-27.3162},0).wait(1).to({rotation:359.398,x:1.3226,y:-27.3096},0).wait(1).to({rotation:360,x:1.6,y:-27.3},0).wait(2));

	// body
	this.instance_1 = new lib.CachedBmp_26();
	this.instance_1.setTransform(-75.75,-75.75,0.4373,0.4373);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(600));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.7,-75.7,151.7,151.7);


(lib.CLOUDS_MOVE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// CLOUD_4
	this.instance = new lib.cloud("synched",0);
	this.instance.setTransform(1097.75,-50.35,0.5009,0.5009,-14.9972,0,0,-9.8,-6.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-19.5,regY:-18.2,rotation:-14.9989,x:1077.5,y:-56.05},0).wait(1).to({x:1066.4,y:-56.95},0).wait(1).to({x:1056.85,y:-57.65},0).wait(1).to({x:1048.3,y:-58.2},0).wait(1).to({x:1040.45,y:-58.65},0).wait(1).to({x:1033.15,y:-59.05},0).wait(1).to({x:1026.25,y:-59.35},0).wait(1).to({x:1019.7,y:-59.6},0).wait(1).to({x:1013.45,y:-59.8},0).wait(1).to({x:1007.45,y:-60},0).wait(1).to({x:1001.65,y:-60.1},0).wait(1).to({x:996.05,y:-60.2},0).wait(1).to({x:990.6,y:-60.3},0).wait(1).to({x:985.25},0).wait(1).to({x:980.1,y:-60.35},0).wait(1).to({x:975},0).wait(1).to({x:970.05,y:-60.3},0).wait(1).to({x:965.15,y:-60.25},0).wait(1).to({x:960.35,y:-60.2},0).wait(1).to({x:955.65,y:-60.1},0).wait(1).to({x:951,y:-60},0).wait(1).to({x:946.4,y:-59.9},0).wait(1).to({x:941.9,y:-59.75},0).wait(1).to({x:937.4,y:-59.6},0).wait(1).to({x:933,y:-59.4},0).wait(1).to({x:928.6,y:-59.25},0).wait(1).to({x:924.3,y:-59.05},0).wait(1).to({x:920,y:-58.8},0).wait(1).to({x:915.7,y:-58.6},0).wait(1).to({x:911.5,y:-58.35},0).wait(1).to({x:907.3,y:-58.1},0).wait(1).to({x:903.1,y:-57.8},0).wait(1).to({x:898.95,y:-57.5},0).wait(1).to({x:894.85,y:-57.2},0).wait(1).to({x:890.7,y:-56.9},0).wait(1).to({x:886.65,y:-56.6},0).wait(1).to({x:882.55,y:-56.25},0).wait(1).to({x:878.5,y:-55.9},0).wait(1).to({x:874.45,y:-55.55},0).wait(1).to({x:870.4,y:-55.15},0).wait(1).to({x:866.35,y:-54.75},0).wait(1).to({x:862.35,y:-54.35},0).wait(1).to({x:858.3,y:-53.9},0).wait(1).to({x:854.3,y:-53.5},0).wait(1).to({x:850.25,y:-53.05},0).wait(1).to({x:846.25,y:-52.55},0).wait(1).to({x:842.2,y:-52.1},0).wait(1).to({x:838.2,y:-51.6},0).wait(1).to({x:834.15,y:-51.1},0).wait(1).to({x:830.1,y:-50.55},0).wait(1).to({x:826.05,y:-50.05},0).wait(1).to({x:822,y:-49.45},0).wait(1).to({x:817.9,y:-48.9},0).wait(1).to({x:813.85,y:-48.3},0).wait(1).to({x:809.7,y:-47.7},0).wait(1).to({x:805.6,y:-47.05},0).wait(1).to({x:801.45,y:-46.45},0).wait(1).to({x:797.25,y:-45.75},0).wait(1).to({x:793.05,y:-45.1},0).wait(1).to({x:788.85,y:-44.4},0).wait(1).to({x:784.55,y:-43.65},0).wait(1).to({x:780.25,y:-42.9},0).wait(1).to({x:775.95,y:-42.15},0).wait(1).to({x:771.55,y:-41.35},0).wait(1).to({x:767.15,y:-40.55},0).wait(1).to({x:762.65,y:-39.7},0).wait(1).to({x:758.15,y:-38.8},0).wait(1).to({x:753.55,y:-37.9},0).wait(1).to({x:748.9,y:-36.95},0).wait(1).to({x:744.2,y:-36},0).wait(1).to({x:739.4,y:-35},0).wait(1).to({x:734.5,y:-33.95},0).wait(1).to({x:729.55,y:-32.85},0).wait(1).to({x:724.5,y:-31.75},0).wait(1).to({x:719.3,y:-30.55},0).wait(1).to({x:714,y:-29.35},0).wait(1).to({x:708.5,y:-28.05},0).wait(1).to({x:702.9,y:-26.7},0).wait(1).to({x:697.1,y:-25.25},0).wait(1).to({x:691.1,y:-23.75},0).wait(1).to({x:684.85,y:-22.15},0).wait(1).to({x:678.3,y:-20.4},0).wait(1).to({x:671.45,y:-18.55},0).wait(1).to({x:664.1,y:-16.55},0).wait(1).to({x:656.25,y:-14.35},0).wait(1).to({x:647.7,y:-11.85},0).wait(1).to({x:638.15,y:-9},0).wait(1).to({x:627.05,y:-5.65},0).wait(1).to({x:613.05,y:-1.25},0).wait(1));

	// CLOUD_3
	this.instance_1 = new lib.cloud("synched",0);
	this.instance_1.setTransform(562.9,-144.35,0.4124,0.4124,-9.6927,0,0,0.5,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:-19.5,regY:-18.2,rotation:-9.6947,x:549.65,y:-146.5},0).wait(1).to({x:545.75,y:-143.9},0).wait(1).to({x:541.8,y:-141.5},0).wait(1).to({x:537.9,y:-139.25},0).wait(1).to({x:534,y:-137.1},0).wait(1).to({x:530.1,y:-135.1},0).wait(1).to({x:526.2,y:-133.15},0).wait(1).to({x:522.35,y:-131.3},0).wait(1).to({x:518.45,y:-129.5},0).wait(1).to({x:514.6,y:-127.75},0).wait(1).to({x:510.75,y:-126.05},0).wait(1).to({x:506.9,y:-124.4},0).wait(1).to({x:503.05,y:-122.8},0).wait(1).to({x:499.2,y:-121.25},0).wait(1).to({x:495.4,y:-119.7},0).wait(1).to({x:491.55,y:-118.2},0).wait(1).to({x:487.75,y:-116.75},0).wait(1).to({x:483.9,y:-115.3},0).wait(1).to({x:480.1,y:-113.9},0).wait(1).to({x:476.3,y:-112.55},0).wait(1).to({x:472.45,y:-111.15},0).wait(1).to({x:468.65,y:-109.85},0).wait(1).to({x:464.85,y:-108.5},0).wait(1).to({x:461.05,y:-107.2},0).wait(1).to({x:457.3,y:-105.95},0).wait(1).to({x:453.5,y:-104.65},0).wait(1).to({x:449.7,y:-103.4},0).wait(1).to({x:445.95,y:-102.15},0).wait(1).to({x:442.15,y:-100.95},0).wait(1).to({x:438.4,y:-99.75},0).wait(1).to({x:434.6,y:-98.55},0).wait(1).to({x:430.85,y:-97.35},0).wait(1).to({x:427.1,y:-96.2},0).wait(1).to({x:423.35,y:-95.05},0).wait(1).to({x:419.6,y:-93.9},0).wait(1).to({x:415.85,y:-92.75},0).wait(1).to({x:412.1,y:-91.6},0).wait(1).to({x:408.4,y:-90.5},0).wait(1).to({x:404.65,y:-89.4},0).wait(1).to({x:400.9,y:-88.3},0).wait(1).to({x:397.2,y:-87.2},0).wait(1).to({x:393.5,y:-86.1},0).wait(1).to({x:389.75,y:-85},0).wait(1).to({x:386.05,y:-83.95},0).wait(1).to({x:382.35,y:-82.85},0).wait(1).to({x:378.65,y:-81.8},0).wait(1).to({x:374.95,y:-80.75},0).wait(1).to({x:371.25,y:-79.7},0).wait(1).to({x:367.6,y:-78.65},0).wait(1).to({x:363.9,y:-77.6},0).wait(1).to({x:360.25,y:-76.55},0).wait(1).to({x:356.6,y:-75.55},0).wait(1).to({x:352.9,y:-74.5},0).wait(1).to({x:349.25,y:-73.5},0).wait(1).to({x:345.65,y:-72.45},0).wait(1).to({x:342,y:-71.45},0).wait(1).to({x:338.35,y:-70.45},0).wait(1).to({x:334.75,y:-69.4},0).wait(1).to({x:331.1,y:-68.4},0).wait(1).to({x:327.5,y:-67.4},0).wait(1).to({x:323.9,y:-66.4},0).wait(1).to({x:320.3,y:-65.35},0).wait(1).to({x:316.75,y:-64.35},0).wait(1).to({x:313.15,y:-63.35},0).wait(1).to({x:309.6,y:-62.35},0).wait(1).to({x:306.05,y:-61.35},0).wait(1).to({x:302.5,y:-60.35},0).wait(1).to({x:298.95,y:-59.3},0).wait(1).to({x:295.45,y:-58.3},0).wait(1).to({x:291.95,y:-57.3},0).wait(1).to({x:288.45,y:-56.3},0).wait(1).to({x:285,y:-55.25},0).wait(1).to({x:281.5,y:-54.25},0).wait(1).to({x:278.1,y:-53.2},0).wait(1).to({x:274.65,y:-52.15},0).wait(1).to({x:271.25,y:-51.1},0).wait(1).to({x:267.85,y:-50.05},0).wait(1).to({x:264.5,y:-49},0).wait(1).to({x:261.2,y:-47.9},0).wait(1).to({x:257.9,y:-46.8},0).wait(1).to({x:254.6,y:-45.7},0).wait(1).to({x:251.4,y:-44.6},0).wait(1).to({x:248.2,y:-43.45},0).wait(1).to({x:245.1,y:-42.25},0).wait(1).to({x:242.05,y:-41.05},0).wait(1).to({x:239.05,y:-39.8},0).wait(1).to({x:236.15,y:-38.45},0).wait(1).to({x:233.4,y:-37.05},0).wait(1).to({x:230.9,y:-35.5},0).wait(1));

	// CLOUD_2
	this.instance_2 = new lib.cloud("synched",0);
	this.instance_2.setTransform(-575.3,-177.4,0.4124,0.4124,-9.6927,0,0,-16.9,-16.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:-19.5,regY:-18.2,rotation:-9.6947,x:-565.95,y:-175.35},0).wait(1).to({x:-558.7,y:-173.1},0).wait(1).to({x:-552.65,y:-171.1},0).wait(1).to({x:-547.4,y:-169.15},0).wait(1).to({x:-542.65,y:-167.3},0).wait(1).to({x:-538.2,y:-165.5},0).wait(1).to({x:-534.1,y:-163.75},0).wait(1).to({x:-530.15,y:-162},0).wait(1).to({x:-526.4,y:-160.25},0).wait(1).to({x:-522.85,y:-158.55},0).wait(1).to({x:-519.35,y:-156.9},0).wait(1).to({x:-516,y:-155.2},0).wait(1).to({x:-512.7,y:-153.55},0).wait(1).to({x:-509.5,y:-151.9},0).wait(1).to({x:-506.4,y:-150.25},0).wait(1).to({x:-503.3,y:-148.6},0).wait(1).to({x:-500.3,y:-147},0).wait(1).to({x:-497.3,y:-145.35},0).wait(1).to({x:-494.35,y:-143.75},0).wait(1).to({x:-491.45,y:-142.1},0).wait(1).to({x:-488.55,y:-140.5},0).wait(1).to({x:-485.7,y:-138.85},0).wait(1).to({x:-482.85,y:-137.25},0).wait(1).to({x:-480,y:-135.6},0).wait(1).to({x:-477.2,y:-133.95},0).wait(1).to({x:-474.4,y:-132.35},0).wait(1).to({x:-471.55,y:-130.7},0).wait(1).to({x:-468.75,y:-129.05},0).wait(1).to({x:-465.9,y:-127.4},0).wait(1).to({x:-463.1,y:-125.75},0).wait(1).to({x:-460.25,y:-124.1},0).wait(1).to({x:-457.35,y:-122.4},0).wait(1).to({x:-454.45,y:-120.75},0).wait(1).to({x:-451.55,y:-119.05},0).wait(1).to({x:-448.55,y:-117.3},0).wait(1).to({x:-445.55,y:-115.6},0).wait(1).to({x:-442.45,y:-113.85},0).wait(1).to({x:-439.35,y:-112.1},0).wait(1).to({x:-436.1,y:-110.3},0).wait(1).to({x:-432.8,y:-108.5},0).wait(1).to({x:-429.4,y:-106.65},0).wait(1).to({x:-425.85,y:-104.75},0).wait(1).to({x:-422.1,y:-102.85},0).wait(1).to({x:-418.15,y:-100.85},0).wait(1).to({x:-413.95,y:-98.75},0).wait(1).to({x:-409.3,y:-96.6},0).wait(1).to({x:-404.05,y:-94.25},0).wait(1).to({x:-397.8,y:-91.65},0).wait(1).to({x:-388.85,y:-88.3},0).wait(1).to({x:-379.15,y:-85.25},0).wait(1).to({x:-371.95,y:-83.3},0).wait(1).to({x:-365.9,y:-81.85},0).wait(1).to({x:-360.55,y:-80.7},0).wait(1).to({x:-355.65,y:-79.8},0).wait(1).to({x:-351.1,y:-79},0).wait(1).to({x:-346.8,y:-78.35},0).wait(1).to({x:-342.75,y:-77.75},0).wait(1).to({x:-338.85,y:-77.25},0).wait(1).to({x:-335.1,y:-76.8},0).wait(1).to({x:-331.45,y:-76.35},0).wait(1).to({x:-327.9,y:-76},0).wait(1).to({x:-324.45,y:-75.65},0).wait(1).to({x:-321.05,y:-75.35},0).wait(1).to({x:-317.75,y:-75.05},0).wait(1).to({x:-314.45,y:-74.75},0).wait(1).to({x:-311.25,y:-74.45},0).wait(1).to({x:-308.05,y:-74.2},0).wait(1).to({x:-304.9,y:-73.95},0).wait(1).to({x:-301.75,y:-73.65},0).wait(1).to({x:-298.6,y:-73.4},0).wait(1).to({x:-295.45,y:-73.1},0).wait(1).to({x:-292.35,y:-72.8},0).wait(1).to({x:-289.2,y:-72.5},0).wait(1).to({x:-286.05,y:-72.15},0).wait(1).to({x:-282.9,y:-71.8},0).wait(1).to({x:-279.7,y:-71.4},0).wait(1).to({x:-276.45,y:-70.95},0).wait(1).to({x:-273.15,y:-70.5},0).wait(1).to({x:-269.85,y:-69.95},0).wait(1).to({x:-266.4,y:-69.35},0).wait(1).to({x:-262.9,y:-68.7},0).wait(1).to({x:-259.25,y:-67.95},0).wait(1).to({x:-255.5,y:-67.05},0).wait(1).to({x:-251.55,y:-66.05},0).wait(1).to({x:-247.3,y:-64.85},0).wait(1).to({x:-242.75,y:-63.4},0).wait(1).to({x:-237.7,y:-61.55},0).wait(1).to({x:-231.75,y:-59.1},0).wait(1).to({x:-223.9,y:-55.3},0).wait(1));

	// CLOUD_1
	this.instance_3 = new lib.cloud("synched",0);
	this.instance_3.setTransform(-1103.95,26.95,0.5009,0.5009,-9.6945,0,0,-11,-7.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:-19.5,regY:-18.2,rotation:-9.6947,x:-1089.5,y:23.2},0).wait(1).to({x:-1074.25,y:23.8},0).wait(1).to({x:-1061.3,y:24.35},0).wait(1).to({x:-1049.85,y:24.8},0).wait(1).to({x:-1039.45,y:25.2},0).wait(1).to({x:-1029.85,y:25.55},0).wait(1).to({x:-1020.9,y:25.9},0).wait(1).to({x:-1012.5,y:26.15},0).wait(1).to({x:-1004.5,y:26.45},0).wait(1).to({x:-996.9,y:26.7},0).wait(1).to({x:-989.65,y:26.9},0).wait(1).to({x:-982.65,y:27.15},0).wait(1).to({x:-975.9,y:27.35},0).wait(1).to({x:-969.35,y:27.55},0).wait(1).to({x:-963.05,y:27.7},0).wait(1).to({x:-956.9,y:27.9},0).wait(1).to({x:-950.95,y:28.05},0).wait(1).to({x:-945.15,y:28.2},0).wait(1).to({x:-939.45,y:28.3},0).wait(1).to({x:-933.9,y:28.45},0).wait(1).to({x:-928.5,y:28.6},0).wait(1).to({x:-923.15,y:28.7},0).wait(1).to({x:-917.95,y:28.8},0).wait(1).to({x:-912.85,y:28.9},0).wait(1).to({x:-907.8,y:29},0).wait(1).to({x:-902.9,y:29.1},0).wait(1).to({x:-898,y:29.2},0).wait(1).to({x:-893.25,y:29.25},0).wait(1).to({x:-888.5,y:29.35},0).wait(1).to({x:-883.85,y:29.4},0).wait(1).to({x:-879.3,y:29.45},0).wait(1).to({x:-874.75,y:29.5},0).wait(1).to({x:-870.25,y:29.6},0).wait(1).to({x:-865.85},0).wait(1).to({x:-861.5,y:29.65},0).wait(1).to({x:-857.15,y:29.7},0).wait(1).to({x:-852.9,y:29.75},0).wait(1).to({x:-848.65},0).wait(1).to({x:-844.45,y:29.8},0).wait(1).to({x:-840.3},0).wait(1).to({x:-836.2,y:29.85},0).wait(1).to({x:-832.1},0).wait(1).to({x:-828.05},0).wait(1).to({x:-824.05},0).wait(1).to({x:-820.05},0).wait(1).to({x:-816.05},0).wait(1).to({x:-812.15},0).wait(1).to({x:-808.2},0).wait(1).to({x:-804.3,y:29.8},0).wait(1).to({x:-800.45},0).wait(1).to({x:-796.6,y:29.75},0).wait(1).to({x:-792.75},0).wait(1).to({x:-788.9,y:29.7},0).wait(1).to({x:-785.1,y:29.65},0).wait(1).to({x:-781.3,y:29.6},0).wait(1).to({x:-777.55},0).wait(1).to({x:-773.75,y:29.5},0).wait(1).to({x:-770,y:29.45},0).wait(1).to({x:-766.25,y:29.4},0).wait(1).to({x:-762.5,y:29.35},0).wait(1).to({x:-758.75,y:29.25},0).wait(1).to({x:-755,y:29.2},0).wait(1).to({x:-751.25,y:29.1},0).wait(1).to({x:-747.45,y:29},0).wait(1).to({x:-743.7,y:28.9},0).wait(1).to({x:-739.95,y:28.8},0).wait(1).to({x:-736.15,y:28.7},0).wait(1).to({x:-732.35,y:28.6},0).wait(1).to({x:-728.55,y:28.45},0).wait(1).to({x:-724.75,y:28.3},0).wait(1).to({x:-720.9,y:28.2},0).wait(1).to({x:-717,y:28.05},0).wait(1).to({x:-713.1,y:27.9},0).wait(1).to({x:-709.15,y:27.7},0).wait(1).to({x:-705.2,y:27.55},0).wait(1).to({x:-701.15,y:27.35},0).wait(1).to({x:-697.05,y:27.15},0).wait(1).to({x:-692.9,y:26.9},0).wait(1).to({x:-688.65,y:26.7},0).wait(1).to({x:-684.35,y:26.45},0).wait(1).to({x:-679.9,y:26.15},0).wait(1).to({x:-675.3,y:25.9},0).wait(1).to({x:-670.6,y:25.55},0).wait(1).to({x:-665.65,y:25.2},0).wait(1).to({x:-660.45,y:24.8},0).wait(1).to({x:-654.9,y:24.35},0).wait(1).to({x:-648.85,y:23.8},0).wait(1).to({x:-642.05,y:23.2},0).wait(1).to({x:-633.7,y:22.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1282.7,-277.1,2553.4,427.40000000000003);


(lib.clock12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// red_center
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8542A").s().p("AhZgBQAAgiAZgdQAdgZAiAAQAlAAAZAZQAdAdAAAiQAAAlgdAdQgZAZglAAQhYAAAAhbg");
	this.shape.setTransform(1.275,1.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AAJAAQAAAEgDADQgCACgEAAQgIAAAAgJQAAgDACgDQADgCADAAQAEAAACACQADADAAADg");
	this.shape_1.setTransform(1.275,-2.775,9.7027,9.7027);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8542A").s().p("AgIAAQAAgDACgDQADgCADAAQAEAAACACQADADAAADQAAAEgDADQgCACgEAAQgIAAAAgJg");
	this.shape_2.setTransform(1.275,-2.775,9.7027,9.7027);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},25).wait(575));

	// needle
	this.instance = new lib.clock_needle();
	this.instance.setTransform(0.5,-0.9,1,1,0,0,0,-1.1,26.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:0,rotation:0.602,x:1.8773,y:-27.2875},0).wait(1).to({rotation:1.204,x:2.1545,y:-27.2721},0).wait(1).to({rotation:1.806,x:2.4315,y:-27.2538},0).wait(1).to({rotation:2.408,x:2.7083,y:-27.2326},0).wait(1).to({rotation:3.01,x:2.9848,y:-27.2084},0).wait(1).to({rotation:3.612,x:3.2611,y:-27.1814},0).wait(1).to({rotation:4.214,x:3.5371,y:-27.1515},0).wait(1).to({rotation:4.8161,x:3.8128,y:-27.1186},0).wait(1).to({rotation:5.4181,x:4.0881,y:-27.0829},0).wait(1).to({rotation:6.0201,x:4.363,y:-27.0443},0).wait(1).to({rotation:6.6221,x:4.6374,y:-27.0028},0).wait(1).to({rotation:7.2241,x:4.9115,y:-26.9584},0).wait(1).to({rotation:7.8261,x:5.185,y:-26.9111},0).wait(1).to({rotation:8.4281,x:5.4581,y:-26.861},0).wait(1).to({rotation:9.0301,x:5.7306,y:-26.808},0).wait(1).to({rotation:9.6321,x:6.0025,y:-26.7521},0).wait(1).to({rotation:10.2341,x:6.2738,y:-26.6934},0).wait(1).to({rotation:10.8361,x:6.5445,y:-26.6319},0).wait(1).to({rotation:11.4381,x:6.8145,y:-26.5675},0).wait(1).to({rotation:12.0401,x:7.0839,y:-26.5002},0).wait(1).to({rotation:12.6421,x:7.3525,y:-26.4302},0).wait(1).to({rotation:13.2441,x:7.6203,y:-26.3573},0).wait(1).to({rotation:13.8462,x:7.8874,y:-26.2816},0).wait(1).to({rotation:14.4482,x:8.1537,y:-26.2031},0).wait(1).to({rotation:15.0502,x:8.4191,y:-26.1218},0).wait(1).to({rotation:15.6522,x:8.6837,y:-26.0377},0).wait(1).to({rotation:16.2542,x:8.9474,y:-25.9509},0).wait(1).to({rotation:16.8562,x:9.2101,y:-25.8613},0).wait(1).to({rotation:17.4582,x:9.4719,y:-25.7689},0).wait(1).to({rotation:18.0602,x:9.7327,y:-25.6738},0).wait(1).to({rotation:18.6622,x:9.9925,y:-25.5759},0).wait(1).to({rotation:19.2642,x:10.2512,y:-25.4754},0).wait(1).to({rotation:19.8662,x:10.5089,y:-25.3721},0).wait(1).to({rotation:20.4682,x:10.7655,y:-25.2661},0).wait(1).to({rotation:21.0702,x:11.0209,y:-25.1574},0).wait(1).to({rotation:21.6722,x:11.2752,y:-25.0461},0).wait(1).to({rotation:22.2742,x:11.5283,y:-24.932},0).wait(1).to({rotation:22.8763,x:11.7802,y:-24.8154},0).wait(1).to({rotation:23.4783,x:12.0309,y:-24.6961},0).wait(1).to({rotation:24.0803,x:12.2802,y:-24.5741},0).wait(1).to({rotation:24.6823,x:12.5283,y:-24.4496},0).wait(1).to({rotation:25.2843,x:12.7751,y:-24.3224},0).wait(1).to({rotation:25.8863,x:13.0205,y:-24.1927},0).wait(1).to({rotation:26.4883,x:13.2646,y:-24.0604},0).wait(1).to({rotation:27.0903,x:13.5072,y:-23.9255},0).wait(1).to({rotation:27.6923,x:13.7484,y:-23.7881},0).wait(1).to({rotation:28.2943,x:13.9882,y:-23.6481},0).wait(1).to({rotation:28.8963,x:14.2264,y:-23.5057},0).wait(1).to({rotation:29.4983,x:14.4632,y:-23.3608},0).wait(1).to({rotation:30.1003,x:14.6984,y:-23.2133},0).wait(1).to({rotation:30.7023,x:14.9321,y:-23.0634},0).wait(1).to({rotation:31.3043,x:15.1642,y:-22.9111},0).wait(1).to({rotation:31.9064,x:15.3946,y:-22.7563},0).wait(1).to({rotation:32.5084,x:15.6234,y:-22.5992},0).wait(1).to({rotation:33.1104,x:15.8506,y:-22.4396},0).wait(1).to({rotation:33.7124,x:16.0761,y:-22.2776},0).wait(1).to({rotation:34.3144,x:16.2998,y:-22.1133},0).wait(1).to({rotation:34.9164,x:16.5218,y:-21.9467},0).wait(1).to({rotation:35.5184,x:16.7421,y:-21.7777},0).wait(1).to({rotation:36.1204,x:16.9605,y:-21.6064},0).wait(1).to({rotation:36.7224,x:17.1772,y:-21.4329},0).wait(1).to({rotation:37.3244,x:17.392,y:-21.257},0).wait(1).to({rotation:37.9264,x:17.605,y:-21.079},0).wait(1).to({rotation:38.5284,x:17.816,y:-20.8987},0).wait(1).to({rotation:39.1304,x:18.0252,y:-20.7161},0).wait(1).to({rotation:39.7324,x:18.2325,y:-20.5314},0).wait(1).to({rotation:40.3344,x:18.4377,y:-20.3446},0).wait(1).to({rotation:40.9365,x:18.6411,y:-20.1555},0).wait(1).to({rotation:41.5385,x:18.8424,y:-19.9644},0).wait(1).to({rotation:42.1405,x:19.0417,y:-19.7712},0).wait(1).to({rotation:42.7425,x:19.2389,y:-19.5758},0).wait(1).to({rotation:43.3445,x:19.4341,y:-19.3784},0).wait(1).to({rotation:43.9465,x:19.6272,y:-19.179},0).wait(1).to({rotation:44.5485,x:19.8182,y:-18.9776},0).wait(1).to({rotation:45.1505,x:20.0071,y:-18.7741},0).wait(1).to({rotation:45.7525,x:20.1938,y:-18.5687},0).wait(1).to({rotation:46.3545,x:20.3784,y:-18.3613},0).wait(1).to({rotation:46.9565,x:20.5608,y:-18.152},0).wait(1).to({rotation:47.5585,x:20.7409,y:-17.9408},0).wait(1).to({rotation:48.1605,x:20.9188,y:-17.7277},0).wait(1).to({rotation:48.7625,x:21.0945,y:-17.5128},0).wait(1).to({rotation:49.3645,x:21.2679,y:-17.296},0).wait(1).to({rotation:49.9666,x:21.4391,y:-17.0774},0).wait(1).to({rotation:50.5686,x:21.6079,y:-16.8571},0).wait(1).to({rotation:51.1706,x:21.7744,y:-16.6349},0).wait(1).to({rotation:51.7726,x:21.9385,y:-16.4111},0).wait(1).to({rotation:52.3746,x:22.1003,y:-16.1855},0).wait(1).to({rotation:52.9766,x:22.2597,y:-15.9582},0).wait(1).to({rotation:53.5786,x:22.4167,y:-15.7293},0).wait(1).to({rotation:54.1806,x:22.5713,y:-15.4987},0).wait(1).to({rotation:54.7826,x:22.7235,y:-15.2665},0).wait(1).to({rotation:55.3846,x:22.8732,y:-15.0328},0).wait(1).to({rotation:55.9866,x:23.0205,y:-14.7975},0).wait(1).to({rotation:56.5886,x:23.1653,y:-14.5606},0).wait(1).to({rotation:57.1906,x:23.3076,y:-14.3222},0).wait(1).to({rotation:57.7926,x:23.4473,y:-14.0824},0).wait(1).to({rotation:58.3946,x:23.5846,y:-13.8411},0).wait(1).to({rotation:58.9967,x:23.7193,y:-13.5983},0).wait(1).to({rotation:59.5987,x:23.8514,y:-13.3542},0).wait(1).to({rotation:60.2007,x:23.981,y:-13.1087},0).wait(1).to({rotation:60.8027,x:24.108,y:-12.8618},0).wait(1).to({rotation:61.4047,x:24.2323,y:-12.6136},0).wait(1).to({rotation:62.0067,x:24.3541,y:-12.3642},0).wait(1).to({rotation:62.6087,x:24.4732,y:-12.1134},0).wait(1).to({rotation:63.2107,x:24.5897,y:-11.8615},0).wait(1).to({rotation:63.8127,x:24.7036,y:-11.6083},0).wait(1).to({rotation:64.4147,x:24.8148,y:-11.3539},0).wait(1).to({rotation:65.0167,x:24.9233,y:-11.0984},0).wait(1).to({rotation:65.6187,x:25.0291,y:-10.8417},0).wait(1).to({rotation:66.2207,x:25.1322,y:-10.584},0).wait(1).to({rotation:66.8227,x:25.2326,y:-10.3252},0).wait(1).to({rotation:67.4247,x:25.3302,y:-10.0653},0).wait(1).to({rotation:68.0268,x:25.4252,y:-9.8045},0).wait(1).to({rotation:68.6288,x:25.5173,y:-9.5426},0).wait(1).to({rotation:69.2308,x:25.6068,y:-9.2798},0).wait(1).to({rotation:69.8328,x:25.6934,y:-9.0161},0).wait(1).to({rotation:70.4348,x:25.7773,y:-8.7514},0).wait(1).to({rotation:71.0368,x:25.8584,y:-8.486},0).wait(1).to({rotation:71.6388,x:25.9367,y:-8.2196},0).wait(1).to({rotation:72.2408,x:26.0122,y:-7.9525},0).wait(1).to({rotation:72.8428,x:26.0849,y:-7.6846},0).wait(1).to({rotation:73.4448,x:26.1548,y:-7.4159},0).wait(1).to({rotation:74.0468,x:26.2218,y:-7.1465},0).wait(1).to({rotation:74.6488,x:26.2861,y:-6.8765},0).wait(1).to({rotation:75.2508,x:26.3474,y:-6.6057},0).wait(1).to({rotation:75.8528,x:26.406,y:-6.3344},0).wait(1).to({rotation:76.4548,x:26.4616,y:-6.0624},0).wait(1).to({rotation:77.0569,x:26.5144,y:-5.7899},0).wait(1).to({rotation:77.6589,x:26.5644,y:-5.5168},0).wait(1).to({rotation:78.2609,x:26.6114,y:-5.2432},0).wait(1).to({rotation:78.8629,x:26.6556,y:-4.9691},0).wait(1).to({rotation:79.4649,x:26.697,y:-4.6946},0).wait(1).to({rotation:80.0669,x:26.7354,y:-4.4197},0).wait(1).to({rotation:80.6689,x:26.7709,y:-4.1444},0).wait(1).to({rotation:81.2709,x:26.8036,y:-3.8687},0).wait(1).to({rotation:81.8729,x:26.8333,y:-3.5927},0).wait(1).to({rotation:82.4749,x:26.8601,y:-3.3164},0).wait(1).to({rotation:83.0769,x:26.8841,y:-3.0398},0).wait(1).to({rotation:83.6789,x:26.9051,y:-2.763},0).wait(1).to({rotation:84.2809,x:26.9232,y:-2.486},0).wait(1).to({rotation:84.8829,x:26.9384,y:-2.2088},0).wait(1).to({rotation:85.4849,x:26.9507,y:-1.9315},0).wait(1).to({rotation:86.087,x:26.9601,y:-1.654},0).wait(1).to({rotation:86.689,x:26.9666,y:-1.3765},0).wait(1).to({rotation:87.291,x:26.9701,y:-1.0989},0).wait(1).to({rotation:87.893,x:26.9708,y:-0.8213},0).wait(1).to({rotation:88.495,x:26.9685,y:-0.5437},0).wait(1).to({rotation:89.097,x:26.9633,y:-0.2662},0).wait(1).to({rotation:89.699,x:26.9552,y:0.0113},0).wait(1).to({rotation:90.301,x:26.9441,y:0.2887},0).wait(1).to({rotation:90.903,x:26.9302,y:0.5659},0).wait(1).to({rotation:91.505,x:26.9133,y:0.843},0).wait(1).to({rotation:92.107,x:26.8935,y:1.1199},0).wait(1).to({rotation:92.709,x:26.8709,y:1.3966},0).wait(1).to({rotation:93.311,x:26.8453,y:1.673},0).wait(1).to({rotation:93.913,x:26.8168,y:1.9492},0).wait(1).to({rotation:94.5151,x:26.7854,y:2.225},0).wait(1).to({rotation:95.1171,x:26.7511,y:2.5005},0).wait(1).to({rotation:95.7191,x:26.714,y:2.7756},0).wait(1).to({rotation:96.3211,x:26.6739,y:3.0503},0).wait(1).to({rotation:96.9231,x:26.631,y:3.3245},0).wait(1).to({rotation:97.5251,x:26.5851,y:3.5983},0).wait(1).to({rotation:98.1271,x:26.5364,y:3.8716},0).wait(1).to({rotation:98.7291,x:26.4849,y:4.1444},0).wait(1).to({rotation:99.3311,x:26.4304,y:4.4166},0).wait(1).to({rotation:99.9331,x:26.3731,y:4.6882},0).wait(1).to({rotation:100.5351,x:26.313,y:4.9592},0).wait(1).to({rotation:101.1371,x:26.25,y:5.2296},0).wait(1).to({rotation:101.7391,x:26.1842,y:5.4993},0).wait(1).to({rotation:102.3411,x:26.1155,y:5.7683},0).wait(1).to({rotation:102.9431,x:26.0441,y:6.0365},0).wait(1).to({rotation:103.5452,x:25.9698,y:6.304},0).wait(1).to({rotation:104.1472,x:25.8927,y:6.5707},0).wait(1).to({rotation:104.7492,x:25.8128,y:6.8365},0).wait(1).to({rotation:105.3512,x:25.7301,y:7.1015},0).wait(1).to({rotation:105.9532,x:25.6447,y:7.3656},0).wait(1).to({rotation:106.5552,x:25.5564,y:7.6289},0).wait(1).to({rotation:107.1572,x:25.4654,y:7.8911},0).wait(1).to({rotation:107.7592,x:25.3717,y:8.1524},0).wait(1).to({rotation:108.3612,x:25.2752,y:8.4127},0).wait(1).to({rotation:108.9632,x:25.176,y:8.672},0).wait(1).to({rotation:109.5652,x:25.0741,y:8.9302},0).wait(1).to({rotation:110.1672,x:24.9694,y:9.1873},0).wait(1).to({rotation:110.7692,x:24.8621,y:9.4433},0).wait(1).to({rotation:111.3712,x:24.7521,y:9.6982},0).wait(1).to({rotation:111.9732,x:24.6394,y:9.9519},0).wait(1).to({rotation:112.5753,x:24.524,y:10.2044},0).wait(1).to({rotation:113.1773,x:24.406,y:10.4557},0).wait(1).to({rotation:113.7793,x:24.2854,y:10.7057},0).wait(1).to({rotation:114.3813,x:24.1622,y:10.9545},0).wait(1).to({rotation:114.9833,x:24.0363,y:11.2019},0).wait(1).to({rotation:115.5853,x:23.9079,y:11.448},0).wait(1).to({rotation:116.1873,x:23.7768,y:11.6927},0).wait(1).to({rotation:116.7893,x:23.6432,y:11.9361},0).wait(1).to({rotation:117.3913,x:23.5071,y:12.178},0).wait(1).to({rotation:117.9933,x:23.3684,y:12.4185},0).wait(1).to({rotation:118.5953,x:23.2272,y:12.6575},0).wait(1).to({rotation:119.1973,x:23.0835,y:12.895},0).wait(1).to({rotation:119.7993,x:22.9373,y:13.131},0).wait(1).to({rotation:120.4013,x:22.7887,y:13.3654},0).wait(1).to({rotation:121.0033,x:22.6376,y:13.5983},0).wait(1).to({rotation:121.6054,x:22.484,y:13.8296},0).wait(1).to({rotation:122.2074,x:22.3281,y:14.0592},0).wait(1).to({rotation:122.8094,x:22.1697,y:14.2872},0).wait(1).to({rotation:123.4114,x:22.0089,y:14.5135},0).wait(1).to({rotation:124.0134,x:21.8458,y:14.7382},0).wait(1).to({rotation:124.6154,x:21.6803,y:14.961},0).wait(1).to({rotation:125.2174,x:21.5125,y:15.1822},0).wait(1).to({rotation:125.8194,x:21.3424,y:15.4015},0).wait(1).to({rotation:126.4214,x:21.1699,y:15.6191},0).wait(1).to({rotation:127.0234,x:20.9952,y:15.8348},0).wait(1).to({rotation:127.6254,x:20.8183,y:16.0487},0).wait(1).to({rotation:128.2274,x:20.6391,y:16.2607},0).wait(1).to({rotation:128.8294,x:20.4577,y:16.4709},0).wait(1).to({rotation:129.4314,x:20.2741,y:16.6791},0).wait(1).to({rotation:130.0334,x:20.0883,y:16.8853},0).wait(1).to({rotation:130.6355,x:19.9003,y:17.0897},0).wait(1).to({rotation:131.2375,x:19.7102,y:17.292},0).wait(1).to({rotation:131.8395,x:19.518,y:17.4923},0).wait(1).to({rotation:132.4415,x:19.3238,y:17.6906},0).wait(1).to({rotation:133.0435,x:19.1274,y:17.8868},0).wait(1).to({rotation:133.6455,x:18.929,y:18.0809},0).wait(1).to({rotation:134.2475,x:18.7285,y:18.273},0).wait(1).to({rotation:134.8495,x:18.5261,y:18.4629},0).wait(1).to({rotation:135.4515,x:18.3216,y:18.6507},0).wait(1).to({rotation:136.0535,x:18.1152,y:18.8364},0).wait(1).to({rotation:136.6555,x:17.9069,y:19.0198},0).wait(1).to({rotation:137.2575,x:17.6967,y:19.2011},0).wait(1).to({rotation:137.8595,x:17.4845,y:19.3802},0).wait(1).to({rotation:138.4615,x:17.2705,y:19.557},0).wait(1).to({rotation:139.0635,x:17.0546,y:19.7315},0).wait(1).to({rotation:139.6656,x:16.837,y:19.9038},0).wait(1).to({rotation:140.2676,x:16.6175,y:20.0738},0).wait(1).to({rotation:140.8696,x:16.3962,y:20.2414},0).wait(1).to({rotation:141.4716,x:16.1732,y:20.4067},0).wait(1).to({rotation:142.0736,x:15.9485,y:20.5697},0).wait(1).to({rotation:142.6756,x:15.7221,y:20.7303},0).wait(1).to({rotation:143.2776,x:15.494,y:20.8885},0).wait(1).to({rotation:143.8796,x:15.2642,y:21.0444},0).wait(1).to({rotation:144.4816,x:15.0328,y:21.1977},0).wait(1).to({rotation:145.0836,x:14.7999,y:21.3487},0).wait(1).to({rotation:145.6856,x:14.5653,y:21.4972},0).wait(1).to({rotation:146.2876,x:14.3292,y:21.6432},0).wait(1).to({rotation:146.8896,x:14.0916,y:21.7867},0).wait(1).to({rotation:147.4916,x:13.8525,y:21.9278},0).wait(1).to({rotation:148.0936,x:13.6119,y:22.0663},0).wait(1).to({rotation:148.6957,x:13.3699,y:22.2022},0).wait(1).to({rotation:149.2977,x:13.1264,y:22.3357},0).wait(1).to({rotation:149.8997,x:12.8816,y:22.4665},0).wait(1).to({rotation:150.5017,x:12.6354,y:22.5948},0).wait(1).to({rotation:151.1037,x:12.3879,y:22.7205},0).wait(1).to({rotation:151.7057,x:12.1391,y:22.8435},0).wait(1).to({rotation:152.3077,x:11.889,y:22.964},0).wait(1).to({rotation:152.9097,x:11.6376,y:23.0818},0).wait(1).to({rotation:153.5117,x:11.385,y:23.197},0).wait(1).to({rotation:154.1137,x:11.1312,y:23.3095},0).wait(1).to({rotation:154.7157,x:10.8763,y:23.4193},0).wait(1).to({rotation:155.3177,x:10.6202,y:23.5265},0).wait(1).to({rotation:155.9197,x:10.363,y:23.631},0).wait(1).to({rotation:156.5217,x:10.1047,y:23.7327},0).wait(1).to({rotation:157.1237,x:9.8454,y:23.8317},0).wait(1).to({rotation:157.7258,x:9.585,y:23.928},0).wait(1).to({rotation:158.3278,x:9.3237,y:24.0216},0).wait(1).to({rotation:158.9298,x:9.0613,y:24.1124},0).wait(1).to({rotation:159.5318,x:8.7981,y:24.2004},0).wait(1).to({rotation:160.1338,x:8.5339,y:24.2857},0).wait(1).to({rotation:160.7358,x:8.2688,y:24.3682},0).wait(1).to({rotation:161.3378,x:8.0029,y:24.4479},0).wait(1).to({rotation:161.9398,x:7.7362,y:24.5248},0).wait(1).to({rotation:162.5418,x:7.4686,y:24.5989},0).wait(1).to({rotation:163.1438,x:7.2003,y:24.6702},0).wait(1).to({rotation:163.7458,x:6.9313,y:24.7387},0).wait(1).to({rotation:164.3478,x:6.6616,y:24.8043},0).wait(1).to({rotation:164.9498,x:6.3912,y:24.8671},0).wait(1).to({rotation:165.5518,x:6.1201,y:24.927},0).wait(1).to({rotation:166.1538,x:5.8484,y:24.9841},0).wait(1).to({rotation:166.7559,x:5.5762,y:25.0384},0).wait(1).to({rotation:167.3579,x:5.3034,y:25.0898},0).wait(1).to({rotation:167.9599,x:5.0301,y:25.1383},0).wait(1).to({rotation:168.5619,x:4.7562,y:25.1839},0).wait(1).to({rotation:169.1639,x:4.4819,y:25.2267},0).wait(1).to({rotation:169.7659,x:4.2072,y:25.2665},0).wait(1).to({rotation:170.3679,x:3.9321,y:25.3035},0).wait(1).to({rotation:170.9699,x:3.6566,y:25.3376},0).wait(1).to({rotation:171.5719,x:3.3807,y:25.3688},0).wait(1).to({rotation:172.1739,x:3.1046,y:25.3971},0).wait(1).to({rotation:172.7759,x:2.8281,y:25.4225},0).wait(1).to({rotation:173.3779,x:2.5514,y:25.445},0).wait(1).to({rotation:173.9799,x:2.2745,y:25.4645},0).wait(1).to({rotation:174.5819,x:1.9974,y:25.4812},0).wait(1).to({rotation:175.1839,x:1.7202,y:25.4949},0).wait(1).to({rotation:175.786,x:1.4428,y:25.5058},0).wait(1).to({rotation:176.388,x:1.1653,y:25.5137},0).wait(1).to({rotation:176.99,x:0.8877,y:25.5187},0).wait(1).to({rotation:177.592,x:0.6101,y:25.5208},0).wait(1).to({rotation:178.194,x:0.3325,y:25.52},0).wait(1).to({rotation:178.796,x:0.055,y:25.5162},0).wait(1).to({rotation:179.398,x:-0.2226,y:25.5096},0).wait(1).to({rotation:180,x:-0.5,y:25.5},0).wait(1).to({rotation:180.602,x:-0.7773,y:25.4875},0).wait(1).to({rotation:181.204,x:-1.0545,y:25.4721},0).wait(1).to({rotation:181.806,x:-1.3315,y:25.4538},0).wait(1).to({rotation:182.408,x:-1.6083,y:25.4326},0).wait(1).to({rotation:183.01,x:-1.8848,y:25.4084},0).wait(1).to({rotation:183.612,x:-2.1611,y:25.3814},0).wait(1).to({rotation:184.214,x:-2.4371,y:25.3515},0).wait(1).to({rotation:184.8161,x:-2.7128,y:25.3186},0).wait(1).to({rotation:185.4181,x:-2.9881,y:25.2829},0).wait(1).to({rotation:186.0201,x:-3.263,y:25.2443},0).wait(1).to({rotation:186.6221,x:-3.5374,y:25.2028},0).wait(1).to({rotation:187.2241,x:-3.8115,y:25.1584},0).wait(1).to({rotation:187.8261,x:-4.085,y:25.1111},0).wait(1).to({rotation:188.4281,x:-4.3581,y:25.061},0).wait(1).to({rotation:189.0301,x:-4.6306,y:25.008},0).wait(1).to({rotation:189.6321,x:-4.9025,y:24.9521},0).wait(1).to({rotation:190.2341,x:-5.1738,y:24.8934},0).wait(1).to({rotation:190.8361,x:-5.4445,y:24.8319},0).wait(1).to({rotation:191.4381,x:-5.7145,y:24.7675},0).wait(1).to({rotation:192.0401,x:-5.9839,y:24.7002},0).wait(1).to({rotation:192.6421,x:-6.2525,y:24.6302},0).wait(1).to({rotation:193.2441,x:-6.5203,y:24.5573},0).wait(1).to({rotation:193.8462,x:-6.7874,y:24.4816},0).wait(1).to({rotation:194.4482,x:-7.0537,y:24.4031},0).wait(1).to({rotation:195.0502,x:-7.3191,y:24.3218},0).wait(1).to({rotation:195.6522,x:-7.5837,y:24.2377},0).wait(1).to({rotation:196.2542,x:-7.8474,y:24.1509},0).wait(1).to({rotation:196.8562,x:-8.1101,y:24.0613},0).wait(1).to({rotation:197.4582,x:-8.3719,y:23.9689},0).wait(1).to({rotation:198.0602,x:-8.6327,y:23.8738},0).wait(1).to({rotation:198.6622,x:-8.8925,y:23.7759},0).wait(1).to({rotation:199.2642,x:-9.1512,y:23.6754},0).wait(1).to({rotation:199.8662,x:-9.4089,y:23.5721},0).wait(1).to({rotation:200.4682,x:-9.6655,y:23.4661},0).wait(1).to({rotation:201.0702,x:-9.9209,y:23.3574},0).wait(1).to({rotation:201.6722,x:-10.1752,y:23.2461},0).wait(1).to({rotation:202.2742,x:-10.4283,y:23.132},0).wait(1).to({rotation:202.8763,x:-10.6802,y:23.0154},0).wait(1).to({rotation:203.4783,x:-10.9309,y:22.8961},0).wait(1).to({rotation:204.0803,x:-11.1802,y:22.7741},0).wait(1).to({rotation:204.6823,x:-11.4283,y:22.6496},0).wait(1).to({rotation:205.2843,x:-11.6751,y:22.5224},0).wait(1).to({rotation:205.8863,x:-11.9205,y:22.3927},0).wait(1).to({rotation:206.4883,x:-12.1646,y:22.2604},0).wait(1).to({rotation:207.0903,x:-12.4072,y:22.1255},0).wait(1).to({rotation:207.6923,x:-12.6484,y:21.9881},0).wait(1).to({rotation:208.2943,x:-12.8882,y:21.8481},0).wait(1).to({rotation:208.8963,x:-13.1264,y:21.7057},0).wait(1).to({rotation:209.4983,x:-13.3632,y:21.5608},0).wait(1).to({rotation:210.1003,x:-13.5984,y:21.4133},0).wait(1).to({rotation:210.7023,x:-13.8321,y:21.2634},0).wait(1).to({rotation:211.3043,x:-14.0642,y:21.1111},0).wait(1).to({rotation:211.9064,x:-14.2946,y:20.9563},0).wait(1).to({rotation:212.5084,x:-14.5234,y:20.7992},0).wait(1).to({rotation:213.1104,x:-14.7506,y:20.6396},0).wait(1).to({rotation:213.7124,x:-14.9761,y:20.4776},0).wait(1).to({rotation:214.3144,x:-15.1998,y:20.3133},0).wait(1).to({rotation:214.9164,x:-15.4218,y:20.1467},0).wait(1).to({rotation:215.5184,x:-15.6421,y:19.9777},0).wait(1).to({rotation:216.1204,x:-15.8605,y:19.8064},0).wait(1).to({rotation:216.7224,x:-16.0772,y:19.6329},0).wait(1).to({rotation:217.3244,x:-16.292,y:19.457},0).wait(1).to({rotation:217.9264,x:-16.505,y:19.279},0).wait(1).to({rotation:218.5284,x:-16.716,y:19.0987},0).wait(1).to({rotation:219.1304,x:-16.9252,y:18.9161},0).wait(1).to({rotation:219.7324,x:-17.1325,y:18.7314},0).wait(1).to({rotation:220.3344,x:-17.3377,y:18.5446},0).wait(1).to({rotation:220.9365,x:-17.5411,y:18.3555},0).wait(1).to({rotation:221.5385,x:-17.7424,y:18.1644},0).wait(1).to({rotation:222.1405,x:-17.9417,y:17.9712},0).wait(1).to({rotation:222.7425,x:-18.1389,y:17.7758},0).wait(1).to({rotation:223.3445,x:-18.3341,y:17.5784},0).wait(1).to({rotation:223.9465,x:-18.5272,y:17.379},0).wait(1).to({rotation:224.5485,x:-18.7182,y:17.1776},0).wait(1).to({rotation:225.1505,x:-18.9071,y:16.9741},0).wait(1).to({rotation:225.7525,x:-19.0938,y:16.7687},0).wait(1).to({rotation:226.3545,x:-19.2784,y:16.5613},0).wait(1).to({rotation:226.9565,x:-19.4608,y:16.352},0).wait(1).to({rotation:227.5585,x:-19.6409,y:16.1408},0).wait(1).to({rotation:228.1605,x:-19.8188,y:15.9277},0).wait(1).to({rotation:228.7625,x:-19.9945,y:15.7128},0).wait(1).to({rotation:229.3645,x:-20.1679,y:15.496},0).wait(1).to({rotation:229.9666,x:-20.3391,y:15.2774},0).wait(1).to({rotation:230.5686,x:-20.5079,y:15.0571},0).wait(1).to({rotation:231.1706,x:-20.6744,y:14.8349},0).wait(1).to({rotation:231.7726,x:-20.8385,y:14.6111},0).wait(1).to({rotation:232.3746,x:-21.0003,y:14.3855},0).wait(1).to({rotation:232.9766,x:-21.1597,y:14.1582},0).wait(1).to({rotation:233.5786,x:-21.3167,y:13.9293},0).wait(1).to({rotation:234.1806,x:-21.4713,y:13.6987},0).wait(1).to({rotation:234.7826,x:-21.6235,y:13.4665},0).wait(1).to({rotation:235.3846,x:-21.7732,y:13.2328},0).wait(1).to({rotation:235.9866,x:-21.9205,y:12.9975},0).wait(1).to({rotation:236.5886,x:-22.0653,y:12.7606},0).wait(1).to({rotation:237.1906,x:-22.2076,y:12.5222},0).wait(1).to({rotation:237.7926,x:-22.3473,y:12.2824},0).wait(1).to({rotation:238.3946,x:-22.4846,y:12.0411},0).wait(1).to({rotation:238.9967,x:-22.6193,y:11.7983},0).wait(1).to({rotation:239.5987,x:-22.7514,y:11.5542},0).wait(1).to({rotation:240.2007,x:-22.881,y:11.3087},0).wait(1).to({rotation:240.8027,x:-23.008,y:11.0618},0).wait(1).to({rotation:241.4047,x:-23.1323,y:10.8136},0).wait(1).to({rotation:242.0067,x:-23.2541,y:10.5642},0).wait(1).to({rotation:242.6087,x:-23.3732,y:10.3134},0).wait(1).to({rotation:243.2107,x:-23.4897,y:10.0615},0).wait(1).to({rotation:243.8127,x:-23.6036,y:9.8083},0).wait(1).to({rotation:244.4147,x:-23.7148,y:9.5539},0).wait(1).to({rotation:245.0167,x:-23.8233,y:9.2984},0).wait(1).to({rotation:245.6187,x:-23.9291,y:9.0417},0).wait(1).to({rotation:246.2207,x:-24.0322,y:8.784},0).wait(1).to({rotation:246.8227,x:-24.1326,y:8.5252},0).wait(1).to({rotation:247.4247,x:-24.2302,y:8.2653},0).wait(1).to({rotation:248.0268,x:-24.3252,y:8.0045},0).wait(1).to({rotation:248.6288,x:-24.4173,y:7.7426},0).wait(1).to({rotation:249.2308,x:-24.5068,y:7.4798},0).wait(1).to({rotation:249.8328,x:-24.5934,y:7.2161},0).wait(1).to({rotation:250.4348,x:-24.6773,y:6.9514},0).wait(1).to({rotation:251.0368,x:-24.7584,y:6.686},0).wait(1).to({rotation:251.6388,x:-24.8367,y:6.4196},0).wait(1).to({rotation:252.2408,x:-24.9122,y:6.1525},0).wait(1).to({rotation:252.8428,x:-24.9849,y:5.8846},0).wait(1).to({rotation:253.4448,x:-25.0548,y:5.6159},0).wait(1).to({rotation:254.0468,x:-25.1218,y:5.3465},0).wait(1).to({rotation:254.6488,x:-25.1861,y:5.0765},0).wait(1).to({rotation:255.2508,x:-25.2474,y:4.8057},0).wait(1).to({rotation:255.8528,x:-25.306,y:4.5344},0).wait(1).to({rotation:256.4548,x:-25.3616,y:4.2624},0).wait(1).to({rotation:257.0569,x:-25.4144,y:3.9899},0).wait(1).to({rotation:257.6589,x:-25.4644,y:3.7168},0).wait(1).to({rotation:258.2609,x:-25.5114,y:3.4432},0).wait(1).to({rotation:258.8629,x:-25.5556,y:3.1691},0).wait(1).to({rotation:259.4649,x:-25.597,y:2.8946},0).wait(1).to({rotation:260.0669,x:-25.6354,y:2.6197},0).wait(1).to({rotation:260.6689,x:-25.6709,y:2.3444},0).wait(1).to({rotation:261.2709,x:-25.7036,y:2.0687},0).wait(1).to({rotation:261.8729,x:-25.7333,y:1.7927},0).wait(1).to({rotation:262.4749,x:-25.7601,y:1.5164},0).wait(1).to({rotation:263.0769,x:-25.7841,y:1.2398},0).wait(1).to({rotation:263.6789,x:-25.8051,y:0.963},0).wait(1).to({rotation:264.2809,x:-25.8232,y:0.686},0).wait(1).to({rotation:264.8829,x:-25.8384,y:0.4088},0).wait(1).to({rotation:265.4849,x:-25.8507,y:0.1315},0).wait(1).to({rotation:266.087,x:-25.8601,y:-0.146},0).wait(1).to({rotation:266.689,x:-25.8666,y:-0.4235},0).wait(1).to({rotation:267.291,x:-25.8701,y:-0.7011},0).wait(1).to({rotation:267.893,x:-25.8708,y:-0.9787},0).wait(1).to({rotation:268.495,x:-25.8685,y:-1.2563},0).wait(1).to({rotation:269.097,x:-25.8633,y:-1.5338},0).wait(1).to({rotation:269.699,x:-25.8552,y:-1.8113},0).wait(1).to({rotation:270.301,x:-25.8441,y:-2.0887},0).wait(1).to({rotation:270.903,x:-25.8302,y:-2.3659},0).wait(1).to({rotation:271.505,x:-25.8133,y:-2.643},0).wait(1).to({rotation:272.107,x:-25.7935,y:-2.9199},0).wait(1).to({rotation:272.709,x:-25.7709,y:-3.1966},0).wait(1).to({rotation:273.311,x:-25.7453,y:-3.473},0).wait(1).to({rotation:273.913,x:-25.7168,y:-3.7492},0).wait(1).to({rotation:274.5151,x:-25.6854,y:-4.025},0).wait(1).to({rotation:275.1171,x:-25.6511,y:-4.3005},0).wait(1).to({rotation:275.7191,x:-25.614,y:-4.5756},0).wait(1).to({rotation:276.3211,x:-25.5739,y:-4.8503},0).wait(1).to({rotation:276.9231,x:-25.531,y:-5.1245},0).wait(1).to({rotation:277.5251,x:-25.4851,y:-5.3983},0).wait(1).to({rotation:278.1271,x:-25.4364,y:-5.6716},0).wait(1).to({rotation:278.7291,x:-25.3849,y:-5.9444},0).wait(1).to({rotation:279.3311,x:-25.3304,y:-6.2166},0).wait(1).to({rotation:279.9331,x:-25.2731,y:-6.4882},0).wait(1).to({rotation:280.5351,x:-25.213,y:-6.7592},0).wait(1).to({rotation:281.1371,x:-25.15,y:-7.0296},0).wait(1).to({rotation:281.7391,x:-25.0842,y:-7.2993},0).wait(1).to({rotation:282.3411,x:-25.0155,y:-7.5683},0).wait(1).to({rotation:282.9431,x:-24.9441,y:-7.8365},0).wait(1).to({rotation:283.5452,x:-24.8698,y:-8.104},0).wait(1).to({rotation:284.1472,x:-24.7927,y:-8.3707},0).wait(1).to({rotation:284.7492,x:-24.7128,y:-8.6365},0).wait(1).to({rotation:285.3512,x:-24.6301,y:-8.9015},0).wait(1).to({rotation:285.9532,x:-24.5447,y:-9.1656},0).wait(1).to({rotation:286.5552,x:-24.4564,y:-9.4289},0).wait(1).to({rotation:287.1572,x:-24.3654,y:-9.6911},0).wait(1).to({rotation:287.7592,x:-24.2717,y:-9.9524},0).wait(1).to({rotation:288.3612,x:-24.1752,y:-10.2127},0).wait(1).to({rotation:288.9632,x:-24.076,y:-10.472},0).wait(1).to({rotation:289.5652,x:-23.9741,y:-10.7302},0).wait(1).to({rotation:290.1672,x:-23.8694,y:-10.9873},0).wait(1).to({rotation:290.7692,x:-23.7621,y:-11.2433},0).wait(1).to({rotation:291.3712,x:-23.6521,y:-11.4982},0).wait(1).to({rotation:291.9732,x:-23.5394,y:-11.7519},0).wait(1).to({rotation:292.5753,x:-23.424,y:-12.0044},0).wait(1).to({rotation:293.1773,x:-23.306,y:-12.2557},0).wait(1).to({rotation:293.7793,x:-23.1854,y:-12.5057},0).wait(1).to({rotation:294.3813,x:-23.0622,y:-12.7545},0).wait(1).to({rotation:294.9833,x:-22.9363,y:-13.0019},0).wait(1).to({rotation:295.5853,x:-22.8079,y:-13.248},0).wait(1).to({rotation:296.1873,x:-22.6768,y:-13.4927},0).wait(1).to({rotation:296.7893,x:-22.5432,y:-13.7361},0).wait(1).to({rotation:297.3913,x:-22.4071,y:-13.978},0).wait(1).to({rotation:297.9933,x:-22.2684,y:-14.2185},0).wait(1).to({rotation:298.5953,x:-22.1272,y:-14.4575},0).wait(1).to({rotation:299.1973,x:-21.9835,y:-14.695},0).wait(1).to({rotation:299.7993,x:-21.8373,y:-14.931},0).wait(1).to({rotation:300.4013,x:-21.6887,y:-15.1654},0).wait(1).to({rotation:301.0033,x:-21.5376,y:-15.3983},0).wait(1).to({rotation:301.6054,x:-21.384,y:-15.6296},0).wait(1).to({rotation:302.2074,x:-21.2281,y:-15.8592},0).wait(1).to({rotation:302.8094,x:-21.0697,y:-16.0872},0).wait(1).to({rotation:303.4114,x:-20.9089,y:-16.3135},0).wait(1).to({rotation:304.0134,x:-20.7458,y:-16.5382},0).wait(1).to({rotation:304.6154,x:-20.5803,y:-16.761},0).wait(1).to({rotation:305.2174,x:-20.4125,y:-16.9822},0).wait(1).to({rotation:305.8194,x:-20.2424,y:-17.2015},0).wait(1).to({rotation:306.4214,x:-20.0699,y:-17.4191},0).wait(1).to({rotation:307.0234,x:-19.8952,y:-17.6348},0).wait(1).to({rotation:307.6254,x:-19.7183,y:-17.8487},0).wait(1).to({rotation:308.2274,x:-19.5391,y:-18.0607},0).wait(1).to({rotation:308.8294,x:-19.3577,y:-18.2709},0).wait(1).to({rotation:309.4314,x:-19.1741,y:-18.4791},0).wait(1).to({rotation:310.0334,x:-18.9883,y:-18.6853},0).wait(1).to({rotation:310.6355,x:-18.8003,y:-18.8897},0).wait(1).to({rotation:311.2375,x:-18.6102,y:-19.092},0).wait(1).to({rotation:311.8395,x:-18.418,y:-19.2923},0).wait(1).to({rotation:312.4415,x:-18.2238,y:-19.4906},0).wait(1).to({rotation:313.0435,x:-18.0274,y:-19.6868},0).wait(1).to({rotation:313.6455,x:-17.829,y:-19.8809},0).wait(1).to({rotation:314.2475,x:-17.6285,y:-20.073},0).wait(1).to({rotation:314.8495,x:-17.4261,y:-20.2629},0).wait(1).to({rotation:315.4515,x:-17.2216,y:-20.4507},0).wait(1).to({rotation:316.0535,x:-17.0152,y:-20.6364},0).wait(1).to({rotation:316.6555,x:-16.8069,y:-20.8198},0).wait(1).to({rotation:317.2575,x:-16.5967,y:-21.0011},0).wait(1).to({rotation:317.8595,x:-16.3845,y:-21.1802},0).wait(1).to({rotation:318.4615,x:-16.1705,y:-21.357},0).wait(1).to({rotation:319.0635,x:-15.9546,y:-21.5315},0).wait(1).to({rotation:319.6656,x:-15.737,y:-21.7038},0).wait(1).to({rotation:320.2676,x:-15.5175,y:-21.8738},0).wait(1).to({rotation:320.8696,x:-15.2962,y:-22.0414},0).wait(1).to({rotation:321.4716,x:-15.0732,y:-22.2067},0).wait(1).to({rotation:322.0736,x:-14.8485,y:-22.3697},0).wait(1).to({rotation:322.6756,x:-14.6221,y:-22.5303},0).wait(1).to({rotation:323.2776,x:-14.394,y:-22.6885},0).wait(1).to({rotation:323.8796,x:-14.1642,y:-22.8444},0).wait(1).to({rotation:324.4816,x:-13.9328,y:-22.9977},0).wait(1).to({rotation:325.0836,x:-13.6999,y:-23.1487},0).wait(1).to({rotation:325.6856,x:-13.4653,y:-23.2972},0).wait(1).to({rotation:326.2876,x:-13.2292,y:-23.4432},0).wait(1).to({rotation:326.8896,x:-12.9916,y:-23.5867},0).wait(1).to({rotation:327.4916,x:-12.7525,y:-23.7278},0).wait(1).to({rotation:328.0936,x:-12.5119,y:-23.8663},0).wait(1).to({rotation:328.6957,x:-12.2699,y:-24.0022},0).wait(1).to({rotation:329.2977,x:-12.0264,y:-24.1357},0).wait(1).to({rotation:329.8997,x:-11.7816,y:-24.2665},0).wait(1).to({rotation:330.5017,x:-11.5354,y:-24.3948},0).wait(1).to({rotation:331.1037,x:-11.2879,y:-24.5205},0).wait(1).to({rotation:331.7057,x:-11.0391,y:-24.6435},0).wait(1).to({rotation:332.3077,x:-10.789,y:-24.764},0).wait(1).to({rotation:332.9097,x:-10.5376,y:-24.8818},0).wait(1).to({rotation:333.5117,x:-10.285,y:-24.997},0).wait(1).to({rotation:334.1137,x:-10.0312,y:-25.1095},0).wait(1).to({rotation:334.7157,x:-9.7763,y:-25.2193},0).wait(1).to({rotation:335.3177,x:-9.5202,y:-25.3265},0).wait(1).to({rotation:335.9197,x:-9.263,y:-25.431},0).wait(1).to({rotation:336.5217,x:-9.0047,y:-25.5327},0).wait(1).to({rotation:337.1237,x:-8.7454,y:-25.6317},0).wait(1).to({rotation:337.7258,x:-8.485,y:-25.728},0).wait(1).to({rotation:338.3278,x:-8.2237,y:-25.8216},0).wait(1).to({rotation:338.9298,x:-7.9613,y:-25.9124},0).wait(1).to({rotation:339.5318,x:-7.6981,y:-26.0004},0).wait(1).to({rotation:340.1338,x:-7.4339,y:-26.0857},0).wait(1).to({rotation:340.7358,x:-7.1688,y:-26.1682},0).wait(1).to({rotation:341.3378,x:-6.9029,y:-26.2479},0).wait(1).to({rotation:341.9398,x:-6.6362,y:-26.3248},0).wait(1).to({rotation:342.5418,x:-6.3686,y:-26.3989},0).wait(1).to({rotation:343.1438,x:-6.1003,y:-26.4702},0).wait(1).to({rotation:343.7458,x:-5.8313,y:-26.5387},0).wait(1).to({rotation:344.3478,x:-5.5616,y:-26.6043},0).wait(1).to({rotation:344.9498,x:-5.2912,y:-26.6671},0).wait(1).to({rotation:345.5518,x:-5.0201,y:-26.727},0).wait(1).to({rotation:346.1538,x:-4.7484,y:-26.7841},0).wait(1).to({rotation:346.7559,x:-4.4762,y:-26.8384},0).wait(1).to({rotation:347.3579,x:-4.2034,y:-26.8898},0).wait(1).to({rotation:347.9599,x:-3.9301,y:-26.9383},0).wait(1).to({rotation:348.5619,x:-3.6562,y:-26.9839},0).wait(1).to({rotation:349.1639,x:-3.3819,y:-27.0267},0).wait(1).to({rotation:349.7659,x:-3.1072,y:-27.0665},0).wait(1).to({rotation:350.3679,x:-2.8321,y:-27.1035},0).wait(1).to({rotation:350.9699,x:-2.5566,y:-27.1376},0).wait(1).to({rotation:351.5719,x:-2.2807,y:-27.1688},0).wait(1).to({rotation:352.1739,x:-2.0046,y:-27.1971},0).wait(1).to({rotation:352.7759,x:-1.7281,y:-27.2225},0).wait(1).to({rotation:353.3779,x:-1.4514,y:-27.245},0).wait(1).to({rotation:353.9799,x:-1.1745,y:-27.2645},0).wait(1).to({rotation:354.5819,x:-0.8974,y:-27.2812},0).wait(1).to({rotation:355.1839,x:-0.6202,y:-27.2949},0).wait(1).to({rotation:355.786,x:-0.3428,y:-27.3058},0).wait(1).to({rotation:356.388,x:-0.0653,y:-27.3137},0).wait(1).to({rotation:356.99,x:0.2123,y:-27.3187},0).wait(1).to({rotation:357.592,x:0.4899,y:-27.3208},0).wait(1).to({rotation:358.194,x:0.7675,y:-27.32},0).wait(1).to({rotation:358.796,x:1.045,y:-27.3162},0).wait(1).to({rotation:359.398,x:1.3226,y:-27.3096},0).wait(1).to({rotation:360,x:1.6,y:-27.3},0).wait(2));

	// body
	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(-75.5,-75.5,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(600));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.5,-75.5,151.2,151.2);


(lib.snail_walkin_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smile
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(168.5,-38.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(89).to({_off:true},1).wait(510));

	// eyes
	this.instance_1 = new lib.eye("synched",0,false);
	this.instance_1.setTransform(170.25,-135.95,1,1,0,0,0,4.6,-1.9);

	this.instance_2 = new lib.eye("synched",0,false);
	this.instance_2.setTransform(230.95,-132.05,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{startPosition:0}},{t:this.instance_1,p:{startPosition:0}}]}).to({state:[{t:this.instance_2,p:{startPosition:19}},{t:this.instance_1,p:{startPosition:19}}]},89).to({state:[]},1).wait(510));

	// clock
	this.instance_3 = new lib.clock9();
	this.instance_3.setTransform(-64.25,40.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(89).to({_off:true},1).wait(510));

	// shell
	this.instance_4 = new lib.shell("synched",0);
	this.instance_4.setTransform(-30.05,38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(1).to({startPosition:0},0).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(22).to({startPosition:0},0).to({_off:true},1).wait(510));

	// tail
	this.instance_5 = new lib.tail("synched",0);
	this.instance_5.setTransform(-110.85,128.85,1,1,0,0,0,72.8,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},1).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},22).to({_off:true},1).wait(510));

	// front
	this.instance_6 = new lib.top("synched",0);
	this.instance_6.setTransform(125.65,15.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(1).to({regX:0,x:125.65},0).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(22).to({startPosition:0},0).to({_off:true},1).wait(510));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-256.7,-159.3,513,331.8);


(lib.scene4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mask_idn (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_94 = new cjs.Graphics().p("EA1nA5BMAAAgsrIBZAAMAAAAsrg");
	var mask_graphics_95 = new cjs.Graphics().p("AigWVMAAAgspIFBAAMAAAAspg");
	var mask_graphics_96 = new cjs.Graphics().p("AkUWVMAAAgspIIpAAMAAAAspg");
	var mask_graphics_97 = new cjs.Graphics().p("AmHWVMAAAgspIMPAAMAAAAspg");
	var mask_graphics_98 = new cjs.Graphics().p("An8WVMAAAgspIP4AAMAAAAspg");
	var mask_graphics_99 = new cjs.Graphics().p("ApwWVMAAAgspITgAAMAAAAspg");
	var mask_graphics_100 = new cjs.Graphics().p("ArjWVMAAAgspIXHAAMAAAAspg");
	var mask_graphics_101 = new cjs.Graphics().p("AtXWVMAAAgspIavAAMAAAAspg");
	var mask_graphics_102 = new cjs.Graphics().p("AvLWVMAAAgspIeXAAMAAAAspg");
	var mask_graphics_103 = new cjs.Graphics().p("Aw/WVMAAAgspMAh/AAAMAAAAspg");
	var mask_graphics_104 = new cjs.Graphics().p("AyzWVMAAAgspMAlnAAAMAAAAspg");
	var mask_graphics_105 = new cjs.Graphics().p("A0nWVMAAAgspMApPAAAMAAAAspg");
	var mask_graphics_106 = new cjs.Graphics().p("A2bWVMAAAgspMAs3AAAMAAAAspg");
	var mask_graphics_107 = new cjs.Graphics().p("A4PWVMAAAgspMAwfAAAMAAAAspg");
	var mask_graphics_108 = new cjs.Graphics().p("A6DWVMAAAgspMA0HAAAMAAAAspg");
	var mask_graphics_109 = new cjs.Graphics().p("A73WVMAAAgspMA3vAAAMAAAAspg");
	var mask_graphics_110 = new cjs.Graphics().p("A9rWVMAAAgspMA7XAAAMAAAAspg");
	var mask_graphics_111 = new cjs.Graphics().p("A/fWVMAAAgspMA+/AAAMAAAAspg");
	var mask_graphics_112 = new cjs.Graphics().p("EghTAWVMAAAgspMBCnAAAMAAAAspg");
	var mask_graphics_113 = new cjs.Graphics().p("EgjHAWVMAAAgspMBGPAAAMAAAAspg");
	var mask_graphics_114 = new cjs.Graphics().p("Egk7AWVMAAAgspMBJ3AAAMAAAAspg");
	var mask_graphics_115 = new cjs.Graphics().p("EgmvAWVMAAAgspMBNfAAAMAAAAspg");
	var mask_graphics_116 = new cjs.Graphics().p("EgojAWVMAAAgspMBRHAAAMAAAAspg");
	var mask_graphics_117 = new cjs.Graphics().p("EgqXAWVMAAAgspMBUvAAAMAAAAspg");
	var mask_graphics_118 = new cjs.Graphics().p("EgsLAWVMAAAgspMBYXAAAMAAAAspg");
	var mask_graphics_119 = new cjs.Graphics().p("Egt+AWVMAAAgspMBb+AAAMAAAAspg");
	var mask_graphics_120 = new cjs.Graphics().p("EgvyAWVMAAAgspMBfmAAAMAAAAspg");
	var mask_graphics_121 = new cjs.Graphics().p("EgxnAWVMAAAgspMBjPAAAMAAAAspg");
	var mask_graphics_122 = new cjs.Graphics().p("EgzaAWVMAAAgspMBm1AAAMAAAAspg");
	var mask_graphics_123 = new cjs.Graphics().p("Eg1OAWVMAAAgspMBqdAAAMAAAAspg");
	var mask_graphics_124 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_125 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_126 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_127 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_128 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_129 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_130 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_131 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_132 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_133 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_134 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_135 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_136 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_137 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_138 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_139 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_140 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_141 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_142 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_143 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_144 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_145 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_146 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_147 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_148 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_149 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_150 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_151 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_152 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_153 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_154 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_155 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_156 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_157 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_158 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_159 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_160 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_161 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_162 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_163 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_164 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_165 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_166 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_167 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_168 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_169 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_170 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_171 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_172 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_173 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_174 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_175 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_176 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_177 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_178 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");
	var mask_graphics_179 = new cjs.Graphics().p("Eg0+A4lMAAAgsrMBuFAAAMAAAAsrg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(94).to({graphics:mask_graphics_94,x:352,y:364.9164}).wait(1).to({graphics:mask_graphics_95,x:688.825,y:586.675}).wait(1).to({graphics:mask_graphics_96,x:678.125,y:586.525}).wait(1).to({graphics:mask_graphics_97,x:667.45,y:586.325}).wait(1).to({graphics:mask_graphics_98,x:656.75,y:586.125}).wait(1).to({graphics:mask_graphics_99,x:646.05,y:585.925}).wait(1).to({graphics:mask_graphics_100,x:635.35,y:585.775}).wait(1).to({graphics:mask_graphics_101,x:624.675,y:585.575}).wait(1).to({graphics:mask_graphics_102,x:613.975,y:585.375}).wait(1).to({graphics:mask_graphics_103,x:603.275,y:585.225}).wait(1).to({graphics:mask_graphics_104,x:592.575,y:585.025}).wait(1).to({graphics:mask_graphics_105,x:581.9,y:584.825}).wait(1).to({graphics:mask_graphics_106,x:571.2,y:584.675}).wait(1).to({graphics:mask_graphics_107,x:560.5,y:584.475}).wait(1).to({graphics:mask_graphics_108,x:549.8,y:584.275}).wait(1).to({graphics:mask_graphics_109,x:539.15,y:584.125}).wait(1).to({graphics:mask_graphics_110,x:528.45,y:583.925}).wait(1).to({graphics:mask_graphics_111,x:517.75,y:583.725}).wait(1).to({graphics:mask_graphics_112,x:507.05,y:583.525}).wait(1).to({graphics:mask_graphics_113,x:496.35,y:583.375}).wait(1).to({graphics:mask_graphics_114,x:485.675,y:583.175}).wait(1).to({graphics:mask_graphics_115,x:474.975,y:582.975}).wait(1).to({graphics:mask_graphics_116,x:464.275,y:582.825}).wait(1).to({graphics:mask_graphics_117,x:453.575,y:582.625}).wait(1).to({graphics:mask_graphics_118,x:442.9,y:582.425}).wait(1).to({graphics:mask_graphics_119,x:432.2,y:582.275}).wait(1).to({graphics:mask_graphics_120,x:421.5,y:582.075}).wait(1).to({graphics:mask_graphics_121,x:410.8,y:581.875}).wait(1).to({graphics:mask_graphics_122,x:400.125,y:581.675}).wait(1).to({graphics:mask_graphics_123,x:389.425,y:581.525}).wait(1).to({graphics:mask_graphics_124,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_125,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_126,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_127,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_128,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_129,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_130,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_131,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_132,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_133,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_134,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_135,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_136,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_137,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_138,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_139,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_140,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_141,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_142,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_143,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_144,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_145,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_146,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_147,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_148,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_149,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_150,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_151,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_152,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_153,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_154,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_155,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_156,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_157,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_158,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_159,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_160,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_161,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_162,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_163,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_164,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_165,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_166,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_167,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_168,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_169,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_170,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_171,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_172,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_173,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_174,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_175,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_176,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_177,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_178,x:365.5164,y:362.1414}).wait(1).to({graphics:mask_graphics_179,x:365.5164,y:362.1414}).wait(1));

	// TEXT
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(53,458.8,0.5,0.5);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(94).to({_off:false},0).wait(86));

	// box
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.8)").s().p("EApMASqMhSugAoQjFgCiKhiQiKhjACiJIAQ6SQABiKCMhgQCMhhDFACMBStAAoQDFABCKBjQCKBigBCKIgQaSQgCCJiLBhQiLBfjCAAIgEAAg");
	this.shape.setTransform(366.0237,579.0244);
	this.shape._off = true;

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(94).to({_off:false},0).wait(86));

	// snail
	this.instance_1 = new lib.snail_walkin_9("synched",0);
	this.instance_1.setTransform(-49.75,954.15,1,1,0,0,0,34.1,34.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:430.25,mode:"single",startPosition:89},89).wait(91));

	// lamp
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(51,49,73,0.671)").s().p("AgYgCIArAAIAHAAIgBACQgZADgYAAIAAgFg");
	this.shape_1.setTransform(478.55,291.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(36,34,51,0.471)").s().p("AgYgCIArAAIAGAAIAAACQgZADgYAAIAAgFg");
	this.shape_2.setTransform(471.575,291.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(25,24,35,0.337)").s().p("AgYgCIArAAIAGAAIAAACQgZADgYAAIAAgFg");
	this.shape_3.setTransform(463.325,292.5875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(55,53,78,0.722)").s().p("AAWADIgyAAIAAgFIAyAAIAGAAIAAAFIgGAAg");
	this.shape_4.setTransform(448.45,293.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(20,19,29,0.271)").s().p("AgYgCIArAAIAGAAIAAACQgZADgYAAIAAgFg");
	this.shape_5.setTransform(453.825,293.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(19,18,27,0.255)").s().p("AgbgCIAxAAIAGAAIAAACQgcADgbAAIAAgFg");
	this.shape_6.setTransform(440.85,293.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(46,44,65,0.608)").s().p("AATADIgsAAIAAgFIAsAAIAHAAIAAAFIgHAAg");
	this.shape_7.setTransform(435.45,293.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(22,21,31,0.302)").s().p("AgogCIBLAAIAGAAIAAACQgpADgoAAIAAgFg");
	this.shape_8.setTransform(422.475,294.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(148,114,89,0.933)").s().p("AATADQgWgDgVAAIAAgFIArAAIAGAAIAAAFQAAADgBACQgCABgDAAIAAgDg");
	this.shape_9.setTransform(415.8,294.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7D6566").s().p("AAZADIg3AAIAAgFIA3AAIAHAAIAAAFIgHAAg");
	this.shape_10.setTransform(410.1,294.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(32,30,45,0.427)").s().p("AgZgCIAsAAIAGAAIAAACQgZADgZAAIAAgFg");
	this.shape_11.setTransform(488.05,290.6875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(35,33,49,0.455)").s().p("AgYgCIArAAIAGAAIAAACQgZADgYAAIAAgFg");
	this.shape_12.setTransform(495.025,290.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(54,37,16,0.227)").s().p("AgfgCIA5AAIAFAAIAAACQgQADgNAAQgTAAgOgFg");
	this.shape_13.setTransform(390.45,312.877);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(52,49,74,0.686)").s().p("AgYgDQAYAAAZADIAAADIgGAAIgQABQgRAAgKgHg");
	this.shape_14.setTransform(311.225,292.0403);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(46,45,66,0.604)").s().p("AgZgDQAZAAAZADIABACIgHABIgPABQgSAAgLgHg");
	this.shape_15.setTransform(302.35,291.4033);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(45,43,65,0.596)").s().p("AgYgDQAYAAAZADIAAACIgGABIgQABQgRAAgKgHg");
	this.shape_16.setTransform(294.125,290.7903);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(41,39,58,0.545)").s().p("AgZgDQAZAAAZADIABADIgHAAIgQABQgRAAgLgHg");
	this.shape_17.setTransform(286.5,290.1403);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#60556C").s().p("AAgADIhFAAIAAgFIBFAAIAGAAIAAAFIgGAAg");
	this.shape_18.setTransform(403.125,294.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(251,175,76,0.992)").s().p("AAaBZIg5AAIgGgBQhcgRg7gxQg2gqgdhEIBrAAIAGAAIBHAAIAGAAICjAAIAHAAIBFAAIAHAAIA5AAIAGAAQAWAAAWAEIAAADIAAAFQgdA8gyAmQg/AzhjAQIgFAAg");
	this.shape_19.setTransform(390.45,303.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#5E546D").s().p("AAgADIhFAAIAAgFQAlAAAmACIAAADIgGAAg");
	this.shape_20.setTransform(378.4,294.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(28,27,39,0.376)").s().p("AgYgDIArAAIAGAAIAAAFIgGABIgQABQgRAAgKgHg");
	this.shape_21.setTransform(360.025,294.5903);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(134,107,99,0.988)").s().p("AA2ADIhrAAIgGAAIAAgFIBxAAIAGAAIAAAFIgGAAg");
	this.shape_22.setTransform(368.575,294.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(51,48,72,0.671)").s().p("AAWADIgyAAIAAgFQAcAAAcACIABADIgHAAg");
	this.shape_23.setTransform(346.4,293.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(23,22,34,0.318)").s().p("AgYgDIArAAIAGAAIAAAFIgGABIgPABQgSAAgKgHg");
	this.shape_24.setTransform(341.025,293.9533);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(21,20,30,0.282)").s().p("AgbgDIAxAAIAGAAIAAAFIgGABIgQABQgUAAgNgHg");
	this.shape_25.setTransform(328,293.3033);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(55,53,79,0.729)").s().p("AATADIgsAAIAAgFQAZAAAZACIABADIgHAAg");
	this.shape_26.setTransform(333.4,293.225);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(55,52,78,0.718)").s().p("AgYgDQAYAAAZADIAAACIgGABIgQABQgRAAgKgHg");
	this.shape_27.setTransform(321.375,292.6903);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#272D36").s().p("ABVXXIikAAIAAgDQgmgDgmAAIgHAAIhyAAIgGAAIgsAAIgHAAIhMAAIAAgDQgcgDgdAAIgGAAIgsAAIgHAAIgTAAIAAgDQgZgEgaAAIgGAAIgzAAIgGAAIgGAAIgBgDQgZgDgZAAIgGAAIgtAAIAAgDQgZgDgZAAIgHAAIgfAAIgBgDQgZgEgZAAIgGAAIgaAAIAAgDQgZgDgZAAIgHAAIgTAAIAAgDQgZgDgaAAIgGgBQglgDgNgcIAAhAQCLmgEckNQC2itD3hvQBRgkAkhUQgKh8BPgmQAAAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQAWAAAQgGIAGgBIAAmnIAAxvQArgzAfA6QABADAAADIAARuIAAGbQB8AQgJCVIgBAHQBOCGCfA9QAvASAtAdQFYDfDHF0QBHCGAWCxQACAOgNANQgLALgYgBIgGAAIgsAAIAAAGIgHAAIgMAAIgHAAIgsAAIAAAGIgGAAIgmAAIgHAAIgsAAIAAAHIgGAAIgNAAIgGAAIgtAAIAAAGIgGAAIgaAAIgGAAIgsAAIAAAGIgHAAIgmAAIgGAAIgsAAIgHAAIgyAAIAAAHIgHAAIgMAAIgHAAIgyAAIgHAAIgsAAIAAAGIgGAAIg5AAIgHAAIhMAAIgGAAIgtAAIgGAAIg5AAIgGAAIhGAAIAAAGIgGAAg");
	this.shape_28.setTransform(390.2133,145.2944);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(180));

	// reflect
	this.instance_2 = new lib.light_blub_("synched",0);
	this.instance_2.setTransform(387.3,344.85,1,1,0,0,0,-0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(180));

	// mask_ (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EidIBZ8MAAAiz3ME6RAAAMAAACz3gEgPlBD9QAaAiAWA8IAAAAIAkBlIAAAAQAXA2AoAiIAAAAQAtAmAxgIIAAAAQAbgEAcgUIAAAAQANgJAjgeIAAAAQB7hqCZg/IAAAAQCZg+CjgJIAAAAQAwgDCEACIAAAAQBxADBDgIIAAAAQA0gHBQgSIAAAAICDgeIAAAAQCBgbClgGIAAAAQBigEDHADIAAAAQYSAZOegLIAAAAQVVgQRYhbIAAAAQgKAiAeAiIAAAAQAYAbAqATIAAAAQDPBeDkgEIAAAAQCogDBRhPIAAAAQA3g2APhaIAAAAQAMhNgShbIAAAAIgFgaIAAAAIgHgdIAAAAIBCAOIAAAAIA0AFIAAgBIhzt3QgSiKgIhGIAAAAQgMh0gChdIAAAAIgCkDIAAAAQgBiagQhnIAAAAQgKg6gjiNIAAAAIgMgvIAAAAQgXhegGg8IAAAAQgEgigGiQIAAAAQgEhfgNg/IAAAAIgEgTIAAAAIgEgOIAAAAIAAgCIAAAAQgMgtgbhFIAAAAQgjhbgLgmIAAAAQgciGgThAIAAAAQgghxhCgzIAAAAQgmgdg5gRIAAAAQgngLhEgJIAAAAQp8hWqDA7IAAAAQAShIglhKIAAAAQgihFhDgsIAAAAQg6gmhRgTIAAAAQhAgOhYgFIAAAAQi+gLi+AcIAAAAQi+AdizBDIAAAAQgxATgaAFIAAAAQgrAIghgMIAAAAQgdgMgngrIAAAAQgqgvgYgNIAAAAQgkgUhNACIAAAAQhVACghgMIAAAAQgxgRhHhYIAAAAQhEhUg1gOIAAAAQgMgDgmgFIAAAAQgfgEgRgIIAAAAQgYgLgIgbIAAAAQgKgbATgPIAAAAQBfgCBggrIAAAAQBXgnBPhGIAAAAQBDg7BEhWIAAAAQAvg6BFhoIAAAAQAxhHAagsIAAAAQAnhCAWg5IAAAAQAthvANiUIAAAAQAIhdgDiwIAAAAQgDkRgOiNIAAAAQgXjlhBisIAAAAQhJi6iAiXIAAAAQhviDh9hAIAAAAQilhWkkgEIAAAAQihABhRgBIAAAAQiOgChhgPIAAAAQhcgPgVgBIAAAAQg/gEgsAVIAAAAQgYAMgsAlIAAAAQgqAjgcALIAAAAQghANhIABIAAAAQhJABggANIAAAAQgnAQghAnIAAAAQgYAbgdAxIAAAAQjvGThaF3IAAAAQhrG9BtF3IAAAAIAmApQBHDJCfDUIAAAAQBoCMDRDgIAAAAQgCApgjAkIAAAAQgeAfguAUIAAAAIhVAfIAAAAQg0ASgeAUIAAAAQg0AkhABqIAAAAQhABtgxAjIAAAAQgeAWg1AVIAAAAIhYAjIAAAAQg8AdgvAvIAAAAQgxAwgdA7IAAAAQgLhKhLgzIAAAAQg+gshbgSIAAAAQhAgMjMgOIAAAAQiogMhhghIAAAAIhugsIAAAAQhEgbgugHIAAAAQhWgOhfAgIAAAAQiVAyhVCQIAAAAQhWCTApCUIAAAAIsVAVQhAACgfAEIAAAAQg1AHgmARIAAAAQhNAjhABgIAAAAQhxCqgMEAIAAAAQgHCmAoEnIAAAAQAdDTASBsIAAAAQAgCwArCJIAAAAQALAlA6ChIAAAAQAsB5ATBPIAAAAQANA4ANBOIAAAAIAVCGIAAAAQAcCpAwDQIAAAAQAdB+BAD3IAAAAQAeBxAVA4IAAAAQAQAoATAjIAAAAIgIADIAAAAQANAbAYAUIAAAAIAFAEIAAAAIARAVIAAAAQANANAIgPIAAAAIAKADgEBugA9lIA4AFQgDgIgMgMIAAAAIgFgDIgFAAIAAAAIgNACIgJADIAAAAQgCACgCAEIAAAAIgFAHIAAAAIAAAAgEBugA9lIAFgHIAAAAQACgEACgCIAAAAIAJgDIAAAAIANgCIAFAAIAAAAIAFADQAMAMADAIIAAAAg");
	mask_1.setTransform(990.9999,540.225);

	// light_tv
	this.instance_3 = new lib.light_tv("synched",0);
	this.instance_3.setTransform(1295.15,455.65,1,1,0,0,0,1285.7,463.6);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(180));

	// charcter
	this.instance_4 = new lib.CachedBmp_58();
	this.instance_4.setTransform(849.25,212.4,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_59();
	this.instance_5.setTransform(849.25,212.4,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_60();
	this.instance_6.setTransform(849.25,212.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},89).to({state:[{t:this.instance_6}]},90).wait(1));

	// carpet
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#669966").s().p("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");
	this.shape_29.setTransform(1260.525,874.0354);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(0,0,0,0.427)").s().p("AgsgFQAsAAAtAFIAAADIgJABQgPACgNAAQgfAAgVgLg");
	this.shape_30.setTransform(1142.725,1042.9689);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(0,0,0,0.431)").s().p("AlpgNILTAWIAAAEIgJAAIgZABQlmAAlLgbg");
	this.shape_31.setTransform(1188.05,1044.6517);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(0,0,0,0.373)").s().p("Ao6BUQssgJrYhWQFOAJFHARIAJAAQAdAQA0gGIAJgBIAlAAIAJAAQFXAcF1gBIAJAAQMoASL/g7QIwgqIsg0QoLBUo+AoQqGAtq6AAIjxgBg");
	this.shape_32.setTransform(1282.3,1040.8909);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(0,0,0,0.345)").s().p("EgiQAAfQAtAAAtAEIABAFIgJAAQgPACgNAAQghAAgVgLgEAhJgApIA/AAIAJAAQAAABAAABQAAABAAAAQAAABAAAAQgBABAAAAQgjAEgkAAIAAgJg");
	this.shape_33.setTransform(1281.375,1035.6939);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(0,0,0,0.29)").s().p("AjGCoQsoAAr4g8Qrvg8qpiGQILBLIiAyIAJABQAeAQA0gHIAJAAQLZBXMsAJQM8AJL1g1QI+goIKhUQAkAAAkgEQAAAAAAAAQAAgBAAAAQABgBAAgBQAAAAAAgCQHQhBHMhGIAJgBQi8A0jRAmQquB7r0A/QrpA8sgAAIgNAAg");
	this.shape_34.setTransform(1274.125,1034.7502);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(0,0,0,0.204)").s().p("A3MDiQrug7q8h5Qq0h1pdjSQJFCvKUBlQAAAAAAAAQAAAAAAABQAAAAAAABQABABAAABQKoCGLwA8QL3A8MnABQMoAALvg9QL0g/Kuh7QDRglC8g0QGjhPGNhlIAJgBQoYC0plBtQqtB7rtBAQryBAslAFIhvAAQryAArFg4g");
	this.shape_35.setTransform(1253.3,1026.2406);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(0,0,0,0.173)").s().p("AivFGQEDjBBUlwIABgJIAAgJIAAhRQAPBGgSBaQhIFckNChIAAgJg");
	this.shape_36.setTransform(1809.1283,911.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(161,116,92,0.863)").s().p("AAACeQgEieAAidQAEAEACAGQACADAAAFIAADGIAAAJIAABSIAAAIg");
	this.shape_37.setTransform(1825.5625,871.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(0,0,0,0.118)").s().p("A2RPBQsAgzq8hxQrBhypzi7Qp2i7njlMQg9gqg6grQjuitgHmRQCsIcHVD0QFLCtF6CCQJdDSK0B2QK9B5LtA7QL6A9MugFQMjgFLyhAQLthAKth7QJlhuIYi0IAAgJQKPihHKllQAPgMAXgEQENihBIldQAThagQhHIAAgJIAAjHQAgAWAVAlQA4BngOCjQgdE4jCCgQm+FwpkDMQpjDMqmCEQqvCGrnBIQroBIsdANQiuADitAAQp+AApYgng");
	this.shape_38.setTransform(1265.3981,957.5185);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#E1D8B1").s().p("AvGV/QiXgri8ABQhXABhfAFQiyALixgeQingditgXInjhBQj3ghjOhHQmYABkthnQkyhqkjhyQgtgRgaghQg7gHgXgBIgJgBQjAiTiziiQgjgggmgeQgkApgrhJQhZiZgNjnQCDkwEQinQCVhcCJhsIAAgSQGfipHLhzQBNgTBJgLQDUgfC7gzQAJgDAJAAQAogpA6gaQABgBAAgEQCoAXCzgmQFYhKGNgPQC/gICzgfQCpgdDMgEQGYgIFqgRQL/gkMgA1QFXAXF+AMQEcAKDRBAQCPAsDFAaQA5AIArAYQDcAPCgAsQCyAxDeAKQA9ATAxAhQADACAEAAQElAZDRByQCYBSCgBSQBKAmAlgqQBVBTCFAiIAIABQCnDRB7D5QAyBnggCBQgSBKAABXQh8CrjGBjQi2Bbi3BVQgFADANgOQgqgIhHAvQirBwi8BeQlKBAkBCLQgCABAAAEQjegkjpA3QlwBWmHA6QhOgliNASQjMAbjTAKQglAfg+AKIgBAFQhsgciCAWQiDAWiBALQgqgRghgaQgCgDgFAAQiyArivgJQiggJiCABQgiAAgVAUQlYgjmOAVIAAAFQiigtixAxQgZAHgaAAQgZAAgZgHgEg+MgMQQhJAng0ATQg6A9hKAoQk5CqiQFQQALA5AFA1QAHBYAiA5QDyGaHzCcQGEB6GjBSQIvBtJgA+QLbBMMGAjQMwAmMJg6QLxg4Kyh3QK9h5JcjRQF7iDC7k/QBRiJAEioQAHktjOhYQgFgtgcgVQlykWn3iSQh4AHiJgdQjjgvjQgoQoPhkotg/QjcgZjqgHQqGgTpkgcQhlgEg+AmQjKgNizAYQiyAYjSgUQiSgOhSAkIgJAAQpbAqpRADIAAAEQguAAgJAgIgJABQicAYiGAwIgEAAIAAgFQjRgHjDBmQhgADhTAXQjXA8jnAyQAAABAAABQAAABAAABQgBAAAAAAQAAABAAAAQgrALARAdQgFAAgDADQg7AshygKQAAAEgCABgAyQJmQoogzpGgeQAAgFgBAAQgygRgogYIgIgBQkqhEk2g5Qk8iKkginIhSgvQhzhBgXiZQBdktFogbQBkgHA/glQAehKBggPQCqgbCgghQFZhKGCgaQL2g1LqhFQBDgGBFgDQBkAtCjgMQDsgSDzgGQAaAXAuAIIABAFQEAgeDxA0QABABAAAEQgTAIgDAUIAAAEQhdAYhngIQmIgenBgIQmTgHldAjQggADgogCQi4gKi9AdQoWBSoyAqQkiAWjfBXQjfBXjOBCQAAAFgCABQhiA+g/BfQAYBdAjBcQAuB+CNAjQCSAkBPBhQAbAAAcARQAEACAEAAQALAUAYALQACAAAAAFQBGAYBLALIAJABQAvAeA8AUQAAAAAAAAQABAAAAABQAAAAAAABQAAABAAABQFDAtFkAsQDFAYC6AkQFgBFGYgJQMvgSMdgPQCVgDCWAAQBVAoCWgYQC7geDLAFQAUgMAYgKQACgBAAgFQBkAMBaglQAEgCAFAAQAoAGAhALIAIABQA8gNAqgeQADgCAEAAIEGgcQCJgPB/gUQAPgRATgOQACgBAAgFQAWASAZgQQADgCAEAAQBLg4B0gQIAJAAQBXh6CPgvQAvgQAoghQANg2AkhGQABgCAEAAQBFgsAViJIABgJQigjBkZhPQihgtiSg9QhpgriFgQQhwgOiQAHQg3gRgdgsQgCgCgEAAQkVgBkvgUQkFgRkJg+IAAgEQGcAKG4gGQAQAmBCgIQFIgpDzCBIAJAAQDpALDuA0QAAAFACADQAOAbAdALIAJABQDbAzDhAvQAAAFABAAQAcAHAHAZIAJAAIBkASQAAAEACABQBnAwA6BcQAAAEACABQArAaAlBEIgBAJQgMAhgFAoQgFAAgBACQjgFAmeCCQgOAognARQh3A2hjgLQjbBhjqAgQkAAikYAkQqgBUstgSQl4gImKALQhmADhjAAQk0AAkfgbg");
	this.shape_39.setTransform(1249.7994,853.1849);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(161,116,93,0.839)").s().p("EhDmAOPQgFiNAAiMIAJAAIAAEQIAAAJgEBCjgKiQAkAAAkAEIABAFIgJAAQgMACgLAAQgaAAgPgLgEBBbgKrQAkAAAkAEIAAAFIgJAAQgMACgKAAQgaAAgPgLgEA/TgK9QAkAAAkAEIAAAFIgJAAQgMACgKAAQgaAAgPgLgEA9LgLQQAkAAAkAFIAAAFIgJAAQgLACgLAAQgaAAgPgMgEA7DgLiQAkAAAkAFIAAAEIgJABQgLACgLAAQgaAAgPgMgEA47gL0IgJABQgrAGgVgQQAlAAAjAFIABAEQAkAAAkAFIAAAEIgJABQgMABgKAAQgaAAgPgLgAzrr0IBAAAIAJAAIgBAFQgjAEglAAIAAgJgAxjsGIBJAAIAJAAIAAgJIBIAAIAJAAIAAAFQgoAEgpAAIgBAFQgoAEgpAAIAAgJgEA0rgMYQAkAAAkAEQABABAAAEIgJABQgMABgLAAQgaAAgPgLgAvAsYIBJAAIAJAAIAAgJIBIAAIAKAAIAAgJIBaAAIAJAAIAAgJIBbAAIAJAAIAAgJIBaAAIAKAAIAAgJIBsAAIAJAAIAAAEQg7AFg6AAIgBAEQgxAFgyAAIgBAEQgxAFgyAAIAAAEQgyAFgxAAIgBAFQgoAEgpAAIgBAFQgoAEgpAAIAAgJgEAulgNOQAkAAAkAEIABAFIgJAAQgMACgLAAQgaAAgPgLgAl8tOIB2AAIAJAAIAAAEQg/AFhAAAIAAgJgEAtLgNXQAtAAAtAEIAAAFIgJAAQgOACgNAAQghAAgVgLgAj9tXIB2AAIAJAAIAAAEQg/AFhAAAIAAgJgEArDgNgQBEAABDAEIABAFIgJAAQgWACgUAAQgwAAglgLgAh+tgICZAAIAJAAIAAAEQhQAFhSAAIAAgJgEAmGgNqQCeAACfAFIAAAFIgJAAQgwACguAAQhxAAhlgMgAAktqICRAAIAJAAIAAgJIDRAAIAJAAIAAgJIDrAAIAJAAIAAgJIF9AAIAJAAIAAAFQjDAEjDAAIAAAFQh6AEh6AAIAAAFQhtAEhtAAIAAAFQhNAFhNAAIAAgKgEAiagNzIgJABQh4AGhigQIgJAAQiXAHiBgQQCRAACQAFIAAAEQByAABxAFIAAAEQB2AAB1AFIABAEIgJABQgkACgiAAQhVAAhIgMgAaWuFIgKAAIp6AAIAAgJQFCAAFCAFIAAAEIAAAAg");
	this.shape_40.setTransform(1127.325,791.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]}).wait(180));

	// BG
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#484F4F").s().p("EicqBgeMAAAjA8ME5VAAAMAAADA8g");
	this.shape_41.setTransform(961.35,617.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_41).wait(180));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-340.6,-35.4,2337.3,1270.3000000000002);


(lib.snail_walkin_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smile
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(168.45,-38.4,0.4193,0.4193);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(191).to({_off:true},1).wait(408));

	// eyes
	this.instance_1 = new lib.eye("synched",0,false);
	this.instance_1.setTransform(170.25,-135.95,1,1,0,0,0,4.6,-1.9);

	this.instance_2 = new lib.eye("synched",0,false);
	this.instance_2.setTransform(230.95,-132.05,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{startPosition:0}},{t:this.instance_1,p:{startPosition:0}}]}).to({state:[{t:this.instance_2,p:{startPosition:19}},{t:this.instance_1,p:{startPosition:19}}]},191).to({state:[]},1).wait(408));

	// clock
	this.instance_3 = new lib.clock6();
	this.instance_3.setTransform(-64.25,40.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(191).to({_off:true},1).wait(408));

	// shell
	this.instance_4 = new lib.shell("synched",0);
	this.instance_4.setTransform(-30.05,38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(1).to({startPosition:0},0).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(124).to({startPosition:0},0).to({_off:true},1).wait(408));

	// tail
	this.instance_5 = new lib.tail("synched",0);
	this.instance_5.setTransform(-110.85,128.85,1,1,0,0,0,72.8,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},1).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},124).to({_off:true},1).wait(408));

	// front
	this.instance_6 = new lib.top("synched",0);
	this.instance_6.setTransform(125.65,15.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(1).to({regX:0,x:125.65},0).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(124).to({startPosition:0},0).to({_off:true},1).wait(408));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-256.7,-159.3,513,331.8);


(lib.scene3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// TEXT
	this.instance = new lib.text_enter("synched",0);
	this.instance.setTransform(-313.05,312.95);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(161).to({_off:false},0).wait(1).to({regX:0.1,regY:0.1,x:-297.85,y:313.05},0).wait(1).to({x:-282.8},0).wait(1).to({x:-267.75},0).wait(1).to({x:-252.65},0).wait(1).to({x:-237.6},0).wait(1).to({x:-222.55},0).wait(1).to({x:-207.45},0).wait(1).to({x:-192.4},0).wait(1).to({x:-177.35},0).wait(1).to({x:-162.25},0).wait(1).to({x:-147.2},0).wait(1).to({x:-132.15},0).wait(1).to({x:-117.05},0).wait(1).to({x:-102},0).wait(1).to({x:-86.95},0).wait(1).to({x:-71.85},0).wait(1).to({x:-56.8},0).wait(1).to({x:-41.75},0).wait(1).to({x:-26.65},0).wait(1).to({x:-11.6},0).wait(1).to({x:3.45},0).wait(1).to({x:18.5},0).wait(1).to({x:33.55},0).wait(1).to({x:48.65},0).wait(1).to({x:63.7},0).wait(1).to({x:78.75},0).wait(1).to({x:93.85},0).wait(1).to({x:108.9},0).wait(1).to({x:123.95},0).wait(1).to({x:139.05},0).wait(1).to({x:154.1},0).wait(1).to({x:169.15},0).wait(1).to({x:184.25},0).wait(1).to({x:199.3},0).wait(1).to({x:214.35},0).wait(1).to({x:229.45},0).wait(1).to({x:244.5},0).wait(1).to({x:259.55},0).wait(1).to({x:274.65},0).wait(1).to({x:289.7},0).wait(1).to({x:304.75},0).wait(1).to({x:319.85},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// child
	this.instance_1 = new lib.child("synched",0);
	this.instance_1.setTransform(803.05,299.85,0.9894,0.9894,0,0,0,120.5,161.8);

	this.instance_2 = new lib.child_broken("synched",0);
	this.instance_2.setTransform(803.05,299.85,0.9894,0.9894,0,0,0,120.5,161.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[]},95).to({state:[{t:this.instance_2}]},62).wait(103));

	// snail
	this.instance_3 = new lib.snail_walkin_6("synched",0);
	this.instance_3.setTransform(-93.45,647.25,0.8619,0.8619,0,0,0,34.1,34.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.8625,scaleY:0.8625,x:317.3,y:640.35,startPosition:89},89).to({_off:true},6).wait(62).to({_off:false},0).wait(103));

	// TABLE
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1A1A1").s().p("AgdAJIAAgEIAAgIQAEgNAGgHQANgQAWAQIAEADIABACIAAAFQABAQAEAQQAIgBgHAHIgEACQgOAFgJAAQgVAAgIgXg");
	this.shape.setTransform(667.2457,664.181);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#787878").s().p("Ag0gKIAEAAQAoAQA9gJQgGANgsABIgEAAQgpAAgKgVg");
	this.shape_1.setTransform(642.9,721.4296);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#9A9A9A").s().p("AhdgGIAFAAQBTAHBegDIAFAAQgsAIg2ABIgJAAQgyAAgegNg");
	this.shape_2.setTransform(667.025,671.4814);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#828282").s().p("AAMAIIgBgEQgHgIgSAEIAAgFQAegIgBAVg");
	this.shape_3.setTransform(660.6016,657.7701);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D3D3D3").s().p("AAAK+QgBgvAAgvIADAAIAABZIAAAFgAAAICIgBg6IAAgjIADAAIAAAjIAAA2IAAAEgAAAFHIAAgBQgBguAAguIADAAIAABYIAAAEIAAABgAAACMQgBgvAAgvIADAAIAABZIAAAFgAAAguQgBgvAAgvIADAAIAABZIAAAFgAAAjpQgBgvAAgvIADAAIAABZIAAAFgAAAmlQgBguAAgvIADAAIAABZIAAAEgAAApgQgBguAAgvIADAAIAABZIAAAEg");
	this.shape_4.setTransform(633.575,629.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5C5C5C").s().p("AAAIBIgCiCQgBi1ABi3QACmiAAmjIADAAIAAAFIAAAFIAANEIAAFjIAACCIAAEyQgDiYAAiag");
	this.shape_5.setTransform(637.6667,623.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D2D2D2").s().p("AAAAlQgBglAAgkIADAAIAABFIAAAEIgCAAg");
	this.shape_6.setTransform(633.575,545.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C3C3C3").s().p("AgygCQAyAAAzACIAAABIgEAAIgFABIgeABQghAAgdgFg");
	this.shape_7.setTransform(628.65,541.901);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B7B7B7").s().p("AgDEGQACmiAAmjIAAgEQAIGagDGmIgBFCIAAAFQgIiZACilg");
	this.shape_8.setTransform(658.7784,599.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B8B8B8").s().p("AAWACIgvAAIAAgDIAvAAIAEAAIAAADIgEAAg");
	this.shape_9.setTransform(656,541.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#9C9C9C").s().p("AAvMzIAFkyIACiCQABizgBi0QgCmjAAmiIgFAAQg4gEguAJIAAgFIAAgFIBrAAIAEAAIAANFIgBFsIAACCIgDEyg");
	this.shape_10.setTransform(643.6,623.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#595959").s().p("AgHNDQADirACitIABiBQABizgBi0QgBmjACmiQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBIAAAFIAALjQAADjACDmIACCBIADD6QAAA9gPAmIAAgFg");
	this.shape_11.setTransform(653.3007,625.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DBDBDB").s().p("AAAAvQgBgvAAguIADAAIAABYIAAAFg");
	this.shape_12.setTransform(615.75,526.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DADADA").s().p("AAAAqQgBgqAAgpIADAAIAABOIAAAFg");
	this.shape_13.setTransform(615.75,507.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#585858").s().p("AgigCQAiAAAjACIAAACIgFAAIgEAAIgUABQgXAAgRgFg");
	this.shape_14.setTransform(612.5,503.501);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#60300F").s().p("AAACOQgBiOgBiNIAFAAIAAEYIAAADg");
	this.shape_15.setTransform(620,518.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#707070").s().p("AgDEbIAAtFIAAgEQAHGaAAGmQAACUgHCJIAAkUg");
	this.shape_16.setTransform(672.125,597.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#747474").s().p("AgDEWQADmhAAmjIAEAAIAAAEIAANFIAAEUQgHiGAAiTg");
	this.shape_17.setTransform(662.8986,597.525);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#7C7C7C").s().p("AAPASQgtgBgYgQQAIgBgBgMIACAAQAKAeAzgEQAbgCAEgPQABgHAAgHQAXAjg2AAIgCAAg");
	this.shape_18.setTransform(937.3723,720.7253);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#A0A0A0").s().p("AWTAUIAAgFIAAgJQAEgSAJgNQAIgLAMgIIAFAAQAogKAFAcIABAAIABABQACAVAHAPIAAAEQAAAHgBAHQgEAQgbACIgMAAQgpAAgJgbgA3wAdIAAgEIAAgKQAFgXAMgRQAJgLANgIIADAAQAhAAAOATQALAPABAZQAAAKACAJIAAACIgBAAQgXAEgTAAQgjAAgZgLg");
	this.shape_19.setTransform(790.0813,717.4009);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999999").s().p("AhcgKIAEAAQAfAQA2gEQAvgCAyAAQg6AHhDAEIgHAAQgqAAgMgVg");
	this.shape_20.setTransform(914.55,671.3328);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#858585").s().p("Az6APQAIgBgCgNIAEAAQAKAiAqgQIAFgCQAGgHgIABQgEgPgBgRIAAgFQABAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAHAYAEAaIgFAAQgNACgLAAQgdAAgRgMgASwAPIAFAAQAbAJAmgEIAFAAIAAADQgSADgOAAQgaAAgRgLg");
	this.shape_21.setTransform(790.8,664.9918);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#9F9F9F").s().p("AgiAYIAAgFIAAgJQACgXANgKQANgLAaAKIAAABIAAABIAOAuIABAFIgFAAIgVABQgYAAgTgGg");
	this.shape_22.setTransform(914.8,664.1309);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#8A8A8A").s().p("AgNAJQgCgJAAgIIAbAAIAEAAIAAACQgOADgMgBIAAAJIAAAFIgDgBg");
	this.shape_23.setTransform(921.325,658.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#7F7F7F").s().p("AAPAGIAAgDQgVACgLgIQAdgGAFAPg");
	this.shape_24.setTransform(907.9,657.5311);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#746A63").s().p("AYBAEQmjgDmjAAItEAAQmjAAmjACQmmACmagIINFAAINGAAINFAAINFAAIELAAQh1AHh+AAIgdAAg");
	this.shape_25.setTransform(789.85,499.355);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A69C93").s().p("AX2AEItGAAItFAAItGAAItFAAIAAgEINFAAINGAAINFAAQGiAAGkgCQCbgBCQAHIkrAAg");
	this.shape_26.setTransform(790.1,492.0944);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#C0C0C0").s().p("AR1EJQADmjAAmiIpqAAItEAAItGAAIAAgFINGAAINEAAIJvAAIAANFIAAE+QgJiXABiig");
	this.shape_27.setTransform(791.275,599.375);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#4F3424").s().p("AQ9AEQmigDmjAAQmiAAmjACQmmACmbgIINGAAINFAAINFAAIFNAAQiSAHibAAIglAAg");
	this.shape_28.setTransform(789.625,479.7303);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#464646").s().p("AAANIIgBldIgBiBIAAlnIAAtFIAAgFQAHGagCGnIgBFwIAACBIAAFUIAAAJg");
	this.shape_29.setTransform(927.5461,625.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C5C5C5").s().p("AAOACIggAAIAAgDIAgAAIAFAAIAAADIgFAAg");
	this.shape_30.setTransform(925.35,541.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#B4B4B4").s().p("AgCEEIAAtFIAEAAIAAAFIABE+QACGlgHGbIAAk+g");
	this.shape_31.setTransform(923.2784,599.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#505050").s().p("AgDIBIAAiCIAAlnIAAtFIAAgFQAHGbAAGlQAAC6gCC3IgBCCIgEEyIAAkyg");
	this.shape_32.setTransform(943.05,623.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#A4A4A4").s().p("AXuMxIhrAAIAAkyIAAiCIAAlnIAAtFIBrAAIAFAAIAANFIAAFnIAACCIAAEyIgFAAgA2QMxIhiAAIAAkyIAAiCIAAliIAAtFQAugIA5ADIAFAAQAAGjABGiQABC1gBCyIgBCCIgFEyIgFAAgAUAEqIhQAAIAAkUIAAtFIBQAAIAEAAIAANFIAAEUIgEAAgAymEqIhPAAIAAkUIAAtFIBPAAIAFAAIAANFIAAEUIgFAAg");
	this.shape_33.setTransform(790.325,623.649);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#757575").s().p("AgDEbIAAtFIAAgEQAHGaAAGmQAACUgHCJIAAkUg");
	this.shape_34.setTransform(919.175,597.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#808080").s().p("A0ZJIQgCgHAAgGIAhAAIAEAAIAAAEIgEAAIgdAAIAAAFIAAAFQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAgAVwpDIhrAAIAAgFIBrAAIAFAAIAAAFIgFAAgASBpDIhPAAIAAgFIBPAAIAFAAIAAAFIgFAAgA0kpDIhQAAIAAgFIBQAAIAEAAIAAAFIgEAAg");
	this.shape_35.setTransform(802.975,600.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#6D6D6D").s().p("AgDEWQADmhAAmjIAEAAIAAAEIAANFIAAEUQgHiGAAiTg");
	this.shape_36.setTransform(909.9735,597.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#EBAF87").s().p("ARCAHItFAAItFAAItGAAIgCAAQgCgHAAgGIAEAAINGAAINFAAINFAAIFNAAQAHABgFALIgCABIlNAAg");
	this.shape_37.setTransform(789.625,478.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#A68977").s().p("AQ9ADItFAAItFAAItFAAIAAgDINFAAINFAAQGjAAGigCQCxgBClAGIlWAAg");
	this.shape_38.setTransform(789.625,473.3691);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#B6896B").s().p("ARCAEItFAAItFAAItGAAIAAgEINGAAINFAAQGiAAGjgCQCsgCChAIIlNAAg");
	this.shape_39.setTransform(789.625,477.5888);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#070302").s().p("AQ6AyQmkgCmiAAItFAAItGAAIgEgBQghgPAFg2QALgSAWgJIAEgBINGAAINFAAINFAAIFWAAIAEABQAzAYgbA7IgPACQijAPitAAIgXgBgAQ+ANQCuABCjgIIADgBQAFgLgIgBQiggJisACQmjACmjAAItFAAItFAAIAAAFIgFAAQAAAHACAFIADABQGaAIGngCQGigCGjAAQGiAAGjADg");
	this.shape_40.setTransform(789.5962,478.7531);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#BCBCBC").s().p("A2EI/IAAk+IAAtEIAFAAIAAAEIABFDQADGmgJGaIAAgFgAURpDIBwAAIAEAAIAAACQg6ACg6AAIAAgEg");
	this.shape_41.setTransform(817.2,599.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#B05C24").s().p("A6pByIAAgEIAAkYIAAgEINGAAINFAAINFAAINFAAIA9AAIAAEgIAAAFQACAQgGAIQgJAKgLABQk4AQlEgCQmigCmjAAItFAAItFAAQg2AAg1AHQgUACgSAAQhQAAgOg9g");
	this.shape_42.setTransform(790.815,521.2414);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#673B20").s().p("AgBCTIAAgFIAAkgQAHCNgGCYg");
	this.shape_43.setTransform(961.5991,518.425);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#CCCCCC").s().p("AgCCOIAAkgIAEAAIAAAEQADCWgHCLIAAgFg");
	this.shape_44.setTransform(965.8909,518.425);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#656565").s().p("AggADIAAgFIA8AAIAFAAIgBACQgeADgdAAIgFAAg");
	this.shape_45.setTransform(968.875,503.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F9E3D5").s().p("AYEAhItFAAItFAAItGAAItFAAIgFgBQgVgNACglQAIgBgBgMIADAAINFAAINGAAINFAAINFAAIEsAAIACAAQATAygoAOIkLAAg");
	this.shape_46.setTransform(790.0403,495.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#F5C9AA").s().p("A8WE4QgBAAAAgHQBok0Bck+IABgFINGAAINFAAINFAAILVAAQBfFEBkE9IACAJItGAAItGAAItEAAQmjAAmjACIgSABQiJAAh9gPgA2XC3IgEABQgWAJgLASQgFA3AhAPIAEABINGAAINFAAQGiAAGkACQC5ABCugPIAPgCQAbg8gzgYIgEgBQilgHixABQmjACmiAAItFAAItGAAIAAAEg");
	this.shape_47.setTransform(790.075,455.3531);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#050302").s().p("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");
	this.shape_48.setTransform(790.125,572.4314);

	this.instance_4 = new lib.pen("synched",0);
	this.instance_4.setTransform(1120.15,-69.4);
	this.instance_4._off = true;

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#696F75").s().p("ANpHoQh8AOg3hiQgOgYgbghQgagfglgnIgkhrQhmg2hLgUIgHgCQhZgXgKhNIj4hHIgEgGIgEhjIgNlVIV6KwIjwC2IiNBqIgbAVIg4AqIgCACIgfAXQgSgagQgbgA17CCINJoQIC+h3IAJgFIAcgSIgEAIIA/D5Qg/AwAZBYQAWBNAFB3IhLBVQgfBrgcAvQg4BgBJBlQgPAbgNAdg");
	this.shape_49.setTransform(435.375,618.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFCCCC").s().p("A0zH5IguzJIgJjyIgHi6IgNgGIAKgnIGGDAIEyCWIHMDjIEyCWIHeDrIJqEvID1B5IgYAgIgMgGIlRD+IvELZg");
	this.shape_50.setTransform(568.775,515.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F4D81F").s().p("EgjvBbFMBWEiu/IJqEwMhWECu/gEgv/BVEMBWDiu/IEzCWMhWECu/gEg7+BPLMBWEiu/IEyCWMhWDCu/g");
	this.shape_51.setTransform(851.925,-91.075);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#C49E2D").s().p("EgY8BgZMBWDiu/ID1B4MhWDCvAgEgqEBX+MBWDiu/IHeDrMhWDCu/gEg2DBSFMBWEiu/IHMDiMhWECvAgEhA7BMuMBWDiu/IGGDAMhWDCvAg");
	this.shape_52.setTransform(844.7,-94.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance_4}]},95).to({state:[{t:this.instance_4}]},25).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49}]},1).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},36).wait(103));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(95).to({_off:false},0).to({x:841.65,y:-47.1},25).to({_off:true},1).wait(139));

	// LEGS
	this.instance_5 = new lib.legs_stat("synched",0);
	this.instance_5.setTransform(788.15,586.45,1,1,0,0,0,-0.8,-0.6);

	this.instance_6 = new lib.CachedBmp_48();
	this.instance_6.setTransform(439.3,623.9,0.3616,0.3616);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#313F4C").s().p("Egh2AGJIQti4QBRA6HbgmQGMghAlEnIxIBZIhcABQoqAAk8i8gAi0meQBjAYSMidQMWh/EmFnQh2AJykChQijAUiNAAQoWAAjLkhg");
	this.shape_53.setTransform(-3085.15,1837.468);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#242835").s().p("A4chDQCLgNXyiaQPahxHjD/IwuC3QsZCCmQAgQh9AQhsAAQnxABiJlRg");
	this.shape_54.setTransform(-3351.5,1867.6501);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#243341").s().p("EgqBAXXQGsq/LmtzQRv1vCcjKQD6hLDPCUQEZCpBuAVQD7H/PIpBQLIimEJEBIioE/IrJA4IrNA4QzPBenEFCQm2FC4Yd2IlgAbQA7hqBDhtgAePv9QClBPDYA3IgjABQjyAAhoiHg");
	this.shape_55.setTransform(-3185.275,1622.3666);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#303E4C").s().p("EhKCAG0QFBAHK3iaQJKhTD+E4QrtBekAAWIgvAAQn8AAkojGgAKKGJQg9gag4gcIEFiaQDABzL/iAQJ8hWD+E7QsyBjkVAZIhTABQneAAlRiFgEgwDgFeQBnAWSTidQMKiAE+FqQhpgZyQDCQigATiNAAQodAAj/kfgEAkXgHQQBqAWSGieQL/h/F9FoQhrgZySDDQigATiPAAQoeAAkikeg");
	this.shape_56.setTransform(-2256.475,1819.6995);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#272F42").s().p("A0GgQMBKhgEdIhgDlMgtAADnI+pCQgEg2agApITChCQoAExk4AAQkUAAh2jvg");
	this.shape_57.setTransform(-2774.95,1484.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#26374D").s().p("Ao4g0ITRh8IhAD/IzxBhg");
	this.shape_58.setTransform(-2369.725,1459.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CEC35D").s().p("AmuAiIGpjNQF1hHA/DCIkTDZQiKAWhqAAQkcAAg6idg");
	this.shape_59.setTransform(-2503.075,994.4686);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#CEC45C").s().p("EhIpA6GQvfR4s1EmQPcxVM4lJgEBN1g+HQozLcpUDDQH2qQKRkPgEBk+hQjQozLOoDCRQGZowKdkvg");
	this.shape_60.setTransform(-2433.625,827.575);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#CDC35A").s().p("AKPoHQpCLfq/ElQgPAFgNAGQJQrXLNk4g");
	this.shape_61.setTransform(-2158.725,608.525);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2D3C49").s().p("APEBCQFfgdLXADIARAAQg3AohNAiQolEH0ZA0QDilVKZgWgAxVluQQqgZBWglQi6GJrfgEQv8ATigAtQDbmMLaAFg");
	this.shape_62.setTransform(2270.55,1498.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#CBBF54").s().p("AmCgYIHLhyIE6ChInLB1g");
	this.shape_63.setTransform(2479.875,623.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#D3CA69").s().p("AFZESQlZiNioAhIk6iiQgGh7iYiXQjXi7hyhuQREFDNPMsQmkjMjNhag");
	this.shape_64.setTransform(2535.45,609.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#D2C766").s().p("EgmlAEsMAsRgDPQgUCYjpAmQlEAXgrAaIv5BKQh5gOmqAhQgvADgvAAQkjAAkIiAgAZ6jUQixgJhngOQAdiVDXglQCBgJEHADIHICbQADCUicAiIkyAWQjPiGiSgKg");
	this.shape_65.setTransform(2141.5528,689.704);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#232530").s().p("AlfCeIgRABIgCgBQiHlFEjgWQCqgOFxABQBNCIAKBaQASCijFASQmZg5ivALg");
	this.shape_66.setTransform(3530.2754,1340.2967);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#232E3C").s().p("AA0FjQvdhynuhNQV1uwW6MIQmsEjpyA4QiXAMijAAIgMAAg");
	this.shape_67.setTransform(286.15,2131.6886);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#E9E59F").s().p("A3NBoQYGqKWVGyQvHGPtmAAQpNAAohi3g");
	this.shape_68.setTransform(-972.85,971.2187);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3B49").s().p("A5+HGQhLgVhGgYIDTiaQDsB1LdiCQJnhUFxE3IwsBaIhpABQnTAAl7hqgAj+mKQBNAbOxiwQJbhTG1FrQicgVtpCMQiBARh3AAQnRAAlAkLg");
	this.shape_69.setTransform(-365.875,1777.6933);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#31516A").s().p("Ak5icIJzA/QjjDthoAJQgSAEgSAAQiYAAhsk5g");
	this.shape_70.setTransform(-635.975,1352.8845);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#30506A").s().p("Al9BtQgYgPgJgOQgcgmBCgqICPh3IFJhRIFHBUQhCBthMBIQiSCIi4AAQiZAAizhcg");
	this.shape_71.setTransform(-765.0316,1334.1162);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#CABE50").s().p("EifTAPjIzDBCQhugVkZipQjPiUj7BLQC4ltFZklQF4kICpiPQjwG0BQCbQBPBjEhAhUAciADUAy0gEvMDgHgVwUATDgB4AmOACDICfGhIlLBQQioiYjugiQkVAViJgQUgwigACg9SAGzUgoBAD6hKBAK2IzTB7MhKiAEeQkJkBrICmg");
	this.shape_72.setTransform(-1981.775,1374.094);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#EAE5A2").s().p("Ai5AUIgNjKIDbgRQBugHBACDQAOAVgfBeQgiBegPAYQg5Aqg2AAQhuAAhdi0g");
	this.shape_73.setTransform(-680.9298,971.409);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#D7CF75").s().p("AisBLQhXjsBkARQAwgEBmAoQAPgBDPBqIgiCVQlNgxgSgWg");
	this.shape_74.setTransform(-268.9488,1065.3212);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#3E596A").s().p("EiQ7AI0UBKCgK3AoBgD6UA9SgGzAwiAADQCIAPEWgUQDuAiCoCYIiPB3QhCArAcAmQAJAOAZAPQGMDLEKj3QBMhJBChtQFthTC9DmQB4FfCvgoQBpgKDjjtQEZBzJEBfQIBCBD/IlQh8AOiCANUgXDACTgijgAmUgxEgAogL9AAfUgRSAA6hDGgAiUggTgAQgZKABSQu8AwsgBUg");
	this.shape_75.setTransform(-1375.65,1385.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#242631").s().p("Em8WAkRIgUAAMg2BADYUAk2gOOARfAK2gEkTsAg5MgyiAClUAh2gNKAQsAKlgEi6KAeyIgUACMg1iAC1UAg3gNrAU/AK0gEhkKAa4IjTCaMgxyACiQYLsBc6HFgEhndAdSQBHAYBKAVQgUAWgZAAQgrAAg5hDgEEd3gG2QBogxBeg2QhsBtglADIgHAAQgWAAgYgJgEEZ3gKaQanqPalG4MguGAFUgEFwogUGUAMFgMWAmgAGuMgyUAFoIgRAAgEHysglLMgusAFTUALjgMGAjJAGzg");
	this.shape_76.setTransform(115.5,1631.1846);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2E3D4B").s().p("A+DHMQhNgTg9gaQFsACLVigQKKhYFxEzQp0BQneAAQoLAAlVhggAlimEQBtAXRlicQL0iBGqFnQi9gSwuCaQjIAiivAAQnsAAkikLg");
	this.shape_77.setTransform(-1444.75,1800.4405);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#CDC25A").s().p("AwcAAIVQijQA6AQFJgXQAwgEAqAEIAJACQCtASBXCWI1WClQg8gSlLAZIgpABQjcAAhYitg");
	this.shape_78.setTransform(-1357.55,921.9365);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#D8D079").s().p("Al/AYIgJgCQgqgFgwAFQlIAWg7gQQBxhzGShdIHOgMQBsC6D7gSQFXgaA8AUQjlC8kaAVQk3AAirAOQhWiXiugSg");
	this.shape_79.setTransform(-1239.8,902.675);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#D2C968").s().p("ALlHQIQ0g4IANDLIlABGQg/gSleAaIgeABQjZAAhtjigA3UnEIlRACQD6i9FGgsQC3gNF9APQBfCOC4AKIFCgDQjlC8lFAYQl1AFi4AOQhdimjIAPg");
	this.shape_80.setTransform(-882.575,912.323);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#E7E29A").s().p("AkfAIQGAj7DgBrQhtD6jGAxQjegDhwAJg");
	this.shape_81.setTransform(-990.8,503.7181);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#E4DE93").s().p("AnZAWIHiipQBZgGDfhJQCogggQCwQgUDEiKAfQiwgJhOAaIm8BGg");
	this.shape_82.setTransform(-1576.3094,724.7794);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#D8D078").s().p("Ap1gxQA1APJzhTQGihFChDgQg1gQpuBoQhKAIhBAAQkyAAiLi3g");
	this.shape_83.setTransform(-1869.425,755.6249);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#E7E29B").s().p("AnfgGQEZh+DsgOQB1gIFFAoQkvD4jSANIgbABQixAAjyiag");
	this.shape_84.setTransform(-1552.4,315.6587);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#E6E299").s().p("EhqEBGxQgsguhYigQC0j7CyAjQDSAeh1DgQiCDRhnAAQguAAgogpgEBmehELQgPhLDFhnQCNhUAoCjQgWCJiuAqQgvALgjAAQhlAAAQhbg");
	this.shape_85.setTransform(-1804.45,715.7266);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#D3C96C").s().p("AwACRQjTAahegHQHOifMBhJQNqhRFShUQAOAfBMALIB+A7QkjCHoNA6QopA9kLBuQk2gIifALQhDhli2ALg");
	this.shape_86.setTransform(-1368.75,60.7);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#CABF51").s().p("AjzAWIhZgqIIsg8IBtBrQkmAsicAKg");
	this.shape_87.setTransform(-1223.975,39.325);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#D3C968").s().p("AnhgmICIjhQBjBNE5AqQEIAYCEDRIATCwQqYhWkrjZg");
	this.shape_88.setTransform(-286.375,865.95);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#CBBF53").s().p("EijZAOrIESjaIN9gVIgPAOIkJDkgECX0gLhICejMIJIAWIgCDXg");
	this.shape_89.setTransform(-1441.625,917.475);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#D6CE73").s().p("AgPBXQkKgnicieQEegnCTAcQEFAnC1DXQgPAAm2gug");
	this.shape_90.setTransform(-336.375,614.8149);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#D8D077").s().p("EhHpAGmQCWiICqgLQBjgHC2AGQilDJjSAAQhrAAh3g1gEBEVgEoQg4ADjjg4QD4jRD4CNQhSB5hzAAIgQAAg");
	this.shape_91.setTransform(-805.975,525.0902);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#D1C763").s().p("Eg4TAfOQGNh3APgBQDkgoBsD0QmoBNjBAPQjIiTBFgdgEArmghqIMugTIASCBIkcA5IkgABIgZABQioAAhDipg");
	this.shape_92.setTransform(-886.6849,797.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FCF8D3").s().p("Eg1MAgIQDBgPGohNIH8jzQVGHFZVqeICegMQB0DxDvgQQFfgaA+ASQr3EdyCBAQ7nBTiQALQmuBljSARQghADgfAAQk2AAi4jZgAmZ8wIK3hWIEqi8QPPF+QEoJIEPgTQBIC1C8gNIEggBQz6Fiz3AAQp8AAp6hZg");
	this.shape_93.setTransform(-893.45,809.5099);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#DDD684").s().p("AAJLQQlOhsgOACIgSiCQF6iIFUDrIAYCnQg8AShFAAQhwAAiHgwgAhWobQjvhZg1ADIgGh3QFGhcEhETQhMA1hcAAQhFAAhQgfg");
	this.shape_94.setTransform(-490.475,531.9362);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#D2C867").s().p("AmJBTIgPiHIMrgmIAGB3IiLA+g");
	this.shape_95.setTransform(-569.25,466.5);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#E9E5A0").s().p("AjVBSQBAihB8ghQBTgTCcADIgWBqQhzCXiFAAQhMAAhRgvg");
	this.shape_96.setTransform(-916.45,53.1072);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#D0C668").s().p("AoSAdQCrhtDqgZQCKgWEMgQQDZAvAhA7IugC1g");
	this.shape_97.setTransform(-804.65,-43.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#CFC562").s().p("AqeBPQEDhnFnhHQDJgmGTg+QAEAFAHAFIBsBeQjqBwlyBKQomBUgxARg");
	this.shape_98.setTransform(-956.425,-14.375);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#D4CB71").s().p("ArwAkQDVhuEhgdIIHggID9gFQCVgJBSBdIznDGQghg7jZgvg");
	this.shape_99.setTransform(-701.275,-61.1647);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#D6CD73").s().p("AkZATIj9AEQDOiRGSAYQBFBPCWADQDPgNAkAKQhyBnisAMQjGgBhnAIQhRhdiVAJg");
	this.shape_100.setTransform(-620.85,-77.1129);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FCF8D4").s().p("A3wB6II/g+IFZiWQKfElJ6l3IDugCQBlB6CzgLQD4gdAyAXQwtD0wBAAQneAAnVg1g");
	this.shape_101.setTransform(-578.75,17.7977);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#CABF50").s().p("A28BBMAlggC2QBagGC2gXQCVABBqBzIAKBeQqvg379CHQgjgKjQANQiVgDhFhPg");
	this.shape_102.setTransform(-466.5,-93.55);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#CBC155").s().p("AlDApIgKhfIKbgGIgsAZIirBgg");
	this.shape_103.setTransform(-287.2,-91.175);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#CFC45E").s().p("EjBmBNiQkMG+mHEEQhcAzpuFGQLMtxKRjKgEggqgy4QlpIAnzCmQFYoFIEihgEA0UhQ7QCohjDxgoQCNgJETgdICJB1ItHC0gEDR4hbKIDAjSICNBzIkjEAg");
	this.shape_104.setTransform(-1440.75,529.225);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#C9BE50").s().p("EDUZA9JQlEiAk1krQCvBHFJAUQE0A+FlGaQlWg+jChKgEjcwg9CQAahkBmgTQBDgFBygSICKBmIkyCbg");
	this.shape_105.setTransform(1334.525,315.425);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#D2C96C").s().p("AlJA/QDZiqBLgdQCnhHDIBtQhDBwisA8QjyA/goAcg");
	this.shape_106.setTransform(-14.5,-95.7753);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#D7CF7C").s().p("AmigVICrhiQAhgMALgNQERgRFODRIAPBiIgKAAQmpAAmSing");
	this.shape_107.setTransform(-233.425,-82.841);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#D5CB71").s().p("AguBYQjAhYh6hmIgOhiQC0gYDXBiQB0BDDuCSIhfB3QjXhMhvgqg");
	this.shape_108.setTransform(-155.45,-57.9111);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#415A6A").s().p("Eh51gEXUBO5gHTCb9gLmUALNgA4AkSgFjQNDh0Q4DgQF6EZABBqQAHBNjAAQQqPgDv3DvQwzDzo3AsUgXBAA9ggCAEnUgjwAFWgSkACTMiaEAU2Ug3ZAHggTOABFUAbogeRAu4gEag");
	this.shape_109.setTransform(1906.7623,1178.2212);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#242632").s().p("EkVpAQLIkFCaMgx+AChQaprbbaGggEkZuASlQA3AdA+AaQgXAOgTAAQgsAAgfhFgEFLtgR3MgylAFPUAQigNrAiDAIcg");
	this.shape_110.setTransform(-400.025,1734.6343);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#242531").s().p("AvGhEQAjgDNlhpQIihPHkEnI8zCag");
	this.shape_111.setTransform(1055.85,1697.119);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2E3C4A").s().p("Elj5AnwIgugSIgpgTQFIAIKKidQI1hQFyE2QqIBYlJgGIhBABQnMAAlEh/gElPSAa8QBxAXRrieQLpiAHDFoQisgTwhCaQjGAiiyAAQnzAAlQkKgALlM6QFggfLMAJQgpAcgyAZQlXC7n+BJIwYBXQEnlqJ1gQgA1pFUQQfgWCGgsQkgGirhAcQw7AWiJAuQFFmmLbgagEBAdgGyIT8gpQkxF8sMAhQyJAchwAqQEzmbMHgfgEEHegXDQFMgdK5AHQgjAbgvAbIgfAQQnaD/y7AtQCUlJJtgTgEDmUgdkQRjgeBhgnQjUFlr2AfQxrAehjAoQDjloLxgdgEFVqgiSQFaAAJ7gUIACAAIAQAAQgjAhgzAcQmmD8ybAqQBak+JWgRgEE0lgorQRUgeBfglQisFbrpAgQxeAchgAnQC5leLngdg");
	this.shape_112.setTransform(1208.525,1577.6061);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#E7E29C").s().p("AkyAKQgcgWADhHQABhIARgBQDyi7EuE6IBlC5QirA9hwAJIgQAAQiYAAi7jYg");
	this.shape_113.setTransform(1054.9556,983.2117);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#242A37").s().p("Ay9DLQF9lOLngbQRdg9BfgHIBbEFIwlDAQnagdt8AFg");
	this.shape_114.setTransform(846.85,1712.975);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#3B5669").s().p("EgK5BBpQrCk6lUouQmSqGAuxzQm1lspbBTQuyCwhNgaMgvMADXQnDlorpCAQxrCehxgXMgvEADUQmqlnr0CBQxmCchsgXMgvQADVQl9lnr/B+QyGCfhqgWMgvZADVQk+lqsKB/QyTCehngXMgvkADWQkmlosVCAQyOCdhigYQk9gm2iDVQxgCYmWl8QYY93G2lBQHElDTQheILNg3QBvCQEOgKQJ9CjQog9QdFh1GSA3UAPxABfAg0gCHUAhKgBtAPRABFQKwAhUEgqQVdgyJgAMUA9/ABjAe5gAIUAzsAAIApugDzQJ2F1GrlvQBwDoFFg4QEigYBVEOQHJY1PTHHQGaCoUGAfQdWAyHsj4UASigIZgADgiWQgOh5BmhhQCHhlAng+IN2CoIAagBUA2UgDBBa0gQ5IDygUUAsUgFVBW7gKAUAqugFmBSDgMiQFThSFyBtQGNCHHpG2QEeDoIAIBQGPF+jAAuQksgHhmAJQjBAuxhBaQhfAlxUAeQrnAdi5FeMgstAEHQhhAnxjAeQrxAdjjFoMgwZAEbQhXAlwqAaQragGjbGOMgxYAEiIz8ApQsHAfkzGcMgyoAEJQiGAswfAWQrbAalFGmMgtxADyQsBA+BVKfQDLYop5KvQlVFzw/EeQwXFAvXAAQ1MAAzSphgEBnjAW5QFdhCAdgjQN8gFHbAdQpXFD2FAyQAmkWDlgSgEEMMADaQDDlaJ/gUQL7g/C4hxIHGB+QhfA1hnAyQrBE50PAAIglAAg");
	this.shape_115.setTransform(24.9188,1596.9113);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#293947").s().p("ABAbSQ0FgfmbioQvSnInJ40QhVkPkiAZQlGA4hvjpQCshoIdgrQHGgHDYk6QgXD0ALDbQA1R1PMFFUAgHAKwAbdgNFQNxmQlG1HQgahrgghtQCqgsE8hxQEdhTEbD3QgnA+iHBkQhmBiAOB5UAACAiVgSiAIaQmaDO1cAAQkTAAk5gIg");
	this.shape_116.setTransform(144.75,1603.1781);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#CABE51").s().p("Ai7qCIDbgRICcQBIieElg");
	this.shape_117.setTransform(119.325,1293.5);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#3B5769").s().p("A6xSCQvLlFg2x1QgLjbAYj0If/qwIAEAAMAl1AAnQCTAREhAGQD6BFCjFyQAgBtAbBrQFGVGtyGRQvEHLwfAAQthAAugk2g");
	this.shape_118.setTransform(167.7394,1541.8695);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#CCC368").s().p("AiDRJQkxoAhghsQj4kPkXBuQkAoloBiBQpEhfkYhzIp0hAQi9jmlsBTIlHhUIiemhQVYBROFE1QTSGOPmO1QEjEOIRiCQGiiYMGm0QLQk6IfBHQDCDWEagVQGEggBEAXIABACI//KuQjYE7nGAHQodAqitBpQjTC2kGAAQkKAAk8i8g");
	this.shape_119.setTransform(-335.7,1400.8381);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#CEC35C").s().p("EDdDAPWQgQHJmGJTIijANQBGsuHzj7gEjWnAQjQk2AAhmi9QKUo0FHj+QIkmwGJi/QimEUm0FsQndF1jTEnILrBNImpDOQk6ApinAAQglAAgegCgEi3hgOwQIiq3NDmXIgkAtQp4MaroEwIAfgpg");
	this.shape_120.setTransform(-1227.35,895.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#E1DB8E").s().p("AAWQMIle8QQgtjygFhtQgGjGBIhxQBQD/CrQwQCSNkEmHvQheCzhMAAQhxAAhKmPg");
	this.shape_121.setTransform(88.8018,972.79);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#D5CD70").s().p("AxIFfQmvACkjqDQIUAHDAJoIADAKQAAADACAFQgEgBgDABgAWHB3IGJnVQAcGcgpBjQggBXhRAAQhhAAiqiBg");
	this.shape_122.setTransform(41.4302,961.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#D6CD71").s().p("EA03ASJQB6hNEzhZIAeCxQiKGJoNCCQgNmCDZiUgEg8BgaFQCBAKDygjQC7AFCMCMIqjAwg");
	this.shape_123.setTransform(-70.125,757.2);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#CCC158").s().p("EAhGAHxQkbj3kdBTQk8BxiqAsQijlyj6hFQkigGiTgQMgl0gAnIgFgCQhEgWmFAgQkZAUjDjVISHivICeklQHOEsLvg6QNBhCF6CrQDbBgHLAzQG0AWDnCAQJoEQFyq5IDYDzIiHNAIgGAig");
	this.shape_124.setTransform(320.95,1396.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#C8BF5F").s().p("EjHXAhWQI8wbRCoCQH2jjX0l4UAaOgGDAkzgCaMBBCgCkUAXJgA+AkTgEAUArEgFSAOmgBGUAx7gD1AZVgF2IEngWQCTgkiSjqQI2CYCaCLQCKCKCsIiQhUg/hIgxQihhpgsApQAMCWg2AfQw4jgtDB0UgkSAFkgLNAA4Uib9ALlhO5AHTUgu4AEbgboAeQIg9AiIhXAIg");
	this.shape_125.setTransform(1889.75,1138.675);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#293946").s().p("EgGBBXNQtQk+qLrpQjEiGhbhmQiIivgukhQiHtRljj5Qj9jeneBtQlzk3pmBUQreCCjsh1Q85nF4LMBIjWARQlyk2o1BQQqKCdlJgIIAUgCUgU+gK0gg3ANrIjDAPQlykyqKBYQrVCglsgDIAUgCUgQsgKlgh3ANKIjFAQQj+k7p8BXQr/B/jAhzQ7Zmh6qLcIjaASQj/k4pKBTQq2CalCgHIAVAAUgRfgK2gk3AOOIjHARQglknmMAhQnbAmhRg6Qnij/vbBxQ3yCZiMANIGcqiIFfgbQGXF8RgiYQWijVE8AmQEBFuMRhhQSkihB2gJMAvjgDVQFCFqMHheQSRjCBpAZMAvZgDVQFuFqMAhfQSTjDBrAZMAvPgDWQGIFqL+iAQQuiaC9ASMAvEgDVQHHFpLziAQQhiaCtATMAvMgDYQGSFQJ4hWQNoiMCcAVQgtR0GSKGQFUIuLCE5UAhQAQbAm8gL6QQ/kdFUl0QJ5qvjK4oQhVqfMAg+MAtxgDyQCKgtQ6gWQLhgcEhmiMAyogEKQBwgrSJgdQMMggExl7MAxYgEiQCgguP8gUQLfAEC7mJMAwZgEbQBigoRsgeQL2ggDUllMAstgEHQBfgmRfgdQLpgfCslbQRghbDCgtQBlgKEsAIQDBgvmQl+Qn/oAkejpQnpm2mNiHQlyhslTBSUhSDAMigqvAFlUhW6AKBgsVAFUIjxAUUha1AQ6g2TADAIgVghICHtAIBXgIIA9giUATOgBFA3ZgHgMCaFgU2UASlgCUAjvgFWUAgDgEnAXAgA9QI3gsQ0jyQP3jwKOADQDAgPgHhOQgBhql6kZQA2gfgMiWQAsgpChBpQBIAxBUA/QOuHBQmOXQKBI3UtUAQlygBipAOQkkAWCHFGQp6AUlbABQpVAQhaE+IjAAQUgjKgGzgLjAMGIgDA+Ihng2Qq6gHlMAdQptATiTFJIjCAQUgmhgGugMEAMWQrXgDlfAdQqZAWjiFWIi0APQ6mm46mKOQi4Bwr8BAQp+ATjDFcIi5APUgiDgIdgQiANsIgaBGIhHgcQrMgIlhAeQp0ARkpFqIl2AfQnkkpojBPQtlBpgjAEQhfAHxeA9QrnAbl9FPQgdAkleBCQjkARgmEXUAGfA0PgqrADuQ27sI11OxQvQhLo1i6gEnRygEuQjYg3ilhPILKg4IeqiPMAtAgDoITyhhQMghVO8gvUAZKgBSAgTAAQUBDHAAiARSgA6UAL9gAgAxEAApUAijAAlAXDgCTQCCgNB8gOQEYhuD4EQQBfBsExH/UgpvADzgzsgAHUge4AAHg9/gBjQpggM1eAzQ0EAqqvgiUgPSgBFghJABuUgg0ACGgPxgBeQmSg49GB2QkfAQkBAAQq0AAnRh3g");
	this.shape_126.setTransform(27.35,1563.8844);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#E2DF8C").s().p("AkOinQCDgcE4gDQBHBNCnA+QA0AUA/ASQiMDClZAGQl5gMi9AgQADk5D8g1g");
	this.shape_127.setTransform(606.05,517.025);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#D6CD70").s().p("AmwCPQBuklIQioIAMAKIDXC/QmAGpnDALg");
	this.shape_128.setTransform(354.45,842.475);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#D3CA66").s().p("AiDjVIBPinQAcB+ByENQBXDhhaCNg");
	this.shape_129.setTransform(393.8446,334.125);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#E2DE8C").s().p("AiUhKQggiNDwgeIBdFFIhPCmQjJjUgVhsg");
	this.shape_130.setTransform(373.2375,288.075);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#E8E49E").s().p("EDqJAwYQCmgMNLA0IGPAoQDWgRAgiMICsDDQkWFFsiAMQ0AAChMAGQBemSIEg9gEkGqARRQF8lFDeFSQizCYiUAAQiaAAh5ilgEgwIg1OQAui0ClAhIEYBzQguCIiWAKQi2gDhYAGg");
	this.shape_131.setTransform(621.225,519.9872);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#E6E198").s().p("EiYXBMrQBOisDSg+QDchug5EfQg9CqjjBCIgiABQjAAAA/i0gECVEg9gIiYh+QA/i4EnApIAWB2QgbCYinAAIgigBgEhGohMKQCfjVDOABQAoAygiA4QhCB1i0AAQg5AAhEgLg");
	this.shape_132.setTransform(-721.3659,605.2141);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#E5E096").s().p("Ai6BrQARinBsgsQALgCDegNIAPBlQgeB0hxAVIgRABQg5AAicgNg");
	this.shape_133.setTransform(89.25,-23.5316);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#D1C865").s().p("EhsaBbRIATANIgKgZQEIg0gEklIhgoVIjn2rIB9gJIFecRQB8KaDpm+IAmAXICjgNIjzUCIjcARQl1mHiLpVgEC7EAyUQmPhvi2ggIEkhaQDFgPGMARQACDpkBAAQgYAAgZgCgEi/0hVUIMmgmIAIBnIjrAoQgzgXj4AdIgcABQieAAhehwgEhe4hoFIBwAOIgBAAIgBAAQgUAAhagOgEho+hqUIEagRQAwAJD4gPQC1gLCEBjIk7BDIsVAZQAuiGCngXg");
	this.shape_134.setTransform(743.1506,546.3652);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#E6E199").s().p("AnDgcIOHg5QjFCrj+AAQjOAAj2hyg");
	this.shape_135.setTransform(285.175,-54.854);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#D9D17E").s().p("AwcA/Qj4AOgxgIQB6hbEmgSQB1gICSAFQJkDHHQkJQC0gZCbgJQGCgYDfBGQhGAckOARQjlAChHB6I2pBOQiEhji1AMg");
	this.shape_136.setTransform(234.4,-142.6798);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#E1DD89").s().p("AljAZQgJgggOgfQgQgegTgcQCMgKDzguQDkgQDYCPIgmCfQhoAVhoAAQkFAAkGiCg");
	this.shape_137.setTransform(875.85,245.9588);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#D9D179").s().p("EiejAaSQCogMEzgDQjFDQkpAVQlAgOirAeQDWjTEogTgEChWga4QlBhGgNABIgkhJQBkgHC7gqQC1ADDqCXQhQA2hyAAQhAAAhKgRg");
	this.shape_138.setTransform(-138.65,361.275);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#D0C661").s().p("Ej9CBZsIEJjkIAPgOQGRgcRnAzQO1ApJziGMAkYgCoMAh4gCIQApATGyg1QCAgKBjAfQB/AnBKBtUhH5AK3gxSgBAIumAXgEBUjBHEIgTiwQJkArDiIgQktAAoGmbgEDwbge7ILugiQATAcAQAfQAOAfAJAhQj6AgiAAIQgkAFgkAAQi6AAisiGgECT6hbWIQ1hCQkKCYk5AAQjsAAkGhWg");
	this.shape_139.setTransform(-779.25,437.625);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#D7CE73").s().p("AgIBFQkDgdjGhbQCcAEDyg7QD9ghD0CyIAkBJQk3gZijgSg");
	this.shape_140.setTransform(813.975,171.0503);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#E2DF8D").s().p("AlCAIIg/h3IBygnQBzAXDSgcQDGAgCGDxQjVAdhzAJQjHgDi1iRg");
	this.shape_141.setTransform(702.575,243.225);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#D3CA6B").s().p("EBzeAISQCiATETgvQD3gRDZCGItNApgEiBMgJiIJBgxIgHBoIpQAzg");
	this.shape_142.setTransform(-68.125,101.375);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#D0C763").s().p("EiUYAxnIG9hhISlhBIFSgCQDIgPBcCmI3eCuQg8gTlWAZQgWACgVAAQjaAAhjipgECFygzQIDug/IJ5AFIBAB4It4A7g");
	this.shape_143.setTransform(-279.35,565.9046);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#D5CE6C").s().p("AuAAEIbShzIAvB4QgnACs5BXQiKAOiBAAQlzAAkjhsg");
	this.shape_144.setTransform(491.925,249.0022);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#CFC55F").s().p("ElypBNnIIKhXMAg1gCcIBLEEQjDgKzBClQjbAXi/AAQo1AAk3jDgEFeagCkIPWkCIE6CkQgeC+khAWIoJAlgEAwfhM4Qhagng2hUIcPh2QAJBYg4AwQhSAUgsASI09BYQhegJg3gMg");
	this.shape_145.setTransform(100.35,663.4032);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#D7CF74").s().p("EhgyBWpIPWD3QioCGi0AAQkuAAlMl9gEBW+hcSQBuAGDAgYQCugMCZB4IqgAeg");
	this.shape_146.setTransform(62.275,545.9275);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#EAE6A2").s().p("EjtaBeOQBWjHEhhFQCdBUgNBJQhBEOkwAYIgfACQi4AABBi5gEhVdATnQAWgoBHg/QBggtAUgUQDxAVgbCIQggCcjIA3IgnABQjfAABHjJgEDoNg9nQjPgfiwjRQB1AHDOgcQC6gNCpB6IA4CBQjTAZhgAAQgbAAgRgCgEDemhfvQAChmCBASQB+ARCEBsIgrB3QgfACgdAAQkPAAgPiig");
	this.shape_147.setTransform(-844.6698,564.0001);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#E4DE94").s().p("EAPWBIlQgIgWCBkBIDZB2QBXDFi3A8QhXAcgtAEQhVgRgZhvgEgQ+hHOQiOg3hEgWIgzhiQBGgFCNgiQBzgIB0BsQA8A8g2AqQgtAZg3AAQgpAAgugNg");
	this.shape_148.setTransform(605.7626,414.9724);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#D1C767").s().p("AtvBNIlUgPQBHh6DlgCQEOgRBGgcIKLgEQgXBMhaAXIgRADQh4AThAAPIp9A0Qg/Aag4AJIB3gjgAH8gfQBCgFB4gTIIPgJQgWBRhZAUIgHACQh3AShEAFIobAKQAWhVBtgSg");
	this.shape_149.setTransform(427.4,-141.675);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#D3CA6E").s().p("ADlA4QBEgFB4gSIAGgCQBZgUAWhRQDrgnCgBjIiVBpQgYAMgMANQhfANhTAAQjNAAiEhNgAuhATQBAgPB4gTIARgDQBbgXAXhMQF/gwDuBoQh3AThCAFQhtASgWBVQi8AXhlAHQi6gBiRhMg");
	this.shape_150.setTransform(496.1,-141.0756);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#D4CB6D").s().p("EgNJBQtQCzhxFhBJItaHqQCKlqC8hYgEBBrBIeIhmi6IL5g5QheDhjCAnQkFgdhuAIgEhJWg0TQBAgFB+gHICYB9In9AhQAsh7B7gXgEhAxg2uIJWg2IAZB1IpaA2gEAdUhXCIK1gsQh9CAjBAaIkoASg");
	this.shape_151.setTransform(667.9,535);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#E8E49D").s().p("EhO5BSyQhRiFhChWQGIldBHF/QAmDriiAAQhKAAh2gygEiS4g+LQCMioByA8QAVAMATAzQATAmgPAbQg7BThVAGQhuAGg8AFgECLchMzQBwjMEuDLIBPCAQg6AJg3AAQjUAAioiIgEApkhOuQBNi3CngjQBkgUCzACQIhECFnk7QBVAHC0gXQC3ANC/CmQtpCEufAAQiEAAiGgCg");
	this.shape_152.setTransform(-78.3,469.6872);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#D7CE74").s().p("EiNwAI1QBrhJCegJID0gQIgQB5QivAlhWAGIgeAAQh9AAhNhCgECJLgHxQixAKikh3IJDgYIA4ByQifAUhgAAIgngBg");
	this.shape_153.setTransform(-162,24.9485);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#EBE8A6").s().p("Ah+ANIg4hxICjgKQBcgGBWBjQAwAwgyArQghAlgxAAQhPAAh6hig");
	this.shape_154.setTransform(757.9505,-28.1318);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#D0C665").s().p("AqTgOIBBhmQAFgGADgGIJjAkQFaAOEhBOIhJCBQslgMm5iDg");
	this.shape_155.setTransform(774.475,-121.55);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#CABF52").s().p("ARwAnIGrALIgIANIg6BmQkegHiUAKgAt6goIqgAFQALgNAZgNICVhqIGwAJINDBFQgDAGgFAFIhBBmIlTAVQjIAAiohVg");
	this.shape_156.setTransform(726.875,-125.425);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#CDC259").s().p("EDUpA3SQSwFtO6NnQ1Ip7sipZgEjl8AKnQjez3helrMgIQgsqQgNjEgehlQghixh9hqIBfh3IDLgyIArCgQg0DoAzFBQAkDEBTF1MAQLBZyQkTqziuxIgEBncgERQHrCQFSCuQHGDyGbGiQx3ononmrgEgZShKlQMKDRHAH6QtSmRl4k6g");
	this.shape_157.setTransform(1448.8,402.075);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#E8E39D").s().p("ACJDGQi3gKljj5QCNiUCYAMQC0AIFKDNQhbC3idAAIgRgBg");
	this.shape_158.setTransform(1814.55,854.5761);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#D1C764").s().p("EDGPA7FQBIgiBsgHQGpgKAfgXIcpiaIfOiRIYEhwQBnAOCxAJQCSAKDPCGI5vCiMgsSADPMgj+AB8QAZh6B2g1gEjVoAtGQiBgKgqiTIK2hmQAOgCDVAXQB/AIAwCTIq4BWQidgIhIAFgEkt8gkdIACgIQAmhYAngyQAwhSBRggQBeAHDTgaQC2gMBDBlQgcAPj4AeQigAJh0BxIjOAaIgGABQAAgBAAgBQAAAAABgBQAAAAAAAAQAAgBABAAgEAAUg8hQBkhTCzACQBtAFDKAAIAzBjQjBAYhoAHQgcACgbAAQibAAiGg4g");
	this.shape_159.setTransform(409.975,336.5476);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#E1DB8F").s().p("EgJjBOQQACkKC+g/QB+gJEHAEIBfDSQirCdhdA6Qg8AchBAAQiGAAiZh3gEABPA1YQARk4FegZILehMIBTDCIokDEIkYBYQguAJgvAAQiCAAiFhKgEBqTA1cQi/g3lcjfQCmh9DrAzQCdA3FHCzQhVCBigAAQgvAAg2gLgED7bAxgQjrmiINBLQCXFjk0AAQg6AAhLgMgEkAuANhQFLg8KkidQJHhgGdCuQpREso/AAQmmAAmdihgEjiDhOjQDigPGqhBQGGglEIAjQlkDTlwAAQkfAAkniBg");
	this.shape_160.setTransform(808.0192,511.5336);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#E5E097").s().p("AtEDnQBGgYCYgKQBjgtgfh/IHfgPQEcgBjBmCIGID1QDgCUDFDlQnnBtkUATQhDAFhDAAQl7AAmNiTg");
	this.shape_161.setTransform(1726.825,458.485);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#D2C866").s().p("ECQHA+4QDojEIxBzQi0CTj5AAQimAAjGhCgEicfg9vQCEgjEVhdQDigpClCEIo/A+g");
	this.shape_162.setTransform(248.2,422.6762);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#DFD889").s().p("Ej7oBTiQGInXHNCYQmHF8kMAAQhrAAhXg9gED12AzGQiWgjm0jcQDchrDSAfQDPA0FADOQhdBYiTAAQg9AAhGgPgEDC3AvvQhJgSnZjSQFrjMI7FnQhWBgiRAAQhHAAhWgXgEiL6hMaQiFgHg7AFIAHhoQFFg8ANAAQALgCAKAnQAWAlgMAOQhJBOhjAAIgMAAgEhGMhRcQkOhKgjADIgIhmQGwhPDJDbQhUA1hmAAQhAAAhGgUg");
	this.shape_163.setTransform(76.675,535.1304);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#D0C560").s().p("AvHB7QABgnAMgdQAahOBUgaQAdgJAkgBQEagrATgVIWlgpQgRCni4AiQgbAFgbACQlGAWguAbIvuBIg");
	this.shape_164.setTransform(1486.75,718.3);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#D7CF76").s().p("ApHDfQiQgOiahyQAtgaEugVQALgCAOgBQClgMBDhfQAbgrAKg5IIlhQII+CSQgTAVkaArQgkACgdAJQhUAYgaBPQgMAegBAnIrDBcQisgIhigMg");
	this.shape_165.setTransform(1350.55,715.55);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#D3CA6A").s().p("EAPdA8DIBaiuIM6iOMAnTgB2IBVC2QkQAn1FA5QveAxojD6IASARIk8AGgEhGXg99QBSgGCcgjQCLgKCABFQhNBFiYAKQi0gChSAGg");
	this.shape_166.setTransform(556.9,361.1425);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FBF7CF").s().p("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");
	this.shape_167.setTransform(-24.3593,1044.7941);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#DCD481").s().p("AmdhFILlg2IBWC/IroA4g");
	this.shape_168.setTransform(967.475,818.85);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#D5CC6F").s().p("A03DGQIkj5PcgxQVFg5EQgoIDegRQCXAgB1B2Mgx+AEQImvAGIgSgQgEgh0AAAIEIiJIEqATIhaCtIprAYg");
	this.shape_169.setTransform(825.15,739.95);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#D4CB6C").s().p("EB4TAyuITAhbQjQE+lUAAQkfAAl9jjgEj6+AuvQhjgfiAAKQmyA1gpgTQFPjeGpgeQDrgRHjgMQBhC9D9gRQFLgZA8ASQkiDGl9AcQmoAJjdAQQhKhth/gngAtArYQk96Jg1wGQBeFsDfT4QCtRIETKyIFjcOQhHBxAGDFQAEBtAuDyIh9AKUgGegiNgDEgPvgEDjWAMLQAugaFGgWQAbgDAbgEQC4giARioQEGACHYhMQG3giGfCiQgfAXmpAKQhsAHhIAiQh2A1gZB6QmwA0jeAQQhHAFhGAAQlRAAkwh3gECWlAKxIjdARIhVi2QESAAIOhOQHigjGfCeQhBAZmIAHQhbAGhEAcQiEAzgwCCIlGAWQh1h2iYgfgEiwTgWeQCYgLEWgBIghChIswBJQCki8D/gigEjv6g1JQBuAXJahVQG0gsDeCqQhMgLqABJQhsAOheAAQklAAifiMg");
	this.shape_170.setTransform(65.775,649.6185);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#D0C561").s().p("AvvAAQBEgcBcgGQGIgHBAgZITyhxIE4ApQgKA4gbArQhDBfilANQgOAAgLACQkuAVgtAaI7EA+QAviCCEgyg");
	this.shape_171.setTransform(1207.725,713.225);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#D6CE6D").s().p("A9mDGQing+hHhNMBCqgEmQhVCqjUAhQk/AVggAVMgzBADiQg/gSg0gUg");
	this.shape_172.setTransform(836.65,491.225);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#D9D27C").s().p("AmMBfQA6i7D4gQQCIgKEbARIA+BwIAGALIn/Bbg");
	this.shape_173.setTransform(1170.6,487.2648);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#D0C662").s().p("EBYQAXWQCgjgFhguIJigsIJrgYIA7CmIjwBmQkGhYnjDOQjOBSi4AAQjnAAjDiCgEkEUAToQhIg2AXh2ILZhbIGlAKQjPDSkcAUQljAEhmAwQhjgNg2gQgEBsGAROIiTBOQBKg0BJgagEDKUgV9IgTgJIg/hxIOrhTIBdCfIkAA2gED2igWHQBAi+EfgCIHsgQIBfCOIj/BKg");
	this.shape_174.setTransform(-83.1641,629.8192);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FDF9D5").s().p("ElkDBmUQA8iXCYiEQGhEENmhYQTBilDCAKIJIkcIBNEEQsnFjvtAyQxYgQpPAsIgMAAQhoAAA8iPgEk3vBeGMgg1ACcQTZpPNcGzgEhw9BVtQD5jrIXCZQkZCLjmAAQiTAAh+g5gElzFBNZIOmgXQl8EFjrAAQjiAAhdjugECAABFlQDKlDH/gOQMjgOAwgCIA8BCIhkCVIzABbIjUEBgEkbTBDMMgkYACoQUfn+P5FWgEi21A1JIm9BhInPALQHfn1GtGJgEEs6AwqQgdmuJtD5QBqAlgdAxQgfAZgtBIQmMgRjFAPgEFnTAtCQgYj5DigQQBagHGRA9QCxFilDgVQl0gqgEB0gElDlApKQDVlhCPAKQBSANCGBuQCplsClgMQITgSQ3iFQO1hpI/CtIrYBbIoLDUQihjhmiBFQp0BTg1gPIpSAVQjXGbkIAoQkogoigAggEBl5AlSIDwhmIE8gGIGvgHQihEDksAAQjgAAkuiQgEkMsAjHQBmgwFjgEQEdgUDPjSICagfIBaDSQmGEGlIAAQkAAAjbifgEDQMAgRIALgCILEhdIEtAqQihDwkVAAQj1AAlRi7gEE89AevIP5hKQhCEgkhAAQj5AAmdjWgEBleAeFQFUndMPFiIs6COgEDMnAZQQD1mYJqFwIomBRgEFOVAWdI/OCRQLSnDT8EygEiQiAIBQCAgKDYCZIq2BmQCmj7C4AGgEC3XgFeIH/hbIgGgLIAUAJIK2AIQj0DilgAAQkWAAlZiNgEDpSgFiQgwgVgvgXIBxgZICNgeIKrAIQh+DQkBAAQjBAAkKh1gEheegIDQgTgJgPgSICKgtIKYAIQjYC+jTAAQisAAiph+gEjlmgeiQi2gEBThyQBOhhCihIQDSC5G8g7QKAhJBMALIEoisIBfChQmnDVopAXQpkgIk6AGgEBgGgvMQD5k4HOEBQARAHATAOIhyAngEDpdgwvI7eBlQLgl6P+EVgEBEvg4RIU8hYQkxDAmOAAQkmAAlXhogEA7ag7kQGJgpLvhrQKjg7IpCMIkFAQI8PB2IlUCrQAXjuANAAgEjkDhFhQD4geAcgPQCegKE3AHQjfCfkvAHQk/gViwAZQB0hxCggJgEAZOhl4IhwgOIhGgLIE7hDIWqhOIFUAPIh3AjQo6CdptAAQksAAk5glg");
	this.shape_175.setTransform(-14.3171,533.6451);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#D6CE6F").s().p("AFNQtIOmhBQAUB/hmArQiNAdhIAYQl9gMikANgAyQyLQA3gUCFgYIL5gUIBKB7IxjBbQgLhwBvgmg");
	this.shape_176.setTransform(1263.9893,361.825);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#E4E38B").s().p("AfQUOQAwAXAvAWQgfgChAgrgAOYSyQBIgYCNgcQBngsgVh+QCRAaDyhHQDzAAEMFNIAAABIhxAZQhCgOmwAxQglADgkAAQkKAAjziCgEghBgUGQCvAEFIg1QEygVEQB8QiFAYg3AUQhvAmALBxQjtAfh0AJIgTABQjSAAjTkig");
	this.shape_177.setTransform(1269.15,364.2546);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#EBEB9C").s().p("EhdBARXQk0lTkmuPQBaiNhXjhQhzkOgch+IhdlGIDmiMQGICRIagzQM5hXAngCIN3g7QC1CRDIADQBzgJDVgdIC2iaQDNCgDhgfQCAgID6ggQFuC0FuhHIJ4gqIJpgqIDDibQDaEvDcgOQB0gIDtggIRkhbMAmCgCSMAk8AcvQDBGCkdABInfAPIukBBInsAQQkfAChAC+IiNAeIgBgCQkMlNjzAAQjyBHiQgaIumBBIurBTQkagRiJAKQj4ARg6C8QnBAxjrARQmmAwleigQAggWE/gVQDUghBViqMhCrAEnQk5ADiDAcQj8A1gDE6Qpfgykslag");
	this.shape_178.setTransform(1058.1084,386.225);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#D6CE6E").s().p("EAuJASmIhfiOIOkhBQAfCAhjAsQiYALhGAXQhlAHiQAAQiFAAipgGgEg6ugSoIISgDQgCAaAVAkQAPAbAeAhIp4Aqg");
	this.shape_179.setTransform(1293.1446,362.613);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#D0C660").s().p("AlAAcQgVgjACgaQBtAHDCg8QCygMDHCQIppAqQgeghgOgbg");
	this.shape_180.setTransform(1004.2913,246.4256);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#E2DC90").s().p("Ejx1BYSQAQgDHmjKQE3h2CEDNQjJEXkBAsQkFgEiUA7gEDmVAp2QqHhsgtADIhXjAQDSgRGQgyQGDgHGVB/QiNEDk8AAQhOAAhYgPgEg5DgR1QD4ghHEAVIMrBSIAOCIIiJAuIq0ALI2iBiQFNkrGdg+gEiNugqJQBYAIEVhdQD5hcCJBhQh8CwjIAcQjdgBhvAngEDj+hayQF5i3H/CaQifCYjuAAQjVAAkWh7g");
	this.shape_181.setTransform(-395.975,568.3739);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#CBC053").s().p("EifSAEnQgHgFgEgFIG0hAICEBzInBA1gECV6gD8QAJgNAWgNICGhuIG+AJIhFAzIhmBKQhIAFiIAAQhjAAiFgDg");
	this.shape_182.setTransform(119.3,-62.475);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#D7CF7A").s().p("ArRgEICLhhQAfgNAGgOQDWAXGRABQFrAOEhBTIiFBtQgXANgIANIh5ABQrOAAm4iFg");
	this.shape_183.setTransform(1022.975,-100.5543);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#CBC054").s().p("Egm5BMwQi8geh0h4IACjXILtCMIiJDhQjKgIhsAIgEBNBBE4IgNgLQBSAPEViqQDTh7DOCzQg3CxirA5QjfAlhjAdgEiphg1DQDThzEXgqQCagLE5gfIB6B3IvJC8gECbMhK9IA6hlIAIgNQDCBJD2gCQFFgJBXAHIgmAbIiKBhQjtAChxAHIgCABQjUAAiyhZg");
	this.shape_184.setTransform(-116.6,370.8);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#D6CD72").s().p("AmaAfIBnhJQA6gTALggQGfg0DqBjQh3AUgxAQQggAGgWALQg1AbgBBAQhgANhVAAQjSAAiahQg");
	this.shape_185.setTransform(1163.775,-91.0925);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#CBC156").s().p("AntBTQAAhAA2gaQAWgMAggGQAxgQB2gUQCCARDJglQC3gMDGByQjjA+qcAAIhcAAg");
	this.shape_186.setTransform(1226.725,-89.5677);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#CEC35B").s().p("EivHA8cMBEygFlQGLgdCwCyIieDMQt/hWy7BEQ14B4rFAzIlCADQi4gKheiOgED9KgoiQO5EuIyJJQwBnbnqmcgEkITg3dIgCAIQgBABAAAAQAAAAAAABQgBAAAAABQAAAAAAABIAGgBQlhHjnCB9QFxoJGwhigEDUFg+zQNDDoIGIrQu4nHmRlMg");
	this.shape_187.setTransform(169.275,457.3);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#CEC45D").s().p("EhnlBG6QqmnrnytRQAEgBAEABQgDgFAAgDIgDgKQL5DlGmRcIAKAaIgTgNgEBSxhEYIJshIIbehmICDCXMgmDACSg");
	this.shape_188.setTransform(712.275,676.7);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FBF7D0").s().p("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");
	this.shape_189.setTransform(-45.575,495.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.instance_6}]},95).to({state:[{t:this.instance_5}]},62).wait(103));

	// BG
	this.instance_7 = new lib.CachedBmp_52();
	this.instance_7.setTransform(984,477.75,0.3616,0.3616);

	this.instance_8 = new lib.CachedBmp_51();
	this.instance_8.setTransform(0,-132.05,0.3616,0.3616);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7}]}).to({state:[]},95).to({state:[{t:this.instance_8},{t:this.instance_7}]},62).wait(103));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3508,-799.3,7079.7,2966.5);


(lib.snail_walkin_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smile
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(168.55,-38.25,0.4373,0.4373);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(48).to({_off:true},1).wait(551));

	// eyes
	this.instance_1 = new lib.eye("synched",0,false);
	this.instance_1.setTransform(170.25,-135.95,1,1,0,0,0,4.6,-1.9);

	this.instance_2 = new lib.eye("synched",0,false);
	this.instance_2.setTransform(230.95,-132.05,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{startPosition:0}},{t:this.instance_1,p:{startPosition:0}}]}).to({state:[{t:this.instance_2,p:{startPosition:19}},{t:this.instance_1,p:{startPosition:19}}]},48).to({state:[]},1).wait(551));

	// clock
	this.instance_3 = new lib.clock3();
	this.instance_3.setTransform(-64.25,40.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48).to({_off:true},1).wait(551));

	// shell
	this.instance_4 = new lib.shell("synched",0);
	this.instance_4.setTransform(-30.05,38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(1).to({startPosition:0},0).wait(7).to({startPosition:0},0).to({scaleX:1.0004,skewY:-1.1581,x:-30.1,y:36.4},7).to({_off:true},1).wait(551));

	// tail
	this.instance_5 = new lib.tail("synched",0);
	this.instance_5.setTransform(-110.85,128.85,1,1,0,0,0,72.8,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},1).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).wait(1).to({regX:-0.1,regY:-0.2,scaleX:0.9749,skewY:-3.0998,x:-181.75,y:132.45},0).wait(1).to({scaleX:0.9681,skewY:-3.1495,x:-181.25,y:132.5},0).wait(1).to({scaleX:0.958,skewY:-3.2222,x:-180.55,y:132.55},0).wait(1).to({scaleX:0.944,skewY:-3.3242,x:-179.5,y:132.6},0).wait(1).to({scaleX:0.9249,skewY:-3.4626,x:-178.1,y:132.7},0).wait(1).to({scaleX:0.8999,skewY:-3.6436,x:-176.3,y:132.8},0).wait(1).to({regX:72.7,regY:0.1,scaleX:0.8692,skewY:-3.8664,x:-110.95,y:129},0).to({_off:true},1).wait(551));

	// front
	this.instance_6 = new lib.top("synched",0);
	this.instance_6.setTransform(125.65,15.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(1).to({regX:0,x:125.65},0).wait(7).to({regX:110.9,x:236.55},0).to({regX:111,regY:0.1,scaleX:1.0005,skewY:1.3537,x:236.65,y:15.4},7).to({_off:true},1).wait(551));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-256.7,-159.3,513,331.8);


(lib.scene2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// text
	this.instance = new lib.office_text("synched",0);
	this.instance.setTransform(-734.9,103.75);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35).to({_off:false},0).wait(1).to({regX:-1.7,regY:-0.7,x:-721.45,y:103.05},0).wait(1).to({x:-706.35},0).wait(1).to({x:-691.25},0).wait(1).to({x:-676.15},0).wait(1).to({x:-661},0).wait(1).to({x:-645.9},0).wait(1).to({x:-630.8},0).wait(1).to({x:-615.7},0).wait(1).to({x:-600.55},0).wait(1).to({x:-585.45},0).wait(1).to({x:-570.35},0).wait(1).to({x:-555.25},0).wait(1).to({x:-540.15},0).wait(1).to({x:-525},0).wait(1).to({x:-509.9},0).wait(1).to({x:-494.8},0).wait(1).to({x:-479.7},0).wait(1).to({x:-464.55},0).wait(1).to({x:-449.45},0).wait(1).to({x:-434.35},0).wait(1).to({x:-419.25},0).wait(1).to({x:-404.1},0).wait(1).to({x:-389},0).wait(1).to({x:-373.9},0).wait(1).to({x:-358.8},0).wait(1).to({x:-343.7},0).wait(1).to({x:-328.55},0).wait(1).to({x:-313.45},0).wait(1).to({x:-298.35},0).wait(1).to({x:-283.25},0).wait(1).to({x:-268.1},0).wait(1).to({x:-253},0).wait(1).to({x:-237.9},0).wait(1).to({x:-222.8},0).wait(1).to({x:-207.65},0).wait(1).to({x:-192.55},0).wait(1).to({x:-177.45},0).wait(1).to({x:-162.35},0).wait(1).to({x:-147.25},0).wait(1).to({x:-132.1},0).wait(1).to({x:-117},0).wait(1).to({x:-101.9},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(4));

	// LETTERS
	this.instance_1 = new lib.zzz();
	this.instance_1.setTransform(543,-168.8,1,1,0,0,180,108.3,102.8);
	this.instance_1.alpha = 0.6406;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(140).to({_off:true},1).wait(4));

	// mask_ (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("Ar3JJICM26IVjDZIi/YKg");
	var mask_graphics_140 = new cjs.Graphics().p("Ar3JJICM26IVjDZIi/YKg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:349.15,y:28.2}).wait(140).to({graphics:mask_graphics_140,x:349.15,y:28.2}).wait(1).to({graphics:null,x:0,y:0}).wait(4));

	// spider
	this.instance_2 = new lib.spider("synched",0);
	this.instance_2.setTransform(399.9,-89.35,1,1,0,0,0,0,-80.4);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regY:-80.3,rotation:5.7167,y:-42.65},39).to({regX:0.1,regY:-80.4,rotation:4.7274,x:400.05,y:-89.35},80).to({startPosition:0},21).to({_off:true},1).wait(4));

	// desk
	this.instance_3 = new lib.sleepingman();
	this.instance_3.setTransform(521.6,181.1,1,1,0,0,0,325.4,305.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(140).to({_off:true},1).wait(4));

	// man
	this.instance_4 = new lib.sleeping_man("synched",0);
	this.instance_4.setTransform(472,175.05,1.0001,1,0,0,0.5123,-157.9,153.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:-3.7,regY:-3,skewX:0.191,skewY:0.7401,x:626.7,y:20.3,startPosition:1},0).wait(1).to({skewX:0.3821,skewY:0.9671,x:627.2,y:20.95,startPosition:2},0).wait(1).to({skewX:0.5731,skewY:1.194,x:627.75,y:21.5,startPosition:3},0).wait(1).to({skewX:0.7642,skewY:1.4209,x:628.25,y:22.15,startPosition:4},0).wait(1).to({skewX:0.9552,skewY:1.6479,x:628.75,y:22.8,startPosition:5},0).wait(1).to({skewX:1.1462,skewY:1.8748,x:629.2,y:23.4,startPosition:6},0).wait(1).to({skewX:1.3373,skewY:2.1017,x:629.7,y:24,startPosition:7},0).wait(1).to({skewX:1.5283,skewY:2.3287,x:630.25,y:24.65,startPosition:8},0).wait(1).to({skewX:1.7194,skewY:2.5556,x:630.75,y:25.25,startPosition:9},0).wait(1).to({skewX:1.9104,skewY:2.7825,x:631.2,y:25.85,startPosition:10},0).wait(1).to({skewX:2.1014,skewY:3.0095,x:631.7,y:26.5,startPosition:11},0).wait(1).to({skewX:2.2925,skewY:3.2364,x:632.2,y:27.15,startPosition:12},0).wait(1).to({skewX:2.4835,skewY:3.4633,x:632.7,y:27.8,startPosition:13},0).wait(1).to({skewX:2.6745,skewY:3.6903,x:633.2,y:28.4,startPosition:14},0).wait(1).to({skewX:2.4962,skewY:3.4785,x:632.75,y:27.85,startPosition:15},0).wait(1).to({skewX:2.3179,skewY:3.2667,x:632.25,y:27.25,startPosition:16},0).wait(1).to({skewX:2.1396,skewY:3.0549,x:631.8,y:26.65,startPosition:17},0).wait(1).to({skewX:1.9613,skewY:2.8431,x:631.35,y:26.05,startPosition:18},0).wait(1).to({skewX:1.783,skewY:2.6312,x:630.9,y:25.5,startPosition:19},0).wait(1).to({skewX:1.6047,skewY:2.4194,x:630.45,y:24.9,startPosition:20},0).wait(1).to({skewX:1.4264,skewY:2.2076,x:629.95,y:24.3,startPosition:21},0).wait(1).to({skewX:1.2481,skewY:1.9958,x:629.5,y:23.7,startPosition:22},0).wait(1).to({scaleX:1,skewX:1.0698,skewY:1.784,x:629.05,y:23.15,startPosition:23},0).wait(1).to({scaleX:1.0001,skewX:0.8915,skewY:1.5722,x:628.55,y:22.55,startPosition:24},0).wait(1).to({skewX:0.7132,skewY:1.3604,x:628.1,y:21.95,startPosition:25},0).wait(1).to({skewX:0.5349,skewY:1.1486,x:627.65,y:21.45,startPosition:26},0).wait(1).to({skewX:0.3566,skewY:0.9368,x:627.1,y:20.85,startPosition:27},0).wait(1).to({skewX:0.1783,skewY:0.725,x:626.65,y:20.25,startPosition:28},0).wait(1).to({skewX:0,skewY:0.5132,x:626.2,y:19.7,startPosition:29},0).wait(1).to({skewX:0.1486,skewY:0.6897,x:626.55,y:20.15,startPosition:30},0).wait(1).to({skewX:0.2972,skewY:0.8662,x:626.95,y:20.65,startPosition:31},0).wait(1).to({skewX:0.4458,skewY:1.0427,x:627.35,y:21.15,startPosition:32},0).wait(1).to({skewX:0.5943,skewY:1.2192,x:627.8,y:21.6,startPosition:33},0).wait(1).to({skewX:0.7429,skewY:1.3957,x:628.2,y:22.05,startPosition:34},0).wait(1).to({skewX:0.8915,skewY:1.5722,x:628.55,y:22.55,startPosition:35},0).wait(1).to({skewX:1.0401,skewY:1.7487,x:628.95,y:23.05,startPosition:36},0).wait(1).to({skewX:1.1887,skewY:1.9252,x:629.35,y:23.55,startPosition:37},0).wait(1).to({skewX:1.3373,skewY:2.1017,x:629.7,y:24,startPosition:38},0).wait(1).to({skewX:1.4859,skewY:2.2782,x:630.15,y:24.5,startPosition:39},0).wait(1).to({skewX:1.6344,skewY:2.4547,x:630.5,y:25,startPosition:40},0).wait(1).to({skewX:1.783,skewY:2.6312,x:630.9,y:25.5,startPosition:41},0).wait(1).to({skewX:1.9316,skewY:2.8078,x:631.25,y:25.95,startPosition:0},0).wait(1).to({skewX:2.0802,skewY:2.9843,x:631.65,y:26.45,startPosition:1},0).wait(1).to({skewX:2.2288,skewY:3.1608,x:632,y:26.95,startPosition:2},0).wait(1).to({skewX:2.3774,skewY:3.3373,x:632.4,y:27.45,startPosition:3},0).wait(1).to({skewX:2.526,skewY:3.5138,x:632.8,y:27.9,startPosition:4},0).wait(1).to({skewX:2.6745,skewY:3.6903,x:633.2,y:28.4,startPosition:5},0).wait(1).to({skewX:2.5172,skewY:3.5034,x:632.8,y:27.85,startPosition:6},0).wait(1).to({skewX:2.3599,skewY:3.3165,x:632.35,y:27.4,startPosition:7},0).wait(1).to({skewX:2.2026,skewY:3.1296,x:631.95,y:26.85,startPosition:8},0).wait(1).to({skewX:2.0452,skewY:2.9427,x:631.55,y:26.3,startPosition:9},0).wait(1).to({skewX:1.8879,skewY:2.7558,x:631.15,y:25.8,startPosition:10},0).wait(1).to({skewX:1.7306,skewY:2.569,x:630.75,y:25.3,startPosition:11},0).wait(1).to({skewX:1.5733,skewY:2.3821,x:630.35,y:24.8,startPosition:12},0).wait(1).to({skewX:1.4159,skewY:2.1952,x:629.9,y:24.25,startPosition:13},0).wait(1).to({skewX:1.2586,skewY:2.0083,x:629.5,y:23.75,startPosition:14},0).wait(1).to({skewX:1.1013,skewY:1.8214,x:629.1,y:23.25,startPosition:15},0).wait(1).to({skewX:0.944,skewY:1.6345,x:628.7,y:22.75,startPosition:16},0).wait(1).to({skewX:0.7866,skewY:1.4476,x:628.3,y:22.2,startPosition:17},0).wait(1).to({skewX:0.6293,skewY:1.2607,x:627.9,y:21.7,startPosition:18},0).wait(1).to({skewX:0.472,skewY:1.0738,x:627.4,y:21.25,startPosition:19},0).wait(1).to({scaleX:1,skewX:0.3147,skewY:0.887,x:627,y:20.7,startPosition:20},0).wait(1).to({scaleX:1.0001,skewX:0.1573,skewY:0.7001,x:626.6,y:20.2,startPosition:21},0).wait(1).to({skewX:0,skewY:0.5132,x:626.2,y:19.7,startPosition:22},0).wait(1).to({skewX:0.1783,skewY:0.725,x:626.65,y:20.25,startPosition:23},0).wait(1).to({skewX:0.3566,skewY:0.9368,x:627.1,y:20.85,startPosition:24},0).wait(1).to({skewX:0.5349,skewY:1.1486,x:627.65,y:21.45,startPosition:25},0).wait(1).to({skewX:0.7132,skewY:1.3604,x:628.1,y:21.95,startPosition:26},0).wait(1).to({skewX:0.8915,skewY:1.5722,x:628.55,y:22.55,startPosition:27},0).wait(1).to({scaleX:1,skewX:1.0698,skewY:1.784,x:629.05,y:23.15,startPosition:28},0).wait(1).to({scaleX:1.0001,skewX:1.2481,skewY:1.9958,x:629.5,y:23.7,startPosition:29},0).wait(1).to({skewX:1.4264,skewY:2.2076,x:629.95,y:24.3,startPosition:30},0).wait(1).to({skewX:1.6047,skewY:2.4194,x:630.45,y:24.9,startPosition:31},0).wait(1).to({skewX:1.783,skewY:2.6312,x:630.9,y:25.5,startPosition:32},0).wait(1).to({skewX:1.9613,skewY:2.8431,x:631.35,y:26.05,startPosition:33},0).wait(1).to({skewX:2.1396,skewY:3.0549,x:631.8,y:26.65,startPosition:34},0).wait(1).to({skewX:2.3179,skewY:3.2667,x:632.25,y:27.25,startPosition:35},0).wait(1).to({skewX:2.4962,skewY:3.4785,x:632.75,y:27.85,startPosition:36},0).wait(1).to({skewX:2.6745,skewY:3.6903,x:633.2,y:28.4,startPosition:37},0).wait(1).to({skewX:2.6077,skewY:3.6109,x:633,y:28.15,startPosition:38},0).wait(1).to({skewX:2.5408,skewY:3.5314,x:632.85,y:27.95,startPosition:39},0).wait(1).to({skewX:2.474,skewY:3.452,x:632.7,y:27.75,startPosition:40},0).wait(1).to({skewX:2.4071,skewY:3.3726,x:632.5,y:27.55,startPosition:41},0).wait(1).to({skewX:2.3402,skewY:3.2931,x:632.3,y:27.3,startPosition:0},0).wait(1).to({skewX:2.2734,skewY:3.2137,x:632.15,y:27.1,startPosition:1},0).wait(1).to({skewX:2.2065,skewY:3.1343,x:631.95,y:26.85,startPosition:2},0).wait(1).to({skewX:2.1396,skewY:3.0549,x:631.8,y:26.65,startPosition:3},0).wait(1).to({skewX:2.0728,skewY:2.9754,x:631.65,y:26.4,startPosition:4},0).wait(1).to({skewX:2.0059,skewY:2.896,x:631.45,y:26.2,startPosition:5},0).wait(1).to({skewX:1.939,skewY:2.8166,x:631.3,y:25.95,startPosition:6},0).wait(1).to({skewX:1.8722,skewY:2.7372,x:631.1,y:25.75,startPosition:7},0).wait(1).to({skewX:1.8053,skewY:2.6577,x:630.95,y:25.55,startPosition:8},0).wait(1).to({skewX:1.7385,skewY:2.5783,x:630.8,y:25.35,startPosition:9},0).wait(1).to({skewX:1.6716,skewY:2.4989,x:630.6,y:25.1,startPosition:10},0).wait(1).to({skewX:1.6047,skewY:2.4194,x:630.45,y:24.9,startPosition:11},0).wait(1).to({skewX:1.5379,skewY:2.34,x:630.3,y:24.65,startPosition:12},0).wait(1).to({skewX:1.471,skewY:2.2606,x:630.1,y:24.45,startPosition:13},0).wait(1).to({skewX:1.4041,skewY:2.1812,x:629.9,y:24.2,startPosition:14},0).wait(1).to({skewX:1.3373,skewY:2.1017,x:629.7,y:24,startPosition:15},0).wait(1).to({skewX:1.2704,skewY:2.0223,x:629.55,y:23.75,startPosition:16},0).wait(1).to({skewX:1.2035,skewY:1.9429,x:629.35,y:23.55,startPosition:17},0).wait(1).to({skewX:1.1367,skewY:1.8634,x:629.2,y:23.4,startPosition:18},0).wait(1).to({scaleX:1,skewX:1.0698,skewY:1.784,x:629.05,y:23.15,startPosition:19},0).wait(1).to({scaleX:1.0001,skewX:1.003,skewY:1.7046,x:628.85,y:22.95,startPosition:20},0).wait(1).to({skewX:0.9361,skewY:1.6252,x:628.7,y:22.7,startPosition:21},0).wait(1).to({skewX:0.8692,skewY:1.5457,x:628.5,y:22.5,startPosition:22},0).wait(1).to({skewX:0.8024,skewY:1.4663,x:628.35,y:22.25,startPosition:23},0).wait(1).to({skewX:0.7355,skewY:1.3869,x:628.15,y:22.05,startPosition:24},0).wait(1).to({skewX:0.6686,skewY:1.3075,x:628,y:21.85,startPosition:25},0).wait(1).to({skewX:0.6018,skewY:1.228,x:627.8,y:21.6,startPosition:26},0).wait(1).to({skewX:0.5349,skewY:1.1486,x:627.65,y:21.45,startPosition:27},0).wait(1).to({skewX:0.468,skewY:1.0692,x:627.4,y:21.2,startPosition:28},0).wait(1).to({skewX:0.4012,skewY:0.9897,x:627.25,y:21,startPosition:29},0).wait(1).to({skewX:0.3343,skewY:0.9103,x:627.05,y:20.75,startPosition:30},0).wait(1).to({skewX:0.2675,skewY:0.8309,x:626.9,y:20.55,startPosition:31},0).wait(1).to({skewX:0.2006,skewY:0.7515,x:626.7,y:20.35,startPosition:32},0).wait(1).to({skewX:0.1337,skewY:0.672,x:626.55,y:20.1,startPosition:33},0).wait(1).to({skewX:0.0669,skewY:0.5926,x:626.35,y:19.9,startPosition:34},0).wait(1).to({skewX:0,skewY:0.5132,x:626.2,y:19.7,startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).to({_off:true},1).wait(4));

	// ADD_ONS
	this.instance_5 = new lib.CachedBmp_31();
	this.instance_5.setTransform(-295.55,-208.15,0.3624,0.3624);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(140).to({_off:true},1).wait(4));

	// snail
	this.instance_6 = new lib.snail_walkin_3("synched",0);
	this.instance_6.setTransform(-434.5,371.7,0.8286,0.8286,0,0,0,-0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({regX:-0.2,regY:0.1,x:-331.05,y:370.55,startPosition:13},13).to({regX:0,regY:0,x:-44.25,y:367.1,mode:"single",startPosition:39},36).to({startPosition:39},91).to({_off:true},1).wait(4));

	// BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("EByaAuEMjj3AAAIhcAAMAAAhcHMDlyAAAMAAABcHg");
	this.shape.setTransform(310.2,2.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6E7D9E").s().p("Ehx7AQaMAAAggzMDj3AAAMAAAAgzg");
	this.shape_1.setTransform(313.2,402.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},140).to({state:[]},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1017.3,-292.4,2062.8999999999996,805.4);


(lib.snail_walkin_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smile
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(168.55,-38.3,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(88).to({_off:true},1).wait(511));

	// eyes
	this.instance_1 = new lib.eye("synched",0,false);
	this.instance_1.setTransform(170.25,-135.95,1,1,0,0,0,4.6,-1.9);

	this.instance_2 = new lib.eye("synched",0,false);
	this.instance_2.setTransform(230.95,-132.05,1,1,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{startPosition:0}},{t:this.instance_1,p:{startPosition:0}}]}).to({state:[{t:this.instance_2,p:{startPosition:19}},{t:this.instance_1,p:{startPosition:19}}]},88).to({state:[]},1).wait(511));

	// clock
	this.instance_3 = new lib.clock12();
	this.instance_3.setTransform(-64.25,40.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(88).to({_off:true},1).wait(511));

	// shell
	this.instance_4 = new lib.shell("synched",0);
	this.instance_4.setTransform(-30.05,38.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(1).to({startPosition:0},0).wait(7).to({startPosition:0},0).to({scaleX:1.0006,skewY:-1.9864,y:35.15},12).to({scaleX:1,skewY:0,y:38.2},14).wait(21).to({startPosition:0},0).to({_off:true},1).wait(511));

	// tail
	this.instance_5 = new lib.tail("synched",0);
	this.instance_5.setTransform(-110.85,128.85,1,1,0,0,0,72.8,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},1).to({regX:72.7,regY:0.1,scaleX:0.9793,skewY:-3.0682,x:-110.9,y:128.95},7).to({regY:0,scaleX:0.7547,skewY:-4.6994,y:128.9},10,cjs.Ease.quadIn).to({startPosition:0},2).to({regX:72.8,regY:-0.1,scaleX:1,skewY:0,x:-110.85,y:128.85},14).to({startPosition:0},21).to({_off:true},1).wait(511));

	// front
	this.instance_6 = new lib.top("synched",0);
	this.instance_6.setTransform(125.65,15.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(1).to({regX:0,x:125.65},0).wait(7).to({regX:110.9,x:236.55},0).to({scaleX:1.0008,skewY:2.3225,y:15.3},12).to({scaleX:1,skewY:0,y:15.25},14).wait(21).to({startPosition:0},0).to({_off:true},1).wait(511));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-256.7,-159.3,513,331.8);


(lib.scene1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// MASK (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_99 = new cjs.Graphics().p("EBtxAeGIAA4nIDkAAIAAYng");
	var mask_graphics_100 = new cjs.Graphics().p("Ai+MTIAA4mIF9AAIAAYmg");
	var mask_graphics_101 = new cjs.Graphics().p("AkLMTIAA4mIIXAAIAAYmg");
	var mask_graphics_102 = new cjs.Graphics().p("AlZMTIAA4mIKzAAIAAYmg");
	var mask_graphics_103 = new cjs.Graphics().p("AmmMTIAA4mINNAAIAAYmg");
	var mask_graphics_104 = new cjs.Graphics().p("An0MTIAA4mIPpAAIAAYmg");
	var mask_graphics_105 = new cjs.Graphics().p("ApBMTIAA4mISDAAIAAYmg");
	var mask_graphics_106 = new cjs.Graphics().p("AqOMTIAA4mIUdAAIAAYmg");
	var mask_graphics_107 = new cjs.Graphics().p("ArcMTIAA4mIW5AAIAAYmg");
	var mask_graphics_108 = new cjs.Graphics().p("AspMTIAA4mIZTAAIAAYmg");
	var mask_graphics_109 = new cjs.Graphics().p("At3MTIAA4mIbvAAIAAYmg");
	var mask_graphics_110 = new cjs.Graphics().p("AvEMTIAA4mIeJAAIAAYmg");
	var mask_graphics_111 = new cjs.Graphics().p("AwRMTIAA4mMAgjAAAIAAYmg");
	var mask_graphics_112 = new cjs.Graphics().p("AxfMTIAA4mMAi/AAAIAAYmg");
	var mask_graphics_113 = new cjs.Graphics().p("AysMTIAA4mMAlZAAAIAAYmg");
	var mask_graphics_114 = new cjs.Graphics().p("Az6MTIAA4mMAn1AAAIAAYmg");
	var mask_graphics_115 = new cjs.Graphics().p("A1HMTIAA4mMAqPAAAIAAYmg");
	var mask_graphics_116 = new cjs.Graphics().p("A2UMTIAA4mMAspAAAIAAYmg");
	var mask_graphics_117 = new cjs.Graphics().p("A3iMTIAA4mMAvFAAAIAAYmg");
	var mask_graphics_118 = new cjs.Graphics().p("A4vMTIAA4mMAxfAAAIAAYmg");
	var mask_graphics_119 = new cjs.Graphics().p("A59MTIAA4mMAz7AAAIAAYmg");
	var mask_graphics_120 = new cjs.Graphics().p("A7KMTIAA4mMA2VAAAIAAYmg");
	var mask_graphics_121 = new cjs.Graphics().p("A8XMTIAA4mMA4vAAAIAAYmg");
	var mask_graphics_122 = new cjs.Graphics().p("A9lMTIAA4mMA7LAAAIAAYmg");
	var mask_graphics_123 = new cjs.Graphics().p("A+yMTIAA4mMA9lAAAIAAYmg");
	var mask_graphics_124 = new cjs.Graphics().p("EggAAMTIAA4mMBABAAAIAAYmg");
	var mask_graphics_125 = new cjs.Graphics().p("EghNAMTIAA4mMBCbAAAIAAYmg");
	var mask_graphics_126 = new cjs.Graphics().p("EgiaAMTIAA4mMBE1AAAIAAYmg");
	var mask_graphics_127 = new cjs.Graphics().p("EgjoAMTIAA4mMBHRAAAIAAYmg");
	var mask_graphics_128 = new cjs.Graphics().p("Egk1AMTIAA4mMBJrAAAIAAYmg");
	var mask_graphics_129 = new cjs.Graphics().p("EgmDAMTIAA4mMBMHAAAIAAYmg");
	var mask_graphics_130 = new cjs.Graphics().p("EgnQAMTIAA4mMBOhAAAIAAYmg");
	var mask_graphics_131 = new cjs.Graphics().p("EgodAMTIAA4mMBQ7AAAIAAYmg");
	var mask_graphics_132 = new cjs.Graphics().p("EgprAMTIAA4mMBTXAAAIAAYmg");
	var mask_graphics_133 = new cjs.Graphics().p("Egq4AMTIAA4mMBVxAAAIAAYmg");
	var mask_graphics_134 = new cjs.Graphics().p("EgsGAMTIAA4mMBYNAAAIAAYmg");
	var mask_graphics_135 = new cjs.Graphics().p("EgtTAMTIAA4mMBanAAAIAAYmg");
	var mask_graphics_136 = new cjs.Graphics().p("EgugAMTIAA4mMBdBAAAIAAYmg");
	var mask_graphics_137 = new cjs.Graphics().p("EgvuAMTIAA4mMBfdAAAIAAYmg");
	var mask_graphics_138 = new cjs.Graphics().p("Egw7AMTIAA4mMBh3AAAIAAYmg");
	var mask_graphics_139 = new cjs.Graphics().p("EgyJAMTIAA4mMBkTAAAIAAYmg");
	var mask_graphics_140 = new cjs.Graphics().p("EgzWAMTIAA4mMBmtAAAIAAYmg");
	var mask_graphics_141 = new cjs.Graphics().p("Eg0jAMTIAA4mMBpHAAAIAAYmg");
	var mask_graphics_142 = new cjs.Graphics().p("Eg1xAMTIAA4mMBrjAAAIAAYmg");
	var mask_graphics_143 = new cjs.Graphics().p("Eg2+AMTIAA4mMBt9AAAIAAYmg");
	var mask_graphics_144 = new cjs.Graphics().p("Eg4MAMTIAA4mMBwZAAAIAAYmg");
	var mask_graphics_145 = new cjs.Graphics().p("Eg5ZAMTIAA4mMByzAAAIAAYmg");
	var mask_graphics_146 = new cjs.Graphics().p("Eg6mAMTIAA4mMB1NAAAIAAYmg");
	var mask_graphics_147 = new cjs.Graphics().p("Eg70AMTIAA4mMB3pAAAIAAYmg");
	var mask_graphics_148 = new cjs.Graphics().p("Eg9BAMTIAA4mMB6DAAAIAAYmg");
	var mask_graphics_149 = new cjs.Graphics().p("Eg+PAMTIAA4mMB8fAAAIAAYmg");
	var mask_graphics_150 = new cjs.Graphics().p("Eg/cAMTIAA4mMB+5AAAIAAYmg");
	var mask_graphics_151 = new cjs.Graphics().p("EhApAMTIAA4mMCBTAAAIAAYmg");
	var mask_graphics_152 = new cjs.Graphics().p("EhB3AMTIAA4mMCDvAAAIAAYmg");
	var mask_graphics_153 = new cjs.Graphics().p("EhDEAMTIAA4mMCGJAAAIAAYmg");
	var mask_graphics_154 = new cjs.Graphics().p("EhESAMTIAA4mMCIlAAAIAAYmg");
	var mask_graphics_155 = new cjs.Graphics().p("EhFfAMTIAA4mMCK/AAAIAAYmg");
	var mask_graphics_156 = new cjs.Graphics().p("EhGsAMTIAA4mMCNZAAAIAAYmg");
	var mask_graphics_157 = new cjs.Graphics().p("EhH6AMTIAA4mMCP1AAAIAAYmg");
	var mask_graphics_158 = new cjs.Graphics().p("EhJHAMTIAA4mMCSPAAAIAAYmg");
	var mask_graphics_159 = new cjs.Graphics().p("EhKVAMTIAA4mMCUrAAAIAAYmg");
	var mask_graphics_160 = new cjs.Graphics().p("EhLiAMTIAA4mMCXFAAAIAAYmg");
	var mask_graphics_161 = new cjs.Graphics().p("EhMvAMTIAA4mMCZfAAAIAAYmg");
	var mask_graphics_162 = new cjs.Graphics().p("EhN9AMTIAA4mMCb7AAAIAAYmg");
	var mask_graphics_163 = new cjs.Graphics().p("EhPLAMTIAA4mMCeWAAAIAAYmg");
	var mask_graphics_164 = new cjs.Graphics().p("EhQYAMTIAA4mMCgxAAAIAAYmg");
	var mask_graphics_165 = new cjs.Graphics().p("EhRlAMTIAA4mMCjLAAAIAAYmg");
	var mask_graphics_166 = new cjs.Graphics().p("EhSyAMTIAA4mMCllAAAIAAYmg");
	var mask_graphics_167 = new cjs.Graphics().p("EhUAAMTIAA4mMCoBAAAIAAYmg");
	var mask_graphics_168 = new cjs.Graphics().p("EhVNAMTIAA4mMCqbAAAIAAYmg");
	var mask_graphics_169 = new cjs.Graphics().p("Eg7iAeGIAA4nMCs3AAAIAAYng");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(99).to({graphics:mask_graphics_99,x:725.25,y:192.5833}).wait(1).to({graphics:mask_graphics_100,x:1431.4,y:306.4}).wait(1).to({graphics:mask_graphics_101,x:1423.675,y:306.4}).wait(1).to({graphics:mask_graphics_102,x:1415.925,y:306.4}).wait(1).to({graphics:mask_graphics_103,x:1408.2,y:306.4}).wait(1).to({graphics:mask_graphics_104,x:1400.45,y:306.4}).wait(1).to({graphics:mask_graphics_105,x:1392.725,y:306.4}).wait(1).to({graphics:mask_graphics_106,x:1384.975,y:306.4}).wait(1).to({graphics:mask_graphics_107,x:1377.225,y:306.4}).wait(1).to({graphics:mask_graphics_108,x:1369.5,y:306.4}).wait(1).to({graphics:mask_graphics_109,x:1361.75,y:306.4}).wait(1).to({graphics:mask_graphics_110,x:1354,y:306.4}).wait(1).to({graphics:mask_graphics_111,x:1346.275,y:306.4}).wait(1).to({graphics:mask_graphics_112,x:1338.525,y:306.4}).wait(1).to({graphics:mask_graphics_113,x:1330.8,y:306.4}).wait(1).to({graphics:mask_graphics_114,x:1323.05,y:306.4}).wait(1).to({graphics:mask_graphics_115,x:1315.3,y:306.4}).wait(1).to({graphics:mask_graphics_116,x:1307.575,y:306.4}).wait(1).to({graphics:mask_graphics_117,x:1299.825,y:306.4}).wait(1).to({graphics:mask_graphics_118,x:1292.1,y:306.4}).wait(1).to({graphics:mask_graphics_119,x:1284.35,y:306.4}).wait(1).to({graphics:mask_graphics_120,x:1276.6,y:306.4}).wait(1).to({graphics:mask_graphics_121,x:1268.875,y:306.4}).wait(1).to({graphics:mask_graphics_122,x:1261.125,y:306.4}).wait(1).to({graphics:mask_graphics_123,x:1253.4,y:306.4}).wait(1).to({graphics:mask_graphics_124,x:1245.65,y:306.4}).wait(1).to({graphics:mask_graphics_125,x:1237.9,y:306.4}).wait(1).to({graphics:mask_graphics_126,x:1230.175,y:306.4}).wait(1).to({graphics:mask_graphics_127,x:1222.425,y:306.4}).wait(1).to({graphics:mask_graphics_128,x:1214.675,y:306.4}).wait(1).to({graphics:mask_graphics_129,x:1206.95,y:306.4}).wait(1).to({graphics:mask_graphics_130,x:1199.2,y:306.4}).wait(1).to({graphics:mask_graphics_131,x:1191.475,y:306.4}).wait(1).to({graphics:mask_graphics_132,x:1183.725,y:306.4}).wait(1).to({graphics:mask_graphics_133,x:1176,y:306.4}).wait(1).to({graphics:mask_graphics_134,x:1168.275,y:306.4}).wait(1).to({graphics:mask_graphics_135,x:1160.525,y:306.4}).wait(1).to({graphics:mask_graphics_136,x:1152.8,y:306.4}).wait(1).to({graphics:mask_graphics_137,x:1145.05,y:306.4}).wait(1).to({graphics:mask_graphics_138,x:1137.325,y:306.4}).wait(1).to({graphics:mask_graphics_139,x:1129.575,y:306.4}).wait(1).to({graphics:mask_graphics_140,x:1121.85,y:306.4}).wait(1).to({graphics:mask_graphics_141,x:1114.1,y:306.4}).wait(1).to({graphics:mask_graphics_142,x:1106.35,y:306.4}).wait(1).to({graphics:mask_graphics_143,x:1098.625,y:306.4}).wait(1).to({graphics:mask_graphics_144,x:1090.875,y:306.4}).wait(1).to({graphics:mask_graphics_145,x:1083.125,y:306.4}).wait(1).to({graphics:mask_graphics_146,x:1075.4,y:306.4}).wait(1).to({graphics:mask_graphics_147,x:1067.65,y:306.4}).wait(1).to({graphics:mask_graphics_148,x:1059.925,y:306.4}).wait(1).to({graphics:mask_graphics_149,x:1052.175,y:306.4}).wait(1).to({graphics:mask_graphics_150,x:1044.425,y:306.4}).wait(1).to({graphics:mask_graphics_151,x:1036.7,y:306.4}).wait(1).to({graphics:mask_graphics_152,x:1028.95,y:306.4}).wait(1).to({graphics:mask_graphics_153,x:1021.225,y:306.4}).wait(1).to({graphics:mask_graphics_154,x:1013.475,y:306.4}).wait(1).to({graphics:mask_graphics_155,x:1005.725,y:306.4}).wait(1).to({graphics:mask_graphics_156,x:998,y:306.4}).wait(1).to({graphics:mask_graphics_157,x:990.25,y:306.4}).wait(1).to({graphics:mask_graphics_158,x:982.525,y:306.4}).wait(1).to({graphics:mask_graphics_159,x:974.775,y:306.4}).wait(1).to({graphics:mask_graphics_160,x:967.025,y:306.4}).wait(1).to({graphics:mask_graphics_161,x:959.3,y:306.4}).wait(1).to({graphics:mask_graphics_162,x:951.55,y:306.4}).wait(1).to({graphics:mask_graphics_163,x:943.8,y:306.4}).wait(1).to({graphics:mask_graphics_164,x:936.075,y:306.4}).wait(1).to({graphics:mask_graphics_165,x:928.325,y:306.4}).wait(1).to({graphics:mask_graphics_166,x:920.6,y:306.4}).wait(1).to({graphics:mask_graphics_167,x:912.85,y:306.4}).wait(1).to({graphics:mask_graphics_168,x:905.125,y:306.4}).wait(1).to({graphics:mask_graphics_169,x:725.2732,y:192.5833}).wait(21));

	// TEXT
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(388.7,213.95,0.5,0.5);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(99).to({_off:false},0).wait(91));

	// snail
	this.instance_1 = new lib.snail_walkin_12("synched",0);
	this.instance_1.setTransform(-45.6,910.65,1,1,0,0,0,34.1,34.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:704,y:922.3,mode:"single"},89).wait(101));

	// CLOUDS
	this.instance_2 = new lib.CLOUDS_MOVE("synched",0,false);
	this.instance_2.setTransform(946.25,149.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(190));

	// BG
	this.instance_3 = new lib.CachedBmp_21();
	this.instance_3.setTransform(0.65,54.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(190));

	// sky
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#945526").ss(1,1,1).p("EioNgySMFQbAAAMAAABklMlQbAAAg");
	this.shape.setTransform(1037.125,276.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#53C8F6","#E2FAFA"],[0,1],-757.1,-840.9,-757.1,227.2).s().p("EioNAyTMAAAhklMFQbAAAMAAABklg");
	this.shape_1.setTransform(1037.125,276.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-336.4,-127.9,2553.3,1261.1000000000001);


(lib.LASTSCENE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// man_text
	this.instance = new lib.CachedBmp_63();
	this.instance.setTransform(451,276.2,0.2056,0.2056);

	this.instance_1 = new lib.CachedBmp_62();
	this.instance_1.setTransform(433.95,273.25,0.2056,0.2056);

	this.instance_2 = new lib.CachedBmp_65();
	this.instance_2.setTransform(157.4,118.05,0.2056,0.2056);

	this.instance_3 = new lib.CachedBmp_64();
	this.instance_3.setTransform(127.35,97.65,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},89).to({state:[{t:this.instance_3},{t:this.instance_2}]},2).to({state:[{t:this.instance_3},{t:this.instance_2}]},107).to({state:[]},1).wait(8));

	// heart_eyes
	this.instance_4 = new lib.CachedBmp_79();
	this.instance_4.setTransform(560.15,809.5,0.2056,0.2056);

	this.instance_5 = new lib.text_end("synched",0);
	this.instance_5.setTransform(504.45,803.35);

	this.instance_6 = new lib.CachedBmp_80();
	this.instance_6.setTransform(560.15,809.5,0.2056,0.2056);

	this.instance_7 = new lib.full_eye("synched",0);
	this.instance_7.setTransform(642.85,824.2);

	this.instance_8 = new lib.CachedBmp_81();
	this.instance_8.setTransform(560.15,810.9,0.2056,0.2056);

	this.instance_9 = new lib.CachedBmp_82();
	this.instance_9.setTransform(560.15,809.5,0.2056,0.2056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},131).to({state:[{t:this.instance_6},{t:this.instance_5}]},2).to({state:[{t:this.instance_8},{t:this.instance_7}]},45).to({state:[{t:this.instance_9}]},14).to({state:[{t:this.instance_9}]},6).to({state:[]},1).wait(8));

	// text_snail
	this.instance_10 = new lib.text_end("synched",0);
	this.instance_10.setTransform(504.45,803.35);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(131).to({_off:false},0).to({startPosition:0},43).to({_off:true},1).wait(3).to({_off:false,alpha:1},0).wait(20).to({startPosition:0},0).to({_off:true},1).wait(8));

	// snail
	this.instance_11 = new lib.snail_walkin_12("synched",0);
	this.instance_11.setTransform(0,977.3,1,1,0,0,0,34.1,34.6);

	this.instance_12 = new lib.closing_wink_bottom("synched",0);
	this.instance_12.setTransform(656.65,843.15);

	this.instance_13 = new lib.closing_wink("synched",0);
	this.instance_13.setTransform(643.25,806.85);

	this.instance_14 = new lib.open_wink_botttom("synched",0);
	this.instance_14.setTransform(577.35,840.85,1,1,0,0,0,0,-0.2);

	this.instance_15 = new lib.open_wink("synched",0);
	this.instance_15.setTransform(577.7,804.8,1,1,0,0,0,0,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11}]}).to({state:[{t:this.instance_11}]},69).to({state:[{t:this.instance_11}]},105).to({state:[{t:this.instance_11},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]},1).to({state:[{t:this.instance_11},{t:this.instance_15},{t:this.instance_14}]},4).to({state:[{t:this.instance_11}]},14).to({state:[{t:this.instance_11}]},5).to({state:[]},1).wait(8));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({x:446,y:990.95,mode:"single"},69).wait(105).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(4).to({startPosition:0},0).wait(14).to({startPosition:0},0).wait(5).to({startPosition:0},0).to({_off:true},1).wait(8));

	// couple
	this.instance_16 = new lib.CachedBmp_71();
	this.instance_16.setTransform(811.2,154.85,0.2056,0.2056);

	this.instance_17 = new lib.CachedBmp_70();
	this.instance_17.setTransform(795.35,107.35,0.2056,0.2056);

	this.instance_18 = new lib.Bitmap5();
	this.instance_18.setTransform(794,107);

	this.instance_19 = new lib.Bitmap6();
	this.instance_19.setTransform(794,107);

	this.instance_20 = new lib.Bitmap7();
	this.instance_20.setTransform(794,106);

	this.instance_21 = new lib.Bitmap8();
	this.instance_21.setTransform(794,106);

	this.instance_22 = new lib.Bitmap9();
	this.instance_22.setTransform(794,105);

	this.instance_23 = new lib.Bitmap10();
	this.instance_23.setTransform(794,105);

	this.instance_24 = new lib.Bitmap11();
	this.instance_24.setTransform(794,105);

	this.instance_25 = new lib.Bitmap12();
	this.instance_25.setTransform(794,104);

	this.instance_26 = new lib.Bitmap13();
	this.instance_26.setTransform(794,104);

	this.instance_27 = new lib.Bitmap14();
	this.instance_27.setTransform(794,104);

	this.instance_28 = new lib.Bitmap15();
	this.instance_28.setTransform(794,104);

	this.instance_29 = new lib.Bitmap16();
	this.instance_29.setTransform(794,104);

	this.instance_30 = new lib.Bitmap17();
	this.instance_30.setTransform(794,103);

	this.instance_31 = new lib.Bitmap18();
	this.instance_31.setTransform(794,103);

	this.instance_32 = new lib.Bitmap19();
	this.instance_32.setTransform(794,103);

	this.instance_33 = new lib.Bitmap20();
	this.instance_33.setTransform(794,103);

	this.instance_34 = new lib.Bitmap21();
	this.instance_34.setTransform(794,103);

	this.instance_35 = new lib.Bitmap22();
	this.instance_35.setTransform(794,103);

	this.instance_36 = new lib.Bitmap23();
	this.instance_36.setTransform(794,103);

	this.instance_37 = new lib.Bitmap24();
	this.instance_37.setTransform(794,103);

	this.instance_38 = new lib.Bitmap25();
	this.instance_38.setTransform(794,103);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16}]}).to({state:[{t:this.instance_18}]},69).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_38}]},109).to({state:[]},1).wait(8));

	// BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A2B837").s().p("AhKAAIAAgZIBVAAIAVAAIAVAAIAWAAQAAANgFACQgbAKggAAQgLAAgFAFQgYAVgtAAIAAgag");
	this.shape.setTransform(1041.475,1069.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#87BA19").s().p("Ag8A+QgmgLAQhCQArhEB8AcQADABAAANIgWAAIhUAAIAAAaIAAAaIgWAAIAAAbIAAAbQgKAAgKgDg");
	this.shape_1.setTransform(1035.938,1071.2438);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C0CE50").s().p("ABLAbIiqAAIAAgbIAVAAQAtAAAYgVQAFgFALAAQACAqA+gNQAKgDALAAIAAAbIgVAAg");
	this.shape_2.setTransform(1041.475,1072.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EDD17F").s().p("AhUgCQAgAAAagLQAGgCgBgOIA/AAIAWAAIAWAAQAAAOgIAIQgDAFgLAAIAAAZIgWAAIgqAAQgKAAgKADQgPAEgMAAQgkAAgBggg");
	this.shape_3.setTransform(1051.1,1069.9704);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#89BA1E").s().p("AgKAqIhAAAIAAgaQA0hXBcAtQAFACAAAOQgLAAgJADQgXAJgVAOIAAAaIgVAAg");
	this.shape_4.setTransform(1056.425,1062.7858);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#84BD17").s().p("AAGAnQgIgEgLAAQgKAAgBgEQgKgXAAgZIAAgbQBaBZgcAAQgHAAgPgGg");
	this.shape_5.setTransform(566.313,953.9141);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#82BB17").s().p("ABLA+QhlgVhFg4IAAgbQClhDAYCTQACANAAANQgKAAgLgCg");
	this.shape_6.setTransform(546.825,935.0429);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#70992D").s().p("AgzgdQAfABAggBIAVAAIAVAAQAAAOgGAIQgFAGgKAAIAAAZQgLAAgKACQgPAEgLAAQgxAAAMg7g");
	this.shape_7.setTransform(1022.2053,778.6761);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F1EDC0").s().p("AgsAOQAKAAAFgFQAHgIAAgMQAKgOAGgPQAFgMAAgNQAJANAOAJQAIAEALAAQAAAOABANQAKBOgcAAQgWAAgug0g");
	this.shape_8.setTransform(1012.9255,760.9924);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F6FCE4").s().p("AAMAxQgWgKgVgOIgVAAIAAgZIAAgbQA0gzAvA4QAGAJAAANQAAAMgEAMQgHAPgKAOQgLAAgJgEg");
	this.shape_9.setTransform(1007.375,754.4971);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#83BE0F").s().p("AgLAlIgWAAIAAgaQBghpgqCBQgCACgKAAIgUAAg");
	this.shape_10.setTransform(1009.6618,739.9445);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#93C042").s().p("ABrA1IhWAAQgLAAgHgEQgNgJgLgNQAAgNgGgJQgug3g2AyIAAgZIAAgbIBAAAIAWAAQBqATAtAdQAHAEALAAIAAAbIAAAaIgVAAg");
	this.shape_11.setTransform(1014.85,751.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#83B925").s().p("AhHA5IgVAAIAAgbQAkgtAqgpQAHgGAAgNIAUAAQALAAAFAFQB6CShvAAQgoAAhHgTg");
	this.shape_12.setTransform(1034.8343,770.042);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F4F8E8").s().p("Ai/hGQArAAAngNQAEgBgBgOQAWAOAXAKQAIAEAMAAQAAANgHAIQgEAFgKAAQBnB0gRiPQgCgNAAgOIBVAAIAVAAQA9gMgIBCIALAAQAAANgGAHQgqAnglAvIAAAaIgVAAQghABgfgBIAAgNQgtAagmAAQhgAAgiirg");
	this.shape_13.setTransform(1014.8,766.8615);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#86BB1F").s().p("AgDBGIgLAAQAIhCg9AMIAAgZIAAgbQAxAXBJgzQAWgPgQAiQgWAzgWBAIgUAAg");
	this.shape_14.setTransform(1034.4247,755.3977);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#84B330").s().p("AikiVIAVAAIArAAIAVAAIAVAAQAAAOgDABQgnAMgrAAQAuDtCnhbIAAANQgPBKBPgSQAKgCALAAIAKAAQhQA7g+AAQiLAAgwkrg");
	this.shape_15.setTransform(1010.025,772.0311);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#84BA18").s().p("AAKBSIgqAAQAAgNgDgCQhEgWgNhFQBUhfBZA/QAHAFAKAAIAWAAIAVAAIAAAbIgVAAIhAAAIAAAaIAAAbIAAAaIAAAbIgWAAg");
	this.shape_16.setTransform(998.875,748.807);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#84BB19").s().p("AgCATQgTgYAAgoQAxBbgHAAQgDAAgUgbg");
	this.shape_17.setTransform(1063.9541,662.7756);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F9C77F").s().p("AgnAGQgBAAAAgNQB6APg/AAIg6gCg");
	this.shape_18.setTransform(157.5625,976.9282);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#85BD19").s().p("ACzgBQgEgBAAgOQBWAhgMAAQgIAAg+gSgAj6gQQGhAOmhAAg");
	this.shape_19.setTransform(545.3318,1167.5276);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#83BD1A").s().p("AiegQIEpAAIAUAAQhPAhhQAAQhPAAhPghg");
	this.shape_20.setTransform(493.55,1164.8625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#84BC19").s().p("AhogGQGiAMmiAAg");
	this.shape_21.setTransform(323.8625,1153.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#78B80F").s().p("AhUgQQBUAABTANQACABAAAMQgKAAgLACQgdAFgYAAQhAAAgfghg");
	this.shape_22.setTransform(383.8,1159.5062);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#86BB1D").s().p("Ah0AAQBNAAArgiQAGgFAAgOQAhABAfgBIAWAAIAVAAQAAAOgFALQgoBShCAAQg0AAhGg2g");
	this.shape_23.setTransform(348.625,1104.4216);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C8C551").s().p("AATAbIAAgOQhJAFgMgrIArAAIAVAAQBeAPgjAfQgGAFgLABIgVAAg");
	this.shape_24.setTransform(356.3212,1096.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#EAD278").s().p("AgJAaIgWAAIAAgNQgwACAGgpIAqAAIAWAAQALArBJgEIAAANIgVAAIggABIgfgBg");
	this.shape_25.setTransform(350.692,1096.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8BB715").s().p("ABVAhIgrAAIgVAAIgqAAIgUAAIAAgNQg+ACgCgqQBugjBfBFQAGAGAAANIgVAAg");
	this.shape_26.setTransform(345.425,1090.4805);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#85BB18").s().p("AgygaQC0AuiLAHIgBAAQgjAAgFg1g");
	this.shape_27.setTransform(301.5109,1064.377);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#A0BA33").s().p("Ag/AbIgVAAIAAgbQBNAAA0gVQAIgFAKAAIAWAAQAAANgGAGQgsAihNAAIgVAAg");
	this.shape_28.setTransform(341.15,1101.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#DCCA6A").s().p("ABVANIhqAAIgVAAIhAAAIAAgZIC/AAIAWAAIAAAZIgWAAg");
	this.shape_29.setTransform(321.975,1103.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#97BA28").s().p("AhpALIAAgZQA1AAAygNQACgBAAgNIAVAAIBAAAIAVAAQgqAbgLAaQgFAegoAAQgnAAhKgfg");
	this.shape_30.setTransform(309.175,1108.6438);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#DCCC6B").s().p("AhfAdIAAgbQA6goBwANQAKACALAAQAAANgDABQgyALg0AAIAAAbIgWAAIggAAIggAAg");
	this.shape_31.setTransform(299.575,1106.8718);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#88BE11").s().p("AgtAbIAAgbQALAAAEgFQAGgIAAgNIAWAAIAUAAQAKAAAFAFQArAwhlAAIgUAAg");
	this.shape_32.setTransform(283.9017,1117.8214);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#97B730").s().p("AAVAbIgVAAIgVAAIhAAAIAAgbQArAAAngLQADgBAAgOIBAAAIAVAAQAAAOgFAEQgQAIgWAAIAAAbIgVAAg");
	this.shape_33.setTransform(281.45,1112.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#CBC45C").s().p("AB1AbIgqAAQgLAAgLgCQhagRhlgIIAAgaICAAAIAUAAQAhAsBggFIAAAOIgWAAg");
	this.shape_34.setTransform(284.65,1085.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#B1BA41").s().p("ABWAYQhTgYhtAAIAAgaIB/AAIAWAAQACAqA+gCIAAANQgLAAgKgDg");
	this.shape_35.setTransform(330.5,1091.075);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E8CD78").s().p("AiJgQIAqAAIAWAAIA/AAIAUAAIBrAAIAVAAIAAAaIgVABQgtAGgoAAQhlAAhEghg");
	this.shape_36.setTransform(305.975,1090.0531);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#8FBA23").s().p("ABVArIg/AAIAAgOQhfAFghgsQCOhMBABqQAHAJgBAOIgVAAg");
	this.shape_37.setTransform(296.35,1084.1304);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#83BC17").s().p("AhZgiIAAgbIBVAAIAVAAQBpgJguAbQgRAJgGAJQg1BZgjAAQglAAgRhig");
	this.shape_38.setTransform(392.7507,1017.0856);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F8C787").s().p("EgolAFnQjkgbFhjRQCxhlDehjQiggsAKgJQAngVInhpQRyjWWsBbQVaBTCVDbQAjA0A7AZQBFAfAtAwUABiAFIgrxAAAQwzAA3fgwg");
	this.shape_39.setTransform(691.6547,1069.1172);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#83BD19").s().p("Ag/gaIA/ABIAWgBQAgABAEAKQARAqgaAAQgeAAhSg1g");
	this.shape_40.setTransform(518.0992,989.5452);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#6CAF0D").s().p("Ag/AAQgCgBAAgNQCXAdgXAAQgRAAhtgPg");
	this.shape_41.setTransform(177.1688,1156.7022);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D4C764").s().p("ADqANInpAAIAAgZIHpAAIAWAAIAAAZIgWAAg");
	this.shape_42.setTransform(25.6,1151.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#66B005").s().p("AmqAdIAAgbIAAgZQHMgUGHA6QACABAAANQl/gcnWAcg");
	this.shape_43.setTransform(42.65,1157.6234);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#BFB84E").s().p("ABVANIi+AAIAAgZIC+AAIAWAAIAAAZIgWAAg");
	this.shape_44.setTransform(61.85,1151.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#8CA62A").s().p("AhfgMIAVAAIAWAAIB/AAIAVAAQAAAMgCAAQheANhfAAIAAgZg");
	this.shape_45.setTransform(82.1,1151.225);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#67B104").s().p("AhMADQEygpkyA2g");
	this.shape_46.setTransform(105.75,1152.2907);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C3C35D").s().p("AArAOIh/AAIAAgbIBqAAIAVAAIAVAAIAWAAQgBANgGAIQgFAGgKAAIgVAAg");
	this.shape_47.setTransform(85.3,1148.525);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#6BAF0D").s().p("AgtgFQgEgBAAgOQBtApgLAAQgIAAhWgag");
	this.shape_48.setTransform(109.4819,1159.938);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#B5BB4B").s().p("AhqAAQBSgbBtACIAWAAQAAANgCAAQhxARhiAWIAAgbg");
	this.shape_49.setTransform(117.275,1144.4962);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F7C880").s().p("AgmAPQgCAAAAgNIAAgaQBwAxgrAAQgTAAgwgKg");
	this.shape_50.setTransform(132.0565,1101.5543);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F7B669").s().p("AhfAAQBVgNBVgLQAKgCALAAQAAANgEACQhXAdhkAJIAAgbg");
	this.shape_51.setTransform(79.975,1109.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#F0A152").s().p("AhUgNICUAAIAWAAQgBANgEABQgtANgkAAQg1AAgfgbg");
	this.shape_52.setTransform(72.5,1100.412);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F7BD76").s().p("ACVAbIgVAAQAAgOgBAAQiTgNiVAAIAAgaQCpAACpANQACABAAAMIAAAbIgWAAg");
	this.shape_53.setTransform(110.9,1099.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#C3BF5A").s().p("AhUgQICUAAIAVAAIAAAaIgUACQgeAFgYAAQhAAAgfghg");
	this.shape_54.setTransform(102.35,1063.3062);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#5E9908").s().p("ABVANIgVAAIgWAAIiTAAIAAgZIAVAAIAVAAICUAAIAVAAIAAAZIgVAAg");
	this.shape_55.setTransform(104.5,1060.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#B3BF4F").s().p("AhUgPQBUAABTAMQADABAAAMQgLAAgLACQgdAEgZAAQg/AAgfgfg");
	this.shape_56.setTransform(119.4,1065.9831);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#F3AE61").s().p("AhVgNICVAAIAWAAQgBANgBAAQhUAOhVAAIAAgbg");
	this.shape_57.setTransform(8.55,1119.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FCBC77").s().p("Ag/AbIAAgbIAAgaQA/AOA7AYQAFABAAAOIgVAAIg1AAIg1AAg");
	this.shape_58.setTransform(6.425,1088.3875);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#F8BF7A").s().p("Aj0gGQEEgkDQAiQAKACALAAIAAAZIgVAAIhrAAIgVAAIiVAAQgKAAgKACQghAEgcAAQhIAAgmgfg");
	this.shape_59.setTransform(69.325,1097.1364);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#EF9C48").s().p("AnUCFIiWAAIAAgaIAAjvIBsAAIAVAAQCMAiCeASQALABALAAQA1AuB1gSQAKgBAKAAQA1AtBygfQAEgBAAgNIBrAAIAVAAQCVAACUANQABAAAAAOIgVABQiuAMiRAnQgMAAgKACQhWALhVAOIAAAaIgUACQj6AfkFAUIgWAAg");
	this.shape_60.setTransform(61.85,1104.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#50A104").s().p("AhGgGQEbAMkbABg");
	this.shape_61.setTransform(66.8625,1038.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#F3C981").s().p("Ah/AMQC7ALg1gsQgHgGAAgNIArAAIAVAAIArAAIAVAAIAAAaQgLAAgDAFQgoAyhIAAQg3AAhKgdg");
	this.shape_62.setTransform(46.925,1060.4925);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#57A004").s().p("AhUAOQAVgOAPgSQAHgIAAgNIAVAAQAqAPAfAMIAgANQgKAngyAAQgpAAhEgag");
	this.shape_63.setTransform(51.175,1044.2665);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#CBC264").s().p("AhKANQA2gZA2gXQAJgEALAAQAKAAAEAFQAHAIAAAOIAAAZIgVAAQgLAAgJAEQguASg+AFIAAgbg");
	this.shape_64.setTransform(41.575,1038.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#6F9919").s().p("AiUgQICUAAIAWAAQA/AAA+AOQADAAAAAMIgWAAIipAAQgLAAgLACQgTAFgPAAQgrgBgIggg");
	this.shape_65.setTransform(36.25,1052.6002);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#A5B74B").s().p("ABVAOIgqAAIgWAAIh/AAIAAgbICqAAIAVAAQALAAAEAGQAHAHAAAOIgWAAg");
	this.shape_66.setTransform(42.675,1054.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#619B0A").s().p("ABAAaIiUAAIAAgaQAUgZAsgBIAUAAQAqAOAlAVQAGAFABAMIgWAAg");
	this.shape_67.setTransform(29.85,1048.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#E1CB73").s().p("AhUgrQBBgOA/gLQAKgCAKAAIAAAbIgVAAQgrABgUAZIAAAaQAMAsBJgPQAKgDALAAIAAAcQgLAAgKACQgfAGgZAAQhoAAALhyg");
	this.shape_68.setTransform(23.4161,1050.0611);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#BEBD5A").s().p("Agwg2IArAAIAUAAQAAANgHAEQgNAJgWAAQgJBNBdgLIAAANIgVACQgQACgOAAQhTAAAdhtg");
	this.shape_69.setTransform(56.1406,1013.797);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#54A502").s().p("AA1APIiUAAIAAgZQDggOgnAiQgFAFgLAAIgVAAg");
	this.shape_70.setTransform(107.7063,1057.475);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#53A502").s().p("ABAANIiUAAIAAgZQBUAABTAMQACAAAAANIgVAAg");
	this.shape_71.setTransform(68.25,1052.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#D3C566").s().p("ABqAaQiAgBhpgZIAAgaIBqAAIAVAAQAgAsBggFIAAANIgWAAg");
	this.shape_72.setTransform(72.525,1059);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#86A029").s().p("AAVAcIAAgNQheAFghgsIAWAAIAVAAQBlgNAyAiQAIAFALAAIAAAaIgWAAIggABIgggBg");
	this.shape_73.setTransform(83.175,1058.8227);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#5C9404").s().p("ABAAOIgVAAIgWAAIhpAAIAAgbICUAAIAVAAIAAAbIgVAAg");
	this.shape_74.setTransform(68.25,1054.975);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#D8C76D").s().p("AhbAGQgEgGgKAAIAAgaQBfABBfgBIAVAAIAAAaIgVAAQhfADhKAYQAAgOgHgHg");
	this.shape_75.setTransform(57.575,1034.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#5B9B05").s().p("AhfACQALAAAEgEQAHgIAAgNIArAAIAVAAIBUAAIAVAAQAAANgGAKQgRAYgxAAQgtAAhKgWg");
	this.shape_76.setTransform(92.725,1032.0204);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#95A730").s().p("AhUAAQBEgTBQgGIAWgBQgBANgGAJQgFAEgKAAQgLAAgJAEQgyAXhOAAIAAgbg");
	this.shape_77.setTransform(76.75,1032.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#539E06").s().p("AA6AiIgVAAIhUAAIgVAAIAAgaIAAgaQCOgvgFBjg");
	this.shape_78.setTransform(96.5334,1020.7986);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#B6BC4C").s().p("AAhAbIhVAAIAAgbIAAgaIBVAAIAUAAIAAAaIAAAbIgUAAg");
	this.shape_79.setTransform(97,1026.9);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#F9C483").s().p("AgLApIAAgNQg9gBAShBQC4gLhzBJQgGAEAAANIgUAAg");
	this.shape_80.setTransform(90.8197,998.7844);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#629D0E").s().p("AA6A1IhqAAIAAgNQhdALAJhNQAVAAAPgJQAGgEAAgNIBVAAIAUAAIBWAAIAVAAQAAANAHAIQAXAfhIAbIAAAaIgWAAg");
	this.shape_81.setTransform(66.6981,1013.575);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#8FA734").s().p("AgqAbIhVAAIAAgbQB3AJBKgfQAJgEALAAIAVAAIAVAAQAAANgGAJQgFAEgKAAQgLAAgJAEQguASg9AFIgWAAg");
	this.shape_82.setTransform(81.025,1005.55);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#5D9807").s().p("AhJgCQAKAAAFgFQAGgIAAgOIAWAAIAUAAIA/AAIAVAAIAAAbIgVAAIgVAAIAAAaQgKAAgLACQgSAEgPAAQgrAAgIggg");
	this.shape_83.setTransform(99.15,1005.8486);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#CBC263").s().p("AhVAbIg/AAIAAgbQB6gdCaADIAVABQAAANgGAEQgPAIgVAAIgWAAQhbgDg5AeIgWAAg");
	this.shape_84.setTransform(113.025,1000.1614);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#55A400").s().p("Ag/AFIAAgbIAVAAIAWAAQAfABAggBIAVAAQAAAOgGADQguAcggAAQgaAAgRgSg");
	this.shape_85.setTransform(108.725,1007.7713);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#789A17").s().p("AhVAbIAAgbQA6geBbAEIAVABQAAANgEACQgmAKgrAAIAAAbIgUAAIggAAIghAAg");
	this.shape_86.setTransform(115.15,1002.8271);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#67AF09").s().p("AiqAQQCLgvC0gFIAVAAQhfBJh0AAQg9AAhEgVg");
	this.shape_87.setTransform(232.45,1126.8178);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#D2CC69").s().p("AAAAcIhpAAIAAgbQBJgjB1AIIAVABQABAOgEABQgnALgrAAIAAAbIgVAAg");
	this.shape_88.setTransform(270.8,1112.3023);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#9DAE34").s().p("AhqAZIAAgbQBuACBSgZQAKgDALAAIAAAaQgLAAgIAEQgxAbhNAAQggAAgkgEg");
	this.shape_89.setTransform(249.475,1118.0225);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#81B610").s().p("AgPAjQgigjg4gNIAAgaIBpAAIAVAAIBAAAIAVAAQAAANgGAIQgEAFgLAAIAAAbIgVAAIhAAAIAAAaQgJAAgGgFg");
	this.shape_90.setTransform(270.8,1119.125);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#F4C882").s().p("AhWgeQE4Aoj4AVIgFAAQgnAAgUg9g");
	this.shape_91.setTransform(221.9661,1112.8365);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#C6C45A").s().p("AhfAAIAAgZQBWgBBTABIAWAAQAAANgEABQhXAehkAIIAAgbg");
	this.shape_92.setTransform(220.675,1123.125);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#E9D27A").s().p("AhqgPIBAAAIAWAAIBqAAIAVAAIAAAZQgLAAgKACQgkAEgfAAQhPAAgugfg");
	this.shape_93.setTransform(206.825,1079.3431);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#EBD177").s().p("AhpgQIAqAAIAWAAIB+AAIAVAAIAAAaIgUABQglAGgfAAQhOAAgtghg");
	this.shape_94.setTransform(260.125,1084.7031);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#B8B749").s().p("ABAANIhpAAIgWAAIgVAAIAAgZQBUAABTAMQACAAAAANIgVAAg");
	this.shape_95.setTransform(226.025,1079.025);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#EACD78").s().p("AhJgUIBpAAIAVAAIAVAAIAAAaQgKAAgKADQguAMgdAAQg3AAADgpg");
	this.shape_96.setTransform(229.2191,1082.4292);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#B8C050").s().p("ABLAOIgrAAIgVAAIhqAAIAAgaICqAAIAVAAIAAAaIgVAAg");
	this.shape_97.setTransform(246.275,1081.7);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#7CBF10").s().p("AhAAoIAAgbIAAgZQAxANAFgnQAAgCAKAAQAUAAAIALIADADQBcBDiaAAIghgBg");
	this.shape_98.setTransform(273.0337,1076.3595);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#68AF09").s().p("AhqgIQAWAAAPgJQAGgEAAgNIA/AAIAVAAIArAAIArAAQgzBFg7AAQgwAAg3grg");
	this.shape_99.setTransform(194.025,1134.6579);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#C2BF55").s().p("Ah/AbIAAgbQBhggCIAGIAWAAIAAAaIgWAAIhAAAQgKAAgJAEQgxAYhLAAIgagBg");
	this.shape_100.setTransform(183.375,1131.111);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#67AE07").s().p("Ag2gjIArAAIAUAAQAKAAAEAGQAtBBgSAAQgTAAhVhHg");
	this.shape_101.setTransform(165.4144,1140.0451);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#6EAD0A").s().p("EgkhAEKImRAAQhGgtgFhiQHXgcF+AcQAAgNgCgBQmHg8nMAUIAAgaIHqAAIAWAAIC/AAIAWAAQBfAABfgOQACAAAAgNQAKAAAFgFQAGgJAAgMIBqAAIAWAAQBigWBxgSQACAAAAgNIBAAAIAWAAQBUgOBSgZQAEgCAAgNIArAAIAVAAQCpCMhbiHQgEgFgKAAIAAgbIAVAAIAWAAQBcAFA7gbQAJgEAKAAQAAANgGAEQgPAJgWAAQB8BjBah9IgrAAIgrAAIAAgbQBOAAA0gXQAJgEALAAQBlgIBXgeQADgCAAgNIBAAAIAWAAQB9AQBFgnQAIgEALAAQA4ANAjAkQAFAFAKAAQDeHOMhhzQALgBALAAQAqAtBrgRQAKgBALAAIBAAAIAVAAQL8BjNYAVIAAANMhCRAAAQj8AAj7AKIGRAAQkjAMkhAZQggACgcAAQhsAAg8gngA7kBuQDCA9jHhLQAAAOAFAAgAxSBTQEFAmkGg0QAAANABABgA8oArIAAANQCtgggXAAQgSAAiEATgAqTjFQDCA7CThwIgWAAQi1AFiKAwg");
	this.shape_102.setTransform(281.425,1148.2852);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#B3BC47").s().p("AhUAAQA4geBcAEIAVAAQAAAOgDABQhSAYhUAOIAAgbg");
	this.shape_103.setTransform(145,1139.1268);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#C4BF59").s().p("AhUgQQBVAABTAOQABAAAAAMIgUABQgfAGgZAAQg/AAgeghg");
	this.shape_104.setTransform(136.45,1068.6531);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#B0BD4C").s().p("AhUgQQBUAABTAOQACAAABAMQgKAAgMACQgdAFgYAAQhAAAgfghg");
	this.shape_105.setTransform(153.5,1071.3294);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#B7B94E").s().p("AhUgQQBUAABUAOQABAAAAANQgLAAgKABQgdAFgYAAQhAAAgfghg");
	this.shape_106.setTransform(174.85,1073.9794);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#A7B743").s().p("AhVgPQBVAABTANQACAAAAANIgVAAIhAAAQgJAAgKACQgQADgMAAQgkAAgCgfg");
	this.shape_107.setTransform(196.15,1076.6485);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#89A42A").s().p("AhKAbIAAgbQBNAAA0gWQAJgEALAAQAAANgHAGQgtAihOAAIgTAAg");
	this.shape_108.setTransform(150.325,994.898);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#CDC869").s().p("AhJAaIAAgaQAygbBMABIAVAAQAAANgFAEQgQAJgVAAQgLAAgGAEQgWAXgtAAIgVgBg");
	this.shape_109.setTransform(180.175,984.2033);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#5D9C08").s().p("AhLgHQAWAAAPgJQAGgEAAgNIAVAAIAqAAIAVAAQgGAoAYASQALAJgKAAQgWAAh8gpg");
	this.shape_110.setTransform(190.9472,984.9154);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#B9BD4C").s().p("AhKAAQAVAAAQgIQAGgFAAgNIBUAAIAWAAQAAANgDABQhNAThFAUIAAgbg");
	this.shape_111.setTransform(235.6,968.125);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#EDCA79").s().p("AgUAoIgWAAIAAgaIAAgaQArg0AcAvQADAFALAAQAAAMgGAEQgQAKgVAAIAAAaIgUAAg");
	this.shape_112.setTransform(228.125,966.7787);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#A7B647").s().p("AgfAbIgrAAIAAgbQBNAAA0gWQAJgEALAAQAAAOgGAEQglAWgqANIgVAAg");
	this.shape_113.setTransform(197.225,978.825);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#5FA207").s().p("AhqGRQALAAAFgFQAmgjjhAOIAAAaIgVAAIgVAAQgLAAgIgFQgygjhmAOIAAgcQAAgNgCAAQhUgNhUAAIAAAaIAAAcIgWAAIgqAAQAAgOgHgIQgEgGgLAAQAAgNgDAAQg9gNhAAAQAAgNgGgEQglgXgqgNIAAgbIAVAAIAVAAQA+gFAvgSQAJgEALAAQAAANgHAIQgPATgVAOQCYA5AShGIgggOQgfgMgrgPIAAgaQBKgZBggCIAVAAQBPAAAzgXQAJgEALAAQCZAtAhgxQAFgJAAgOIAAgaIAAgcIAMAAQAFhjiQAuIAAAbIAAAaQgLAAgKgCQhAgYhAgbIAAgZQBIgbgXggQgHgIAAgNQA+gFAvgTQAIgEALAAQAMAtBKgPQAKgCAKAAQAoAoBTgzQAGgDAAgOIAAgaQAqAAAngMQAEgBAAgOQAVAAAPgJQAGgEAAgNICAAAIAVAAQBcAEAygnQAHgGAAgNQBOgMA1glQAIgFALAAQA9AGAcgbQAGgFALAAQC2A9gkgcQgZgSAHgqQArgNAkgXQAGgDAAgOIAWAAIAqAAIAWAAQBsgCgbBmQgtCmh6DVQgLAAgHAGQlXDVoVCcIAAgbgAqUDJQEcAAkcgNg");
	this.shape_114.setTransform(125.87,1018.8989);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#CDC161").s().p("AgfAbIgrAAIAAgbIAAgaIB/AAIAWAAQAAAOgFABQgmALgqAAIAAAbIgVAAg");
	this.shape_115.setTransform(214.325,973.475);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#85A61F").s().p("ABAANIiVAAIAAgaIArAAIAVAAIAqAAIAVAAQAWAAAQAKQAFADAAANIgVAAg");
	this.shape_116.setTransform(191.9,881.3);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#A8B040").s().p("ABAANIiUAAIAAgaICUAAIAVAAIAAAaIgVAAg");
	this.shape_117.setTransform(174.85,881.3);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#E8CD7B").s().p("AhfgPIAWAAICUAAIAVAAIAAAZQgLAAgKACQghAFgcAAQhHAAgmggg");
	this.shape_118.setTransform(173.775,884.2906);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#D2C760").s().p("ABAANIgVAAIiAAAIAAgaICVAAIAVAAIAAAaIgVAAg");
	this.shape_119.setTransform(157.8,881.3);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#F2D07E").s().p("AhfgVIBWAAIAUAAIA/AAIAWAAIAAAaQgLAAgIAEQgdANgeAAQg2AAg7grg");
	this.shape_120.setTransform(139.675,882.1405);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#85BD11").s().p("AgzgBQgDAAAAgOQB8AfgRAAQgNAAhbgRg");
	this.shape_121.setTransform(195.2378,817.4051);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#C3C353").s().p("ACAAbQiUgDiBgYIAAgZIBrAAIAWAAQA0AtB2gHIAAAOIgWAAg");
	this.shape_122.setTransform(245.2,887.95);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#EAD077").s().p("Ah/gQICVAAIAVAAIA/AAIAWAAIAAAaIgVABQgrAGglAAQhdAAg9ghg");
	this.shape_123.setTransform(217.475,886.9633);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#86BD17").s().p("AhPAGQE+g3k+BEg");
	this.shape_124.setTransform(238.225,876.708);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#C0C459").s().p("ABVANIi/AAIAAgZICVAAIAVAAIAVAAIAWAAIAAAZIgWAAg");
	this.shape_125.setTransform(194.025,883.9625);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#9CB72C").s().p("ABAANIiVAAIAAgZIBVAAIAVAAQAgAAAbALQAGABgBANIgVAAg");
	this.shape_126.setTransform(213.25,883.9625);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#87BB1B").s().p("ABLAdIhVAAIgVAAIgVAAQAAgOgGgEQgQgJgVAAIAAgaQB8gPA8AxQAHAFAAAOIgVAAg");
	this.shape_127.setTransform(205.775,879.7916);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FABD72").s().p("AhPAWIAAgaQBKAABIgNQACAAAAgOIALAAQgLA/hOAAQgeAAgogKg");
	this.shape_128.setTransform(67.75,909.8038);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#EF9E4D").s().p("Al0BrIAAjvQBlAVBcAdQAJADALAAQCFALBmAnQAJADALAAQAqAtBsgSQAKgBAKAAIBWAAIAVAAQAAANgCABQhIAMhLAAIAAAcIgVAAQk1ARkKA+IAAgag");
	this.shape_129.setTransform(37.325,906.675);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#F1B266").s().p("AhUgQQBVAABTAOQABAAAAAMQgKAAgKABQgfAGgZAAQg/AAgeghg");
	this.shape_130.setTransform(55.45,905.6531);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#F5C682").s().p("ACJH6QgEgBAAgNQBVAggLAAQgIAAg+gSgAjJn0QgGgKAAgNQA8BggCAAQgDAAgxhJg");
	this.shape_131.setTransform(63.4882,940.3868);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#C4BE5D").s().p("AhUgkQBbgEA7AbQAIAEAMAAIAAAaQgMAAgIADQgoARgdAAQg+AAgThJg");
	this.shape_132.setTransform(42.65,862.2686);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FAC47D").s().p("ABWBAQhagdhmgVIAAgbIAAg1QBoA5BnA7QAFADABAOQgLAAgKgDg");
	this.shape_133.setTransform(10.65,891.975);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#9CAD3E").s().p("AA1AbQhYgBgmg0QBMAAA0AXQAJADALAAIAAAbIgWAAg");
	this.shape_134.setTransform(24.55,855.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#62980D").s().p("ABbAbQgLAAgJgEQg6gahcADIgVAAIAAgaIB/AAIAVAAQAgAaAVAbg");
	this.shape_135.setTransform(42.125,858.575);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#5DA003").s().p("AgfAqIAAgcIAAhOQAvAYANA3QADANAAAOQgLAAgBADQgHAUgMAAQgMAAgUgXg");
	this.shape_136.setTransform(28.8,841.0638);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#58A204").s().p("ACbA1IgVAAIiAAAQgKAAgJgEQg0gXhNAAIgWAAIAAgaIAAgaQAqgNArgLQALgCAKAAQAmAtAOgqQACgDAKAAQBRACBOBng");
	this.shape_137.setTransform(31.45,850.575);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#5EA107").s().p("AAXEiQgygYhPACIAAgbIAAoWQBOCxCAB8QAHAGAAAOQg3BUAsBMIgWAOQgUANgLAaIAAAbIAAAaQgLAAgJgEg");
	this.shape_138.setTransform(10.65,823.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#EACB7A").s().p("AhKgXIB/AAIAWAAIAAAZQgLAAgJAFQgoARgbAAQgvAAgPgvg");
	this.shape_139.setTransform(116.225,879.7336);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#B0BE4D").s().p("ABAANIhUAAIgWAAIgqAAIAAgZIBUAAIAVAAQAgAAAbALQAFABAAANIgVAAg");
	this.shape_140.setTransform(132.225,878.625);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#77A717").s().p("AA2AbIhVAAQAAgOgGgDQgPgKgWAAIAAgaQBQAHBAAdQAFAEAAANIgVAAg");
	this.shape_141.setTransform(126.875,874.6);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#B1B649").s().p("ABAANIh/AAQgKAAgFgFQgHgIAAgMIBqAAIAWAAQAVAAAQAJQAFADAAANIgVAAg");
	this.shape_142.setTransform(115.15,875.975);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#B9BC4E").s().p("AhfgbIA/AAIAWAAQAVArBVgEIAAANIgWABIgeACQhhAAgqg3g");
	this.shape_143.setTransform(65.075,866.7118);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#76A712").s().p("ABLAoIhAAAIAAgNQhUAEgWgrIAAgbQBmATBUAsQAFADAAANIgVAAg");
	this.shape_144.setTransform(73.55,865.25);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#70AE0D").s().p("AguAjQgGgIAAgOIAAgZIAAgbQDGAsivAWQgBAAAAANQgLAAgFgFg");
	this.shape_145.setTransform(103.3801,867.925);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#8AA827").s().p("ABBAaQhXgOg+gmIBqAAIAVAAQAAAOAGAHQAEAFAMAAQAKAAAFAFQAFAIAAAOIgUgBg");
	this.shape_146.setTransform(93.8,871.95);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#73A431").s().p("AgrglIAVAAQBOgUgMBJQgDAMAAAOIgVAAIgDAAQhGAAAKhPg");
	this.shape_147.setTransform(44.9455,707.4136);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#F0F9E4").s().p("AAWB4IhAAAQABgNACgNQANhKhPAUIAAgbIAAg0ICWhMQAIgFAMAAIAAAbIAAAbQgBANgGAJQgPASgVANQgPBJBPgRQAKgDALAAQgBANgFAEQgQAJgUAAIAAAbQgBANgGAJQgFAGgKgBIgVAAg");
	this.shape_148.setTransform(53.3,699.6);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#5C8923").s().p("AhKAAQALAAAFgEQAGgJAAgNQAtAWA8AEIAWAAQAAANgEABQgqANgfAAQgvAAgZgbg");
	this.shape_149.setTransform(65.05,711.6193);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#75B125").s().p("AABA2IhpAAIAAgcIAAgaQAwAOgEgoQgCgNAAgNQEZgJi/BiQgGADAAAOIgVAAg");
	this.shape_150.setTransform(70.2652,687.5627);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#EEF5E8").s().p("AAIBQQg8gEgtgWIAAgbQAVAAAPgJQAGgEAAgNQAFhYBlAIIAVABQAAANAHAIQA1A9hmgDIAAAaIAAAbIAAAbIgWgBg");
	this.shape_151.setTransform(69.5032,703.5457);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#EFF1CD").s().p("AhogCQAVgOAPgSQAGgIAAgNIBpAAIAWAAIAVAAIAVAAIAAAaIgVgBQhlgHgFBXQgKAAgKADQgPADgMAAQgxAAAMg6g");
	this.shape_152.setTransform(66.0053,698.5683);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#7CAA3A").s().p("AgsBWIAAgaIAAgbQBmADg1g9QgGgIAAgNIAAgaIAAgOQBnCth+AAIgUgBg");
	this.shape_153.setTransform(76.9663,700.2956);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#70AE0F").s().p("Ag2gPQALgNAOgJQAIgEAKAAQALAAADAFQBFBOgXAAQgSAAhVg5g");
	this.shape_154.setTransform(112.0848,659.7327);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#86BD13").s().p("Ag7ACQDvgojvA1g");
	this.shape_155.setTransform(210.7,796.903);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#84BE18").s().p("AgogFQCkgIikAVg");
	this.shape_156.setTransform(208.8375,789.6566);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#70AD0D").s().p("AgrAUQCvhvivB8g");
	this.shape_157.setTransform(166.45,666.8536);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#62AF1F").s().p("Ah0gcQB6ArBbgmQAKgFAKAAQAAAOgFAEQhAAng0AAQhAAAgwg5g");
	this.shape_158.setTransform(148.2,655.6512);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#73AB14").s().p("AgLBMQgfhBAAhaQAvAMATAKQAJAEAKABQAAANgHAIQgDAFgMAAIAAAbIgVAAIAAA0IAAAbQgJAAgCgEg");
	this.shape_159.setTransform(191.8746,682.2);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#6EAD11").s().p("AgaAAQBrgbhrAng");
	this.shape_160.setTransform(188.2,663.668);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#62AF1E").s().p("Ah0gXIDTAAIAWAAQAAAOgFACQhJAfg1AAQhCAAgkgvg");
	this.shape_161.setTransform(178.05,655.2448);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#63A018").s().p("AhKACQAngKADgrIABgaQAsAVA6ASQAEAAAAAOQgKAAgDAEQgrBigjAAQggAAgahMg");
	this.shape_162.setTransform(195.075,700.7938);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#6FAD13").s().p("AhfgBQBmA9AqhaQAFgLAAgNQAVAAAPAJQAGAEAAANQgLAAgCAFQgoBOgwAAQgqAAgwg4g");
	this.shape_163.setTransform(214.275,709.1471);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#61942B").s().p("Ag/AbQAAgNgFgLQgGgOgKgOQBpATAwgoQAFgFAMAAIAAAaQgBAOgFALQgYA0gvAAQgeAAgqgZg");
	this.shape_164.setTransform(211.1,706.1853);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#60981A").s().p("Ag1ASQAAgNgGgEQgOgJgWAAIAAgaIAAgbIAAgbQBABZBYg5QAHgFAKAAQAiAKgXArIALAAQAAANgGAKQgpBKglAAQgiAAgfhHg");
	this.shape_165.setTransform(229.225,704.4629);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#EFE494").s().p("AgqgBQgDgBAAgNQBoAfgOAAQgLAAhMgRg");
	this.shape_166.setTransform(217.8753,683.85);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#7EAF3B").s().p("Ag/BDQALAAAEgFQAGgIAAgNQAKiuBaAzQAGAEAAANIgLAAQAFCNh5ATIAAgcg");
	this.shape_167.setTransform(200.425,672.7983);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#F2F8E7").s().p("AiqC4IAAgaIAAgbQAAgOgDAAQg6gSgtgVIAAgcIAAgaIAAg0IAVAAQB6gTgFiOIALAAIArAAIAVAAQAnCXCbhdQAIgFAKAAQBeAmAfBhQADALAAAOIgVAAIhrAAQAvA4gTAcQgHAJAAAOQgKAAgHAFQhZA6hAhaIAAAbIAAAbQgKAAgGAFQggAbg8AAQgcAAgigGgAg8gOQC0Api3g3QAAANADABg");
	this.shape_168.setTransform(219.625,685.1925);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#71A231").s().p("AgiBQQAXgrgigKQAAgOAHgJQATgbgvg4IBqAAIAVAAQAAANADANQATBThqAyg");
	this.shape_169.setTransform(241.2364,695.575);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#78AB2F").s().p("AhqguQBaAfB5AJQABAAAAAMQgKAAgIAFQg7AkgqAAQhFAAgYhdg");
	this.shape_170.setTransform(223.9,670.8723);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#86BC18").s().p("AhWAMQC9h9gSCSQgBAFgqAGQgVACgSAAQhAAAgZgig");
	this.shape_171.setTransform(479.8071,924.2294);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#83C017").s().p("AglAOIgrAAIAAgaQEQAAi8AYQgIACgLAAIgWAAg");
	this.shape_172.setTransform(521.8834,929.4);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#C5C75A").s().p("ABAANIiUAAIAAgZICUAAIAWAAIAAAZIgWAAg");
	this.shape_173.setTransform(409.4,924.075);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#DACB65").s().p("AhUgQICUAAIAVAAIAAAaQgLAAgKACQgdAFgYAAQhAAAgfghg");
	this.shape_174.setTransform(396.575,908.3294);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#79BE0A").s().p("AhfgBQBLAABHgNQACgBABgNIAUAAIAWAAQAAANgGAGQgwAmgwAAQgsAAgtgeg");
	this.shape_175.setTransform(404.05,901.5308);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#B8BF48").s().p("ABrAbQhLgBhJABQAAgNgEgBQgngNgrAAIAAgaQCAANB9AaQABAAAAAOIgUAAg");
	this.shape_176.setTransform(417.85,909.35);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#B0BD40").s().p("AiAAbIAAgbQCCAABpgYQAKgCALAAQABANgGACQhoAmiIAAIgLAAg");
	this.shape_177.setTransform(443.45,920.0527);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#75BB07").s().p("AhfgPICqAAIAVAAIAAAZQgMAAgJACQghAEgcAAQhHAAgmgfg");
	this.shape_178.setTransform(436.025,927.0431);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#89B81A").s().p("AAgAnIgVAAIiqAAIgWAAIg/AAIAAgbIBqAAIAVAAQCOACBtgnQAFgCAAgOIAqAAIAVAAIAWAAIAVAAQAAAOgGAIQguA9hsAAQgZAAgcgDg");
	this.shape_179.setTransform(442.425,921.5388);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#A8C738").s().p("AgOAbIgWAAQAAgNgGgIQgFgFgKAAIAAgaQCwgJhfA5QgHAEgLAAIgUAAg");
	this.shape_180.setTransform(466.309,914.6331);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#D6C162").s().p("AhUgPQBKgBBKABIAVAAIAAAZQgLAAgKACQgeAFgYAAQhAAAgeggg");
	this.shape_181.setTransform(452.025,913.6681);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#ABB747").s().p("AhKAAIB/gYIAWgCQAAAOgGACQg/AehQAGIAAgag");
	this.shape_182.setTransform(401.925,952.1);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#8EA724").s().p("AhpAaIAAgbQBKAABHgMQADgBAAgNIAqAAIAWAAQgBANgGAEQg9AmhiAAQgWAAgYgCg");
	this.shape_183.setTransform(377.4,957.5525);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#E6CD77").s().p("AhfgQIArAAIAVAAQA1ABA1gBIAVAAIAAAbIgVABQggAFgcAAQhIAAgmghg");
	this.shape_184.setTransform(386.975,940.3893);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#B9BB4F").s().p("AhfAAIAAgbQBbATBhAUQADABAAANIgVABIgiABQhSAAg2gcg");
	this.shape_185.setTransform(406.175,941.4778);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#D1C865").s().p("AhKANIgVAAIAAgZICqAAIAVAAQAAAMgDABQhIAMhJAAIgWAAg");
	this.shape_186.setTransform(372.075,956.075);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#BABB4A").s().p("ABAAOQhJgBhMABIAAgbQA2ABA1gBIAUAAIAWAAIAWAAIAAAbIgWAAg");
	this.shape_187.setTransform(358.2,958.775);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#E7CE73").s().p("AhUgPIAqAAIAVAAIBUgBIAWABIAAAZQgLAAgKACQgdAFgZAAQhAAAgeggg");
	this.shape_188.setTransform(349.7,902.9581);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#BEBE4E").s().p("AhUgMICUAAIAWAAQgBAMgCABQhTAMhUAAIAAgZg");
	this.shape_189.setTransform(392.3,926.725);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#EACC79").s().p("AgpAoQgngIgFgqQAxgoBkAMQAKABAMAAIAAAbIgWAAIhAAAIAAAaIgVAAIAAAaQgKAAgKgCg");
	this.shape_190.setTransform(358.2,929.1865);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#B5BE51").s().p("AhUgPIB/AAIAVAAQALgBAEAGQAGAIAAAMIgVAAIgrAAQgLAAgKACQgSAFgPAAQgqAAgJggg");
	this.shape_191.setTransform(375.25,937.7002);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#E9D17A").s().p("AAAANIgUAAIhAAAIAAgZICUAAIAVAAIAAAZIgVAAIggAAIggAAg");
	this.shape_192.setTransform(375.25,926.7375);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#86A524").s().p("Ah/gCIAAgbIAVAAIBWAAIAUAAQAgAsBggFIAAANIgVAAIh/AAQgLAAgKADQgTAEgPAAQgrAAgJggg");
	this.shape_193.setTransform(368.875,933.7127);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#92B433").s().p("AAAAOIhVAAIAAgaIBAAAIAVAAIBAAAIAVAAQAAAMgFACQgbAMgfAAIgWAAg");
	this.shape_194.setTransform(366.75,929.4);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#BFC350").s().p("ABrAbIgrAAQgLgBgKgBQhUgMhWgNIAAgaQB/AOB+AYQACABAAAOIgVAAg");
	this.shape_195.setTransform(370.975,904);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#F4C980").s().p("Ai/AHQCwgIiYgfQgDgBAAgNIArAAIAVAAIAVAAIAWAAQAqAuBqgRQAKgDALAAQArAAAnANQAEABAAANQgLAAgJADQhXAlhYAAQhdAAhfgog");
	this.shape_196.setTransform(394.475,911.3697);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#D8CC64").s().p("AA/AOQgqgBgpABIgWAAIgqAAIAAgbICTAAIAWAAIAAAbIgWAAg");
	this.shape_197.setTransform(341.15,958.775);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#79A516").s().p("AiVgMIDVAAIAVAAIArAAIAVAAQABAMgCAAQiUANiVAAIAAgZg");
	this.shape_198.setTransform(324.1,961.475);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#EBD27B").s().p("ADAAOIjVAAIgVAAIiVAAIgVAAIAAgbIGUAAIAVAAIAAAbIgVAAg");
	this.shape_199.setTransform(311.325,958.775);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#88AE26").s().p("AA/ANIiTAAIAAgZICTAAIAWAAIAAAZIgWAAg");
	this.shape_200.setTransform(300.65,961.475);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#AABD4A").s().p("ABLAOIgWAAIiUAAIAAgaQBLgBBJABIAWAAIAVAAIAAAaIgVAAg");
	this.shape_201.setTransform(282.525,961.45);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#81A920").s().p("AiqAIIAAgaICVAAIAVAAICVAAIAVAAQAAANgEADQgsAVhrAAQhLAAhugLg");
	this.shape_202.setTransform(272.95,964.6658);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#DECA70").s().p("Ag/AkIhAAAIAAgbQBrhFCAApQAKADAKAAIAAAZIgWAAIiTAAIAAAbIgWAAg");
	this.shape_203.setTransform(260.125,961.8962);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#D4CB65").s().p("Ah1gcIBWAAIAVAAQAfAsBggFIAAAOIgVABQgbADgZAAQhtAAg0g5g");
	this.shape_204.setTransform(325.15,898.873);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#9EB930").s().p("ABVAbIg/AAIAAgNQhfAFghgtICVAAIAVAAQgGApAwgBIAAANIgVAAg");
	this.shape_205.setTransform(296.35,893.3);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#D6C962").s().p("AiKgcICAAAIAUAAQAhAtBggFIAAANIgWABQgeADgcAAQh/AAhGg5g");
	this.shape_206.setTransform(284.65,893.4581);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#82BD0D").s().p("ABrAdIiVAAIAAgNQhJAEgMgrQDSgSAnAxQAGAIAAANIgVAAg");
	this.shape_207.setTransform(289.975,887.7215);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#93B726").s().p("AArAhIAAgNQh1AGg1gtQCjgmBVBHQAHAGAAANIgWAAIgfAAIggAAg");
	this.shape_208.setTransform(255.875,887.3329);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#82BF18").s().p("AhZAUQEXhyibBnQgsAfgiAAQgbAAgTgUg");
	this.shape_209.setTransform(328.7897,709.6574);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#82BF16").s().p("AhEgEIAAgaQBIARAVgoQACgEALAAIAfAAQgEBzguAAQggAAg3g+g");
	this.shape_210.setTransform(356.575,698.7137);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#6EAF0F").s().p("AiJgGID9gaIAXAAQhRBBhMAAQg9AAg6gng");
	this.shape_211.setTransform(423.25,551.966);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#59A200").s().p("AhHAIQgNgIgLgNICqAAIAVAAQAAANgDAAQhIANhJABQgLAAgIgGg");
	this.shape_212.setTransform(410.425,547.3);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#6FAE0E").s().p("AhNADQE3gpk3A2g");
	this.shape_213.setTransform(297.7875,583.0907);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#5DA000").s().p("AhIASQEjhokjB1g");
	this.shape_214.setTransform(314.3125,570.871);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#488245").s().p("AgiASIAAgZIAAgbIAVAAIAUAAQALAAADADQAfBCgjAAQgRAAgigRg");
	this.shape_215.setTransform(306.2863,525.4084);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#4F874A").s().p("AgJA1IgWAAQABgNgGgLQgFgQgLgNIAAgaIAAgaQAtAWA4ARQAEABAAAMIgWAAIgUAAIAAAbIAAAaIgUAAg");
	this.shape_216.setTransform(301.7,521.9);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#69A050").s().p("AhJA2QAFhPgwgcQA+gTAXgEQALgDALAAQAZBABlADIAAAMQgKAAgKgCQh9gmgtB4IAAgag");
	this.shape_217.setTransform(291.025,503.175);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#5EA218").s().p("ADAANIirAAIgUAAIiqAAQgLAAgIgEQgNgJgLgMIGUAAIAVAAIAAAZIgVAAg");
	this.shape_218.setTransform(417.875,544.575);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#5BA019").s().p("Ah0gNIDUAAIAVAAQAAANgCABQg8ANgyAAQhHAAgygbg");
	this.shape_219.setTransform(372.05,544.6393);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#6DB011").s().p("AhrgDQGugQmuAcg");
	this.shape_220.setTransform(368.975,562.3551);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#5DA202").s().p("AiqgPIE/AAIAVAAQhVAghVAAQhUAAhWggg");
	this.shape_221.setTransform(332.6,550.35);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#519127").s().p("AiqgNIFAAAIAUAAIAAANQipAOirAAIAAgbg");
	this.shape_222.setTransform(330.45,539.275);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#5FA121").s().p("ADKAbImpAAIAAgaQCrAACpgNIAAgOQAZAgA8gFIAWAAIAAAaIgWAAg");
	this.shape_223.setTransform(335.8,540.575);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#649946").s().p("AHAAoIhrAAIgVAAImVAAIgVAAIhrAAIgUAAIjWAAIgVAAIAAgaIAAgaIAAgbQALAAADAFQAHAIAAAOQGfAuHggUIAVAAIAAAaIgVAAg");
	this.shape_224.setTransform(405.125,539.25);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#568F4B").s().p("ADfB3IgVAAIk/AAIgVAAIgVAAQAAgNgHgIQgrguhOgMIAAgcIAWAAIAVAAIAVAAQBnAzgvhjQgDgEgLAAQAAgMgDgCQg6gRgtgWIAAAaIAAAbQgLAAgBgDQgUgygKg2IECAXQAyAEAqAMQA1APgsBCQgJAOALAZQBvA5Bog0QAJgFAKAAQAhAcAZAfQAGAIAAAOIAAAaIAAAcIgVAAIgPABQgxAAgWgdg");
	this.shape_225.setTransform(325.175,525.9774);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#85B17B").s().p("AgpgaQALAAAEgEQAGgJAAgOQALA9AuAdQAGACAAAOIgVAAIgDABQhGAAAKhQg");
	this.shape_226.setTransform(347.4706,505.8514);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#639A52").s().p("ABeCRQgLgaAJgOQAshCg1gPQgrgMgxgEIkCgWQAKA1AUAyQABADALAAQALAOAFAPQAGALAAANIgWAAIAAAcQgLAAAAgCQgXhthJgyQgLAAgHgFQgOgHgKgOIAVAAQAth5B/AmQAJADALAAQBLAAAugjQAHgFAAgOQBTAvCSg6QAFgBAAgOQAkABgFA0IALAAIAVAAQAAAOgGAJQgEAEgLAAQgKBSBKgCIAVAAQALAAAFAGQBNBYhyAMQALAOAGAPQAEALAAANQgKAAgJAFQgyAZgzAAQg4AAg6geg");
	this.shape_227.setTransform(318.9521,512.6586);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#7EAD62").s().p("AASBQQAEg1gjgBQgLAAgEgEQgRgWgKgaQAwAOgEgpQgCgNAAgNIAVAAQBRAmg3BiQgGAJAAAOg");
	this.shape_228.setTransform(340.4331,492.525);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#8AB675").s().p("AgTBeQgLgBgBgDQgKglAAgoQA8gLADhEIAAgbQALABAAACQAcBng8AaIAAAcIAAAbIgUAAg");
	this.shape_229.setTransform(341.0955,475.2);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#7EB057").s().p("AgRB2IgWAAQglgBAQg0QBAh3gBgoIAAgbIArAAIAUAAIAAAbQgDBFg8ALQAAAnAJAlQABADALAAQAAANACANQADAfgaAAQgIAAgMgEg");
	this.shape_230.setTransform(336.6462,478.0282);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#92C07A").s().p("AAsAoIgrAAQgKAAgKgDQgygKAHhCIArAAIAUAAQAAANgGAIQgEAFgKAAQALArBIgEIAAAOIgUAAg");
	this.shape_231.setTransform(336.8373,461.825);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#84B957").s().p("AAKDcQhkgCgahBQAAgMAEgNQAZhBgzhFQAYjSCngRIAAAOQAAANgGAEQhBArgiBJQBYDCAMAfQAFAOAqgGQAygIgHApQAAANgGAFQguAjhMABg");
	this.shape_232.setTransform(301.7374,479.825);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#88BB54").s().p("AgVDmQAHgpgyAIQgqAGgFgOQgMgfhZjCQAihJBCgrQAGgEAAgNQA7hBBzAwIAjgQQAOgHALgOIAAgbQA9gCACA4IABAbIgVAAIgrAAQgHBDAyAKQAKADALAAIAAAbQABAohBB3QgQA0AlABIAWAAQAKAbARAWQAEAEALAAQAAAOgFACQhQAgg+AAQgyAAglgVg");
	this.shape_233.setTransform(317.725,474.8092);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#C0E4CC").s().p("AA4AeQgCg3g8ACIAAAaIgWgBQgmgIgEgrQCigjgYCLQgBACgKAAIgBgbg");
	this.shape_234.setTransform(331.2096,452.1);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#87B576").s().p("AAbBmQgUgUgxhRIAAgaIAAg1QALAAAEgGQAHgIAAgOQAbBBAhB7QADALAAAOQgKAAgGgFg");
	this.shape_235.setTransform(317.675,423);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#82B45C").s().p("AhaDsQhHg0AOhbQA/jRBWg3QBFgqhagoIApAAIAVAAQABAjAMAXIAAAWIAPAAQAVAVAlAFIAVABIAAAaQAAAOgGAIQgEAGgLAAIAAA1IAAAbQAAANgCAAQhCAKilBtQBCBCggBAQgDAEgKAAQAAgOgHgEg");
	this.shape_236.setTransform(300.5104,424.375);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#9BC37C").s().p("AAVA1QAAgNgFgCQg3gXgDhDIAWAAQAyAUALA7QACANAAANIgWAAg");
	this.shape_237.setTransform(292.125,393.675);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#99C256").s().p("AAgBBQgxgHgOgtQAAgNgEgKQgGgQgLgNQALAAADgFQAHgIAAgOQAqA1AlA5QAFAJAAAOIgVgCg");
	this.shape_238.setTransform(273.975,384.325);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#C6E8D2").s().p("ABhBrIgqAAIgWAAQAAgNgCgOQgKg8gzgUIAAgaIAAgbIAAgNQhgAgALhIQCqAcA0CbQABADAKAAIAAAbIgVAAg");
	this.shape_239.setTransform(293.0982,388.325);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#9AC452").s().p("AAkBTQglhRhngCQAeAAAZgKQAFgDAAgNQArgoAugjQAGgFALAAIAAAaIAAAcIgWAAQAEBDA4AYQAEABAAANQABAOgGAKQgOAdgtABQAAgOgEgKg");
	this.shape_240.setTransform(283.8,393.65);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#93BE6C").s().p("AgPBIQglg6grg0IAAgbQA0g3AoAyQADAFALAAIAAAbQgLBHBgggIAAANQgLAAgGAGQgvAjgqAoQAAgOgFgJg");
	this.shape_241.setTransform(280.375,381.5152);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#D2F1F6").s().p("AhKBDQgkgFgVgVIBPAAIAAABIAAAbIgWgCgAifglIAAgbIAMgEIAABYQgLgXgBgigACcgmIAAgCIAEADg");
	this.shape_242.setTransform(320.875,402.825);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#6AAD18").s().p("AAhAmQgrgLgqgNQgLAAgBgEQgKgXAAgaIB/AAIAWAAQAAANgGAEQgQAJgVAAQALANAGAPQAEAMAAANQgKAAgKgCg");
	this.shape_243.setTransform(197.225,643.475);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#489E12").s().p("Ag/ANIAAgZQALAAADgGQAIgIgBgNQAqANAsALQAKADAKAAIAAAMQhYABgnAnIAAgbg");
	this.shape_244.setTransform(196.15,648.825);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#389823").s().p("Ai/B6IAAgbQEvAbiLi1QgEgFgKAAIAAgbQAmgmBYAKIAVABQAUA/A9AdQAFACAAANIgWAAIiAAAQAAAaAKAXQABAEALAAQAAANgHAIQgEAGgLAAIAAAaIAAAbIgVAAIhpAAIhrAAg");
	this.shape_245.setTransform(185.525,640.625);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#6CAE14").s().p("AhjBZIgFAAQgGgBgCgDQgFgPgCgPQgCgKAAgKQAggdAJgyQACgOAAgNQAsABATAMIAAgNQDYg7h9CQQgGAIAAANIgWgBQhYgLgmAnIAAAbIgVAAg");
	this.shape_246.setTransform(189.1728,625.2697);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#278A29").s().p("Ah0ACIAAgaQB/AeBWgbQAKgDAKAAIAAAaQgKAAgKAEQgrATgyAAQg3AAhBgXg");
	this.shape_247.setTransform(148.2,652.6343);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#006328").s().p("AgUBBQgLAAgEgFQgHgIAAgOQBTgCgJhoIALAAIAABQIAAAaQgLAAAAACQgDAdgcAAQgIAAgNgEg");
	this.shape_248.setTransform(166.325,619.5832);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#016D31").s().p("Ag/AoQAhgoAZgrQAFgKAAgNIAVAAQAAANAHAIQAFAFAKAAQgBAOAHAIQAEAFALAAQAAANgHAGQg6A9ggAAQgVAAgJgbg");
	this.shape_249.setTransform(157.8,627.476);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#429531").s().p("AgUBQIAAi6QAkA1gGBqIALAAQABANgHAIQgPATgUAOIAAgbg");
	this.shape_250.setTransform(162.05,607.425);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#096A2D").s().p("AhUA/QAmgLAEgrIAAgaQAxAPgGgpIgBgbQALgNAGgPQAEgMAAgNQALAAAEAFQAHAIAAANQgIBWAkAqQAEAFAKAAIAAAbIgVAAQgKAAgGAFQg7A4ghAAQgiAAgGg9g");
	this.shape_251.setTransform(151.375,614.4888);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#096115").s().p("AAHBmQgjgrAIhVQAkgBgMg1QgDgNAAgNIAVAAIAAC6IAAAbQgKAAgFgFg");
	this.shape_252.setTransform(157.7023,607.425);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#4E9D21").s().p("AAFBGQgeg2gGhSIAAgaQBBgFgMBVIAKAAIAAAaIAAAaQAAANgEAMQgGAQgLANQAAgNgGgLg");
	this.shape_253.setTransform(150.3,598.0362);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#08621D").s().p("AAABpIAAgNQgWAAgVANIAAgbIAAgaQAmg1gGhrIALAAQAFBTAfA1QAGALAAANIABAaQAEAfgaAAQgJAAgMgEg");
	this.shape_254.setTransform(147.2025,602.2241);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#23770B").s().p("AgUBQIAAi6QALAOAMAIQAIAFAKAAIAAAbIgKAAQAFBpgkA2IAAgbg");
	this.shape_255.setTransform(144.975,596.7);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#80BC64").s().p("AANCGIgUAAQAAgNgFgCQgggMAQg1QBGgegaiCQgDgMAAgPIAVAAIAAC7IAAAbIAAAaIAAAbIgVAAg");
	this.shape_256.setTransform(139.4319,599.35);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#0D6119").s().p("AABBwQgDgFgLAAIAAgbIAAgaQAAgOgCgNQgIhQgLhPIAVAAQANBXAZBJQAEAMAAAOQAAANADAMQAMA1glABQAAgNgGgIg");
	this.shape_257.setTransform(154.9078,591.375);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#4C9814").s().p("AA2CGQAMhWhCAFQgKAAgIgFQgNgIgLgOIgVAAIAAgaIAAgaQBdA2gTihIAKAAQAFAsAgATQAGAEAAAOIgVAAQALBOAIBRQACANAAAOg");
	this.shape_258.setTransform(147.125,583.375);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#1D7B1F").s().p("AAcByIAEAAIAAANIgEgNgAg0AGIAAgZIAAhRIAAgaIAVAAQgPCeBjhbIAAANQAAANgCAOQgJAygfAdQAAAKABAKQgZgxgngZg");
	this.shape_259.setTransform(175.95,622.775);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#08642F").s().p("AguBLQgGgJAAgNIAAgaQAVgOAPgRQAHgJgBgNIAAgbQAKgMANgJQAIgFALAAQAKAAAFAGQAHAIAAAMIAAAbIgMAAQAKBohTACQgKAAgFgFg");
	this.shape_260.setTransform(165.25,615.4);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#096414").s().p("AgQAuQAAgNgGgIQgFgFgKAAIAAgaQB4hchIB5QgGAKAAANIgVAAg");
	this.shape_261.setTransform(172.2547,605.4097);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#6BA055").s().p("AAgAZQg8gDgtgWIAAgZIB+AAIAVAAQABAMgHAIQgEAFgLAAIAAAaIgVgBg");
	this.shape_262.setTransform(178.05,535.275);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#599F0F").s().p("AgsCsQgggMAQg0QAAgOgHgFQgegWAQhDQAKAAAEgEQAHgIAAgNQAVgbAQgdQAGgLAAgNQAfgdATgwQACgEAKAAQAVAAAQAKQAGAEAAANIgLAAQATChhdg2IAAAbIAAAZQAAAOACANQAbCDhHAdQAAgNgFgCg");
	this.shape_263.setTransform(140.486,585.975);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#318916").s().p("AgjAUIAAgZIAAgbQCFgxh0B7QgGAFgLAAIAAgbg");
	this.shape_264.setTransform(148.5198,559.9162);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#20862A").s().p("AgZA3QgGgPgKgNIAAgbIAAgaQA8ADAMg2QABgCAKAAIAAAaIAAAbIAAAaQgKAAgBAEQgTAvggAdQAAgNgFgMg");
	this.shape_265.setTransform(140.725,567.325);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#6CA14D").s().p("ACKANIkpAAIAAgZIEpAAIAWAAIAAAZIgWAAg");
	this.shape_266.setTransform(154.625,536.575);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#70A14D").s().p("AgsAiIBQhRQAbBfg3AAQgUAAgggOg");
	this.shape_267.setTransform(153.7507,494.35);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#74A54E").s().p("Ag1gGQDZADjZAKg");
	this.shape_268.setTransform(141.95,495.85);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#6AA157").s().p("Ag/AfIAAgaQA0gRAlgfQAHgFAKAAQAAAOAGAKQAnBJhAAAQgeAAg5gSg");
	this.shape_269.setTransform(193.9751,524.1028);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#6BA150").s().p("AE/B4InoAAIAAgaQAKAAABgDQAKgejAgwQF9AAA8hsQAGgLgBgNQBJAyAXBsQAAACALAAQBPAMArAuQAGAIAAANIgWAAg");
	this.shape_270.setTransform(275.05,525.875);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#63A032").s().p("AFgAbIAAgNQmKAGlKguICrAAIAVAAIHpAAIAVAAIAWAAIAVAAIAAAbIAAAaIgVAAg");
	this.shape_271.setTransform(276.1,540.575);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#5F9A33").s().p("AifgBIAAgbQAtAWA+AEIAVABICqAAIAVAAQAAANgCAAQhIANhMAAIgTABQgYADgVAAQhEAAglgeg");
	this.shape_272.setTransform(186.575,538.1224);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#5EA01C").s().p("AGKAbIspAAIAAgaQAhAAAbgLQAEgCAAgOIAVAAIAWAAQFJAuGLgGIAAANIgWAAg");
	this.shape_273.setTransform(269.7,540.575);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#5F9F24").s().p("AC1AbIl/AAIAAgaQBMAABIgNQACAAAAgOIBqAAIAVAAQAVAsBWgQIAUgBIAAAaIgVAAg");
	this.shape_274.setTransform(207.85,540.575);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#599632").s().p("AhfgDQAZgyCSAvQAJADALAAQAAANgFACQgbAMghAAIgUABQgWAEgSAAQgyAAgQggg");
	this.shape_275.setTransform(224.975,538.2577);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#679D51").s().p("AFgBrIirAAIgWAAIgVAAQgKAAgJgEQiSgugZAyIgWAAIhqAAIgWAAIirAAIAAgbQAMAAAEgGQAGgHAAgNQALgOAFgPQAFgMAAgNQCqA2g5htQgGgKAAgOIAAgbQCLBgCfhCQALgEAJABQAAAOAHAHQAEAGALAAQgECoDvgiQAKgCALAAIAAAbIgVAAg");
	this.shape_276.setTransform(220.7,527.25);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#69A151").s().p("AgqAjQgHgHAAgPIAAgZIAAgbQC6BDikAAIAAAMQgLAAgEgFg");
	this.shape_277.setTransform(235.2101,517.875);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#6DA350").s().p("Ag1ggQA5AhAWgkQAGgKAAgOIAVAAIAAAbIAAAbQABANgEAMQgLAogSAAQgbAAgvhcg");
	this.shape_278.setTransform(242,503.7911);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#7BB058").s().p("AgfAtIgVAAIAAgbQAxAQgFgpQgCgNAAgNQAKAAAEgFQAHgJAAgNIAVAAQAAAoAKAlQAAABALAAQAAAOgGAKQgMATgVAAQgSAAgbgQg");
	this.shape_279.setTransform(239.875,495.9709);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#528843").s().p("AgoAmIAAgbQAVgaAZgVQAGgGALAAQAKAAABADQAaBSg/AAQgQAAgVgFg");
	this.shape_280.setTransform(253.6362,499.4201);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#5A8E4E").s().p("AgdBFIAAgbIAAgbQABgNgFgCQgggLAPg1QAygOACAnQAAACALAAIAVAAIAWAAIAAAaQgLAAgGAGQgaAUgUAbIAAAbIgWAAg");
	this.shape_281.setTransform(250.2997,496.3401);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#63AE20").s().p("ABLANIiqAAIAAgZICUAAIAWAAIAVAAIAAAZIgVAAg");
	this.shape_282.setTransform(126.9,651.475);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#27912D").s().p("ACLANIiUAAIgWAAIiAAAIAAgZQCfAACfAMQABAAAAANIgVAAg");
	this.shape_283.setTransform(118.325,648.825);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#298F2D").s().p("ABWAbIhWAAIAAgOQhUAEgWgrQBzAFBeAgQAEACAAAOIgVAAg");
	this.shape_284.setTransform(87.425,647.5);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#459D23").s().p("ABrAnQiUgHhWhHIB/AAIAVAAIAAAbQAWArBVgEIAAANIgVgBg");
	this.shape_285.setTransform(74.625,646.125);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#2F9426").s().p("AAYAxQg3gbgLhLIA/AAIAWAAIAAAbIgWAAIgVAAQAVAaARAdQAFALAAAOQgLAAgIgFg");
	this.shape_286.setTransform(68.225,628.775);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#439F22").s().p("Ag5ANIAAgaQALgOAGgOQAEgMAAgNQAlAJAOApQACADAKAAQAAANAGAJQAoA6gYAAQgYAAhSg2g");
	this.shape_287.setTransform(78.3041,624.8384);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#2B932A").s().p("AgigFQAvAOgEgoIgCgbQALAAAAACQAeBzgWAAQgQAAgshAg");
	this.shape_288.setTransform(93.1224,623.9918);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#3C981B").s().p("AAUA/QgOgoglgJQAAgNgEgMQgHgPgKgNQAfAAAagLQAGgCAAgOQAlAKAEAsIACAaIgWAAIAAAaIAAAbQgLAAgBgEg");
	this.shape_289.setTransform(88.5,606.05);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#4EA11B").s().p("AAqBOQAAgNgGgKQgOgdgrgBQAAgNgGgEQglgYgVgmQBQAaAEgaQABgNAAgOQAlAKAPAoQAAADALAAQALAOAGAOQAFAMAAANIABAbQADAegZAAQgJAAgNgEg");
	this.shape_290.setTransform(85.3941,615.5894);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#067F34").s().p("AAMBDQgDgsglgKQAAgNgEgLQgHgPgKgNIAAgbIAAgbIAVAAQAfAbAaAgQAGAIAAAOQAAAMAGAIQAcAmg3AwIgCgbg");
	this.shape_291.setTransform(92.4945,598.05);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#1C8227").s().p("AAcA/Qgwg9grhCQBggRATBEQABACALAAIAAAaIgVAAIAAAbIAAAaQgLAAgEgFg");
	this.shape_292.setTransform(83.175,587.179);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#0D7F32").s().p("AAZBLQg0gfgPhFQAmAsAEgsIAAgbIAAgbIAVAAQABAzAPAfQAGAKAAAOIAAAbIAAAaQgMAAgGgFg");
	this.shape_293.setTransform(121.55,602.025);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#04632B").s().p("AhUBVQAVgaAQgfQAFgKAAgNIAAgaIAAgbQAggaAZggQAGgIAAgNIAWAAQgQA0AgAMQAFACAAANQgPA0AfANQAGABAAANQgBAOgGAJQg4BKgsAAQgjAAgcgrg");
	this.shape_294.setTransform(130.1,609.5726);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#036D2F").s().p("AgfhNQA9gDACA4IAAAaIgKAAQABBNgJAAQgNAAggicg");
	this.shape_295.setTransform(105.525,607.2436);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#05843E").s().p("ABYEDIgVAAQAAgOgCAAQiegNigAAIAAAbIgUAAIgWAAQAAgOgEgBQhdgih0gEIAAgcIAAgaIABgbQAGgpgyAPQAAgOgFgLQgQgdgWgbIAWAAIAVAAQCqBwhOh0QgGgJAAgNIAAgaIAAgbIAVAAQAsABAOAdQAGAKAAANQBpCXgzjKQgBgCgKAAQAAgNgFgMQgGgPgLgOIAAgaIAAgbIAWAAQA3gvgcgmQgGgIAAgNIAVAAIAWAAQAAANAGAIQAEAFAKAAQA4EKgCi6IALAAQBeCXAig5IAAANQBCBjBhiCQAHgJAAgOIAVAAIAVAAQAVgNAVAAIAAANIAAAbQgEArgmALQALB4B6hzQAGgFAKAAQAAANgGAKQgZArghAoQAWBEBkhmQAGgGAAgOQAyAOADgmQAAgCALAAQAoAYAaAxQACAPAFAPQACADAGABIAFANIAAgNIAVAAQAKAAAEAEQCNC3kwgbIgWAAIgrAAQgKAAgKADQgpANgyAAQg4AAhDgQg");
	this.shape_296.setTransform(127.6705,624.2644);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#3B941F").s().p("AAVA2IgUAAQAAgOgGgIQgagggfgaIAAgbQBCAaAsAwQAFAFALAAQAAAOgGAIQgFAGgKAAIgWAAg");
	this.shape_297.setTransform(95.95,591.375);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#016A2C").s().p("AhUAMQBCAFgVhVQgDgMAAgNIAAgcIAWAAIAUAAIAAAcIAAAaQAPBFA0AgQAHAFALAAQAAANgFAKQgQAfgVAaIAAgNQgKAQgOAAQgjAAhEhug");
	this.shape_298.setTransform(117.275,606.1679);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#11802E").s().p("ABREYIAAgbQgCg4g+ADQgKAAgFgFQgFgIAAgNQAKAAAEgGQAGgIAAgOIgBgaQgejyh1ieQCLBCApCsQAAADALAAQgQBPAoAWQAIAEAKAAQAAA2ALAzQAAADALAAQAAANADAMQATBSg6AAIgHgBg");
	this.shape_299.setTransform(100.6179,579.3613);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#077D38").s().p("AgaBTQgPgggBgzIAAgaQAVgaAQgeQAFgLAAgNQAlApgGBcIAMAAQAAANgHAIQgaAggfAbQAAgOgFgKg");
	this.shape_300.setTransform(127.975,594.025);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#5EA305").s().p("AgfgKQAfhPAbA3QAFALAAANQgLAAAAAEQgYA/gNAAQgNAAgChDg");
	this.shape_301.setTransform(124.75,581.7694);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#048245").s().p("AgYhZQBBgEgVBVQgCAMAAAOQgLAAgBABQgLBHgIAAQgMAAABizg");
	this.shape_302.setTransform(115.5237,573.5662);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#228C2D").s().p("AgUBtIAAgbIAAgbIAAgbIAAifIAUAAQAABrAKBpQABABAKAAIgBAbQgCAXgKAAQgJAAgTgXg");
	this.shape_303.setTransform(119.425,588.5125);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#13832E").s().p("AAKBfIgKAAQAEhdgkgoIAAgaQALAAAEgGQAHgIAAgNQAvgPgEAqQgCANAAANQAAANgGAIQgFAGgKAAQgOBCAdAWQAGAEAAAOIgVAAg");
	this.shape_304.setTransform(131.2441,587.2009);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#198527").s().p("AABAoQAFgogwAOIAAgaQAKAAAFgGQAHgIAAgNQAKgNANgJQAHgFALAAQALAOAFAPQAGALAAAOQAAAMgGALQgQAdgVAbQAAgOABgNg");
	this.shape_305.setTransform(134.375,576.675);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#2B8B15").s().p("ABAANIh/AAQgLAAgEgFQgGgIAAgMIAVAAIB/AAIAVAAIAAAZIgVAAg");
	this.shape_306.setTransform(68.25,640.775);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#4FA31A").s().p("AA1AcIiAAAIAAgaQA2AAAxgMQADAAAAgOQAygOgGAoIgBAaIgVAAg");
	this.shape_307.setTransform(69.3775,636.6106);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#138425").s().p("AA0BNQgOgpgmgJQAAgOgGgGQgkghgqgbIAAgaQAqANArALQAKACAKAAQAVAnAmAXQAFAFAAANIgVAAIAAAaIAAAbQgKAAgCgDg");
	this.shape_308.setTransform(74.625,615.4);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#449B15").s().p("ABAAZQgrgLgqgNIAAAaQgKAAgGgFQgbgVgUgaQBogHA7AqQAGAEAAANQgKAAgLgCg");
	this.shape_309.setTransform(68.25,607.3319);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#72B039").s().p("AEAAOIoVAAIAAgbIIVAAIAWAAIAAAbIgWAAg");
	this.shape_310.setTransform(27.75,539.275);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#7AAD5C").s().p("AhLgJQEjgSkNApIgWACIAAgZg");
	this.shape_311.setTransform(7.579,533.6926);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#489E1B").s().p("AgfCSQgLhqAAhpIAAgbIAAg2IAWAAIAABsIAAAaQADCGAwiDQABgDALAAIAAAaQAAANgGAKQgQAegVAbIAAAaIgUAAIAAAcQgLAAAAgCg");
	this.shape_312.setTransform(123.675,582);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#097C34").s().p("AgVCeQgKgzAAg2IAAgaIAAi7IAVAAQgBEjAgi2QABgBAKAAIAACfIAAAaIgVAAIgVAAIAAAcQgKAAgBgDg");
	this.shape_313.setTransform(114.075,580.675);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#449C21").s().p("AgECOQgogWAPhPQAfhTAVhmQABgCAKAAIAAAbIAAAbIAAAaIgVAAIAAC7IAAAaQgKAAgHgFg");
	this.shape_314.setTransform(109.5836,571.3);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#5CA207").s().p("ApKPqIAA/uQJxAoH5gnIAVgBQAAAOgFALQgGAPgKAPIAAA0IAAAaQgLABgBACQgVBmggBTQgKAAgBgDQgoisiMhBQB1CdAfDzIABAbQgLAAgFgGQgsgxhDgaQgMABgBgDQgShEhiARQArBEAxA8QAEAGALAAQAKANAHAPQAFAMAAANQAAAOgGACQgbALggAAQAKANAHAPQAEANABANQgBANgBANQgDAahRgaQAAgNgGgEQg7grhpAHQAUAaAbAWQAGAFAKAAQArAaAkAjQAHAGAAAOQAAANgFAMQgGAOgKAOIgWAAIhAAAQAKBLA4AbQAJAFALAAQgBAOgDAAQgxANg2AAIAAAaIgVAAQAAANAGAJQAEAEALAAQBWBICVAHIAVABIBWAAIAUAAIAWAAIAVAAICAAAIAVAAIAAAaIgVAAIgrAAIAAAbQgKAAgIAFQgNAJgMANQgKAAgHAGQi9B2jcBaIAAAbQAAANACANQAEApgwgOQgLAAgIAEIiXBNQgLAAgFAEQj0DiinEwIAAgbg");
	this.shape_315.setTransform(58.65,646.15);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#5CA107").s().p("AuaEcQAAgNAGgLQBIh5h5BbIAAAbQgLAAgIAFQgOAJgKANIAAAaIgLAAQAGhqgmg1IgVAAQAAgOgEgMQgZhKgOhWQAAgOgGgEQgfgTgFgsQAAgNgGgEQgQgKgVAAIAAgbQALAAAFgFQB2h7iGAwIAAAbQgKAAgBADQgNA1g9gDIAAAbIAAAbQgLAAgHAFQgOAJgKANQgMAAgFgFQhLhQAbi3IAAgaIJVAAIAVAAIGAAAIAVAAIMqAAIAVAAIAVAAIGrAAIAVAAIAWAAQBUAvCUghQACgBAAgNIBrAAIAVAAQALANANAJQAIAEALAAQALAOANAIQAHAGALAAIAAANQjFgKh6BMQgyAPAWgKQAigRgUgIQl2iZl8B4QAWANAUgBQGKgVEMBZQgWAAgUAGQjuA/kohFQADCGjDAbIAgAAQgbBJiwgUQAAAMgFADQieBUixA9QgZihgnBrIALAAQiVDCk2ATIAAAcIAAAaIAAANQgTgMgsgBIAAgNQglAhgVAAQglAAAKhkg");
	this.shape_316.setTransform(265.0926,581.6977);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#57A210").s().p("AAFCWQgZg3ggBPIAAgaIAAhsIAAgbIAAhpQAjgBgLg2QgDgMAAgOIAVAAQgbC2BKBPQAFAGALAAQAAANgGAIQgFAFgKABIAAAbQAAAMgHAIQgEAGgKAAQgBgNgFgLg");
	this.shape_317.setTransform(126.9,563.3);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#45A01D").s().p("AgfA1IAAgaIAAg0QALgOAGgPQAFgMgBgNIAVAAIAVAAQAAANgFALQgfA/gbBIIAAgbg");
	this.shape_318.setTransform(116.2,551.275);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#5E9F1F").s().p("Ak/AoIAAgbIAAgZQDrAADpgNIABgOQAvAoBmgMIAUgBIAAAZIgVAAIpTAAIAAAbIgWAAg");
	this.shape_319.setTransform(155.65,541.9);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#13812A").s().p("AgMCuQAAgOACgNQAUhVhBAEIAAgaIAAgbQAahHAghAQAFgLAAgOQALAAAEgEQAGgJAAgNIAWAAIAAAaIAAAbQAAAOADAMQALA2gkABIAABpIAAAbIgVAAIAAA2IAAAbIgUAAg");
	this.shape_320.setTransform(118.6392,558);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#66A339").s().p("Aj0AOIAAgbICVAAIAWAAIEpAAIAVAAIAAANQjrAOjpAAIgVAAg");
	this.shape_321.setTransform(146.075,539.275);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#68A838").s().p("ACrAOQjVAGiVguIFqAAIAVAAIAAAbQAAANgHAIQgEAFgKAAg");
	this.shape_322.setTransform(102.35,540.575);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#79AE5E").s().p("ABAAZQhvgRglASIAAgaIAAgZICUAAIAVAAIAAAZIAAAaIgVgBg");
	this.shape_323.setTransform(66.125,535.275);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#5D9F13").s().p("ApUAQIAAgZIIWAAIAVAAQBpAABpgNQABAAABgOIArAAIAVAAQCUAuDWgGIAAAMIgVAAIgWAAIgVABQj5AUkXAAQkcAAk9gVg");
	this.shape_324.setTransform(59.7,541.6002);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#6CA73B").s().p("AhpgIIAVAAQAlgSBvARIAVABIAVAAQAAANgBAAQhpANhpAAIAAgag");
	this.shape_325.setTransform(66.125,538.8121);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#679C4D").s().p("AAWAoIgqAAIgWAAIAAgbIAAgZQALAAAEgGQAGgIABgNQAuANAGAmQAAABALAAIAAAbIgVAAg");
	this.shape_326.setTransform(78.9,533.925);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#76AA5A").s().p("AAKA5QgFgngvgNIAAgaQBHhUAMBuQACANAAAOQAAANgHAIQgEAFgLAAQgLAAAAgBg");
	this.shape_327.setTransform(81.025,529.4204);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#6CA04E").s().p("Ag0gMQAKgNAOgJQAIgFALAAQAqABAOAdQAHAJAAAOQgLAAgHAEQgZAWgTAAQgeAAgOg0g");
	this.shape_328.setTransform(88.5,507.157);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#74A653").s().p("AAHBqQgNgdgsgBQAAgNgGgFQgfgWAQhBQAuisApB8QAHAVAAA1QAAAyA2AdIAAAbQgLAAgJADQgWAKgWAOQAAgOgGgKg");
	this.shape_329.setTransform(92.5139,495.5611);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#71A54E").s().p("AguAYIAAgZIAAgbIAVAAQALAAAIAFQBgA0hNAAQgWAAglgFg");
	this.shape_330.setTransform(104.944,503.401);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#B8D464").s().p("AiCAaQByjtCKDhQArBFi5ANIgGAAQg5AAgvhGg");
	this.shape_331.setTransform(130.3528,452.535);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#A3C953").s().p("AgzhDIAVAAQAwAiAeAxQAGAKAAANQAAAOgFACQgbANgUAAQhBAAAMiHg");
	this.shape_332.setTransform(45.7894,456.5075);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#71A451").s().p("AhOCFQg8AAAShCQBHiCAihUIAOAWQAYAkACAVQAIBqBbACQARBEjbAog");
	this.shape_333.setTransform(31.3195,496.45);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#97C26E").s().p("AhEBRIAAg2QBbANgmhdIALAAQArgBAOgcQAGgKAAgNIAKAAQAFB4iOBcIAAgag");
	this.shape_334.setTransform(6.9319,484.5);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#9DC278").s().p("AgJBDQABglgshfQAKAAAFgFQAGgJAAgNQAaA7AqApQAGAFALAAIAAAcQAAANgHAKQgOAdgqAAIAAgag");
	this.shape_335.setTransform(7.5,469.775);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#D3F0DF").s().p("AggCSIAAgaIAAkLQALANAOAJQAHAFAKAAQAAANgGAJQgEAFgKAAQAsBfgCAlIAAAaIgMAAQAjBThCAAIgVgCg");
	this.shape_336.setTransform(3.2524,472.5543);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#9BC461").s().p("AAQBZQgrgrgZg6IAAgaIAAg2QA3ANAiAjQAFAGALAAQAAANgFALQgGAPgKAOIAAA1IAAAZQgLAAgFgEg");
	this.shape_337.setTransform(9.625,461.75);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#9DC370").s().p("AgxAyQgOgJgLgNIAAgbIAAgaQAYggA9AFIAVAAIAWAAQAAAbAIAYQACACALAAIAAAbQgLAAgFgGQgigig4gNIAAA1IAAAaQgLAAgHgEg");
	this.shape_338.setTransform(7.475,455.0412);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#8ABA5D").s().p("Ap0DNIAAgbIAAgbQCPhbgEh5IgKAAIAAgbIAAgaIAAg1QAKgOAGgPQAEgMAAgNIAAgbIAAgbIAAgbQAgAAAcgLQAEgCAAgNQAxgPAFApIAKAAQAAANgEADQgcALggAAQCPA+A0BUQAHAPAYAOQA6AiAaBHIALgNQBTAHgThxIApAAIAqAAQABCQCthpQBuhEB5AdQAlCNCGAsQAAAOgDAMQglB3jDgmIAAAbIgUAAIAAAbQg3geAAgzQAAg0gHgVQgqh8guCrQgPBCAeAWQAHAFAAAOQgLAAgIAEQgOAJgKANQhdAjh9gvIg4gUQgnh7hGBmIgLAAQhbgDgIhrQgCgVgZgkIgOgVQgiBUhGCDQgTBBA9ABIAAAOQAAAOgDAAQgkAHgfAAQiBAAgkiAg");
	this.shape_339.setTransform(62.9,480.0332);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#9FCA5D").s().p("AghA1QgIgYAAgbIAAgZIAAgbQA8gRAMApQABADAKAAQAAANgEACQgbAKgfAAIAAAbIAAAbQgLAAgCgDg");
	this.shape_340.setTransform(17.075,449.5362);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#D1EFDE").s().p("AgXBCQAAgOAFgDQAsgXgxgOIAAgZIAAgbQALAAADgFQAHgIAAgOQAKAOAGAPQAEAMAAANQAAANADAMQANA4goAAQgIAAgJgCg");
	this.shape_341.setTransform(28.032,427.1179);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#BDD863").s().p("AhhgiQBzh9BICaQAjBJhmAVQgJACgHAAQhEAAgkh9g");
	this.shape_342.setTransform(61.0471,434.515);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#A1CB69").s().p("ACLB4QgLAAgGgGQgxgog/AuIgKAAQgDgpgyAPQgKAAgBgEQgMgog9ARIAAAbIAAAaIgWAAIAAgaIAAg2QBqAFAlg+QAGgIAAgOQA8AMgPhCQgDgMAAgOIAVAAIAVAAIAWAAQAAAOgHAHQgEAFgLAAQAkBlAtBYQAFAKAAAOIgVAAg");
	this.shape_343.setTransform(26.675,437.75);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#D3F1D7").s().p("AALBDIgUAAQAAgNgFgMQgGgPgLgOIAAgZIAAgaIAAgcIAWAAQAIBCAcAsQAFAKAAANIgVAAg");
	this.shape_344.setTransform(30.9,419.025);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#A7CF7B").s().p("AAABFQAAgNgFgKQgcgsgJhCQA9gQAMApQABADALAAQAAANgHAIQgEAFgLAAIAAA0IAAAbIgVAAg");
	this.shape_345.setTransform(34.125,418.8105);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#C3E5B9").s().p("AAUAbQgKAAgCgDQgKgog+AQIAAgaQBLgKAfAXIAAgNIAVAAQAAANABANQAFAegbAAQgJAAgNgDg");
	this.shape_346.setTransform(36.3525,412.4362);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#B0D387").s().p("Ag/ABQA1g0A4AwQAHAEALAAQAAANgDABQg9AMg/AAIAAgag");
	this.shape_347.setTransform(49.075,406.9969);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#ADD184").s().p("AgvA1QAig8ArgzQAHgIAAgNIALAAQgJBwhWAvIAAgbg");
	this.shape_348.setTransform(62.4,396.35);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#D7F2F8").s().p("AhAAsQgKgYAAgZQAShABuAiQAKADALAAIAAAbIAAAMQgfgWhLAKIAAAZIgWAAIAAAcQgKAAgBgEg");
	this.shape_349.setTransform(33.075,410.3322);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#D6F1F2").s().p("AhUBQIAAgaQAAgNAFgDQBRgmhWhPQBJAEBMAUQAJADALAAQAAANgGAIQgFAFgKAAIAAAaIAAAbIAAAbQgLAAgHgFQg4gwg1A1IAAAaIgVAAg");
	this.shape_350.setTransform(49.075,401.675);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#CCEBD0").s().p("Ag0BeIAAgbIAAgbQAKAAAFgFQAGgIAAgNIAAgaIAAg1QAfAAAbgMQAFgCAAgOQAKAAAFAGQAGAIAAAOQAAANgHAHQgsAzghA9IAAAbIgVAAg");
	this.shape_351.setTransform(60.8,394.975);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#D4F2FC").s().p("AhLAAIAAgaQEkAWkOAeIgWABIAAgbg");
	this.shape_352.setTransform(7.5915,396.325);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#BFDB63").s().p("AieBQIALgTQANgVgZhCQAphQBEgKQB9gQBVgBQgtBsAYCfQidgwiMgGg");
	this.shape_353.setTransform(103.425,401.725);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#D0EDE4").s().p("AhVA0QgKglAAgnQB+gwA8AgQAFACAAAOQgKAAgFAFQg1BChmguIAAAbIAAAaQgKAAgBgCg");
	this.shape_354.setTransform(71.425,380.197);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#B6D698").s().p("Ag0ACIAAgaQBCg1AcBnQABADALAAIAAANQgogbhCgNg");
	this.shape_355.setTransform(107.65,356.0526);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#CFEBDB").s().p("Ah/BWQgKhPAAhPQCdgaBiAXQAKADAKAAQABANgFAMQgGAOgLAOIAAAaQgLAAAAgDQgchnhEA1IAAAbQgKAAgFgGQgkgfhLAKIAABqIAAAaIgLAAg");
	this.shape_356.setTransform(101.3,358.2546);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#C7E7C9").s().p("AgqgWIAAgaQBYgSgOBgIALAAQAAAOgHAEQgGAEgGAAQgaAAgohKg");
	this.shape_357.setTransform(119.425,353.2299);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#75AA56").s().p("Aq+I+IiWAAIgVAAIlrAAIAAgaQALAAAEgGQAHgIAAgMQECAGhbhZQgkgiCSAEICrAFQCbhrFPAOQBYADBSgRQCugWDNhGQAEgBAAgOIAVAAQBNCaAbhlQADgMAAgOIAWAAQBsAZghhmQgBgDgKAAIAAgaQAAgOAGgHQAigjgogzIAAgbQBdAYgHhMQgCgOAAgOQBgAugJhIIgBgaQBwg6BChiQADgFALAAQAKAAADgEQAghAhChCQCmhtBCgKQACAAAAgOQAxBRAUAUQAGAFAKAAQAlA0gaBSIALAAQAEArAmAJIAWABQgLAOgOAHIgjAQQh0gwg7BBIAAgNQioARgYDRQAzBFgZBCQgEAMAAANQgLAAgLADQgXAEg+ATQAwAcgFBQIAAAaIgWAAQALAOAOAIQAHAFALAAQAAANgGALQg8Btl+AAQDAAwgJAeQgCADgKAAQgLAAgKABQjwAjAFiqIAAgMQClAAi7hEIAAAbIAAAaQgKAAgKAEQigBBiKhfIAAAaQgLAAgGAGQgnAfgzARIAAAaQAAAOgFAMQgFAPgLAOIgWAAIh/AAIAAAaIgWAAIkqAAIAAAaIgVAAg");
	this.shape_358.setTransform(206.825,480.475);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#82B75D").s().p("AgrAYIAAgZQA4gMAdgcIAAAOIABAaQAGArgiAAQgUAAgmgSg");
	this.shape_359.setTransform(268.7386,468.6716);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#62974F").s().p("AgfBPQgLABAAgCQgKglAAgpIAAgaIAAgaQAKAAAFgFQAGgJAAgNQB3AEgyBOQgGALAAANQgLAAAAgCQgDgmgxANQgPA1AgAMQAFACAAAMIgWAAg");
	this.shape_360.setTransform(248.3853,489.85);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#7FB35E").s().p("AAfBvIgVAAQAAgOAGgKQAyhPh3gEQAAgNgEgMQgIgZgJg5QBZgjAbCLQAAADALAAQAoAzgiAjQgGAHAAAOIgWAAg");
	this.shape_361.setTransform(250.6008,481.475);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#6DA050").s().p("AgHBeQAAgOgGgEQgfgXAQhCQAkgOgFhCIALAAQAJA5AIAZQAEALAAAOQAAANgHAIQgEAGgKAAIAAAaIAAAbIgVAAg");
	this.shape_362.setTransform(241.7389,480.475);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#81B257").s().p("AgJBvQgxgKAGhDQAmgLgGgpQAAgCgLAAIAAgaQAShCBDgBIAAANIgLAAQAFBCglAOQgPBCAeAXQAGAEAAAOQAAANgGAJQgEAFgLAAQgLAAgJgDg");
	this.shape_363.setTransform(237.7176,481.175);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#89B959").s().p("AhkGbQgaiLhbAiIAAgNQhEACgRBBIAAAaQgLABgEgFQgmgwghg1QBvAFAPhWQACgNAAgNQDtByCLkAQAkhCAjhWIAAgaIAAg2QBHgSgZh0QgDgMAAgOQAsgBAOgdQAGgKAAgOIAVAAIAWAAQBbAohFAqQhYA3g/DTQgOBZBIA1QAHADAAAOQgLAAgDAFQhDBjhwA5IAAgOQgcAcg4ANIAAAZQAAAOABAOQAHBOhdgaIAAAcQgLAAAAgDg");
	this.shape_364.setTransform(264.8628,440.45);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#92BD55").s().p("AiqD+QgCiNhUiZQCrhSBLiDIgLAAIAAgaIEUANIAAANQAAANgCAOQgPBWhvgGQAhA2AmAwQAEAEALAAQALAAAAACQAGApgnALQgGBDAyAKQAKADAKAAQAAANACANQAFAqgxgQIAAAbQAAAOgEABQjOBGitAWIAAgag");
	this.shape_365.setTransform(213.2981,483.175);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#A6C953").s().p("AhvCcQAAgNAHgFQA2gphSi0QB7CJgkj1QgCgMAAgOQAOAtAxAHIAVACQAAANgEACQgaALgcAAQBlACAmBRQAFALAAANQAAAOADANQAZBzhHARIAAA2IAAAaQgLAAgIAFQgIAEgLAAQguAAhrg+g");
	this.shape_366.setTransform(275.5522,407.413);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#AAC952").s().p("AgkAQIAAgZIAAgbIAWAAIAUAAQAAAOAGAHQAqA0gdAAQgRAAgsgVg");
	this.shape_367.setTransform(259.5898,426.7141);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#95C05B").s().p("Ag1BQQB/gXhkiNQgGgIAAgOQAKAAAHAGQCdB+jDBRIAAgbg");
	this.shape_368.setTransform(169.626,463.125);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#94BE56").s().p("AgqAOIAAg1QAqAAAnANQAEABAAAOQgKAAgFAEQgaAggsAPIAAgag");
	this.shape_369.setTransform(157.775,475.1);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#94BF54").s().p("AhJAsIAAgaQAKAAAEgGQAHgIAAgMQBIAdA2hFIAAAMQgKAAAAACQgGBThTAAQgWAAgagFg");
	this.shape_370.setTransform(141.8,482.7822);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#97C35C").s().p("AIVEMIhAAAQiGgtgliOQh5gchuBEQisBqgBiSIgqAAIgqAAQATBxhTgHIgLAOQgahIg6giQgYgOgHgOQg0hTiPg/QAgABAcgMQAEgCAAgNQA+guAyAoQAGAGALAAQgQCvB1g2QAFgCAAgNQEugDgEjtIAAgbQCigKDZBMQAEABAAAOQhWA7AWBlQgGEvDdg9QAJgCALAAQAAANgHAIQgEAGgKAAIAAAaIgWAAg");
	this.shape_371.setTransform(78.9,460.3665);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#99C15F").s().p("AAABQQgChUgdgwQAKgNAOgJQAHgFALAAQAoBDgjBFQgFAJAAAOg");
	this.shape_372.setTransform(165.2791,444.4);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#A3C654").s().p("AkjBEQAyAiAeAyQAGAJAAAOQBxABAsBKQADAFALAAQBmioAtiYQiaA9AwjDIgMAKQg5AvAGhUQDjjJBDDmQAEALAAAOIAAAbQgMAAgHAFQgOAIgKAOQAdAwACBUIAMAAQAAAOAFAIQBlCOiAAXIAAAbIgVAAQAAgNgEgBQgngNgrAAIAAA2IAAAaQAAAOgGADQgrAZAHgqIAAgNQg3BHhIgeQgLAAgJABQglALgfAAQiYAAAFj9g");
	this.shape_373.setTransform(142.168,451.0181);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#92BD5F").s().p("Ag/AWQALgOAGgOQAFgLAAgNIAVAAQBBgqAQBFQADALAAAOQgLAAgIAFQgiAUgZAAQgeAAgTgZg");
	this.shape_374.setTransform(183.375,450.2194);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#97C162").s().p("Ag0gLQAwANAEgnQAAgBALAAQAVANAPAUQAGAHAAANIgVAAQgLAAgGAFQgRATgPAAQgYAAgLgyg");
	this.shape_375.setTransform(175.95,445.6082);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#81B45A").s().p("An5IJIgVAAIoWAAIAAgbIAWgBQEOgqkkARIAAgbIAAkmQAtCfC7gmQADAAAAgOQDbgngRhEIALAAQBGhlAnB6IA4AUQB+AvBdgiQAYBWBBg3QAHgFALABQAVgOAXgKQAJgDALAAQCkATh8hEQgIgFgMAAIAAgbQDDAmAkh3QADgMAAgNIBBAAIAVAAQCDAbAHhpQAAgCALAAQgHAqArgYQAGgEAAgOQAtgPAaghQAFgEAKAAIAVAAQDEhRieiAQgGgGgKAAQAAgOAFgJQAjhGgohDIAAgbQAcApA5AKQAKADALAAIAAAaQgLAAAAABQgEAogxgOQATBRAygwQAGgGALAAQAAANgFALQgGAQgLANQAkAvBJgpQAIgGALAAQBaAgBmAUQAKACALAAIALAAQhLCDirBSQBUCZACCNIAAAaQhTARhXgDQlPgOicBrIirgFQiRgEAlAiQBaBZkCgHQAAgOgBgNQgNhvhHBUIAAAbQAAANgHAJQgDAFgLAAIgWAAIiVAAIAAAaIAAAbIgVAAgAGwB4QB2AygliFgAEwBrQDagLjagCg");
	this.shape_376.setTransform(106.075,485.8);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#A2C753").s().p("ABVC2IAAgNIkUgNIAAAaQgLAAgKgCQhmgThbghQAAgNgDgMQgPhGhCAqQAAgNgHgIQgPgUgVgMIAAgaIAAgbQAOgsAtgUQAFgCgBgOQB9CjAZjYIAMAIQAZARgQg0QA9A6Ang+QAHgJAAgNQBbD2A1jSIAVAiQAFAKAVAAQBRCPCdhvQAHgGALAAQB1A1hFhWQgFgGAAgOIAVAAIAUAAQCHBNAmgTQAJgFALAAQgjBWgkBCQhhCxiPAAQhAAAhJgkg");
	this.shape_377.setTransform(230.3,439.5549);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#AACB52").s().p("AjqAxIAAgaQAMAAAEgFQAGgIAAgNQA/haBRAuQAFAEAAANQAQAzgZgRIgMgHQgOB7gvAAQgjAAg2hHgAArg4IAAgbIAAgcQCZgnAjCTQADANAAANQgVAAgFgKIgVghQgYBhggAAQgnAAgxiFg");
	this.shape_378.setTransform(206.8,423.458);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#B4D253").s().p("AgmBtQg+gxgFhqQBkgvBvgUIAAAOQAAANgFAFQhUA/glBpIAAAbQgLAAgHgFg");
	this.shape_379.setTransform(176.975,384.975);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#A1C960").s().p("ACYDuQg5gKgcgpQAAgOgEgMQhCjkjkDIQAAgMgGgGQgfgWAQhCQA8hRBTg9QAGgEAAgOQCQAthgg3QgGgDAAgOQAwgNgDgoIgCgbIAUAAQgVC5DAA2QBDASASA/QAAAOgGAIQgEAFgLAAIAAAaQAAAOgFACQgtAUgOAtIAAAbQgLgBgKgCg");
	this.shape_380.setTransform(159.6527,415.05);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#93BD56").s().p("AggASQAAgNgEgLQgGgOgLgOQAxgOAEAoQAAABAKAAQAAAMAGADQA1AegUAAQgRAAhAgUg");
	this.shape_381.setTransform(152.528,399.8072);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#A7D167").s().p("AAAA3QgEgogxAOIAAgbIAAg0QBIgRAVAnQACAFALAAIABAZQAEApgwANQgKAAAAgBg");
	this.shape_382.setTransform(152.5369,393.4064);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#95BB55").s().p("AhVBcQgKg0AAg1QA6gRAvgbQgDA8ApAUQAFADAAAOIgVAAQgKAAgCgFQgUgmhKARIAAA1IAAAbQgKAAgBgCgAARg8QAVgNATgOQAIgFAKgBIAVAAIAAAbQABAlgWAAQgUAAgmgfg");
	this.shape_383.setTransform(154.5752,387);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#A0C559").s().p("AgxA2IAAgbQAVgbAQgcQAGgLAAgOQAJAAAJAEQBdAmiFBBIgVAAg");
	this.shape_384.setTransform(167.0801,372.275);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#CCECD1").s().p("AhKgHQBgASAlgnQAFgGALAAIAAAbIAAAaQgLAAgJADQgqANgbAAQgyAAgKgqg");
	this.shape_385.setTransform(150.325,359.7478);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#A9CF82").s().p("AgqAZIAAgaQAhhPAlAvQADAFAMAAIAAAbIAAANQgrgagqBBIAAgag");
	this.shape_386.setTransform(162.075,356.4601);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#ACCF5E").s().p("AFQJvQgrhKhygBQAAgOgGgJQgegygxgiQgWhlBWg8QAAgNgFgCQjXhLijAKIAAAbQAFDtkvADQAAgNgGgKQgegygygiQAAgNgFgLQgthYgjhmQALAAAEgEQAGgIAAgOIAAgbIAAg1QALAAAEgFQAHgIAAgNQAxAOgFgpQgCgNAAgNQBAAAA+gNQADAAAAgOIAAgbIAVAAQBXguAJhyIgLAAQAAgNgGgIQgFgGgLAAIAAgbIAAgaQBnAuA1hDQAFgGAKAAQAkguArgpQAHgGAAgOIAAgbIAAhqQBLgKAkAfQAGAFAKAAQBCANAoAcIAAgOIAAgbQALgNAGgPQAEgMAAgNQAxBcAegVQAHgEAAgOQBkAxBHgTQAKgDAKAAQAPBDBzglQAJgDALAAQAqhCArAaIAAgOQAmAuAOgqQABgEALAAQAAAOACANQANBJhPgUIAAAbQAAAOgGAKQgPAegWAaIAAAbQgKAAgHAGQgUAOgUANIgHgGIAAAJQgwAbg7ARQAAA2ALAzQAAACALAAQALAOAGAOQAEAMAAANQAAAOgGAFQhTA8g8BRQgQBCAfAWQAHAGAAAMQgHBUA6gvIAMgKQgxDDCcg9QguCZhnCoQgLAAgDgFgACJGeQAxBKA8gEQC7gNgrhFQhEhug9AAQhCAAg6B6gAoLCtQAoCMBRgQQBmgVgjhKQgohVg1AAQgrAAg0A4gAg0jsQhEAKgpBQQAZBDgNAVIgLATQCMAGCdAvQgYifAthsQhVABh9AQg");
	this.shape_387.setTransform(103.6109,413.725);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#B1D794").s().p("Ag/gGIAAgbIBAAAIAUAAQALAbARAUQAFAGAKgBIAAAPQg/gOhAgag");
	this.shape_388.setTransform(181.225,354.3);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#D1EFE4").s().p("AhUAXIAAgZQA6g2BuANQABABAAANIgVAAIhAAAIAAAbIgUAAIAAAZQgLAAgBAEQgHAUgMAAQgNAAgUgYg");
	this.shape_389.setTransform(174.85,353.948);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#CFEFDB").s().p("Ag1AbIAAhPQA8ATAoAnQAHAHgBAOIgVgBQg8gFgZAhIAAgbg");
	this.shape_390.setTransform(242,366.95);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#B0D389").s().p("AAqBNQghhxg9AkIAAgaIAAg1QBygGgTCKIAKAAIAAAbQgKAAgBgDg");
	this.shape_391.setTransform(265.45,369.6126);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#BFDA65").s().p("ABPCyIAAgNQh9AdisiwIAAgaQAmhpBUg/QAFgGAAgNQBZgFAyA7QA8BEBjgPQAhB5g5BPQg9BUgaAAQgMAAgFgSg");
	this.shape_392.setTransform(196.7684,394.5283);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#AFD15D").s().p("ACmFAQAAgNgDgNQgjiTiZAnIAAAcIAAAaQAAANgGAJQgoA+g8g6QAAgNgGgDQhRgvg/BaQgSg/hDgTQjBg1AWi4QAAgOgFgDQgpgVADg8IABgJIAGAGQBQBBgBhHIAAgbQCGhChdglQgJgEgKAAIAAgbQBOAUgMhJQgCgNAAgOIAAgaIAVAAQBAAaA/AOIAAgOQBAANBBABIAAgOQBtA9B8gGIAVgBQAJA5AigDIAVgBQgGBEAxgBIAAgNQAYghA9AFIAWABQAWAiBVgfQAKgDALAAQA9glAiByQABADAKAAQAAAOgHAIQgDAFgLAAQALANAGAQQAEALAAANQAAAOACAMQAkD1h7iKQBSC1g2ApQgHAFAAANIgVAAIgVAAIgVAAIgWAAIAAAbIAAAaQgLAAgHAGQhFAxg2AAQhGAAgthRgAhZC6QAOA6BZh8QA5hPghh5QhiAPg8hEQgzg7hZAFIAAgNQhwAUhkAvQAFBrA+AvQAHAFALAAQCsCwB+gdg");
	this.shape_393.setTransform(213.6886,393.7373);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#B7DA96").s().p("Ag/AUIAAgZIAAgbQBagLAZA7QACAEAKAAIAAAOQhAgBg/gNg");
	this.shape_394.setTransform(194.025,354.2082);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#CAECDB").s().p("Ah/gNIAAgbQBxApCOgBIAAANIAAAaIgWABIgYABQhuAAhjg2g");
	this.shape_395.setTransform(213.225,357.6813);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#D1F0E5").s().p("ABcBKQgpgygzA4IgKAAQATiLhyAHIAAgbQB2A2BXBVQAGAGAAAOQgKAAgEgGg");
	this.shape_396.setTransform(270.8,366.95);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#A1CF69").s().p("AgtgNIAAgbIA/AAIAWAAQAAAOADAMQAMA0glABIgUABIgDABQggAAgIg2g");
	this.shape_397.setTransform(230.5828,363.0053);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#B2D59A").s().p("AgUAGQAkAAgMg0QgDgNAAgNQALAAADAFQAHAIAAANIAABQIAAAaIAAANIgCAAQguAAAGhDg");
	this.shape_398.setTransform(234.492,366.2766);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#83BE18").s().p("AjPgQQD1gUCqAtIgLAAQhJAOhKAAQh+AAiDgng");
	this.shape_399.setTransform(1035.625,571.7391);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#81BF19").s().p("AhogGQGiANmiAAg");
	this.shape_400.setTransform(982.6625,573.325);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#5F2C15").s().p("AgtA1IAAgaIAAgaIAVAAQAxANgFgoQgCgNAAgOQAlACgMA0QgDAMAAAOIAAAaIgWAAIgfABIgggBg");
	this.shape_401.setTransform(963.9828,532.5625);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#532710").s().p("AgVBPIAAgbIAAiFQAkABgFA0IALAAIAAAbIAAAZQAAAOABANQAEAfgaAAQgJAAgMgDg");
	this.shape_402.setTransform(963.7479,524.7907);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#6C3B1B").s().p("AgfB4IAAgbIAAjUQBFAOgGBcIAAAaIgLAAQAFg0gkAAIAACEIAAAbIgVAAg");
	this.shape_403.setTransform(962.6485,520.6);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#4B210D").s().p("AgCCGIhAAAIAAgbQBGgPgFhbIgBgaQAfgeAJgzQACgNAAgNIAVAAQAAANADANQAMA1gkABIAABqIAAAbIAAAaIgVAAIAAAbIgVAAg");
	this.shape_404.setTransform(981.0344,524.55);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#5A2B14").s().p("AgiBeQAmhMADhvIABgaQAlAOgOBCQgCAOAAANIABAaQAGBbhGAPIAAgag");
	this.shape_405.setTransform(977.8304,523.225);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#733E1E").s().p("AgKCTIgqAAIAAgbQBChtAcibQAAgCALAAIAAAbIAAAaQgDBvgnBMIAAAaIAAAbIgVAAg");
	this.shape_406.setTransform(973.275,523.225);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#BFB3AA").s().p("AAnA+Qgxg+gqhCQBSAZAUBSQADANAAANQgLAAgDgFg");
	this.shape_407.setTransform(973.275,485.825);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#592B19").s().p("AgIBeQANhDgkgNIAAgaIAAgbIAAhRQAlALADArIACAbQAKANAGAPQAFALAAAOQAAANgCANQgJAzgfAeQAAgNACgOg");
	this.shape_408.setTransform(981.8,509.85);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#633D28").s().p("AgeA2QAAgOgFgMQgGgPgKgNIAVAAIAWAAQAjAAgFg1IALAAQAAAOAGAKQAqBIhZALIgWAAg");
	this.shape_409.setTransform(988.0932,505.85);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#BDBEB5").s().p("AAVBDIgVAAIAAgbQgEgqgmgLIAAgaIAAgaQAUAZArABIAWAAIAABPIAAAbIgWAAg");
	this.shape_410.setTransform(982.875,499.2);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#72AB0D").s().p("AkUgNIIUAAIAVAAQAAANgBAAQiBAOh1AAQikAAiOgbg");
	this.shape_411.setTransform(995.675,544.622);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#82AB25").s().p("AFgANIiAAAIgVAAIoUAAIgWAAIgVAAIAAgZIKUAAIAVAAIArAAIAVAAIAAAZIgVAAg");
	this.shape_412.setTransform(1000.95,541.95);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#6E3427").s().p("ACqANIlpAAIAAgZQC/AAC+AMQACAAAAANIgWAAg");
	this.shape_413.setTransform(1004.2,533.95);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#515A00").s().p("AFVAOIqUAAIgVAAIgVAAIAAgbIBAAAIAVAAIArAAIAVAAIBAAAIAWAAIHTAAIAVAAIAAAbIgVAAg");
	this.shape_414.setTransform(995.625,539.275);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#724716").s().p("AiqANIAAgZIBWAAIAVAAQB0AAB0AMQACAAAAANIgWAAIifAAIigAAg");
	this.shape_415.setTransform(1048.95,536.5875);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#57310D").s().p("ADgANInUAAIAAgZIAVAAIFqAAIAVAAIArAAIAVAAIAVAAIAAAZIgVAAg");
	this.shape_416.setTransform(1007.375,536.575);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#83422E").s().p("AArAVIhVAAIgVAAIAAgZQAsgkBNAsQAGADAAAOIgVAAg");
	this.shape_417.setTransform(1036.15,533.1672);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#633319").s().p("ADLETIgrAAQAAgNgBAAQi+gNjAAAIAAgbIAAhrQAlgBgNg1QgCgMAAgOQBagLgqhIQgGgKAAgNIAAgbIAAiFQDih1g1DGQgDANAAAMQBHBMAjBuQBtArgCCRIAAAaIgVAAg");
	this.shape_418.setTransform(1007.3768,507.712);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#83BE19").s().p("AhgADQgLgEAAgaQFrAAj7A1QgGACgJAAQgiAAg0gZg");
	this.shape_419.setTransform(889.122,583.5071);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#84BE17").s().p("AgfAOQgLgEAAgnQBtA7geAAQgQAAg0gQg");
	this.shape_420.setTransform(925.3422,589.0229);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#85BF19").s().p("AhDAEQgBAAAAgMQC0ARg5AAQgdAAhdgFg");
	this.shape_421.setTransform(919.35,578.939);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#72B00B").s().p("AhUgMICUAAIAVAAQAAAMgBAAQhUAOhUAAIAAgag");
	this.shape_422.setTransform(903.95,576.7);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#985A35").s().p("AhVgHQAgAAAbgMQAFgCAAgNQALAAAIAFQB0BAglAAQgeAAiEgqg");
	this.shape_423.setTransform(840.0567,493.3904);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#686406").s().p("AD/AbIoTAAIAAgbIAAgaIAVAAQAVANAXAJQAKAEAJAAIG/AAIAWAAIAAAbIgWAAg");
	this.shape_424.setTransform(931.7,537.95);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#6FAD0F").s().p("AjUgNIGUAAIAVAAQAAANgBAAQhmAOhbAAQh+AAhpgbg");
	this.shape_425.setTransform(899.675,544.622);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#793C18").s().p("AAMBtQgXgJgUgNIAAgaQAziZAMgVIgEApQgKB9ANA9QgKgBgJgEg");
	this.shape_426.setTransform(909.35,526.55);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#B4927A").s().p("ABAANIiUAAIAAgZIA/AAIAVAAIBAAAIAVAAIAAAZIgVAAg");
	this.shape_427.setTransform(910.375,464.525);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#D9DED6").s().p("ABKAOIgVAAIgVAAIgqAAIgVAAIhAAAIAAgbIB/AAIAVAAIAVAAIAWAAIAAAbIgWAAg");
	this.shape_428.setTransform(919.95,461.825);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#8F5632").s().p("AhUgMICUAAIAVAAQAAAMgDABQgvAMgjAAQg1AAgfgZg");
	this.shape_429.setTransform(910.375,467.1822);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#9C6A48").s().p("AgOAxQgcgkgVgnIAAgbQA/AAA9AOQADAAAAANQAAANgFADQgbAKggAAIAAAaIAAAcQgKAAgEgFg");
	this.shape_430.setTransform(869.875,457.8);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#996139").s().p("AivBpQg/gfhRgHIAAgbIHAicQAKgDALAAQAUAoAcAjQAFAGAKAAQBFAeAjAIQADAAAAAOIgWAAQiOgChxAcIgWAAIhpAAIAAAbIAAAbQgLAAgGAEQgYAVgtABQAAgNgFgCg");
	this.shape_431.setTransform(848.525,467.125);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#9E5F35").s().p("AgwgIIAAgaIArAAIAUAAQAAANAHAIQAoAwgUAAQgSAAhIgrg");
	this.shape_432.setTransform(815.0514,477.3767);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#94D3E2").s().p("AgIADIARgFIAAAFg");
	this.shape_433.setTransform(851.9,388.525);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#A06C45").s().p("AA2AbIiAAAIAAgbQAyAOADgnQAAgBALAAQAXAgA8AHQACABAAANIgVAAg");
	this.shape_434.setTransform(1054.275,444.425);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#DED2CA").s().p("ABAANIiUAAIAAgZICUAAIAVAAIAAAZIgVAAg");
	this.shape_435.setTransform(1036.175,448.425);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#836C63").s().p("AgUBdIAAhQQAkgagOhQQgCgNAAgNQALAAAEAFQAGAIAAAOIAACDIAAAbIgLAAQAFA1gjABIAAgbg");
	this.shape_436.setTransform(989.25,493.875);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#DCE0E0").s().p("AgUBDIAAifIAUAAIAVAAQAAANgGAIQgEAFgLAAIAAAcQAAAMACANQAOBQgkAaIAAgag");
	this.shape_437.setTransform(989.2375,485.825);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#A66C4A").s().p("AkfBdIAVAAQArgoAkgsQAGgJAAgNQBrgzB7goQAFgCgBgOICWAAIAVAAQAVANAXALQAJADALAAQAAAOgGAEQgPAJgWAAQjAAOhUB3IgVAAQiSgChZA4IAAgcg");
	this.shape_438.setTransform(1022.3,461.8);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#D4C9C2").s().p("AgjAdQgGgQgLgMQA3gNAjgiQAFgGAKAAQAAANgGAJQgkArgqAoQAAgNgEgLg");
	this.shape_439.setTransform(998.825,465.775);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#AFA696").s().p("ABAAOIiVAAIAAgbIBqAAIAWAAQAVAAAPAKQAHADgBAOIgVAAg");
	this.shape_440.setTransform(938.1,461.825);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#9B613B").s().p("AGMC0QnLgUk1jOQAAgOgDgBQgigIhGgeIAAgcIAAgaQAhAAAbgLQAEgDAAgNQCbACBVBJQAFAGAMAAIAAAaQA0AtBygfQADgBAAgNIAAgaIAqAAIAWAAQBKAtCIggQAEgBgBgMQBpA4BRBSQAGAHAAANQgLAOgLAAQhMAEAIAZQAUBPgNAAIgBgBg");
	this.shape_441.setTransform(917.8,473.2014);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#8A542C").s().p("AhqgMIAVAAIAWAAICUAAIAWAAQAAAMgEAAQg4ANguAAQhAAAgrgZg");
	this.shape_442.setTransform(935.975,464.5356);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#E6F7F7").s().p("ABAANIhqAAIgVAAIgVAAIAAgZQBUAABTAMQACAAAAANIgVAAg");
	this.shape_443.setTransform(933.825,459.125);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#70AF0C").s().p("AhfgMICpAAIAWAAQAAAMgCAAQheANhfAAIAAgZg");
	this.shape_444.setTransform(751.525,590.025);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#84BF17").s().p("AguAAQC6gbi6Ang");
	this.shape_445.setTransform(787.1125,591.485);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#6B6C09").s().p("APKAOI+pAAIAAgbIepAAIAVAAIAAAbIgVAAg");
	this.shape_446.setTransform(804.85,539.275);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#6EAA1B").s().p("A00gMIBsAAIAVAAMAnTAAAIAUAAIAAAMQ00AN00AAIAAgZg");
	this.shape_447.setTransform(572.45,544.575);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#85AB24").s().p("AT0ANImVAAIgVAAImVAAIgVAAI6pAAIAAgZIepAAIAVAAIIVAAIAVAAIAVAAIAWAAIAAAZIgWAAg");
	this.shape_448.setTransform(834.675,541.95);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#C5ECC1").s().p("A6ogQIB/AAIAWAAMAynAAAIAWAAIAAAOQzgANzdAAIgWAAQiNAGiHAAQlHAAkkghg");
	this.shape_449.setTransform(530.9,539.5609);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#71A347").s().p("ATfAbMgnSAAAIAAgaQTeAATfgNIAAgOIAVAAIAVAAIAAAbIAAAaIgVAAg");
	this.shape_450.setTransform(578.875,540.575);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#E2FAFA").s().p("AY+AaMgynAAAIAAgaQaAATY9gsIAWAAQgBAMgHAIQgDAFgLAAIAAAaIgWAAg");
	this.shape_451.setTransform(539.45,535.275);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#7E4D1A").s().p("APKAaI+pAAIAAgaQALgNAOgIQAIgEAKAAQOeAsPggTIAVAAIAAAaIgVAAg");
	this.shape_452.setTransform(804.85,535.275);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#8C4A2B").s().p("AvUBbIAAgbIAAgbQALAAAEgFQAGgIAAgNIAAgaQAwguA0grQAHgEAAgOIAVAAQAAAOAHAGQAjAig/AaQAfCAEhgIQLtgVL8AiIAAAaIgVAAIgWAAQkqAGkjAAQqoAAqJggg");
	this.shape_453.setTransform(808.025,523.5175);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#E5E5E2").s().p("AgqBKIgqAAIAAgbQBdg4BMhAIAAAOQAAAOgHAFQg0ApgvAuIAAAbIgVAAg");
	this.shape_454.setTransform(714.225,517.2);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#B2ABA4").s().p("AgeBDIgWAAIAAgbQALAAADgGQAIgHAAgNIAAgaQAJgOAHgPQAEgMAAgMIAqAAIAVAAQAAANgGAHQgEAGgLAAIAAAbIAAAaQgKAAgIAEQgOAIgKAOIAAAbIgUAAg");
	this.shape_455.setTransform(706.75,531.25);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#DED9D2").s().p("Ag5APQgGgPgKgNQBMACA0gYQAJgEAKAAIAAAaQgKAAgIAGQgtAfg/AQQAAgNgFgMg");
	this.shape_456.setTransform(743,499.175);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#90613D").s().p("AhfAoIAAgbQBLgZBKgYQAKgDALAAQgBAOAIAIQADAFALAAQAAANgFABQhJAmhmAAIgLAAg");
	this.shape_457.setTransform(760.05,493.8298);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#82BF19").s().p("AhGgGQEbANkbAAg");
	this.shape_458.setTransform(629.6625,613.375);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#83BE17").s().p("A5CKbQEPgykPA/gAWlqBQEphbkFCCQgQAHgJAAQgYAAANgug");
	this.shape_459.setTransform(392.722,698.3886);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#9A603A").s().p("ADMBZQjPhZjxAoQAAgNgGgEQgQgJgUAAIAAgaQCPgWCGgeQAJgCALAAQCVBahOhfQgIgJABgMQBQAGBAAfQAEACAAANQAAAOgFAHQgFAHgLAAQAoAgAgAoQAEAHAJAAQABANgFACQgbAMghAAQgKgBgJgEg");
	this.shape_460.setTransform(809.1,483.2);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#945C35").s().p("AhNAjQgIgIABgOIAAgaQA9gFAugRQAJgEALAAQAVAAAPAJQAGAEABANQgBANgDAAIiRAoQgLAAgDgFg");
	this.shape_461.setTransform(776.05,488.55);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#D9D0C9").s().p("Ag/AAIAAgZIBqAAIAVAAIAAAZQgLAAgJAEQgtARg+AFIAAgag");
	this.shape_462.setTransform(773.925,484.525);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#4FA403").s().p("AkpgNII+AAIAVAAQAAANgBAAQiIAOh9AAQiyAAibgbg");
	this.shape_463.setTransform(1854.825,1167.2306);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#B7B74F").s().p("ABqANIgVAAIgVAAIi/AAIAAgZICpAAIAWAAIAqAAIAWAAIAAAZIgWAAg");
	this.shape_464.setTransform(1880.425,1161.875);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#A6AF39").s().p("ABqANIjpAAIAAgZIDpAAIAWAAIAAAZIgWAAg");
	this.shape_465.setTransform(1905.975,1161.875);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#EAD079").s().p("ACKANIjpAAIgVAAIgrAAIAAgaIEpAAIAWAAIAAAaIgWAAg");
	this.shape_466.setTransform(1902.775,1159.2);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#6BAD08").s().p("ACoA4IB8AAQgaAFgfAAQgfAAgkgFgAjnA4QgdgDgfgHIAAgaIAAg1QALAAAEgFQAGgIAAgOIAWAAIAVAAIDpAAIAVAAQAAAOgEALQgjBLhgAQg");
	this.shape_467.setTransform(1916,1169.275);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#F3AB5E").s().p("AhUgQQBVAABTAOQABAAAAAMQgKAAgKACQgdAFgYAAQhBAAgfghg");
	this.shape_468.setTransform(1876.15,1098.0696);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#F39B44").s().p("AgngpIA+AAIAWAAIAAA1IAAAaIgVACQgMACgKAAQg+AAAVhTg");
	this.shape_469.setTransform(1914.2509,1081.8818);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#F29A44").s().p("AhqCEQDqA0AghqIgKAAQgBgNgDAAQjKgnixg1QCLhFDeACIAAgNQAKAAABgCQAKgxgVgdIAAgcIBUAAIAWAAQABDKgBDHIAAAaIgUABQglADggAAQjKAAgxhUg");
	this.shape_470.setTransform(1895.35,1045.7573);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#EBA14C").s().p("AhvATIgVAAIgWAAIAAgaIBrAAIAVAAQBVAABTgNQADAAAAgOIAKAAQgVBFhyAAQg2AAhNgQg");
	this.shape_471.setTransform(1895.85,1057.1447);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#B7913A").s().p("AhVAAIAAgaQBRAIBEAQQALACALAAQAAANgDAAQhTAOhVAAIAAgbg");
	this.shape_472.setTransform(1901.75,1053.65);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#7E7427").s().p("ABgAbIiVAAQAAgNgEgCQgcgMgfAAIAAgZQBhAVBzAEIAVAAIAAAbIgVAAg");
	this.shape_473.setTransform(1881.5,1050.95);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#BAA95D").s().p("Ag4AVQgSgUgLgbICVAAIAVAAIAAAaIgVAAIhqAAIAAAbQgKAAgEgGg");
	this.shape_474.setTransform(1884.65,1056.3);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#D9A04F").s().p("ADAAzQhFgRhRgHIgVAAQhzgFhhgWQgLAAgCgCQgIgXAAgbIAVAAIAVAAQCxA1DLAnQADAAAAANQgLAAgKgCg");
	this.shape_475.setTransform(1888.975,1048.275);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#3E823B").s().p("AgrAyQgJgXAAgbQArgZArgXQAJgFAKAAQAAAOgHAGQgjAhgpAaIAAAcQgLAAgCgEg");
	this.shape_476.setTransform(1870.8,1029.6);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#949143").s().p("ABLAbIiqAAIAAgbQBAAAA8gMQADgBAAgNQAtACANAbQAGAKAAAOIgVAAg");
	this.shape_477.setTransform(1898.55,1032.3);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#E0A654").s().p("Ai0ANQBBgjBUgQIAVgBICqAAIAVAAIAAANQjegCiLBEIAAgbg");
	this.shape_478.setTransform(1890.025,1038.975);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#527D33").s().p("AiUBFIgVAAIAAgbQAUgNAQgTQAGgIAAgMIAAgbQBugpCmAOIAWAAQgBAOgDAAQg8ANhBAAIAAAbIgVABQhTAPhBAkIAAAbIgVAAg");
	this.shape_479.setTransform(1884.7,1036.0813);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#CAA65C").s().p("AC9AeQgNgcgtgCIgVAAQimgNhuAnIAAAcIgVAAIgWAAIAAgcQArgaAjghQAHgGAAgOIAVAAQgGAqAygMQAKgDAKAAIDVAAIAVAAQAVAdgKAwQAAADgLAAQAAgOgGgKg");
	this.shape_480.setTransform(1888.6004,1029.6);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#FEB970").s().p("ABgAWIjUAAIAAgbQBNgfCHAdQAKACAMAAIAAAbIgWAAg");
	this.shape_481.setTransform(1896.4,1024.7617);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#638041").s().p("Ag0AaIAAgaIAAgaQA0AAAyAMQADABAAANQgKAAgGAFQgXAWgtAAIgVgBg");
	this.shape_482.setTransform(1885.725,1018.9545);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#B2BC7F").s().p("AAnAQQgxgMg1AAIAAgaQChgbgqBLQgDAEgLAAQAAgNgDgBg");
	this.shape_483.setTransform(1886.8405,1015.8824);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#D4C662").s().p("ACrANIlqAAIAAgZIFqAAIAVAAIAAAZIgVAAg");
	this.shape_484.setTransform(1784.45,1161.875);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#5BA206").s().p("AGgA1ItUAAIAAgaQA5gNAXgrQAFgKAAgOIAWAAQAgAuBggQQAKgDALAAQEIAuFKggQACgBAAgNIAVAAIAAA1IAAAaIgVAAg");
	this.shape_485.setTransform(1843.075,1168.55);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#5A9407").s().p("AmJgQIF/AAIAVAAICVAAIAWAAIC/AAIAVAAQAAAOgGAHQgEAFgLAAIgVAAIgWAAIo+AAQgLAAgKACQgaAFgUAAQg7AAgXghg");
	this.shape_486.setTransform(1849.5,1164.8598);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#D2C766").s().p("ADVANIl+AAIgWAAIgVAAIgVAAIAAgZIG+AAIAWAAIAAAZIgWAAg");
	this.shape_487.setTransform(1827.1,1161.875);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#C8BD5D").s().p("ABAANIiUAAIAAgZICUAAIAWAAIAAAZIgWAAg");
	this.shape_488.setTransform(1859.1,1161.8625);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#B8BA4A").s().p("AhqANIAAgZIBWAAIAUAAIBVAAIAWAAIAAAZIgWAAIhfAAIhgAAg");
	this.shape_489.setTransform(1618.175,1156.5375);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#63AE03").s().p("AiKAAQBWAABSgMQACAAAAgOIArAAIAVAAQALAOANAIQAIAEAKAAQAAANgBAAQhHAOg7AAQhTAAg+gbg");
	this.shape_490.setTransform(1625.6,1160.5599);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#82AB1E").s().p("ABLANIiAAAQgKABgIgGQgNgHgLgOICqAAIAVAAIAAAaIgVAAg");
	this.shape_491.setTransform(1644.8,1159.2);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#8CA325").s().p("Ah/gPICUAAIAVAAIBAAAIAWAAIAAAZQgLAAgLACQgpAFglAAQheAAg9ggg");
	this.shape_492.setTransform(1684.275,1162.1806);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#A3BB3F").s().p("ABAANIiVAAIAAgaICVAAIAVAAIAAAaIgVAAg");
	this.shape_493.setTransform(1662.95,1159.2);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#EED17D").s().p("ADKANIgVAAIiWAAIgUAAIiqAAIgVAAIgrAAIAAgZQDfAADeAMQACAAAAANIgWAAg");
	this.shape_494.setTransform(1651.25,1156.525);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#C7C35C").s().p("ABAANIiUAAIAAgaIAVAAIB/AAIAVAAIAAAaIgVAAg");
	this.shape_495.setTransform(1680,1159.2);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#C7C055").s().p("ACVANIk+AAIAAgZIE+AAIAWAAIAAAZIgWAAg");
	this.shape_496.setTransform(1748.2,1161.875);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#ADB743").s().p("AA/ANIiTAAIAAgZICTAAIAWAAIAAAZIgWAAg");
	this.shape_497.setTransform(1722.65,1161.8625);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#A3AE38").s().p("ABAANIiVAAIAAgZIBAAAIAVAAIBAAAIAVAAIAAAZIgVAAg");
	this.shape_498.setTransform(1705.6,1161.875);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#E9D079").s().p("EB/6ABQIiUAAIgWAAIhAAAIAAgbQCAAAB+ANQACABAAANIgWAAgEh96gA1IhqAAIgWAAIgVAAIAAgaICVAAIAVAAIAAAaIgVAAg");
	this.shape_499.setTransform(910.375,1152.525);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#DCCB71").s().p("ABAANIhAAAIgVAAIhAAAIAAgaICVAAIAVAAIAAAaIgVAAg");
	this.shape_500.setTransform(1697.05,1159.2);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#EFAB61").s().p("AhUgMICUAAIAVAAQAAAMgCAAQhTANhUAAIAAgZg");
	this.shape_501.setTransform(1714.1,1095.0625);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#F59744").s().p("AgVANQgWAAgVgaQDfAbiiAAIgSgBg");
	this.shape_502.setTransform(1714.2091,1060.3538);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#F29B41").s().p("AgsgCQCzgTizAfg");
	this.shape_503.setTransform(1622.6625,1088.6844);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#F2B46A").s().p("Ah1gPQB1AAB0ANQABAAAAAMQgKAAgLACQgmAEgiAAQhXAAg2gfg");
	this.shape_504.setTransform(1614.95,1095.3931);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#F5AB62").s().p("AhUgQIB+AAIAWAAQALAAADAFQAHAJAAAMIgUACQgeAFgYAAQhAAAgfghg");
	this.shape_505.setTransform(1594.7,1092.7062);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#F3B269").s().p("AhVgMICVAAIAVAAQAAAMgCABQhTAMhVAAIAAgZg");
	this.shape_506.setTransform(1607.5,1060.325);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FAB469").s().p("Ah/gQIDqAAIAVAAIAAAaQgLAAgKABQgrAGglAAQhdAAg9ghg");
	this.shape_507.setTransform(1650.125,1098.0633);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#F8B569").s().p("AjKgMIGAAAIAUAAIAAAMQjKANjKAAIAAgZg");
	this.shape_508.setTransform(1683.2,1097.725);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#F39944").s().p("AhXgGQFeAMleABg");
	this.shape_509.setTransform(1641.925,1089.05);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#C9C384").s().p("AhRAYQgOgJgLgNQAwgnBlAMIAUACIAWAAIAWAAIAAAZIgWAAIiUAAIAAAbQgLAAgHgFg");
	this.shape_510.setTransform(1639.5,1037.4276);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#3A8640").s().p("AAGA9QgegqgngfQAxANgFgoIgCgbIAqAAIAVAAIAWAAIAAAbQAAANgFADQgbALggAAQALAaAHAbQADANAAAMQgKABgFgGg");
	this.shape_511.setTransform(1656.55,1017.55);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#CFC786").s().p("AAgAdIgqAAQAAgNgGgEQgPgJgVAAIAAgbQBTgRASAtQAEAMAAANIgVAAg");
	this.shape_512.setTransform(1655.475,1007.9607);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#89965A").s().p("AAQAjQghgjg5gMIAAgbIB/AAIAWAAIAAAbIgWAAIgqAAQALAMAGAQQAEALAAANQgKAAgGgFg");
	this.shape_513.setTransform(1642.675,1009.525);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#237D3A").s().p("AAKAmQgKAAgIgFQgNgJgLgNQAAgMgEgLQgGgQgLgNIAqAAIAVAAQAVAAAPAKQAGADAAAOIACAZQADAfgaAAQgJAAgMgEg");
	this.shape_514.setTransform(1649.1731,1012.4282);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#DAC686").s().p("AhHAjQglAAAQg0QBYgqBgA1QAGADAAAMIgVAAIh/AAIAAAbIgVgBg");
	this.shape_515.setTransform(1640.3462,1004.6043);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#E5CC8D").s().p("AA5AmQg5gshKgeQB9gZAUBOQAEANAAANQgLAAgHgFg");
	this.shape_516.setTransform(1653.325,977.21);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#5A8234").s().p("AhpgPIAAgaQBNA6BygdQALgDAKAAQAAAOgFABQhlAqgzAAQg9AAAGg5g");
	this.shape_517.setTransform(1711.9464,1052.5213);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#E1A958").s().p("ABVANIipAAQgLAAgEgFQgHgIAAgMQBqAABpAMQABAAABANIgWAAg");
	this.shape_518.setTransform(1673.6,1052.275);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#738A38").s().p("AA1ANQAAgNgBAAQhogNhrAAIgVAAIAAgaIAVAAIAWAAIDUAAIAVAAQADAqA+gNQAJgDALAAQAAANgCAAQhMANgyAbIAAgbg");
	this.shape_519.setTransform(1678.925,1052.325);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#39823C").s().p("ABgANIjUAAIAAgZIAWAAICpAAIAVAAQALAAAEAFQAGAHAAANIgVAAg");
	this.shape_520.setTransform(1676.8,1046.975);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#A9B273").s().p("ABrAoQAAgNgCAAQiagMhkg2QCVACCAAXQAKABAMAAIAAAaIgWAAIAAAbIgVAAg");
	this.shape_521.setTransform(1652.275,1044.3);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#1A8242").s().p("ABKAbIipAAIAAgbIAAgaIAVAAQA1AtB1gFIAAANIgWAAg");
	this.shape_522.setTransform(1676.825,1042.975);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#EBD292").s().p("ABVAaIiUABIgWAAIgVAAIAAgbQBqATAvgoQAGgFALAAIAVAAQAKANAHAPQAFALAAAOIgWgBg");
	this.shape_523.setTransform(1656.55,1032.3);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#517D3D").s().p("ACHBBQiAgWiVgDIgVAAIgVAAIAAgaICVAAIAVAAQBVAABTgOQACAAAAgMQAAgOgFgLQgGgPgKgOQBBgFgUBVQgDANAAANIgVAAIAAAbQgLAAgKgCg");
	this.shape_524.setTransform(1651.6339,1036.2613);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#85A968").s().p("AhUgMICUgBIAVABQAAAMgCAAQhTAOhUAAIAAgag");
	this.shape_525.setTransform(1658.7,1036.275);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#0F8134").s().p("AgqgUQALgNAOgIQAIgFAJAAQAVANAPATQAHAIAAANQgLAAgDAEQgVAkgPAAQgWAAgNhDg");
	this.shape_526.setTransform(1686.375,1007.5756);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#DEC98A").s().p("AAdA+QgcgshAgEIAAgaQA+APABgpIAAgcQAgAbAaAgQAGAHAAAOQAAANgFALQgGAQgKANQgLAAgDgFg");
	this.shape_527.setTransform(1669.325,1012.2);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#A1BA7B").s().p("AgwgPQAKgNAGgQQAFgMAAgNQALAAADAFQBNCGgTAAQgPAAhOhVg");
	this.shape_528.setTransform(1678.5405,1020.5361);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#01853F").s().p("AgmAgIAAgaIAAg1IAqAAIAUAAQAAANAFAMQAaBGgpAAQgSAAgigQg");
	this.shape_529.setTransform(1673.2514,999.6021);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#1B803A").s().p("AgOA9QgcgigVgnQA9ACAMg2QABgCALAAQAKAOAOAIQAHAFALAAIAAAbIgVAAIgrAAIAAA0IAAAbQgKAAgEgGg");
	this.shape_530.setTransform(1669.325,996.2);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#428745").s().p("AgBA2QAEhCgkgOIAAgaQBfgKgpBwQgCAEgKAAg");
	this.shape_531.setTransform(1700.4013,1002.8593);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#D6CC8B").s().p("AgtgNQA7AMgOhCQgCgNAAgNQAkAOgGBCIAMAAIABAaQAMBRgSAAQgVAAg7hrg");
	this.shape_532.setTransform(1697.3633,1009.6171);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#00692C").s().p("AgcghQgGgKAAgNIAAgbQBKCngFAAQgEAAg7h1g");
	this.shape_533.setTransform(1719.7267,984.5996);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#50833C").s().p("AhUAeIAAgbQBoAJghgoQgHgIAAgOQAfAAAbAMQAEACAAANQALAaARAVQAFAGAKAAQAAANgCABQgnAHghAAQg3AAgogVg");
	this.shape_534.setTransform(1871.875,1056.0454);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#F29B42").s().p("AhBAQQgEAAgBgnQDIAvhUAAQghAAhOgIg");
	this.shape_535.setTransform(1849.0692,1085.4607);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#F49944").s().p("ABMBoQg7gIARgKQBPgxhIAJQh7AOhfgiQBLgMAWhdIgLAAIAAgbIAqAAIAWAAQAAANABAAQEhAfh5CpQgsgBgWgCg");
	this.shape_536.setTransform(1861.9187,1069.675);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FCB56B").s().p("AEVAOIo/AAIAAgaQEqgBEqANIABAOIgWAAg");
	this.shape_537.setTransform(1786.575,1092.4);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#F4A85C").s().p("ABAAOIiUAAIAAgaICUAAIAVAAIAAAaIgVAAg");
	this.shape_538.setTransform(1748.2,1092.4);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#F19941").s().p("Ag8gTQC+AShsATQgNACgJAAQgsAAgQgng");
	this.shape_539.setTransform(1743.6403,1071.6421);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#F29945").s().p("AhGgGQEcANkcAAg");
	this.shape_540.setTransform(1780.925,1083.725);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#F59844").s().p("AO1B4Qi4iGjCBsQgVANAQhDQDbAHBphsQAGgEALAAQgxBJBxBwgAvKhBQCcAMBfgxQAGgEAAgNICqAAIAWAAIAAAbQACAqA3gcIAagNQg6BNiFgRQg+gIgoAfQg/AygzAAQhLAAgyhrg");
	this.shape_541.setTransform(1736.5,1065.65);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#B39949").s().p("AhUgPICUAAIAVAAIAAAaIgVAAIhUAAQgLAAgJACQgLADgIAAQgeAAAFgfg");
	this.shape_542.setTransform(1790.8126,1063.251);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#D5A354").s().p("Ah0gfQBwAaB4ANQABAAAAAOQgLAAgJACQguAIgkAAQhjAAggg/g");
	this.shape_543.setTransform(1764.225,1056.8365);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#3A8039").s().p("ADABDIiVAAQgLAAgJgEQgXgKgUgNQAAgNgCAAQh5gPhwgZQAAgNgGgEQgPgJgVAAIAAgbQBdA7B4gdQALgDAKAAQBEAYAmA3IDqAAIAVAAQAAANgDACQgnAMgrAAIgVAAg");
	this.shape_544.setTransform(1778.075,1054.975);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#C8A453").s().p("AgVAbIgUAAIgWAAIAAgbQA+gEAtgSQAJgEALAAQAAAOgGAKQgPAdgvAAIgRAAg");
	this.shape_545.setTransform(1739.7,1056.3434);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#F19944").s().p("ABQBgQgUiShaA2QhrBBh2iIQA+AGARgjQAHgLgBgOIAAgaIAWAAQAWAAAOAJQAGAEAAANQAtBZCpghQAJgCALAAQAVANAXAKQAJAEALAAQgGAoAxgLQAKgCALAAQAAANgEAMQgdBmhJAgQgLACgJAAQgrAAgHg0g");
	this.shape_546.setTransform(1763.15,1065.7549);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#618337").s().p("AArA1QgRhJhPgEIAAgaQBsgagMBpIALAAIAAAbQgLAAAAgDg");
	this.shape_547.setTransform(1727.95,1053.4028);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#378035").s().p("ABAAaQhfgFg1gvQBpgGA6ApQAGAFAAANIgVgBg");
	this.shape_548.setTransform(1833.5,1056.2569);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#9B944A").s().p("AhUANQAxAPgFgoIgCgbIBqAAIAVAAIAAAbIgVAAIgVAAIgWAAIgpAAIAAAZQAAANgGADQgWALgNAAQgWAAgBgbg");
	this.shape_549.setTransform(1854.825,1060.3326);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#1D843E").s().p("AAYBCIgVAAIhqAAIAAgbQCPAQAQh4QAAgCALAAQAAAbAJAXQABAEAMAAIAAAZQAAAOAGAIQAcAihDAAIgggCg");
	this.shape_550.setTransform(1860.9158,1049.723);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#017234").s().p("Ag0gOQALgNAOgJQAHgEAKAAIAqAAIAWAAQAAANgHAHQg0A9gYAAQgYAAABg3g");
	this.shape_551.setTransform(1840.9489,1039.1144);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#036829").s().p("AAAAoIgqAAIAAgbIAAgaQAMgNANgJQAIgEAJAAQALANAOAIQAIAFAKAAQAAANgHAIQgDAFgLAAIAAAbIgWAAg");
	this.shape_552.setTransform(1844.125,1030.975);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#49802E").s().p("AhqANQArAAAngMQAEgBAAgMQA9gGAugSQAJgDALAAQAAANgHAFQhOA4iAAFIAAgbg");
	this.shape_553.setTransform(1810.025,1060.35);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#026325").s().p("AgaAcIAAgbQAVgMAOgSQAGgIAAgOQALAAAAABQAHBmgbAAQgLAAgVgYg");
	this.shape_554.setTransform(1821.337,1002.7009);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#1D5D1F").s().p("AgRhWQAeAdAJAzQACANAAANIAAAaIAAAbIAAAOQhBgkAYiJg");
	this.shape_555.setTransform(1803.3165,979.5);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#B6B580").s().p("AgVBQIAAgbIAAiEQAlAOgFBBIALAAQgBANgEAMQgHAPgKANIAAAbIgVAAg");
	this.shape_556.setTransform(1822.85,989.525);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#44713A").s().p("AgGA6QAOhCg8AMIAAgaQCyieh7EEQgDADgJAAQAAgNADgMg");
	this.shape_557.setTransform(1855.834,997.196);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#1A5C1E").s().p("AgKBLQgNgIgLgNIAAgcQAvgMgEhDIgCgaQALAAAEAFQAHAIAAAOQAAANADANQAMA0glAAIAAAcIAAAaQgJAAgIgFg");
	this.shape_558.setTransform(1847.6578,1021.575);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#237736").s().p("AgIBIQgEgFgLAAQAAgNAHgHQAzgyhPgJIAAgbIAAgaQALgNANgJQAIgFAKAAQA8gMgPBCQgDANAAANQAAANgCAMQgIA0ggAdQAAgOgGgIg");
	this.shape_559.setTransform(1850.849,1006.8011);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#BCB681").s().p("AAFBmQgngWAQhQIAAgZQABgogBgpIAUAAQgOBqAeA5QAGAKAAANIAAAbQgLAAgIgFg");
	this.shape_560.setTransform(1843.9336,992.175);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#62703D").s().p("AgwAYIAAgaIAAgbQC6g/ipCJQgGAFgLAAIAAgag");
	this.shape_561.setTransform(1855.4476,960.4401);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#1F5F20").s().p("AAGAmQgagLggAAIAAgbQAqgaAtgXQAIgDALAAIAAAaIAAAaQAAANgHAIQgPATgVANQAAgNgFgCg");
	this.shape_562.setTransform(1845.2,965.475);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#06652C").s().p("AjfD2QBThjBKhuQADgGALAAQA/BJgLiWQAAgBgJAAIAAgbQAJgOAHgOQAEgMAAgNIAAgcQA9gYANhQQAAgCAMAAQBOgTgECzIAKAAQgQBQApAVQAIAFAKAAIAAAaQiaAqhgBiQhaBdg8AAQgbAAgUgSg");
	this.shape_563.setTransform(1823.9,1002.3652);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#155B23").s().p("AALB4QAEiyhOATIAAgbQAmgKAOgoQABgDAKAAQAgAAAbALQAFACAAANQAAAOgFAMQgGAOgLAOIAAAbIAAAZIgVAAQABApgBAoIAAAag");
	this.shape_564.setTransform(1839.925,980.175);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#215F29").s().p("AgohCIgBgbQBBAFgOhVIAMAAQAaBMAOBVQACAMAAANIgVgNQgrCqg/AEQAmhdgPiTg");
	this.shape_565.setTransform(1814.3,974.8);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#D0C484").s().p("AAFA2QgIg0gfgcIAAgaIAAgbQAlAtAOgqQACgDAKAAQAAANACANQAOBegmAnQAAgNgCgNg");
	this.shape_566.setTransform(1805.0135,973.475);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#7F9D61").s().p("AgGBtQgGgPgLgOIAAgbIAAgaQAlgngOheQgCgOAAgNIAVAAIABAbQAPCSglBeQAAgOgEgLg");
	this.shape_567.setTransform(1808.1772,978.825);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#9DA268").s().p("AALB4QAEhQgjgbIAAgZIAAhrQAaA9ANBIQACAMAAAOIAAA2IAAAag");
	this.shape_568.setTransform(1805.775,942.75);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#E3C485").s().p("AgHBfQgLAAgBgEQgKgXAAgaQAAgOgEgCQgggMAPg0QAxgMAEhDIAKgBQAlAbgEBQIAKAAIAABPIAAAbQgKAAgCADQgHAVgMAAQgNAAgTgYg");
	this.shape_569.setTransform(1802.3331,955.958);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#115D26").s().p("AgUBrIgWAAIAAgbIAAhQIAAgaIAAg1QAxA4AEhSIAKgBQALA1AJA2QACAMAAANIgLAAQAMBRg6AAIgGAAg");
	this.shape_570.setTransform(1812.175,954.7863);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#225E26").s().p("AgKB6QAAgNgCgNQgNhJgbg8IAAgbIAAgaIAAgbIAAgbQAqAhAKBIQAAACALAAQAOA8AXAwQAFALAAAOIgKAAQgCAxgTAAQgNAAgTgXg");
	this.shape_571.setTransform(1808.975,934.5233);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#589F07").s().p("AhKgbIBAAAIAVAAIAqAAIAWAAQAAAOgGALQgQAegcAAQglAAg+g3g");
	this.shape_572.setTransform(1815.375,920.101);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#9AAD3E").s().p("AhJAXIAAgZQBAAAA9gNQACgBAAgNQALAAACAEQAdA3hdAAQgeAAgugHg");
	this.shape_573.setTransform(1845.1157,925.7251);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#B2BE58").s().p("AB1ANIj+AAIAAgZID+AAIAVAAIAAAZIgVAAg");
	this.shape_574.setTransform(1823.9,926.725);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#709A22").s().p("Ai1BOQgKhIgqggIAAgbIAAgaQA/AAA9AMQAEABAAANIgWAAIhAAAQBrBfAkhGQAHgLAAgOQB+AbCBAZQAKABALAAQgBANgCABQg9ANhBAAIgVAAIj+AAIAAAaIAAAbQgLAAgBgCg");
	this.shape_575.setTransform(1827.1,922.725);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#F3CD88").s().p("AglBQIAAgaQBGgegSiCIALAAQAAANADANQAlCmhnAVIAAgbg");
	this.shape_576.setTransform(1784.0452,973.475);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#05632D").s().p("AiqDfQAkhlAshZQAFgKAAgNIAMAAQguhWAOiaIAAgbQAUgNAYgKQAJgDAKAAQAAAaAJAXQACAEALAAIAAAbIAAAaQgYCLBBAjIAAgOQALAOAGAOQAEAMABANQA/gEAsipIAUAOIAAAbIAAAaIAACFIAAAbQheBBhbBKQhCA3gnAAQgoAAgKg9g");
	this.shape_577.setTransform(1803.65,988.5644);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#22642C").s().p("AAaB4QAAgNgEgCQgbgLgfgBIAAgbIAAifQAKABAFgGQAGgJAAgNIAVAAQgNCaAsBWg");
	this.shape_578.setTransform(1792.475,977.5);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#CFBD79").s().p("AAEBNQgNhIgSg7QBQhQgkC6QgCANAAAOQgLAAAAgCg");
	this.shape_579.setTransform(1774.4538,960.2537);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#1E622D").s().p("AgeAbIAAhPIAUAAIAUAAQgOA0AfALQAEACABAOQgLAAgIADQgXAKgUAOIAAgbg");
	this.shape_580.setTransform(1796.2,957.45);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#E7C689").s().p("AggB4QAAgNgFgLQgPggAAgyIAAgbIAUAAQBBBrgMi5QAAgBgLAAIAAgbIAWAAIAVAAIAAAbIAABqIAAAaIgKABQgFBDgwAMIgWAAg");
	this.shape_581.setTransform(1798.35,940.075);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#18551B").s().p("AgUB4IAAgaIAAjVIAVAAQAAAyAPAgQAFAMAAANIgUAAIAABPIAAAbIAAAaIgVAAg");
	this.shape_582.setTransform(1793,953.45);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#077E3E").s().p("AhUhVIAVAAIAVAAQATBtBbhNQAGgFALAAQAAANgEALQg4B4gmAAQgvAAgYirg");
	this.shape_583.setTransform(1750.35,976.7435);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#0C612A").s().p("AAOA1QhEgFAbhlIAVAAQAKAcARAVQAEAEALAAIAAAbIAAAbIgWgBg");
	this.shape_584.setTransform(1738.2823,962.775);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#2E8643").s().p("AgKAmQgLgwgVgdIAqAAIAVAAQAAANAHAIQAEAFALAAQAAANgHAJQgPASgVANQgJAAgBgCg");
	this.shape_585.setTransform(1763.125,958.775);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#3B8545").s().p("AgNAvQgfgWAPhCQAmgtAOAqQABADALAAQAAAOgDAMQgIAzgfAdQAAgOgGgEg");
	this.shape_586.setTransform(1766.0777,942.9112);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#E7C582").s().p("AghBfQgghSAQiEQA0AAAyANQADABAAAMQAAAOgDAMQgdBng0BUQAAgNgFgMg");
	this.shape_587.setTransform(1751.1361,942.75);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#E6D291").s().p("AgKCsQgLisABisIAUAAQgPCFAgBRQAFALAAANQAAAOgFALQgGAQgLANIAAAbIAAAaQgKAAAAgBg");
	this.shape_588.setTransform(1746.0989,948.1);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#23702B").s().p("AAGCOQgPgVgMgcIAAgbQAlhPgFiFIALAAIAAEKIAAAbQgLAAgFgFg");
	this.shape_589.setTransform(1739.7,948.1);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#B6C161").s().p("AAyANQgygNg0AAIgWAAIAAgaIAWAAIBpAAIAWAAIAAAaQAAAOgHAIQgEAFgLAAQAAgNgDgBg");
	this.shape_590.setTransform(1751.4,930.725);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#7BA55F").s().p("AAAC7IgUAAIAAgbIAAgaIAAgbIAAkLIAAgaIAUAAQAACtAKCsQAAABALAAIAAAbIgVAAg");
	this.shape_591.setTransform(1743.975,949.45);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#A7B94E").s().p("AhfgQIAWAAIAVAAQBJAABJAOQACAAAAAMIgVABQghAGgcAAQhHAAgmghg");
	this.shape_592.setTransform(1755.675,908.3031);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#5C9F03").s().p("AAKBQIhpAAIAAgbIAAgaQBWgPgThBQgDgNAAgNIBpAAIAWAAQAAANgFAMQgTAxgoAgIAAAaIAAAbIgWAAg");
	this.shape_593.setTransform(1755.675,920.05);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#5FA20A").s().p("AgiAaIAAhOIAqAAIAVAAQAAANADANQASBBhUAPIAAgcg");
	this.shape_594.setTransform(1749.6145,917.4);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#F7C583").s().p("AgbAUIAAgZIAAgbQAWAAAOgJQAGgEAAgNQALAAAAABQAHB0gXAAQgNAAgYgng");
	this.shape_595.setTransform(1797.8679,936.6937);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#CCC188").s().p("AgqDwIAAgbQBogUgmioQgDgMAAgNIAAgaIAAjwIAWAAIAAEkIAAAbIAACgIAAAbQgLAAgGAGQgYAVgsAAIAAgbg");
	this.shape_596.setTransform(1784.475,962.8);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#6F7441").s().p("AgVCTIAAklIAAgbQAkABgFA0IAMAAIAAAcIgWAAIAADUIAAAbQAAANgFAIQgFAGgLAAIAAgbg");
	this.shape_597.setTransform(1790.9,950.775);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#F0C98C").s().p("AgJA1IgLAAQAFg0glgBIAAgZIAAgbIBUAAIAVAAIAAAbQAAANgGAEQgPAIgWAAIAAAbIAAAaIgTAAg");
	this.shape_598.setTransform(1794.05,933.375);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#569215").s().p("ABAA1IiUAAIAAgaQCoAAhOg9QgGgFAAgOIBAAAIAVAAIAAAbIAAAaIAAAbIAAAaIgVAAg");
	this.shape_599.setTransform(1795.125,920.05);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#96AE4B").s().p("AgUA1IgCgaQgFhTh5AeIAAgaIAVAAIBWAAIAVAAICUAAIAVAAIAAAaIgVAAIgWAAIgVAAIhVAAIAAAaIAAAbIAAAaIgUAAg");
	this.shape_600.setTransform(1788.725,930.725);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#0C7E38").s().p("Ah9DRIAAgbIAAgbIAAgaQAKgOAGgPQAFgMAAgNQA1hTAdhoQADgMAAgOQALAAAEgFQAFgIAAgNQAZgwAhgmQAGgIAAgOQBZAngpBiQgFALAAANIAAAaQgKAAgCgDQgOgqgmAtQgPBDAeAVQAGAFAAAOIAAAaIAAAbIgVAAIgrAAQAVAdALAxQABACAKAAQAAANgHAJQgOASgWAOIAAAaQgJAAgHAGQgmAggZAAQgkAAgLhAg");
	this.shape_601.setTransform(1758.7215,947.2931);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#EEC685").s().p("AAeELQgZg3gFhKQAAgOACgNQAki6hQBPIAAgMQgVAAgVAMIAAAaQgLAAgEgFQgHgIAAgNIAAgaIAAgaQAggeAJgzQACgNAAgOIAAgaQAVgbAQgdQAGgLAAgNQB4gfAFBUIACAbIAADwIAAAaIgLAAQASCDhHAeIAAAaQgLAAgCgEg");
	this.shape_602.setTransform(1775.925,954.3688);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#609627").s().p("AiKCgIAAgaIAAklIAWAAIAABQIAAAaQA0AuB2gSIAVgBIArAAIAVAAQgBAOgGAIQgEAEgKAAIgWAAIgVAAIgWAAIhpAAIgVAAIgrAAIAABQIAAAbIAAAbIAAAaIgWAAg");
	this.shape_603.setTransform(1757.8,912.025);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#1B8436").s().p("AgFBTQAohhhXgnIAAgaQALgNANgJQAIgFALAAQASAaAoANQAFABAAANIAAAcIAAAZIgWAAIAAAbQAAANgGALQgQAdgTAbQAAgNAEgLg");
	this.shape_604.setTransform(1770.6,925.375);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#4CA022").s().p("Ag0BDIAAgbIAAgaQAoggASgxQAEgMABgNIAVAAIAWAAIAAAaQgLAAgIAEQgNAKgLANIAAAaQgBANgGAHQggAmgYAxIAAgbg");
	this.shape_605.setTransform(1764.2,921.4);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#84A132").s().p("AhUgBQA/AAA9gOQACAAAAgOQAWAOAOASQAHAIAAANIgVAAIhAAAQgKAAgKACQgPAEgMAAQgjAAgCgfg");
	this.shape_606.setTransform(1795.125,912.2735);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#E2C875").s().p("AhDAPQgGgIAAgNQCLgLAIgCIAAANQAAANgCAAQg+ANg+AAQgLAAgEgFg");
	this.shape_607.setTransform(1791.925,910.025);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#599F12").s().p("AgZBrIhVAAIAAgaIAAgcQBEgsAGhyQAAgBALAAIAVAAQAAAOgGAHQgFAGgKAAIAAAaQAAAOAHAIQADAGALAAQADApA9gOQAKgCAKAAQAAAOAHAFQBNA9ioABIAAAaIgVAAg");
	this.shape_608.setTransform(1787.0683,914.7);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#208139").s().p("AgPBfQgogNgUgaIAAgbQALAAAEgFQAGgIAAgOIAAgaQAwgYAYgzQACgFALAAQAxgOgFApIgBAbQgLAAAAABQgGByhEAsQAAgNgEgBg");
	this.shape_609.setTransform(1777.1229,909.1468);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#227938").s().p("AgJBDIABgbQAFgogyANIAAgZQA9ADAMg2QABgDALAAQALAOAFAPQAGAMAAANQgBAMgGAIQgQATgVANIAAAbIgTAAg");
	this.shape_610.setTransform(1785.55,897.3);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#2D7B38").s().p("AgZAdQgGgPgLgOIAAgaQAVgNAXgKQAJgDAKAAQALgBAFAGQAFAIAAANQAAANgFAIQgbAggeAbQAAgOgFgLg");
	this.shape_611.setTransform(1793,890.65);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#597F3B").s().p("AgsAkQgEgGgLAAIAAgaQDciNi3C9QgFAFgLAAQAAgNgGgIg");
	this.shape_612.setTransform(1801.1372,882.2633);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#FCCB8F").s().p("AAKAoQgxgKAGhDQBOgUgMBJQgCANAAANQgLAAgKgCg");
	this.shape_613.setTransform(1732.373,873.0622);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#DECD8C").s().p("AgBCGIgWAAIAAgbIAAhQIAAgbIAAgaQAjgOgMhCQgBgNAAgOQAkBegPCSIgBAbIgUAAg");
	this.shape_614.setTransform(1748.4913,893.3);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#447F37").s().p("AgXBQIAAgaIAAhQQAkAAgFg1IALAAQAAANACANQAMBBgjAOIAAAcIAAAaIgVAAg");
	this.shape_615.setTransform(1746.3611,887.975);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#337F39").s().p("AgWA/QgJgXAAgaQAfgdATgvQACgEALAAIAAAbIAAAbQAAAMgGALQgPAdgUAbQgMAAgBgEg");
	this.shape_616.setTransform(1749.3,862.575);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#6EB110").s().p("AgqgPQCrgeiqBGg");
	this.shape_617.setTransform(1761.025,825.3772);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#50A403").s().p("AApAdIgqAAIAAgOQg+ADgCgqQCPgPgMAqQgEAMAAAOIgVAAg");
	this.shape_618.setTransform(1812.3962,845.0156);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#A1B040").s().p("Ah0AAQBVATAdgnQADgGAKAAIArAAIAVAAIAVAAIAWAAQgBAOgDABQhuAch4AKIAAgbg");
	this.shape_619.setTransform(1811.1,850.55);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#9EAB3C").s().p("AhfADQA5gqBwAPIAWAAQAAAOgDAAIi8AnIAAgag");
	this.shape_620.setTransform(1843.125,845);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#52A505").s().p("AhGgGQEcANkcAAg");
	this.shape_621.setTransform(1849.125,837.875);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#04652C").s().p("AANFcQhSBUgXjzQAAAAAAAAQAAAAgBAAQAAABAAAAQgBABAAACQg1CzhJjvQAAgNgGgJQgfgsAPhdIAAgaIAAlBQAkBMAZBVQADANAAANIAAAaIgVAAQgaBmBFAFIAVABQAsE7B5kIQAEgLAAgOIAAgaQAWgOAOgSQAHgJAAgNQAVgNAPgSQAHgJAAgOIAAgaQAVgNAVAAIAAANQASA8AOBIQAAACALAAQAFBJAZA3QACAEALAAIAAAbIAAAaIAAAcQAAANgHAGQhTBLgmB3Qggj6hLDgg");
	this.shape_622.setTransform(1755.4167,973.475);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#027236").s().p("AAxBLQg6g/g2hAQALAAAEgFQAGgIAAgOQA8BUAOhTQAAgBALAAQgQBdAfAsQAGAJAAANQgLAAgEgFg");
	this.shape_623.setTransform(1726.9,978.8);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#058440").s().p("AMKHEQgKAAgIgEQgOgJgLgNQAAgOgGgEQg6grhqAHIgVAAIgWAAIAAAbQgLAAgIAEQgvARg+AGIgVAAIjqAAQgmg4hFgZQgKAAgLADQh3Adhdg6IAAAaIgWAAIAAAbQgLAAgJAEQguASg+AFIgKAAQAMhqhtAaIAAAaQgKAAgKADQhzAehNg7IAAAaIgWAAIgVAAQgLAAgKADQg+AOgDgrQAAgNgGgJQgEgFgLAAIAAgNQh2AFg0gtQAAgOADgMQAUhWhCAFIgVAAQAAgOgHgIQgPgTgVgNQAAgNgEgNQgGgbgLgaQAgAAAbgLQAFgDAAgNQBBAFAcArQADAFALAAQCwDCiOjyQgDgFgLAAQAAgNgGgIQgZgggggbIAAgbQBqAwgmhnQgFgMAAgNIAAgaQAwAtA0ArQAHAFAAANQgKAAgIAGQgOAIgLANQAWB0AyhUQADgFALAAIAVAAQBvDJgYiuIgBgbQAKAAABgEQAqhxhgAKIAAgbQAAgNgCgNQgJg2gLg1QAhAAAagLQAGgCAAgOIAAgbQAVgNAPgTQAGgIAAgNIAWAAIAVAAQAKAzAkAYQAHAFAKAAQAAAOAGAKQCEEEiKk3QgKAAgEgFQgGgIAAgNQAlguAOArQACADAKAAQA3BBA6A/QAFAFAKAAQBKDuA0izQABgBAAgBQAAgBABAAQAAgBAAAAQAAAAAAABQAYDxBShTQBMjgAfD7QAmh4BThLQAGgGAAgNQAtgBAYgUQAGgGALAAQAfABAcALQAEACAAANQAAANgFALQgtBZgjBlQASB1CJhvQBbhLBfhBIAWAAQAAAOgHAIQgPASgVANIAAAbQgLAAgDAFQhKBuhTBiQBDA7CDiGQBhhhCZgpQBQAJg0AzQgHAHAAANIACAbQAEBCgwANIAAAbQgLAAgIAFQgNAIgLAOIAAAaIAAAcQgKAAgIAEQgOAJgLANQgBBzBlh5QAHgHAAgNIAAgcQALAAAEgFQAGgIAAgNQCRg7CbgtQAKgDAKAAIAAAaQAAAOgGAIQgEAFgLAAIgWAAQgKAAgJAEQgsAXgrAbQAAAaAJAYQACAEALAAIAVAAIAVAAQAAANgGAIQgQASgUAOIAAAaQgLAAAAACQgRB5iPgQIAAAbIABAbQAEAegaAAQgJAAgNgEg");
	this.shape_624.setTransform(1768.475,1016.4144);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#186025").s().p("AApBbQgOgrgkAuQAAgOgHgJQgthAgMhkQAKAOAOAJQAHAEALAAQALAOAOAIQAGAFAKAAQARA2ApAiQAGAFAAANQAAANgGAIQgEAGgLAAQgKAAgCgDg");
	this.shape_625.setTransform(1715.175,964.125);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#2A7D37").s().p("AgBCBQgOgJgKgOQAKAAAAgBQAXiNghhhQBIBEgdCsQgCANAAAOQgKAAgHgFg");
	this.shape_626.setTransform(1714.6251,946.775);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#C1BD7D").s().p("AAPAkQgoghgRg3QA9gFASAjQAGAKAAANQAAANgFALQgGAQgKANQAAgNgHgFg");
	this.shape_627.setTransform(1699.175,949.3877);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#97AE6E").s().p("AA5COQgkgZgKgyQAAgNgFgMQgSgwgoghQAAgOgFgLQgGgQgKgNQAKgNAGgPQAFgMAAgNIAVAAQALANAFAPQAGAMAAANQALBkAtBAQAHAJAAAOQAAAMAGAIQAEAGAKAAIAAAbQgKAAgHgFg");
	this.shape_628.setTransform(1708.775,964.15);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#268C4B").s().p("AgcAWQgOgIgKgOQALAAADgEQAHgIAAgOIAVAAIAUAAIAWAAQAAAOAGAIQAEAEAMAAQgBAOgFACQgaALggAAQgKAAgIgFg");
	this.shape_629.setTransform(1696,978.825);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#307C39").s().p("AAzBZQgvhmhDhQIA/AAIAWAAQAAAOgIAJQgDAEgLAAQALAOANAIQAIAFAKAAQALA0AJA3QACAMAAAOQgLAAgCgFg");
	this.shape_630.setTransform(1690.65,985.5);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#2B7B34").s().p("AgfBQQAAgNgFgLQgTgygoggIAAgaIAAgbQBHAmANBfQABANAAANIgVAAgABLAbIgWAAQgLAAABgDQgLgyAAg1QAoAhATAwQAFAMAAANIgVAAg");
	this.shape_631.setTransform(1700.25,968.15);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#BDB676").s().p("Ah0AAQCCA1AihSQAFgMAAgNQAoAhATAxQAFALAAANIgWAAIgUAAIgWAAIg/AAIgVABIgUACQg9AAgEg3g");
	this.shape_632.setTransform(1685.35,970.9171);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#327A36").s().p("AAtBMQhUgugYhtIAVAAQALAbARAVQAFAGAJAAQAQA3ApAgQAHAFAAANQgLAAgIgEg");
	this.shape_633.setTransform(1694.925,946.725);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#7DAC70").s().p("AgTg7IAVAAIAVAAIAABPIAAAbIAAANQg7gOARhpg");
	this.shape_634.setTransform(1724.5662,936.75);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#3A8F21").s().p("AAUBNQgehNgVhQQA3AgAHBLIABAbIAAAaQgKAAgCgDg");
	this.shape_635.setTransform(1719.4,917.35);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#559F13").s().p("AAABDIgVAAIAAgbIAAgbIAAgZQAkgBgEg1IALAAIAABqIAAAbIgWAAg");
	this.shape_636.setTransform(1724.75,924.05);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#6AAD06").s().p("ABMBQIhVAAQAAgNgCgBQhwgUAdh9QB2B5A0geQAjgTgOBXIgVAAg");
	this.shape_637.setTransform(1698.0359,925.375);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#B7B476").s().p("AADB0QgNgJgKgOQAAgNgFgLQgGgPgKgOQBwgThBh1QgGgKAAgNIAWAAQAiBhgYCMQAAACgKAAQgLAAgIgEg");
	this.shape_638.setTransform(1709.8052,945.4);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#C0BF53").s().p("AhfAbIAAgbQAtAAAXgUQAGgGALAAIBVAAIAVAAQAAAOgBAAQhoAFhBAiIgVAAg");
	this.shape_639.setTransform(1698.125,936.05);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#F0CB88").s().p("AARBQQAAgOgFgKQgRgjg+AGQgKAAgFgGQgRgVgLgaQBBgiBogGQABAAAAgNIAVAAQAAANAGAKQBBB1hxATIgWAAg");
	this.shape_640.setTransform(1701.7234,941.425);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#91B13F").s().p("AhKgDQBAAAA9gMQADgBAAgNQAKANAGAQQAFAKAAANQgLAAgKACQgaAFgVAAQg5AAgYghg");
	this.shape_641.setTransform(1695.975,907.0044);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#ECCE82").s().p("AhfgBQALAAAEgFQAHgIAAgOIAqAAIAWAAIBUAAIAWAAIAAAbQAAAMgDABQg+AMg/AAQgKAAgKADQgMACgIAAQgdAAAFgeg");
	this.shape_642.setTransform(1691.6926,904.2447);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#1A8126").s().p("AgMCFIAAhPIAAgbIAAhqIAAgbIAAg2IATAAIAADWIAAAaQAAAOADAMQAMA1giACIAAgcg");
	this.shape_643.setTransform(1728.25,925.375);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#087F39").s().p("AAfFTQAAgNgGgFQgoghgQg3QgBgOADgNQAdithKhDIgVAAIAAgaQgEhKgRg8IAAgbIAAhrQAKgNAGgPQAFgMAAgNIAVAAQAAANAHAIQAEAGALAAQAAAaAJAXQABAEALAAIAAAaQAVBRAeBMQABAEAKAAIAAAbIAAAbQgRBpA9AOIAAgNQAjgCgMg0QgDgMAAgOQAMAAAEAFQAGAJAAANIAAFAIAAAaQgKAAgBACQgGApgTAAQgSAAgggrg");
	this.shape_644.setTransform(1719.45,936.8689);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#74A725").s().p("AAAA2QgHhMg4gfIAAgaIArAAIAUAAIArAAIAVAAIAAAaIgVAAIAAA1IAAAbIgLAAQAFA0glACIAAgbg");
	this.shape_645.setTransform(1722.6,914.7);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#EEC98A").s().p("AAHAbIgqAAQgKAAgBgEQgJgXAAgZQCfgHhFAqQgHAEAAANIgVAAg");
	this.shape_646.setTransform(1719.7518,903.9515);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#E0D17E").s().p("ABAAqIgrAAQAAgNAHgDQBFgrigAHQgLAAgEgFQgGgJAAgNIAqAAIAWAAQBTgRASAuQAEALAAANIAAAaIgVAAg");
	this.shape_647.setTransform(1720.5,902.4089);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#9EAB4D").s().p("AAjAPQgSgthTARIAAgaIBpAAIAWAAQAAANADANQAMA0glABQAAgNgEgMg");
	this.shape_648.setTransform(1725.0578,900);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#EBCD8D").s().p("AA1AcIgVAAIAAgNQhUAEgVgrQBkgOApAtQAGAIAAANIgVAAg");
	this.shape_649.setTransform(1638.425,970.663);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#3E8743").s().p("ABVBrQhXgqgnhbQgLAAgJgDQhCgagrgzIAVAAIAWAAIAWAAIAUAAQBLAeA5AtQAGAFALAAQAqAlA8AbQAFACAAAOQgLAAgBACQgMAzg3AAIgHAAg");
	this.shape_650.setTransform(1654.4,984.1829);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#C6C25F").s().p("AhqABQArAAAngMQAEgBAAgOIA/ABIAVgBQAWAAAOAKQAHAEAAANQgLAAgKABQhbARhlAIIAAgag");
	this.shape_651.setTransform(1665.05,941.4);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#86A920").s().p("AgUAbIhBAAIAAgaIAAgbICVAAIAVAAQABAOgEABQgnAMgrAAIAAAaIgUAAg");
	this.shape_652.setTransform(1654.4,941.4);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#DECF6C").s().p("AhKAAQAhAAAagKQAFgCAAgOIA/AAIAWAAQAAAOgFACQhAAehQAGIAAgag");
	this.shape_653.setTransform(1612.825,952.1);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#A3B437").s().p("AhfABQBAghBpAGIAWABQAAANgCAAQhsAMhRAcIAAgbg");
	this.shape_654.setTransform(1632.025,946.6728);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#58AA22").s().p("AAuAjQgughg/gOIAAgbQBfgFAbA8QAFALAAANQgLAAgHgFg");
	this.shape_655.setTransform(1669.325,924.0061);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#0F8035").s().p("ACxEUQgGgJAAgOQAAgNgCgNQgMhghIgmQgKABgCgFQg1hshThJQAAgOgGgEQgPgKgVAAQAAgNgHgIQgkgtgrgoIAAgOQgxACAHgpIAVAAIAVAAQBAAOAuAhQAHAGALAAQBLAeAnBIQADAEAKAAQAYBuBVAuQAIADALAAQAKAOAHAQQAEALAAANQAAA2ALAzQAAACALAAQAAAOgHAIQgPASgVANIAAAbQgLAAgEgEg");
	this.shape_656.setTransform(1682.1066,950.8);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#419610").s().p("AA1AbIgVAAIgVgBQhAgEgVgwQBAAOA/ALQALABALAAIAAAbIgWAAg");
	this.shape_657.setTransform(1655.475,920.05);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#69AF08").s().p("AgpAiQALAAAEgFQAHgJAAgOIAAgZQALgNAMgJQAHgFALAAQALAAAAADQAaBagzAAQgSAAgfgNg");
	this.shape_658.setTransform(1654.3408,908.699);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#6EAE12").s().p("ACTDRQgnhHhMgfQAAgNgFgLQgbg9hfAFQgLAAgKgCQhAgLhAgOQAUAyBBADIAWABQgHApAxgBIAAANIgVgBQi7gUhFiKQA5gfBcAEIAWAAQAAAOgHAIQgEAFgLAAQBvAxgkh+QAAgDgLAAIAAgbQALgOAGgOQAFgMAAgNQCSgDBaAzQAIAFAKAAQAAAOgGAIQgEAFgLAAQgGApAxgMQALgDAKAAQAgAuBggRQAKgCALAAQAVAeALAwQAAABALAAQASA9ADBJIAAAbIgVAAQAOhZgjAUQg0Afh3h7QgdB/BwAUQACABAAANQgLAAgGAFQgXAVgtAAIAAAbQgKAAgDgFg");
	this.shape_659.setTransform(1672.525,917.3417);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#F3F5DD").s().p("Ag2A+QAAgNgGgEQgggUgFgqQALgOAGgPQAEgLAAgOICVAAIAVAAQAAAOACAMQANB1hgAAQgcAAgngKg");
	this.shape_660.setTransform(1644.9531,897.8303);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#EEF6E2").s().p("AgUBcQAAgNgFgLQgQgogrgPIAAgaIAAgaIAVAAQBgARAThEQABgDAKAAQAAANgDALQgHAQgKAOQAEAqAgAUQAGADAAANQAAAOgGAJQgTAgg1AAQgMAAgPgCg");
	this.shape_661.setTransform(1630.95,900.05);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#77AC29").s().p("AgiBOQgKgzAAg1QAOgsAxgIQAKgBALAAQAAANACANQAPBBg6gMIAAAbIgWAAIAAAaIAAAbQgLAAAAgCg");
	this.shape_662.setTransform(1624.826,893.325);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#E1EAC3").s().p("Ag/A0IAAgbQA8AMgPhBQgCgNAAgNIAUAAQAhAAAbALQADACAAANIAAAbQgKAAgBACQgPA2hAAAQgQAAgUgDg");
	this.shape_663.setTransform(1630.95,890.82);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#86A823").s().p("AgrAaQAAgNgDgCQgbgLghAAIAAgaIC/AAIAWAAIAAAaQgLAAgJAEQgyAXhJAAIgHgBg");
	this.shape_664.setTransform(1641.65,885.302);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#0C7F37").s().p("AgjHcQgZhVgjhNQAAgNgGgIQgEgFgMAAIAAgbIAAjWIAAgbIAAgZQAmgBgNg2QgDgMAAgNIAAgbIAAgbQAdguALg9QADgNAAgNQAggeAJgzQACgNgBgNQBFh/A4AGQACABAAANQgLAAgBAEQgUAvggAdQAAAbAJAXQACADALAAIAABRIAAAaIgLAAQAFA1glABIAABQIAAAbIAAElIAAAaIAAAbIgVAAIAAAbIgLAAQAFCFgkBQQAAgNgEgMg");
	this.shape_665.setTransform(1740.75,904.6135);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#619816").s().p("AgqAaIgqAAIgWAAIAAgaIAAgaIC/AAIAWAAIAAAaIgWAAIhpAAIAAAaIgWAAg");
	this.shape_666.setTransform(1720.5,896);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#72A125").s().p("ABfAOIi+AAQgLAAgEgGQgGgIAAgNICpAAIAWAAIAUAAIAWAAIAAAbIgWAAg");
	this.shape_667.setTransform(1719.45,891.975);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#1F8331").s().p("AALCEQgLgwgVgfQABgNgFgLQgGgPgKgOIAAgZIAAgbQBYA3grhvQgEgLAAgOIAWAAQAAAOAGAIQAEAGAKAAIAAAaIAAAbQAAANgEAMQgHAPgJAMIAABrIAAAbQgMAAABgCg");
	this.shape_668.setTransform(1705.6,903.975);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#E4D27E").s().p("ABVANIipAAIgWAAIAAgZQBqAABpAMQABAAABANIgWAAg");
	this.shape_669.setTransform(1716.25,889.275);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#BDC06F").s().p("AAYAoQAMhJhOAUIgVAAIAAgaQAqAAAmgNQAFAAAAgOQAUAAAQAKQAGAEAAANQAAANgCANQgJAygfAeQAAgOACgNg");
	this.shape_670.setTransform(1733.3,870.625);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#EFC986").s().p("ACVBrIgVAAQAAgNgCAAQhogOhqAAQgLAAgFgFQg3hBg5g+IBqAAIAWAAQBfgDBFgiQAFgDAAgOIAVAAIAWAAIAVAAQgHBEAyAKQALADAKAAQAAANgCAMQgLA9geAuIgVAAg");
	this.shape_671.setTransform(1714.125,879.925);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#E0CE6F").s().p("AhUAAQAqAAAngLQADgCAAgNIBAAAIAVAAQAAANgFAEQhFAhhfADIAAgbg");
	this.shape_672.setTransform(1714.1,871.95);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#59A009").s().p("AhDCCQgQgKgVAAQgKAAgGgFQgdgbg+AFIAAgaQCphZBxh3QAFgFALAAQB/AOgfB4IAKAAQAiAqgbATQgHAEAAAOQgKAAgEAFQgdAnhUgSIAAgaIAAgbQAAgNgCgBQg4gFhFB+QAAgNgGgEg");
	this.shape_673.setTransform(1745.9398,851.9);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#74A018").s().p("AAAAoIgVAAIgVAAIhAAAIAAgaQBMAJAYgmQAGgLAAgNQA9gFAdAaQAGAGALAAQAAANgFAAQgnANgqAAIAAAaIgVAAg");
	this.shape_674.setTransform(1724.8,865.2027);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#71AB27").s().p("AAgA1IhUABIAAgbQA7AMgZg9QgCgDgLAAIAAgcIAVAAQAgAeATAuQABAEAMAAIAAAbIgWgBg");
	this.shape_675.setTransform(1696,895.975);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#6BAE06").s().p("AB1AoIgqAAQgLAAgIgFQhZgyiTADIAAgbIE/AAIAVAAQALAAACAEQAaA9g8gNIAAAbIgWAAg");
	this.shape_676.setTransform(1676.7786,897.35);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#769E2E").s().p("Ak+BNQBMAKAYgoQAGgJAAgOQCoAugRiYQgCgNAAgOIFqAAIAVAAIAAAcIgVAAIk/AAIAAAaQAAANgEAMQgHAPgKAOIAAAZQgLAAgIAFQgNAJgLANIAAAaIgVAAQhcgEg6AgQgKAAgKACQgLADgJAAQgcAAAFghg");
	this.shape_677.setTransform(1660.7873,901.5596);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#E5CF7D").s().p("AELAoIgVAAIlqAAIgVAAIiWAAIAAgbQBPABAzgWQAJgEALAAIAqAAIAWAAQCfBBCahMQAGgCAAgOQAVAbAPAcQAGALAAANIgVAAg");
	this.shape_678.setTransform(1666.1,886.625);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#9CB238").s().p("AgfAbIgrAAIAAgbQAygbBNABIAWAAQAAANgEACQgnALgqAAIAAAbIgVAAg");
	this.shape_679.setTransform(1659.775,882.6233);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#ECC980").s().p("AifAZIAAgaQArAAAngMQAEgCAAgNIAVAAIAVAAQA/gNBAgMIAVgBQAVANAPASQAHAIAAAOQAAANgFACQhUAphTAAQhJAAhKgeg");
	this.shape_680.setTransform(1674.675,882.8355);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#81AD1E").s().p("AAWA1IhqAAQAAgNgFgDQgsgXAGhDQB7AWBvAdQALACALAAQAAANgFACQgnALgqAAIAAAbIgVAAg");
	this.shape_681.setTransform(1701.2832,869.3);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#86AB29").s().p("AhKAAQAtgVA8gEIAWgBQALAAADAGQAHAHABANIgWABQg/AMhAANIAAgag");
	this.shape_682.setTransform(1678.95,877.3);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#1E7F30").s().p("ABCCKQgMAAgBgEQgTgvghgeQAAgNgEgKQgQgegVgZQAAgOgHgIQgPgTgVgNQAAgNgHgIQgDgFgLAAQAAgOgFgLQgGgQgLgNQA5ANAjAjQAFAGAKAAQA5A+A3BBQAEAFALAAIAAAaQAAAOAFALQAcBKgeAAQgPAAgegSg");
	this.shape_683.setTransform(1694.7592,884.8973);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#82BE18").s().p("Ag0AmQgkgBAOgzQDOgzhIA7QgGAFAAAMQgMAAgFAGQgYAUgsACIgVgBg");
	this.shape_684.setTransform(1695.9613,793.2855);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#86BD18").s().p("AhBAEQEHgvkHA8g");
	this.shape_685.setTransform(1629.0625,810.0931);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#84BF19").s().p("AgPABQBDjZhAEmQgDAOgBAAQgEAAAFhbg");
	this.shape_686.setTransform(1775.3699,735.5366);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#6DAF0F").s().p("AgrggQgHgGAAgOQBpBpgEAAQgDAAhbhVg");
	this.shape_687.setTransform(1804.489,666.0756);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#90A731").s().p("Ah/AAQBpgZCAgBIAWAAQAAAOgCABQh+AZh/AMIAAgag");
	this.shape_688.setTransform(1871.875,839.85);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#6DAE0D").s().p("AAAAoIgUAAQAAgNgFgMQgGgPgLgMQALgBAEgFQAHgIAAgNQArABAOAcQAGAKAAAOIgWAAIAAAaIgVAAg");
	this.shape_689.setTransform(1891.075,833.2);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#F5C786").s().p("ACVO1IAAgcQAlAAgNg1QgCgNAAgNQAggeAIgzQACgNAAgOQALAAACgDQB7kFiyCeIAAAbQgLAAgIAEQgNAJgLANQAAgNgGgKQgfg5AQhrIAAgaIAAgbQAKgOAGgOQAFgMAAgOQAVgNAPgTQAHgIAAgNQAKAAAHgFQCqiLi7A/IAAAcQgLAAgIADQguAXgqAbIAAAbQgLAAgBADQgOAoglAKIAAAbQgLAAAAACQgOBQg8AYIAAAcIgLAAQAFhDglgOIAAgaIAAgbQAAgOgCgMQgOhWgahMQAAgNgCgMQgJg3gLg1QAAgNgFgLQgXgwgOg8IAAgbID+AAIAVAAQCzAZgmhKQgCgEgKAAQgLAAgKgDQiBgZh+gaIgWAAIgqAAQAAgNgEgBQg9gNg/AAQgBgNgGgIQgPgTgVgOIAAgNQgJACiMALIAAgaQAKAAAFgFQAGgIAAgOIAAgaQAVgOAQgSQAGgJAAgNQAfgaAbghQAFgIAAgNQALAAAFgFQC4i+jdCOIAAAaQgKAAgJAEQgYAKgVANIAAAaQgLAAAAADQgMA2g+gDIAAAbQgLAAgCAEQgZA0gvAYIAAAaIgVAAIgrAAQAAgNgCAAQhKgNhJAAIAAgbQAPiTglhdIAAgbIAAhQQAWgbAPgdQAGgLAAgNQBUASAdgoQAFgFAKAAQC5gBCHgxQAKgEALAAQB5gJBugeQADgBABgNIBVAAIAVAAIC8goQADAAAAgOIArAAIAVAAQCAgNB9gaQACAAABgOIAVAAIAVAAIAWAAIAVAAQCJAGBigdQALgDAJAAIAAdNIAAAaIgVAAIhUAAQgMAAgKgCQiIgdhNAfIAAAcQgLAAgKACQgyAMAGgqQALAAAFgFQAGgIAAgNQA+AGAdgbQAFgGALAAQAKAAADgEQAqhMiiAbIAAAbIAAAaQgLAAgJADQicAtiQA7IAAgag");
	this.shape_690.setTransform(1833.5,932.075);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#A0B039").s().p("Ah/AaIAAgaIAWAAQBZgeB6AEIAWAAIAAAaQgKAAgKADQhSAYhsAAIgtgBg");
	this.shape_691.setTransform(1905.975,834.5528);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#6BB005").s().p("AhJgRQBXAMArgiQAHgFAKAAIAAA1IAAAbQgKAAgKACQgfAHgXAAQhEAAgFg+g");
	this.shape_692.setTransform(1911.325,825.625);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#B8BF49").s().p("AhUgQQBUAABTAOQACAAAAANQgKAAgLABQgdAFgYAAQhBAAgeghg");
	this.shape_693.setTransform(1466.825,1140.7794);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#88BC1A").s().p("AhKAAQAWAAAPgJQAGgDAAgOQApAOAsALQAKABALAAQAAANgEACQgpAMgfAAQgvAAgagbg");
	this.shape_694.setTransform(1491.325,1147.187);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#ACBD3D").s().p("ACAAaIiAAAQgKAAgKgBQgrgLgqgOQgLAAgIgDQgNgJgLgOQCOAVCZATQACAAAAAMIgVAAg");
	this.shape_695.setTransform(1498.775,1144.5);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#87BB1C").s().p("AkfAMQDlAgBohcQAHgGAAgNIBrAAIAVAAQgHApAygMQAKgCAMAAQAJANAOAIQAIAGALAAQAAANgCAAQjEAWikAsIgVABQgWABgTAAQhoAAgvg4g");
	this.shape_696.setTransform(1516.925,1153.9983);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#D1CA63").s().p("AhegPIB/AAIAVAAIAWAAQAKAAAFAFQAFAIAAANIgUAAIhpAAQgMAAgKACQgLADgIAAQgdAAAFgfg");
	this.shape_697.setTransform(1544.5376,1148.7596);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#FEC58E").s().p("AgVAaIAAgMQgxAAAHgoQDZABiXAmQgDABAAAMIgVAAg");
	this.shape_698.setTransform(1552.1102,1144.5);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#ADBA41").s().p("ABKANIh/AAQgLAAgHgFQgOgIgJgMIBoAAIAVAAIArAAIAVAAIAAAZIgVAAg");
	this.shape_699.setTransform(1551.05,1151.225);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#DCCA69").s().p("ABAANIiUAAIAAgZQBUAABTAMQACAAAAANIgVAAg");
	this.shape_700.setTransform(1569.125,1151.225);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#EDCF80").s().p("ABrAaIhWAAIgVAAQAAgNgBgBQg+gMhAAAIAAgZQCHAEB0AhQAEABAAANIgVAAg");
	this.shape_701.setTransform(1605.375,1152.55);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#C3C55A").s().p("AhfgPIArAAIAVAAQA/AAA+AMQACABAAAMIgVACQghAEgbAAQhIAAgmgfg");
	this.shape_702.setTransform(1595.775,1154.1931);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#89A924").s().p("AiUggIBAAAIAVAAQA1AtB1gRIAVgBIAVAAIAAAZQgKAAgKACQg3ALgvAAQhyAAg9hBg");
	this.shape_703.setTransform(1592.575,1155.8409);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#6DAD09").s().p("AbpBrMg48AAAIAAgbQGEglF5g3QADAAAAgOQCkgrDFgYQABAAAAgNIB/AAIAWAAICVAAIAVAAQBXBdC/gmQAKgCALAAIC/AAIAVAAQAAAOgCAAQhTANhVAAQBpAuCqggQABAAAAgOICBAAIAVAAICVAAIAWAAQBUAtCWgSQAKgBALAAICWAAIAVAAICVAAIAWAAIE/AAIAWAAIFqAAIAWAAIAVAAIAVAAQAAANgFAKQgYAsg4ANIAAAbIgWAAg");
	this.shape_704.setTransform(1620.3,1163.225);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#A6BB38").s().p("AhqgQQBqAABpAOQACAAAAAMQgLAAgLABQgkAGgfAAQhOAAgughg");
	this.shape_705.setTransform(1447.6,1138.1133);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#B9BC42").s().p("ABAANIiUAAIAAgZQBUAABUAMQABAAAAANIgVAAg");
	this.shape_706.setTransform(1428.425,1135.125);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#8CBC20").s().p("Ai0AZQC3gYAdgcIgQgKQgGgDAAgOQBWAABTANQACABAAANIAAAaQAAANgEABQhwAqhfAAQhRAAhFgeg");
	this.shape_707.setTransform(1401.825,1136.6055);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#E79F53").s().p("AAqAbIh+AAIAAgbQA/AAA+gMQABAAAAgOIAVAAIAWAAQAAAOgHAIQgEAFgLgBIAAAbIgVAAg");
	this.shape_708.setTransform(1432.7,1075);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#EFB269").s().p("AiJgCID/gaIAUgBQAAAOgBAAQg+ANhAAAIAAAaQgLAAgJABQgaAFgWAAQg5AAgXggg");
	this.shape_709.setTransform(1423.075,1075.3081);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#D4CA63").s().p("ABWAYQhTgYhsAAIAAgaQB6gEBVApQAEACAAAOQgKAAgKgDg");
	this.shape_710.setTransform(1392.2,1128.4574);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#96B82A").s().p("AhKgVIArAAIAWAAIA/AAIAVAAIAAAaQgLAAgJADQgiAOgaAAQgvAAgWgrg");
	this.shape_711.setTransform(1374.075,1127.9926);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#85BC12").s().p("Ai/giIFVAZIAVABIAVAAQAAAMgEACQhTAdhMAAQh2AAhmhFg");
	this.shape_712.setTransform(1332.475,1126.6606);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#DDCD6D").s().p("ABVAbIgrAAIgVAAIAAgOQheAGghgsQB7gFBVAoQAFADAAAOIgWAAg");
	this.shape_713.setTransform(1362.35,1123.1277);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#A7BC3B").s().p("ABqAbIhqAAIgUAAIAAgOQhWAEgVgrIBrAAIAUAAQAgAsBggFIAAAOIgWAAg");
	this.shape_714.setTransform(1351.725,1123.15);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#AEC044").s().p("AiJgbQCNAKCDAcQADABAAAOIgVAAIgmACQiIAAhQg3g");
	this.shape_715.setTransform(1320.8,1117.8509);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#A2B933").s().p("EBOoAJMQA4gfBcAEIAWAAIAAAbQgLAAgKADQhFARhQAHIAAgbgEhN8gIwIgqAAIgWAAIgVAAIAAgOQhhAGgfgtQCJgGBcArQAFACAAAOIgVAAg");
	this.shape_716.setTransform(844.3,957.4136);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#B0BE43").s().p("AhKAZIAAgZQBAgOA/gLQALgCALAAQAAANgHAJQgEAFgLAAQgLAAgGAEQgbAYgyAAQgPAAgSgDg");
	this.shape_717.setTransform(1378.375,1011.0114);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#E6CF75").s().p("AhfAZIAAgaIAqAAIAWAAQBLAIAjgeQAGgFALAAQAAANgHAGQguAmhTAAQgaAAgdgEg");
	this.shape_718.setTransform(1374.1,1013.7584);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#86BA18").s().p("Ag1ABQDYgjjYAwg");
	this.shape_719.setTransform(1380.5875,997.4671);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#D3CB60").s().p("AhKAbIAAgbQBOAAAzgWQAJgEALAAQAAANgHAGQgtAihOAAIgTAAg");
	this.shape_720.setTransform(1442.3,994.898);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#86BB14").s().p("AgFApQg3gdgughQCvhUAiBvQAEAMAAANIgWgBQg9gEgYAgQAAgNgFgEg");
	this.shape_721.setTransform(1451.9,983.725);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#B0BA3D").s().p("Ag/ABQAYgfA8AEIAWABIAWAAQAAAOgHABQg6AYg/AOIAAgbg");
	this.shape_722.setTransform(1458.3,989.4476);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#F19945").s().p("ACxBQIh/AAIgWAAIgVAAQAAgNgCAAQhSgOhWAAIgVAAIgVAAIAAgNQhJAFgMgtQEaAeDRhoQAJgFAKAAQCYBTitBMIgWAAg");
	this.shape_723.setTransform(1581.2045,1083.05);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#F1A65D").s().p("AhVgQQBVAABTANQADAAgBANQgLAAgKACQgdAFgYAAQhBAAgfghg");
	this.shape_724.setTransform(1573.4,1090.0562);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#F7AD62").s().p("AiKgNIEAAAIAUAAIAAAOQiKAMiKAAIAAgag");
	this.shape_725.setTransform(1582.95,1063);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#F29841").s().p("AgwgEQgDgBAAgNQBxAlgMAAQgJAAhZgXg");
	this.shape_726.setTransform(1503.9503,1076.9698);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#F6B066").s().p("AiKgQQCKAACJANQABAAAAANIgVABQguAGgoAAQhlAAhEghg");
	this.shape_727.setTransform(1484.95,1082.0133);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#F1AA5D").s().p("AhUgMICUAAIAVAAQAAAMgCABQhTAMhUAAIAAgZg");
	this.shape_728.setTransform(1466.825,1070.975);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#FDBB72").s().p("ABAANIiUAAIAAgZICUAAIAVAAIAAAZIgVAAg");
	this.shape_729.setTransform(1483.85,1068.325);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#F49A42").s().p("AgiAbIgVAAIAAgOQgxABAHgoQFXADkAAkQgCAAAAAOIgWAAg");
	this.shape_730.setTransform(1523.5191,1080.375);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#F2B268").s().p("Ah0gPICTAAIAWAAIAVAAIAVAAQAMAAADAFQAHAIAAAMQgLAAgKACQgnAFgiAAQhWAAg1ggg");
	this.shape_731.setTransform(1512.65,1084.6906);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#F29942").s().p("AMUBOIErAAIAWAAQhQAhhQAAQhRAAhQghgAxUhsIAWAAIAVAAQGmgFEvAFIAKAAQjAAhjCAAQjCAAjGghg");
	this.shape_732.setTransform(1616.05,1080.55);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#F3AD5F").s().p("ABAANIgVAAIgVAAIhqAAIAAgZICUAAIAWAAIAAAZIgWAAg");
	this.shape_733.setTransform(1500.9,1068.325);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#EE9B47").s().p("EAgJADhQAAgNgBAAQhTgOhWAAIgVAAQj0gPj3gLIgBgNQkqgOkqAAIgVAAIiWAAIAAAbIgVAAIiWAAIgUAAIiWAAIAAAaIgVAAIgVAAIl/AAIgWAAIjrAAIgUAAIhWAAQAAgNgBAAQh0gNh2AAQAAgNgGgJQgDgFgMAAQCuhMiZhTQgJAAgKAEQjRBpkbgeQAMAsBJgEIAAANIgVAAQi7AEiagfQAAgNgHgIQgDgFgMAAQAAgOADAAQEBgllYgDQgHApAxgBIAAAOIgWAAIiUAAIgWAAQAAgOgBAAQiJgNiLAAIgVgBIkrgaIAAgZQALAAAEgFQAGgJAAgOICWAAIAVAAQBVAABUgMQACgBAAgNICVAAIAVAAIBrAAIAVAAQGLBDF/hDIgKAAQkvgFmmAFIAAgbIA/AAIAWAAQCAAAB/gNQABAAAAgNIDqAAIAVAAQCLgBCKgMIAAgOIAWAAQBVAABTgNQADgBAAgNQDkgaDHgzQAJgDALAAIAWAAQAAANAGAIQAFAFAKAAQABAOgHADQhfAyibgNQBUC1Cah7QAogfA+AIQCEARA7hOIgaAOQg3AcgDgqQAygcBMgMQACgBAAgNIAVAAIAWAAQgLBrDbhcQAEgCAAgNQBQAEARBKQAAACALAAIAVAAIAVAAQB2CJBrhBQBbg3AUCTQAIA9A+gMQBJggAdhlQAEgNAAgNIBVAAIAVAAQCAgGBPg5QAGgEAAgNIAAgcIAWAAIAWAAQA1AwBfAFIAWABQAKANAOAJQAIAFAKAAQADArA4gbQAFgDAAgNIAMAAQgXBehKAMQBfAiB7gOQBJgJhPAwQgRAKA6AIQAXACArABQB6ipkigfQgBAAAAgNIAVAAIAVAAQBBAiBngUQACgBAAgNIAWAAIAVAAQA5BhEIgQIAUgBIABBRIgBAZIgWAAIg+AAQgaBhBagPIAUgCQABBEgBBCIAAAbIgUABQgwADgsAAQiDAAhigfgAHgB2IgWAAIkrAAQCgBCChhCgAnJCDQFfAAlfgNgApfB2IAAANQBxgUgcAAQgRAAhEAHgAZjBpQEUAbkYhDQAAAoAEAAgAO1BOQEcAAkcgNgA8FAAQDJA2jNhEQAAANAEABgAYKALQhwhvAwhLQgLAAgGAFQhoBtjcgHQgQBCAWgMQDChtC4CGIAVAAIAAAAgAKdgfQBsgTi/gSQAUAxA/gMgAFKiUQDBACjrgdQAVAbAVAAg");
	this.shape_734.setTransform(1678.95,1076.575);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#F9B56E").s().p("Ah/gMIDrAAIAUAAQAAAMgBAAQh/ANh/AAIAAgZg");
	this.shape_735.setTransform(1530.75,1065.675);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#C6C854").s().p("ABAAOIhpAAIgVAAIgWAAIAAgbQBUAABUANQABAAAAAOIgVAAg");
	this.shape_736.setTransform(1189.65,1100.425);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#76C306").s().p("AhfgPQBgAABdAMQACABAAAMQgLAAgKACQghAEgcAAQhHAAgmgfg");
	this.shape_737.setTransform(1135.3,1103.4431);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#80B815").s().p("AAUAbIgUAAQgLAAgIgEQgOgJgKgOQBdg2gHA2QgBAOAAANIgWAAg");
	this.shape_738.setTransform(1138.6243,1085.675);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#99BA2F").s().p("AhqgQIB/AAIAWAAIAqAAIAWAAIAAAbIgWAAIgVAAQgLAAgKABQgdAFgXAAQhCAAgfghg");
	this.shape_739.setTransform(1170.475,1100.7196);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#FFC58C").s().p("AhIANIAAgZQELAGjgATIgVAAIgWAAg");
	this.shape_740.setTransform(1179.872,1095.075);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#E7D179").s().p("ABgANIh/AAIgVAAIhAAAIAAgZIC/AAIAVAAIAWAAIAAAZIgWAAg");
	this.shape_741.setTransform(1163,1097.725);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#A1B232").s().p("Ag5ACQgGgOgLgNQBKgBBJANQACABAAAMQgLAAgJAEQgvASg8AFQAAgOgFgLg");
	this.shape_742.setTransform(1167.275,1077.6966);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f("#CDC75B").s().p("ABGAfQAAgNgCgBQhJgNhKABIAAgbQCQggAPBVg");
	this.shape_743.setTransform(1167.8,1074.5661);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f("#87BC17").s().p("AlUgRQA9AQAMgoQABgDALAAQA1AtB2gRQAKgBALAAQCGAZC2gnQADAAAAgNIAVAAIAWAAIAVAAIAWAAIAAAbQgLAAgKADQiXA7ijAAQinAAi0g+g");
	this.shape_744.setTransform(1151.3,1106.2569);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f("#BCC34B").s().p("ABfAOIjTAAIAAgbIAqAAIAWAAICTAAIAWAAIAAAbIgWAAg");
	this.shape_745.setTransform(1062.8,1073.675);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f("#90B720").s().p("AjUACIAAgaICrAAIAVAAIDUAAIAVAAQAAANgGAJQgEAEgLAAQgKAAgLACQhnAVhdAAQhjAAhYgXg");
	this.shape_746.setTransform(1053.175,1077.5256);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f("#A8BB3C").s().p("AhUAbIAAgbQAWgNAWgJQAJgEALAAIBTAAIAWAAIAAANQhkAAgvAoIgWAAg");
	this.shape_747.setTransform(1066,1064.325);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f("#A9BD3B").s().p("ABAAOIgWAAIgUAAIhqAAIAAgbIBUAAIAWAAIAqAAIAWAAIAAAbIgWAAg");
	this.shape_748.setTransform(1083.05,1073.675);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f("#D0C35D").s().p("ACBAbIkVAAIAAgbIAAgZIAVAAIAWAAQBUAsCWgRQAKgCAKAAIAAAbIgUAAg");
	this.shape_749.setTransform(1136.35,1096.4);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f("#8EBC21").s().p("AhKBGQAAgNAHgHQAjghg/gaQgKAAgLACQhsAZAChRQD1gUC0AtQAKACALAAQAAAOgGAFQgnAcg9AGQAAgOABgMQAHg3heA3QAKAMAOAJQAIAFALAAQAAANgHAFQgrAjhNAAIgWAAg");
	this.shape_750.setTransform(1131.049,1086.7399);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f("#81BA0C").s().p("AABAoQgJAAgIgFQgOgIgLgOIAAgZQAWAAAPgKQAFgEAAgNQA/AbgjAgQgHAHAAANIgVAAg");
	this.shape_751.setTransform(1121.3032,1089.725);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f("#8DC021").s().p("Ag/AOQAYguAqgcQAHgFALAAQALAOANAIQAIAFALAAIAAAbIAAAZQgLAAgEAFQgnAvgbAAQgdAAgRg0g");
	this.shape_752.setTransform(1115.075,1097.6391);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f("#99B72A").s().p("ABAAOQhKgBhKABIAAgbICUAAIAWAAIAAAbIgWAAg");
	this.shape_753.setTransform(1100.15,1073.675);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f("#96B823").s().p("ADqAOInoAAIAAgbIA/ABIAVgBIEAAAIAUAAICAAAIAWAAIAAAbIgWAAg");
	this.shape_754.setTransform(1134.25,1073.675);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f("#F7CA84").s().p("AAKA3IhUAAIgWAAIiUAAIAAgbQAKAAAEgFQAHgIAAgNQAwgoBlAAIAAgNIBAAAIAUAAIBAAAIAWAAQBlgNAqAuQAGAIAAAMIAAAaIgVAAIjAAAIAAAbIgWAAg");
	this.shape_755.setTransform(1082.025,1066.8231);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f("#FFC48D").s().p("AAKANIgUAAIhVAAIAAgZQBfgBBeANQACAAAAANIgWAAIgfAAIghAAg");
	this.shape_756.setTransform(1116.125,1068.35);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f("#EED27D").s().p("ABLANIgVAAIiVAAIgVAAIgrAAIAAgaIC/AAIAWAAIBUAAIAWAAIAAAaIgWABIg/gBg");
	this.shape_757.setTransform(1101.175,1071.025);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f("#E9CE75").s().p("AB2ANIkAAAIAAgZQAhABAfgBIAWAAQBfAABeAMQACAAAAANIgVAAg");
	this.shape_758.setTransform(1131.025,1070.975);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f("#ABBC3F").s().p("Ag/AcIhAAAIAAgaQBcgmCOALIAVABQAAANgCAAQhTANhVAAIAAAaIgVAAg");
	this.shape_759.setTransform(1095.875,1058.8191);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f("#83BB19").s().p("AgugBQC6gai6Ang");
	this.shape_760.setTransform(1117.575,1043.1259);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f("#7EC00A").s().p("AhXgGQFeANleAAg");
	this.shape_761.setTransform(1102.525,1051.625);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f("#B3C148").s().p("AhfgMICqAAIAVAAQAAAMgCAAQheANhfAAIAAgZg");
	this.shape_762.setTransform(1175.825,1049.625);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f("#8AB822").s().p("ABgAhIgVAAIgVAAIiqAAIAAgaQBdhNB6BIQAHAFAMAAIAAAaIgWAAg");
	this.shape_763.setTransform(1177.95,1044.9729);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f("#CFC561").s().p("AiUAAQA2ABAxgNQAEgBAAgNICpAAIAVAAQAAANgCABQiTAZiUAOIAAgbg");
	this.shape_764.setTransform(1144.875,1053.65);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f("#9FB733").s().p("AgJAbIhrAAIAAgbQBZgdB7ADIAWAAQgBAOgDAAQgyANg2gBIAAAbIgTAAg");
	this.shape_765.setTransform(1128.9,1053.6317);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f("#FEC28C").s().p("AhGgGQEcANkcAAg");
	this.shape_766.setTransform(1324.675,1110.45);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f("#A9B93A").s().p("Ah/gdQB5AVCEARQACABAAANQgLAAgKACQgoAFgjAAQhuAAgxg7g");
	this.shape_767.setTransform(1283.475,1112.7886);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f("#84BB1A").s().p("AgvgTQC+AVi+ASg");
	this.shape_768.setTransform(1266.9625,1127.825);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f("#89B81F").s().p("Ag0gJQAKAAAFgFQAGgIAAgNIAVAAIAqAAIAVAAIAAAaQABANgHAHQgYAZgWAAQgdAAgYgtg");
	this.shape_769.setTransform(1239.75,1110.7067);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f("#83BB1C").s().p("AhFgFQEWgEkWAQg");
	this.shape_770.setTransform(1258.475,1118.3951);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f("#BBBF4B").s().p("ABAANIiVAAIAAgZIBVAAIAVAAQAgAAAbALQAGABgBANIgVAAg");
	this.shape_771.setTransform(1253.65,1108.425);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f("#D7CD69").s().p("ABAANIhUAAIgWAAIgqAAIAAgZQBUAABTAMQACAAAAANIgVAAg");
	this.shape_772.setTransform(1247.225,1105.775);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f("#9DB72E").s().p("AhfAIIAAgaIBpAAIAVAAIArAAIAWAAIAAAaQgLAAgKACQglAJgnAAQgsAAgygLg");
	this.shape_773.setTransform(1195.025,1103.6638);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f("#7BBF06").s().p("AhPgGQE+ANk+AAg");
	this.shape_774.setTransform(1208.2625,1107.75);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f("#A2BB31").s().p("AhUgPIAVAAIB/AAIAVAAIAAAZIgVAAQgLAAgKACQgaAEgUAAQg6AAgXgfg");
	this.shape_775.setTransform(1230.175,1106.0963);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f("#CFC760").s().p("ABLANIgVAAQhLgBhKABIAAgZQBfAABeAMQACAAAAANIgVAAg");
	this.shape_776.setTransform(1214.2,1103.125);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f("#C7C156").s().p("AhUgMICUAAIAVAAQAAAMgCAAQhTANhUAAIAAgZg");
	this.shape_777.setTransform(1198.2,1046.9625);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f("#79BF06").s().p("AhfgPIBVAAIAUAAQArAAAnAMQAEABAAAMIgVACQghAEgcAAQhHAAgmgfg");
	this.shape_778.setTransform(1197.125,1041.9431);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f("#B9C14A").s().p("Ah/AAQBOAAAzgWQAJgEALAAIBVAAIAVAAQAAANgCABQh9AaiAANIAAgbg");
	this.shape_779.setTransform(1228.025,1042.975);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f("#87BA18").s().p("AsUDDQALAAAEgFQAGgJAAgNIBrAAIAVAAQAAANAEANQAJAfgnAAQgnAAhUgegAJrh9IhBAAIAAgbQAAgNgDgBQgngMgrAAIAAgbQCqAUA2gYQBXgoAJBHQgLAAgJADQg0AYhNgBIAAAbIgVAAg");
	this.shape_780.setTransform(1151.275,1058.2294);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f("#FEC48E").s().p("AhcgEQFygJlyAVg");
	this.shape_781.setTransform(1339.6625,1027.4694);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f("#B7BE47").s().p("AhUABQA5geBbADIAVAAQAAAOgEABQhRAZhUANIAAgag");
	this.shape_782.setTransform(1313.325,1026.8822);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f("#ABBD3F").s().p("AhVAAQA/AQAMgnQAAgDAKAAIBAAAIAVAAQAAAOgFADQhFAihgABIAAgag");
	this.shape_783.setTransform(1334.65,1021.55);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f("#84BD16").s().p("AgfAhQAAgNgFgMQgFgNgLgOQAqgpA5AxQAGAGAAAMQgLAAAAADQgJAcghAAQgNAAgSgFg");
	this.shape_784.setTransform(1329.325,1018.2018);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f("#C9C559").s().p("AhqAAQBlgIBagQQALgCALAAQAAAOgFAAQhdAjhzAEIAAgbg");
	this.shape_785.setTransform(1289.875,1032.3);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f("#BEC24E").s().p("AhpAAQA1AAAxgLQADgCABgNIBAAAIAVAAIAUAAQABAOgEABQheAhhyAFIAAgbg");
	this.shape_786.setTransform(1260,1037.65);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f("#82BD0F").s().p("ABVAdIhAAAQgLAAgJgEQg2gXg1gaQC8gRATAtQAGALAAAOIgWAAg");
	this.shape_787.setTransform(1257.925,1032.0688);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f("#87BA17").s().p("AhCADIAAgNQCoAVgsAAQgZAAhjgIg");
	this.shape_788.setTransform(1303.0188,1014.6204);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f("#E3EBCC").s().p("AAfAyQgOgoglgJIAAAaIgVAAIAAgaIAAgbQAKAAAEgFQAHgIAAgNQA7AKADBFIAAAbQgKgBgBgDg");
	this.shape_789.setTransform(1187.525,759.7);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f("#578419").s().p("AhKgCQBUARAdgnQADgFALAAQALAAAEAGQAHAIAAANQAAAMgGAEQgQAJgVAAQgLAAgKADQgSAEgPAAQgrAAgJggg");
	this.shape_790.setTransform(1175.825,770.7252);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f("#83B622").s().p("AA+CtQiCgOhqhCQBjhQgZi5IALAAQBUB3AmBfQAFAMAAANQALAsBKgPQAKgDALAAQBVBFiTALIgMABIgIgBg");
	this.shape_791.setTransform(1164.5788,763.7);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f("#F8F0CC").s().p("AAxATQgbgvheASIAAgbIAqAAIAWAAQBrgZghBmQgBADgKAAQAAgNgGgLg");
	this.shape_792.setTransform(1184.2362,747.4299);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f("#F3E493").s().p("AAqAdIhUAAQgLAAgCgDQgIgXAAgaQBegTAbAwQAGAKAAANIgWAAg");
	this.shape_793.setTransform(1183.3,748.7696);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f("#F5FCEF").s().p("AAXAzQhLgTgLhUIAWAAIAVAAQA4ANAXAqQAFALAAANQAAANgGAIQgEAFgLAAQgKAAgKgCg");
	this.shape_794.setTransform(1080.9,674.175);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f("#83BA25").s().p("Ag0AZQA3gSgDhYIAKAAQgLBjAwAqQAGAFAAAOQgKAAgLABIgQACQg0AAgQg5g");
	this.shape_795.setTransform(1071.35,674.3606);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f("#AECE87").s().p("AAsBrIg/AAQAAgOgHgFQgwgpAMhjQA8AMgGhCIAJAAIAAA2IAAAaIgUAAIgWAAQALBVBLATQAKACAKAAIAAAbIgVAAg");
	this.shape_796.setTransform(1078.6639,671.525);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f("#89B923").s().p("AAVAoQgEgogwAOQAAgNgEgMQgGgOgLgOQA0AAAzANQACABAAANIgVAAIAAAaIAAAaIgLAAg");
	this.shape_797.setTransform(1081.975,656.8);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f("#85BD17").s().p("Eg64AmNIhAAAQAAgNgCgBQhTgNhVAAIAAgNQjMAGiJguQHMgREpBHIgdAJQg1ARhOAAIgWAAgEBDtAf9QjEgegagiQgMgRAAgbQDPgaAmCGgEAtZAahQGhANmhAAgEA0NglhQgGgBgCgRQgCgKAAgPIANAHQBhA0gdAAQgQAAg3gQg");
	this.shape_798.setTransform(775.575,916.025);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f("#F0F7DC").s().p("AggBeQAAgNgEgLQgYgrg4gNIAAgaIAAg2IAAgaQAwgPAEApIAMAAQBGAZBcBAQAHAEABANQgMAAgCAFQgXA0hJAAQgSAAgWgDg");
	this.shape_799.setTransform(1090.55,667.4749);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f("#85BA13").s().p("AhXA0IAAgbIAAgZIAVAAQDShyhNB1QgGAJAAANQgLAAgFAGQgaAagzAAQgZAAgegFg");
	this.shape_800.setTransform(1094.0026,655.6442);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f("#98BF54").s().p("ABEA/QhbhAhIgZQBfATAlgoQAFgGAMABQAKgNAOgKQAHgEALAAQAAANgFAMQgGAPgKANQAaAkgPBDQgBADgKAAQAAgOgHgDg");
	this.shape_801.setTransform(1094.8,663.5);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f("#82B821").s().p("AjJCaIAAgbQALAAADgFQAGgIAAgOQBsARAdhCQACgEAMAAQAJAAACgDQAOhCgZglQAJgNAHgPQAEgMAAgNQAKAAAFgFQAzg+CTAoQgVA/hCAKQgpAHAAADQgFBAgZAuIgMgHQgBAPACAKQg5BUiMAAIgmgCg");
	this.shape_802.setTransform(1105.45,666.8137);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f("#88BA2B").s().p("AgIBXQgWgKgWgNIAAgaIAAgbQBdi1g7COQgeBFBlgDQAAANgGAEQgPAJgVAAIAAAbQgLAAgIgEg");
	this.shape_803.setTransform(1186.45,729.2133);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f("#F2F9E8").s().p("AgUDTQAAgNgFgMQgnhhhVh2QCggKhEh+QgHgLABgNQBRgyBGAtQAIAFALAAIAAAbIAAAaQgQA1AgAMQAFACAAANIgVAAIgrAAIAAAbQAAAbAIAWQACAEALAAQgHApAygMQALgDALAAQgBAOgGAIQgFAFgKAAIAAAbIAAAbQAAANgGAIQgFAFgKAAIAAAbQgMAAgDAFQgUAbguAAQgVAAgZgFg");
	this.shape_804.setTransform(1170.5,749.3385);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f("#88B13D").s().p("Ag3A1IAAgbQBSgBgIhoIAKAAQAAANAGAKQBGB+igAKIAAgbg");
	this.shape_805.setTransform(1161.1606,738.35);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f("#82B91F").s().p("AhPAHQAAgMgGgIQgFgFgKAAIAAgbQAKAAAFgGQAGgIAAgNIAWAAQAYBPBmAAIAVAAIALAAQgoBCgtAAQgsAAgzhCg");
	this.shape_806.setTransform(1191.275,769.6625);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f("#618B1D").s().p("AAgA1QhmAAgYhPIAAgaQAlAJAOApQACACAKAAQBJARAUgnQACgEALAAQALAAABAEQAbA9g9gMIAAAaIgVAAg");
	this.shape_807.setTransform(1194.9786,765.075);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f("#5C8A14").s().p("Ag0AAIAAgbIA/AAIAVAAQAKAAAFAFQAGAJAAANQgLAAgDAEQgUAYgUAAQgYAAgbgcg");
	this.shape_808.setTransform(1209.925,754.4904);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f("#DAE6C5").s().p("AgoAbQgkgBAPgzIBqAAIAVAAIAAAZIgVAAIg/AAIAAAbIgWAAg");
	this.shape_809.setTransform(1206.5168,751.7);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f("#85BA23").s().p("AAKAkIhVAAIAAgaIAAgbQDigyhxBVQgHAFAAANIgVAAg");
	this.shape_810.setTransform(1199.3056,729.3658);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f("#D6EEB1").s().p("AhKAAQAWAAAPgJQAGgEAAgNIBUAAIAVAAIAAAaQgKAAgKACQhAALhAANIAAgag");
	this.shape_811.setTransform(1195,735.65);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f("#F9FCEE").s().p("AgqCQIAAgaQgDhGg8gLQgLAAgKADQgyAMAHgpIBVAAIAWAAQAKAAABgDQAhhmhsAZQAAgNgFgCQgggMAPg1QAWANAXAKQAIAEALAAQBAgOBAgLQAKgCAKAAQA9gCAOA1QAAADALAAQALAaAHAcQADAMAAAOIgVAAIhrAAQgPA0AkAAIAWAAQAAAOgFALQgGAQgLANIAAAbQgKAAgCAEQgPAcgnAAQgRAAgXgGg");
	this.shape_812.setTransform(1196.0373,750.6127);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f("#85BD15").s().p("AgbA1QAhASgIhYQgCgNAAgNIAKgbQAqCNgnAAQgMAAgYgSg");
	this.shape_813.setTransform(1224.2882,756.1296);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f("#8CBF2F").s().p("AAnBlQgIgGgLgLQAAgOgHgJQgOgSgVgNQAAgNgHgJQgEgFgKAAIAAgZQAAgOgDgNQgIgbgLgbQBIAiApBEQADAEALAAQAAAOACANQAIBKgXAAQgEAAgGgDg");
	this.shape_814.setTransform(1217.5787,751.3764);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f("#98BB27").s().p("AAAAqIhUAAIAAgbIAAg0QBkgOA0AkQAHAFAKAAQAAAMgFACQgaALghAAIAAAbIgVAAg");
	this.shape_815.setTransform(1603.225,950.564);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f("#A4B934").s().p("AhVACQAxgnBkAMQAKABALAAQAAAOgBAAQhoAGhBAhIAAgbg");
	this.shape_816.setTransform(1581.95,957.2453);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f("#E0D170").s().p("AhKAZIAAgZQA2AAAxgNQADgBAAgNIAVAAIAWAAQAAANgHAIQggAihEAAQgTAAgXgDg");
	this.shape_817.setTransform(1565.925,962.9444);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f("#AABB3B").s().p("AgqAdIgqAAIAAgbQAvgnBlAMIAVACQAAANgCABQgzALg1AAIAAAbIgVAAg");
	this.shape_818.setTransform(1560.6,962.5776);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f("#ACBE40").s().p("AhKAAQArgMAqgLQAKgDAMAAIAUAAIAWAAQAAANgFADQhAAehQAHIAAgbg");
	this.shape_819.setTransform(1538.225,968.125);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f("#88BA1C").s().p("AgKA1IgrAAQAAgNAFgLQAZg1hegcQBxARB3AWQADAAAAANQgMAAgKADQgrALgrANIAAAaIgUAAg");
	this.shape_820.setTransform(1529.725,965.475);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f("#F7C786").s().p("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");
	this.shape_821.setTransform(959.375,1005.548);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f("#AFBD43").s().p("AhJAAQA/gMBAgMQAKgCAKAAQAAAOgFACQg/AehPAHIAAgbg");
	this.shape_822.setTransform(1516.9,973.475);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f("#CAC75D").s().p("AhKAbIAAgbQBKARATgnQACgEALAAIAWAAIAVAAQAAAOgHAEQgsAjhPAAIgTAAg");
	this.shape_823.setTransform(1499.825,978.8478);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f("#93B922").s().p("AipA1QDtg1iIgkQhxgdB1gOQCWAOBRAaQADAAABANQgMAAgCAFQgTAmhKgRIAAAbQgKAAgKADQhcAnh5ALIAAgbg");
	this.shape_824.setTransform(1486,978.8);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f("#84BE1A").s().p("AAJAIIhhgIIAAgOIB9ASQBCALgSAAQgOAAg+gHg");
	this.shape_825.setTransform(1556.7624,822.6015);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f("#FDFDFB").s().p("AgQA1IgWAAIAAgaQABgngBgoQB7AWhKBAQgHAGAAANIgUAAg");
	this.shape_826.setTransform(1523.9328,703.575);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f("#7CB31D").s().p("AicggQAKAAAFgFQAGgIAAgOQAAgOgFgBQgggNAQg0QBfA4BDBSQAHAIAAANIgVAAIgVAAQAfBQCLgZIAVgBQAAANgHAFQg7Awg4AAQhpAAhbisg");
	this.shape_827.setTransform(1516.6611,706.9442);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f("#84BC18").s().p("Agpg/QBDhgAFBFIALABIAAAaIgLAAQACC3gSAAQgSAAgmi3g");
	this.shape_828.setTransform(1492.4,696.5826);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f("#85BE12").s().p("AANBZQgrgdgBhJIAAgbIAAgaIAAgaQAkAagFBPIALAAQgPA0AfANQAFABAAAOQgLAAgIgEg");
	this.shape_829.setTransform(1499.85,691.6);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f("#C7DDA4").s().p("AhBAZIAAgaQA1AAAxgNQADAAAAgOIAVAAQABAOADAMQAJAfhNAAQgaAAgkgEg");
	this.shape_830.setTransform(1511.8001,679.725);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f("#FEFDFE").s().p("AhSgGQgCgBAAgNQC5ApgSAAQgOAAiXgbg");
	this.shape_831.setTransform(1513.6751,687.0423);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f("#8EB848").s().p("Ag0AoQBPgVgfg9QgFgKAAgOIAUAAIAVAAQAAA2AKAyQABACAKAAQAAAOgDAAQgyANg0gBIAAgag");
	this.shape_832.setTransform(1510.5,672.85);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f("#F8FBEF").s().p("Ag1BBQgKAAgBgCQgKgzABg0QAvgpBiAbQACAAAAAOQAAANgFAJQgoAzg8AgIgWAAg");
	this.shape_833.setTransform(1521.15,670.3009);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f("#9DC152").s().p("ABAAoQAAgNgDgBQhhgagwAoIAAgaIAAgbQAtgVA8gEIAWgBQALANANAJQAIAEAKAAIAAAbIAAAaIgVAAg");
	this.shape_834.setTransform(1522.225,662.175);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f("#84BC10").s().p("AgUBQIgWAAQAAgNgGgJQgvg8gghNQBUBaCrgXIAAAMIgWABQg9AEgtAVIAAAcIAAAaIgUAAg");
	this.shape_835.setTransform(1513.725,658.175);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f("#61901F").s().p("AhpgQIAUAAIAWAAIAVAAIAVAAIAVAAQA+AQAMgoQABgDAKAAIAWAAQgBAOgEALQgGAPgLANIAAAbIgUABQghAGgbAAQhWAAgYg8g");
	this.shape_836.setTransform(1524.35,710.6462);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f("#85BC19").s().p("AAfCeQggithJh1IAAgaQAmBCBZANQALABALAAQADBQgsCZQAAABAAABQgBABAAAAQAAABgBAAQAAAAAAAAIgBgBg");
	this.shape_837.setTransform(1544.6379,719.5145);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f("#69962A").s().p("AAoA2QhagMglhCIAAAaIgWAAIgVAAIAAgaQAsg2CoApIAAgNIAVAAQA1AaguAiQgHAFAAANIgVAAIgVAAIAAAcQgLAAgKgCg");
	this.shape_838.setTransform(1545.9991,706.078);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f("#84B71E").s().p("Ag6BCQAAgNAGgFQAvgjg1gZIAAgbQALgOAGgPQAEgLAAgNQAVAZAqABIAWAAIALAAQAACfg7AAQgXAAgjgbg");
	this.shape_839.setTransform(1562.2001,702.2806);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f("#F0F8E3").s().p("AgIA2QAAgOgEgCQgggMAQgzQAKAAAFgGQAFgIAAgOQAKAOAOAIQAIAGAKAAQAAANgEALQgGAOgLAOIAAAbIgVAAg");
	this.shape_840.setTransform(1555.0221,695.575);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f("#F1E8A7").s().p("AhUgpIB/AAIAWAAIAUAAQAAANgGAIQg0A+gmAAQgtAAgchTg");
	this.shape_841.setTransform(1535.025,686.4118);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f("#83BC12").s().p("AgeAkQgGgIAAgNIAAgaIAAgbQB+gNhZBXQgGAFgKAAQgKAAgFgFg");
	this.shape_842.setTransform(1534.4957,664.7473);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f("#8CBC3A").s().p("ABTAxQgnhLiLAaIAAgaQBKASAUgpQABgDAKAAQAhAAAbALQAFACAAANQALAaAHAcQADAMAAANQgKAAgDgEg");
	this.shape_843.setTransform(1553.125,668.875);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f("#83BB10").s().p("AgqAzQAAgOgFgLQgPgfAAgyQAfA6BeAHIAAAOQgKAAgCAEQgOAcgnAAQgRAAgXgFg");
	this.shape_844.setTransform(1547.825,661.114);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f("#FCFDF8").s().p("AhpADIgVAAQAAgNgFgLQgHgPgKgOQCNgwB1BHQAHAEALAAQALAaAIAbQACANAAANIgVAAIgWAAIh+AAQgLAAgHAFQgNAKgLAAQgdAAgOhEg");
	this.shape_845.setTransform(1554.2,681.9443);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f("#B6CDA5").s().p("AgdAVQgNgHgLgOQgKAAgFgFQgGgHAAgOIB/AAIAVAAQAAANgDACQgoALgpAAIAAAbQgLAAgIgGg");
	this.shape_846.setTransform(1559.55,690.25);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f("#56861D").s().p("AALAoQgrgBgUgZIAAgbQAqAAAmgMQAEgBAAgNIAVAAQAAANgEAMQgGAOgLAOIAAAaIgVAAg");
	this.shape_847.setTransform(1563.775,691.575);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f("#84BC13").s().p("AAIgJQgDgQgUgNQgKAAgIgFQgOgIgLgOQAAgNgDgMQgHgcgLgbQCoA3gKBlQgMCHgRAAQgTAAgXibg");
	this.shape_848.setTransform(1568.5754,680.772);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f("#F3F8E5").s().p("AhfDTQAAgNAHgGQBKhBh8gXQABApgBAnIAAAbIgVAAQAAgNgHgJQhEhShfg4IAAgbIAAhPIAVAAIAVAAQCQAOgNgqQgDgMAAgOQA9ggAng0QAGgJAAgNIAWAAQAAANAGAIQAFAFAKAAQAOBcBWhJQAGgGAAgNQCMgaAnBMQACAEAKAAQALANAOAIQAIAFAKAAIAAAbQgKAAgIgEQh2hHiNAwQAKAOAHAPQAFALAAAOIgWAAIh/AAQA0CbBwiGQAGgIAAgNQATBcAxgjQAGgEALAAQAAANAGAIQAFAFAKAAQAAAOgGAIQgEAFgLAAQgPA0AgANQAEABAAAOIAAAOQipgqgrA3IAAAaQgKAAgCADQgIAdghAAQgOAAgSgFgAkdgOQFPA/lRhNQAAANACABg");
	this.shape_849.setTransform(1533.975,687.8013);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f("#84BE19").s().p("Ag5gCQgDgBAAgNQCHAhgQAAQgNAAhngTg");
	this.shape_850.setTransform(1500.5752,593.0973);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f("#70AC10").s().p("Aj0gNIGTAAIAWAAIAqAAIAWAAQAAANgBAAQh0AOhnAAQiRAAh8gbg");
	this.shape_851.setTransform(1474.3,544.622);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f("#779C1E").s().p("AHKANIq/AAIgUAAIiWAAIgVAAIgrAAIAAgZIOUAAIAVAAIAWAAIAAAZIgWAAg");
	this.shape_852.setTransform(1540.35,541.95);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f("#6DB00F").s().p("Ag+gsQDiBGijASIgMABQhLAAAYhZg");
	this.shape_853.setTransform(1558.4443,561.0805);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f("#2F1707").s().p("AAEAlQgggUgEgqIAAgbQBegKgpBxQgBADgLAAQAAgNgFgEg");
	this.shape_854.setTransform(1583.1408,519.1883);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f("#3F1D09").s().p("ABaBMQhUhPhvgxIAAgbQAqANArALQAKADAKAAQArANArAKQAKAEAKAAQAAANgGAIQgEAEgLAAQALAaAIAcQACANAAANQgKAAgGgEg");
	this.shape_855.setTransform(1558.475,495.175);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f("#85BE19").s().p("AhGgGQEbANkbAAg");
	this.shape_856.setTransform(1346.05,570.675);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f("#85BD18").s().p("EhKPAZbQgRgTgxAOIgWAAIgUAAQgMAAgLACQhqARgqgtQD4gdAuBHIABADQgBAAgPgOgEBH9gZlQDngOCvAnQAKACAKAAQhOARhRAAQiCAAiJgsg");
	this.shape_857.setTransform(895.45,736.4113);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f("#68330F").s().p("AAgA2IhUAAIAAgbQA8AQgIgpQAAgBgKAAIAAgaQAKgOAOgJQAHgEALAAQgQA0AgAMQAFACAAANIAAAbIgVAAg");
	this.shape_858.setTransform(1344.275,532.55);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f("#783D1C").s().p("AgKCeQgciYgEimQAYCMA3BnQAGAKAAANQgMAAgGAFQgOAJgLAOIAAAbQgKAAAAgDg");
	this.shape_859.setTransform(1343.2,516.575);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f("#686808").s().p("AS/AOIuVAAIgVAAI3oAAIAAgbIBVAAIAVAAIPVAAIAVAAIU+AAIAVAAIAAAbIgVAAg");
	this.shape_860.setTransform(1462.575,539.275);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f("#91492E").s().p("ABBAKIgWAAIuqAAIAAgZIbpAAIAVAAQkLAfksAAQiBAAiGgGg");
	this.shape_861.setTransform(1443.35,534.2425);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f("#7F4C19").s().p("AHgANIvUAAIAAgZIAUAAIAWAAIOqAAIAVAAIAAAZIgVAAg");
	this.shape_862.setTransform(1399.7,536.575);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f("#E2E2DE").s().p("Ag/gJQA1AAAygNQACAAAAgNQALAAAFAFQAGAIAAANQAAAMgGAIQgZAZgaAAQghAAglgtg");
	this.shape_863.setTransform(1456.2,450.7272);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f("#945632").s().p("ABKANIipAAIAAgZQBfAABeAMQACAAAAANIgWAAg");
	this.shape_864.setTransform(1389.025,448.425);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f("#D4C4B8").s().p("AA1AbIipAAIAAgaIBrAAIAUAAQAYgfA9AEIAVABQAAANgGAEQgPAJgWAAIAAAaIgVAAg");
	this.shape_865.setTransform(1346.375,441.6528);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f("#825231").s().p("Ah/gNIArAAIAVAAICpAAIAWAAQAAANgCAAQhBAOg3AAQhNAAg4gbg");
	this.shape_866.setTransform(1341.025,445.7685);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f("#DAF5FD").s().p("ABVAUIgVAAIgWAAIiTAAIAAgZIAVAAQBQgiBqAsQAEADAAAMIgVAAg");
	this.shape_867.setTransform(1392.2,426.3061);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f("#DCF1F4").s().p("ACFA3QgLAAgIgEQhygziPgZIAAgbIAVAAIAWAAQBMgJAiAfQAGAFALAAQBOgiAnByg");
	this.shape_868.setTransform(1412.975,433.6238);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f("#C6C3BB").s().p("ABAANIiUAAIAAgaICUAAIAVAAIAAAaIgVAAg");
	this.shape_869.setTransform(1390.075,429.7);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f("#412311").s().p("ABrAzQgrgLgqgNIAAAbQgLAAgHgFQgtghhBgPQAAgNgGgIQgFgFgKAAIAAgcIAVAAQBmA5CBAkQADAAAAAOQgLAAgKgDg");
	this.shape_870.setTransform(1545.675,484.475);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f("#804C31").s().p("AgggKIAAgaIAVAAIAVAAQAKAAAEAEQAHAIAAAOIABAZQAEAWgKAAQgPAAgrgvg");
	this.shape_871.setTransform(1531.9188,485.601);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f("#865032").s().p("AArAnQhGgIgkgsQALAAAFgFQAFgIAAgNQAsAAAYAVQAGAFALAAQAMAAADAFQAGAIAAAOIAAAaIgVgBg");
	this.shape_872.setTransform(1522.2,480.525);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f("#4A2A14").s().p("AAABDIgVAAQAAgOgFgJQgEgFgMAAIAAgaIAAhPQAeA1AwAjQAHAEAAANIgWAAIAAAcIgVAAg");
	this.shape_873.setTransform(1530.75,475.2);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f("#4E2A14").s().p("AAsAlQgXgKgVgOQAAgNgDgBQgbgLghAAIAAgaQBkgLAXBAQAEAMAAAOQgLAAgJgEg");
	this.shape_874.setTransform(1511.575,469.777);

	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#865133").s().p("Ag0ALQAxAOgFgoQgBgNAAgOQAUAOAXAKQAJADAKAAIAAAaQAAANgFAIQgFAFgLAAQgKAAgLADQgOADgMAAQgjAAgCggg");
	this.shape_875.setTransform(1512.625,475.4313);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#734931").s().p("ABVANIi/AAIAAgZIC/AAIAWAAIAAAZIgWAAg");
	this.shape_876.setTransform(1528.625,411);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#5B351C").s().p("AiKgNIAqAAIAWAAIC/AAIAVAAQAAANgCABQhFANg7AAQhTAAg/gbg");
	this.shape_877.setTransform(1525.45,413.6893);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#D0DAD9").s().p("AhUgaIB+AAIAWAAQAMAAADAGQAGAIAAAMQAAANgDABQgtANghAAQhDAAgVg1g");
	this.shape_878.setTransform(1520.1,380.3389);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#D4E2E6").s().p("Ag0AhIAAg0QArglA+gDIAAANIgKABQgFApgvgPIAAAaQAAANgHAJQgPASgVANIAAgbg");
	this.shape_879.setTransform(1476.4,395.65);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#D7E5E7").s().p("AgwATQgDgFgMgBIAAgaQA+gFAtgRQAJgEALAAQAAANgGADQg6AagqAlQAAgNgGgIg");
	this.shape_880.setTransform(1532.9,376.3);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#85BE17").s().p("EhBDAgrQEcANkcAAgEA+2gg3QEdANkdAAg");
	this.shape_881.setTransform(911.125,780.425);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#71AB0F").s().p("AqpgNIU+AAIAVAAIAAANQkqAOkeAAQmQAAl7gbg");
	this.shape_882.setTransform(1174.75,544.622);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#6B3226").s().p("ADAAaImUAAIAAgaQCIgHD2gFIAAgOIAWAAIAVAAIAAAaIAAAaIgVAAg");
	this.shape_883.setTransform(1232.325,532.6);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#5F321D").s().p("AALCGIgVAAQAAgOgDgNQgThFABhbQAkgBgMg1QgDgMAAgOIAVAAQgICKAaBmQADANAAAOIgVAAg");
	this.shape_884.setTransform(1250.4475,516.575);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#4D220E").s().p("AghCGQAAgOgDgNQgbhmAIiKIAAgbQALAOAOAJQAHAEALAAQAMBYAmBDQACAEALAAQAAAPADAMQAYBmhvAGIAAgbg");
	this.shape_885.setTransform(1257.094,516.575);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#5B2B12").s().p("AATCBQglhEgNhXQAkgbgFhPIALAAQgMCBAdBVQAEALAAAOIAAAaQgLAAgCgEg");
	this.shape_886.setTransform(1258.975,505.875);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#70AB0F").s().p("AifgNIEpAAIAWAAQAAANgDABQhOANhDAAQhgAAhLgbg");
	this.shape_887.setTransform(1297.325,544.6393);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#6EAD0E").s().p("AlUgWQFUAAFVANIAAANQiGATiFAAQjPAAjPgtg");
	this.shape_888.setTransform(1238.7,553.5654);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#5C2917").s().p("AArBdIhqAAIAAgaQBvgGgYhlQgDgMAAgOIAAgaQAhBDAIBcQACANAAANIgVAAg");
	this.shape_889.setTransform(1260.05,525.925);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#505B00").s().p("ABAAOIiUAAIAAgbICUAAIAVAAIAAAbIgVAAg");
	this.shape_890.setTransform(1274.95,539.275);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#696A07").s().p("AEAAOIoVAAIAAgbIIVAAIAVAAIAAAbIgVAAg");
	this.shape_891.setTransform(1311.2,539.275);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#91482E").s().p("ADqANInpAAIAAgZQD/AAD/AMQABAAAAANIgWAAg");
	this.shape_892.setTransform(1313.35,533.95);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#7E4C1B").s().p("AEAANIoVAAIAAgZIAWAAIAVAAIHqAAIAVAAIAAAZIgVAAg");
	this.shape_893.setTransform(1311.2,536.575);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#713B1D").s().p("AgDCCQgJgXAAgaIAAgbIAAi7QAkBfgPCSQgBANAAANQgJgBgCgDg");
	this.shape_894.setTransform(1282.6893,513.85);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#57290D").s().p("ACABQIiUAAIgVAAIhrAAIAAgbIBrAAIAVAAIAUAAIAVAAIAVAAQAghCAog9QADgFALAAQAAAbAKAXQABADAKAAIAAA1IAAAaIAAAbIgVAAg");
	this.shape_895.setTransform(1268.55,529.9);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#602D0F").s().p("AgqCaIAAhrQAmgbgOhQQgDgNAAgMQAsgpAUg2IAAAOIAAC6IAAAbQgLAAgDAFQgnA9ggBDIAAgag");
	this.shape_896.setTransform(1277.075,517.2);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#854C2A").s().p("AgNCTIgVAAIAAgaQAkgcgNhQQgCgMAAgNIAAgbIAAhrQALANANAJQAHAFAKAAQAAAMADAOQAOBQgmAbIAABrIAAAaIgUAAg");
	this.shape_897.setTransform(1272.0653,520.55);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#714818").s().p("AB1ANIjpAAIgWAAIAAgZID/AAIAWAAIAAAZIgWAAg");
	this.shape_898.setTransform(1118.25,536.575);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#84442C").s().p("AB1ANIj/AAIAAgZID/AAIAWAAIAAAZIgWAAg");
	this.shape_899.setTransform(1118.25,533.95);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#535D00").s().p("ABrAOIjqAAIAAgbIDVAAIAVAAIAVAAIAAAbIgVAAg");
	this.shape_900.setTransform(1093.725,539.275);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#656906").s().p("ADgAOImUAAIgVAAIgrAAIAAgbIE/AAIAWAAIBqAAIAVAAIAVAAIAAAbIgVAAg");
	this.shape_901.setTransform(1056.375,539.275);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#59340B").s().p("ABrANIjVAAIgVAAIAAgZIAVAAIAWAAIC/AAIAVAAIAAAZIgVAAg");
	this.shape_902.setTransform(1091.6,536.575);

	this.shape_903 = new cjs.Shape();
	this.shape_903.graphics.f("#71AB0E").s().p("Ai0gNIFUAAIAVAAQAAANgCABQhXANhMAAQhtAAhXgbg");
	this.shape_903.setTransform(1073.475,544.6393);

	this.shape_904 = new cjs.Shape();
	this.shape_904.graphics.f("#6D3422").s().p("ABWAaIjAAAIAAgaIAAgaIAWAAQAqAtBmgeQAEgCAAgNQAKANAOAJQAIAEALAAIAAAaIgVAAg");
	this.shape_904.setTransform(1093.725,532.6);

	this.shape_905 = new cjs.Shape();
	this.shape_905.graphics.f("#653319").s().p("AhKCuIAAgcQAmh4gPitQgCgMAAgOIAAgaQBPCdAuC9QADANAAAOQAAANgEABQgqAMgfAAQgvAAgZgag");
	this.shape_905.setTransform(1092.675,512.5822);

	this.shape_906 = new cjs.Shape();
	this.shape_906.graphics.f("#6E3A1D").s().p("AgMCGIAAklIAUAAQAAAOABAMQAPCtgkB4IAAgag");
	this.shape_906.setTransform(1086.5393,511.175);

	this.shape_907 = new cjs.Shape();
	this.shape_907.graphics.f("#9D633F").s().p("AgqguQALAAAEgEQAHgJAAgOQAkACgFA0IALAAQgPAzAfANQAFADAAAMIAAANQhAgegVhZg");
	this.shape_907.setTransform(1119.275,507.85);

	this.shape_908 = new cjs.Shape();
	this.shape_908.graphics.f("#4E5A00").s().p("AFAAOIqUAAIAAgbIIUAAIAVAAIBrAAIAWAAIAAAbIgWAAg");
	this.shape_908.setTransform(1232.3,539.275);

	this.shape_909 = new cjs.Shape();
	this.shape_909.graphics.f("#58330F").s().p("AEAANIoUAAIAAgZIAVAAIBWAAIAVAAIGUAAIAVAAIAAAZIgVAAg");
	this.shape_909.setTransform(1225.9,536.575);

	this.shape_910 = new cjs.Shape();
	this.shape_910.graphics.f("#83AA22").s().p("EAjJAANImUAAIgVAAI1AAAIgWAAIkqAAIgVAAIlqAAIgVAAI0/AAIgVAAIiAAAIgWAAIlVAAIgVAAIiWAAIAAgZIGWAAIAVAAIDrAAIAVAAIFWAAIAVAAIIUAAIAWAAIKVAAIAVAAICUAAIAVAAIIWAAIAVAAIXpAAIAWAAIAAAZIgWAAg");
	this.shape_910.setTransform(1265.3,541.95);

	this.shape_911 = new cjs.Shape();
	this.shape_911.graphics.f("#626703").s().p("AEAAOIoUAAIAAgbIIUAAIAVAAIAAAbIgVAAg");
	this.shape_911.setTransform(1170.475,539.275);

	this.shape_912 = new cjs.Shape();
	this.shape_912.graphics.f("#734616").s().p("AEKANIoTAAIgVAAIAAgZIIoAAIAWAAIAAAZIgWAAg");
	this.shape_912.setTransform(1169.4,536.575);

	this.shape_913 = new cjs.Shape();
	this.shape_913.graphics.f("#5E6403").s().p("ACgAOIlUAAIAAgbIDpAAIAVAAIBAAAIAWAAIAVAAIAAAbIgVAAg");
	this.shape_913.setTransform(1124.675,539.275);

	this.shape_914 = new cjs.Shape();
	this.shape_914.graphics.f("#653317").s().p("AANEWIAAgaIAAgaQAAgOgHgJQgzhFgbhgQAAgNgEgCQgggNAPgzIAAgbIAAgbQBIlRAOEdQAMD5BdCWIAAAaIgVAAIggABIgggBg");
	this.shape_914.setTransform(1130.8081,510.0634);

	this.shape_915 = new cjs.Shape();
	this.shape_915.graphics.f("#A46A45").s().p("AhfBCQBJhDBPg8QAHgFAKAAQALAAAEAFQAHAIAAANQgLAAgEAFQhSBmhMAAIgSgBg");
	this.shape_915.setTransform(1152.375,445.8206);

	this.shape_916 = new cjs.Shape();
	this.shape_916.graphics.f("#B26C48").s().p("AgqABIAAgaIAWAAIAUAAQAKAAAGAGQArAtgaAAQgTAAg4gZg");
	this.shape_916.setTransform(1142.7854,422.9233);

	this.shape_917 = new cjs.Shape();
	this.shape_917.graphics.f("#A5683E").s().p("AgpAaIAAgaIAAgaIA/AAIAUAAIAAAaIAAAaIgUABIg/gBg");
	this.shape_917.setTransform(1187.525,431.075);

	this.shape_918 = new cjs.Shape();
	this.shape_918.graphics.f("#AB6D48").s().p("AgyAjQgNgIgLgOQA3giBIgPQALgDALAAIAAAbIAAAZQgLAAgKADQgrALgqANQgLAAgIgFg");
	this.shape_918.setTransform(1175.825,432.375);

	this.shape_919 = new cjs.Shape();
	this.shape_919.graphics.f("#9B623B").s().p("AgwATQgEgFgLAAIAAgaQAsgBAYgVQAGgFALAAQAKAOANAIQAIAFALAAIgBAMQhJAEggAkQAAgNgGgIg");
	this.shape_919.setTransform(1166.2,437.725);

	this.shape_920 = new cjs.Shape();
	this.shape_920.graphics.f("#AD7655").s().p("AArAoIg/AAIAAgOQgxABAGgnQAWAAAPgLQAGgDAAgNQAqAbAkAgQAGAGAAAOIgVAAg");
	this.shape_920.setTransform(1172.5623,419.075);

	this.shape_921 = new cjs.Shape();
	this.shape_921.graphics.f("#DFE8EA").s().p("ABLAZIgVAAIgWAAIh/AAIAAgZQBggzBaA7QAFAEAAANIgVAAg");
	this.shape_921.setTransform(1163,409.846);

	this.shape_922 = new cjs.Shape();
	this.shape_922.graphics.f("#A56943").s().p("AATBmQgohMgfhPQAKgNAGgQQAFgLABgNQAgBZAtBKQAGAJAAANQAAAOgGAJQgFAEgKAAQgLAAgCgEg");
	this.shape_922.setTransform(1111.85,492.55);

	this.shape_923 = new cjs.Shape();
	this.shape_923.graphics.f("#A76B46").s().p("AgFCKQgkg+gWhMQAWgMAOgTQAHgIAAgNQAUgpAQgqQAGgLAAgNQAKANAOAIQAHAGALAAQAAANgDANQgTBNgqA4QALAbAHAbQAEAMAAAOQAAANgGALQgFAQgLANQAAgNgFgJg");
	this.shape_923.setTransform(1106.525,471.15);

	this.shape_924 = new cjs.Shape();
	this.shape_924.graphics.f("#A06640").s().p("ACcCBQh/iZjHhRQAWAAAPgJQAHgFAAgNQDKBPBfC6QgLABgEgFg");
	this.shape_924.setTransform(1063.85,465.75);

	this.shape_925 = new cjs.Shape();
	this.shape_925.graphics.f("#A87154").s().p("AAvBUQgwhBhJgsQAAgOgEgLQgGgPgLgOQALAAAEgFQAGgJAAgNQBkA3A5BlQACAEALAAQAAANgGAIQgPATgVANQgBgNgGgKg");
	this.shape_925.setTransform(1094.8,460.425);

	this.shape_926 = new cjs.Shape();
	this.shape_926.graphics.f("#9E6242").s().p("AA2AyQhFgSg7ggQCDAVgjhJIAKAAQALANAOAJQAIAEAKAAQAAANgHAIQgDAFgLAAQALAOAGAPQAEALAAAOQgKAAgLgEg");
	this.shape_926.setTransform(1079.825,452.45);

	this.shape_927 = new cjs.Shape();
	this.shape_927.graphics.f("#A97450").s().p("AAqBBIgUgBQg4gMgdgoQAAgMgCgBQg7gHgYghIAAgaQC8gNBnBLQAGAFAAAMIgKAAQAbA6hJAAQgVAAgegFg");
	this.shape_927.setTransform(1068.125,445.901);

	this.shape_928 = new cjs.Shape();
	this.shape_928.graphics.f("#A76F4B").s().p("AgxBYQgOgIgKgNIAAgbQAqg4AfhJQAAgDAKAAQAhgBAbALQAEACAAAOQgKAAgDAEQgwBOgsBOQgLAAgHgGg");
	this.shape_928.setTransform(1116.125,448.45);

	this.shape_929 = new cjs.Shape();
	this.shape_929.graphics.f("#A7704D").s().p("AjOCEQgbgLghAAIAAgbQBKhCBbgyQAGgDAAgOIAWAAIAVAAQCFA5hMhOQgFgGgJAAIAAgaQAsgWA5gRQAEgBAAgOICAAAIAVAAQAAAOAHAIQAEAGALAAQAAANgGADQgQAKgVAAQgHApAygBIAAANQgLAAgKACQkDA3i9CBQAAgNgEgCg");
	this.shape_929.setTransform(1143.825,427.025);

	this.shape_930 = new cjs.Shape();
	this.shape_930.graphics.f("#D4F2F9").s().p("AgmgCQCagMiaAVg");
	this.shape_930.setTransform(1172.425,396.0768);

	this.shape_931 = new cjs.Shape();
	this.shape_931.graphics.f("#894B26").s().p("EBDIAG5I0/AAIAAgbQHBAUF+guIgVAAI7qAAIAAAaIgVAAIgVAAQAAgNgFgCQgggMAQg1QAAgNgGgLQg3hogYiLQAECnAbCXQAAADALAAQALAAAAACQAIAog9gQQAAgNgBAAQkAgNj/AAIAAAaIgWAAIgVAAIAAgaIAAg2QAAgNABgNQAPiTglheIAAgOQgUA2gtAoQgKAAgHgFQgOgJgLgNIAABsIAAAaQgLAAAAgBQgbiqgvhfQAmg2APiFIgKAAIAAgbIAAgaQAcgpAzgYQAFgCAAgOIAWAAQC2BFg3BcIAsAAQIDgiFAjlQAHgFALAAICqAAIAVAAQDiArC1BXQAJAFAKAAQhyCAi4A7QD/gNEYh2QAIgDALAAQDhAHChBFQAIAEALAAQADArA+gOQAKgDAKAAQAkAtBHAIIAVABQBKBQgIg2IgCgaQBBAPAuAhQAHAFALAAQBwAxBUBPQAGAFAKAAQA7AyAkBQQABAEALAAQAFAqAgAUQAGAEAAAOQABAxAPAhQAFALAAANIAAAbIgVAAgA+zG5InAAAQgNg8AKh/IAEgoQgNAUgzCaQr9giruAVQkgAIgfiBQA+gagigiQgHgGAAgOQBAgdAwguQAFgFALAAQBAgQAuggQAHgGALAAQBuACBNgoQAFgBAAgNICSgoQADAAAAgOQDxgpDRBbQAIAEALAAQEoBhjVh3QgIgFgLAAQgKAAgEgGQgggpgoggQALAAAFgHQAGgHAAgOQAtgBAXgVQAHgEAKAAQAygbBMgNQACAAAAgOQBxgcCPACIAVAAQE2DPHMAUQAOACgVhQQgHgZBLgEQAMAAAKgOIAWAAQAqBDAyA+QADAFALAAIAAAZIAAAbIAABQIAAAbQgLAAAAACQgcCchDBtQAAgNADgNQAMg1glgBIAAgaIAAgbIABgbQAGhchHgPIAADWIAAAbIAAAaIAAAbIgVAAg");
	this.shape_931.setTransform(1154.475,493.825);

	this.shape_932 = new cjs.Shape();
	this.shape_932.graphics.f("#E6F4F9").s().p("ABWANIhqAAIgWAAIhAAAIAAgZQBqAABpAMQACAAAAANIgVAAg");
	this.shape_932.setTransform(1336.775,440.425);

	this.shape_933 = new cjs.Shape();
	this.shape_933.graphics.f("#9B613C").s().p("AHUBDQgLAAgIgFQi1hVjigrQAAgOgCAAQhdgNhgAAIAAAbQgLAAgHAFQk/DjoEAiIgsABQA4hci3hFIAAgbQBUhOBugzQAJgEALAAQBrBTCKhTIgLAAIAAgaIAWAAIAVAAIBAAAIAVAAIAAAaIgVAAIgrAAQBfAvCfghQACAAAAgOIAAgaQAVAAAQgKQAGgEAAgNQBbg1COgOQABAAAAgNICUAAIAWAAQCPAYByA0QAJAEALAAQBTBNCDAbQAKADALAAQA/BPA6g6QAHgIAAgNQBcB5DNAWQBJAHA4AkQAgAAAbALQAFACAAANQAAAOABANQAFAqgxgPQgLAAgIgDQiihFjggIQgLAAgIAEQkZB1j+ANQC4g7ByiAg");
	this.shape_933.setTransform(1394.4229,456.475);

	this.shape_934 = new cjs.Shape();
	this.shape_934.graphics.f("#8A5129").s().p("AhfgQIB/AAIAVAAIAVAAIAWAAIAAAaQgLAAgKACQghAFgcAAQhHAAgmghg");
	this.shape_934.setTransform(1312.275,443.4262);

	this.shape_935 = new cjs.Shape();
	this.shape_935.graphics.f("#A96334").s().p("Ah6gGIAAgbIAWAAIAVAAQA0AtB2gQQAKgCALAAIALAAQhFAog9AAQg9AAg2gog");
	this.shape_935.setTransform(1310.675,445.15);

	this.shape_936 = new cjs.Shape();
	this.shape_936.graphics.f("#B6B7AD").s().p("ABAANIh/AAIgVAAIAAgZQBVAABTAMQABAAAAANIgVAAg");
	this.shape_936.setTransform(1309.05,440.425);

	this.shape_937 = new cjs.Shape();
	this.shape_937.graphics.f("#62341D").s().p("AgCAcQgYgPAAg1QBCBRgRAAQgGAAgTgNg");
	this.shape_937.setTransform(1234.9817,475.1666);

	this.shape_938 = new cjs.Shape();
	this.shape_938.graphics.f("#844B2E").s().p("AgNBDQANhDgkgMIAAgcQAkgJAPgpQABgDALABIAKAAQgPCDglA3QAAgOACgNg");
	this.shape_938.setTransform(1263.775,483.2);

	this.shape_939 = new cjs.Shape();
	this.shape_939.graphics.f("#763F21").s().p("AATELQAAgOgCgMQgIhegghDQAAgOgEgLQgehVANiBQAAgOADgNQALg1gkAAIAAgbIAWAAQAlANgOBDQgCANAAAOQAuBgAbCoQAAABALAAQAAAPACAMQAOBQglAcIAAAaIgVAAg");
	this.shape_939.setTransform(1264.5691,508.575);

	this.shape_940 = new cjs.Shape();
	this.shape_940.graphics.f("#55301C").s().p("AgJBZQgOgJgLgOIAAAbIgVAAIAAgbIAAgbQAVAAAQgJQAGgDAAgOIAAgZQAKgOAGgPQAEgMAAgNQAKAAAFgFQAGgIAAgNQAkAAgLA1QgDANAAAOIgLAAQAFBOglAbQgKAAgHgEg");
	this.shape_940.setTransform(1254.9892,493.875);

	this.shape_941 = new cjs.Shape();
	this.shape_941.graphics.f("#C6BFBC").s().p("AhfBsIAAg3QBJhpBlhMQAHgEAKgBQAAAOgFACQgzAZgdAoIAAAaIAAAbQgLgBAAADQgOApgmAJIAAAcIgVAAIAAAbQAAANgHAHQgEAGgLAAIAAgag");
	this.shape_941.setTransform(1265.325,473.8);

	this.shape_942 = new cjs.Shape();
	this.shape_942.graphics.f("#81726A").s().p("AgOBZQgegXAQhCIAAgZIAAhRQA5A6gFCAIALAAQAAAOgGADQgQAKgUgBQAAgMgHgFg");
	this.shape_942.setTransform(1250.186,487.15);

	this.shape_943 = new cjs.Shape();
	this.shape_943.graphics.f("#5C3A2A").s().p("AADA/QglgKAQhCQALgNAGgPQADgLAAgNIAWAAIAAAaIAABQIAAAaQgLAAgKgEg");
	this.shape_943.setTransform(1244.8733,480.5);

	this.shape_944 = new cjs.Shape();
	this.shape_944.graphics.f("#63331A").s().p("AiVFbIhVAAQAAgNgGgFQgfgWAPhCQAiigBbhlQBviAA/irQBfAVAZgcQAHgHAAgNIAVAAQALAbAIAcQADAMAAANQAAANgFALQgGAQgLAMQgPBDAlALQALADAKAAQgPBCAeAXQAGAFAAAMIAAAbIAAAaQAAAOADAMQANA1glACQgBBbATBGQADAMAAAOIAAANQj3AFiHAJIAAAaIgWAAgABtjhQBFAshdhxQAAA2AYAPg");
	this.shape_944.setTransform(1223.8122,500.55);

	this.shape_945 = new cjs.Shape();
	this.shape_945.graphics.f("#764E37").s().p("AAVBeQAAgOgDgMQgIgcgKgbQAAgNgEgLQgRgqgVgoIAVAAIAVAAQAxA0gGBrIgBAcIgVAAg");
	this.shape_945.setTransform(1243.0324,464.5);

	this.shape_946 = new cjs.Shape();
	this.shape_946.graphics.f("#A68366").s().p("AAVA2IgVAAQgJAAgIgGQgOgIgLgOIAAgaIAAg1QAqAoAkAtQAHAIAAAOIgWAAg");
	this.shape_946.setTransform(1238.675,449.775);

	this.shape_947 = new cjs.Shape();
	this.shape_947.graphics.f("#673316").s().p("AgUAWQgLAAgKgEQgtgLgTglQBpAABpAMQABAAAAAOQAAAMgGAHQgOAQglAAQgcAAgpgJg");
	this.shape_947.setTransform(1230.175,466.3169);

	this.shape_948 = new cjs.Shape();
	this.shape_948.graphics.f("#7E4522").s().p("AmJI+IhqAAQAAgNgCAAQh0gNh1AAQAAgOgGgDQhOgtgsAkQACiShtgqQgjhvhHhMQAAgNADgNQA1jFjjB1QAAgOgGgIQgFgFgLAAIAAgbQALAAAFgEQAGgIAAgOQALAAAEgFQAGgIAAgNQBZg3CSABIAVAAQBVh4DAgNQDIBQB/CbQAEAEAKAAQhei7jMhQQgLAAgJgDQgXgKgVgNIAAgbIAVAAICBAAIAVAAQAdApA4ALIAVABQA7AhBGASQAKADAKAAQBJAtAxBCQAHAJAAANQAWBNAkA8QAGAKAAANQAfBQApBMQACAEAKAAQAUBaBBAeIAAgNQAaBgA1BFQAGAJAAAOIgVAAIj/AAQgLAAgHgGQgOgIgKgNQAAgOgDgNQgui+hQidIAAAaIgVAAIAAEmIAAAaIAAAcIgVAAIAAAbIAAAaIgWAAIgVAAIAAAaIgVAAgAM1IkIgVAAIoqAAQheiWgMj6QgOkchIFQIAAAbIAAAbIgLAAQAFg1glgBQAAgNgGgJQgshMgihYQAAgOgEgLQgHgcgKgaQAqg5AShOQADgNAAgNQAthNAwhPQADgEAKAAQC8iBEEg4QALgCAKAAIBAAAIAVAAQALAOAOAIQAHAFALAAIAAAaQgLAAgKADQhJAPg3AjQgLAAgGAGQgZAUgsABIAAAbQgKAAgHAFQhQA9hJBDQBVAOBch0QAEgEALAAQAfgkBLgEIAAgOQArgNAsgLQAJgDALAAIBAABIAVgBQC1B0DhBEQAKADAKAAQALAOAOAIQAIAGAKAAQAVAnARAqQAFAMAAAOIgWAAQAAgOgBAAQhpgNhqAAQATAmAtAMQAKADALAAQg/CrhwB/QhbBnghCfQgPBCAeAXQAGAEAAAOIgVAAg");
	this.shape_948.setTransform(1116.075,480.475);

	this.shape_949 = new cjs.Shape();
	this.shape_949.graphics.f("#B38E70").s().p("ABKANIhUAAIgVAAIhAAAIAAgZQBfAABeAMQACABAAAMIgWAAg");
	this.shape_949.setTransform(1192.875,427.05);

	this.shape_950 = new cjs.Shape();
	this.shape_950.graphics.f("#E3EFF2").s().p("AA1AZIh/gZIAAgaIBVAAIAVAAQgHApAygCIAAAOQgLAAgLgCg");
	this.shape_950.setTransform(1218.475,431.025);

	this.shape_951 = new cjs.Shape();
	this.shape_951.graphics.f("#AB734D").s().p("ADBB3QjghEi1hzIAAgaIAAgbIBVAAIAWAAQA+gQALAoQACADAKAAIB/AYQALACALAAQANBFBEAXQADAAAAAOIAAA2IAAAaQgKAAgKgDg");
	this.shape_951.setTransform(1213.075,440.1566);

	this.shape_952 = new cjs.Shape();
	this.shape_952.graphics.f("#6DB108").s().p("AgeOhIAAgbIAAiFQBEgRgvC+gAgeBKIAAgbIAAlaQBHAtgLETQgDBJgZAAQgNAAgTgUgAgesMIAAgbIAAiFQBEgRgvC+g");
	this.shape_952.setTransform(1892.0729,682.8052);

	this.shape_953 = new cjs.Shape();
	this.shape_953.graphics.f("#6DAE0A").s().p("Eh1QApjIhUAAIgWAAIirAAIgVAAQABgOgDAAQhTgNhVAAIgVAAIhrAAQAAgNgCgBQhTgMhWAAIgVAAIgWAAQABgOgCAAQhUgOhVAAIgVAAIgVAAQgBgNgCAAQhTgNhVAAQAAgNgCAAQhTgOhVAAQAAgNgDgBQhTgMhVAAIAAgbIAVAAIAVAAQIWicFYjVQAHgGALAAQB5jWAtimQAbhmhsACIAAgbQArAAAmgMQAFgBAAgOIAUAAIAWAAIAVAAQBFgTBOgUQADgBAAgNIAVAAIAVAAIBAAAIAWAAQEGAaBKglQAFgDAAgNIAVAAICVAAIAVAAQCWAACUgNQACAAgBgNQArgBAqABIAVAAQBMgBBKABIAVAAQCDALBMgwQAGgEABgNIAqAAIAWAAQBQgHBAgfQAFgCAAgNQBeAYgThMQAAgCgLAAQAAgNgDgBQhigVhcgTIgUAAQg1ABg2gBQAAgNgHgIQgEgFgKAAIAAgNQhhAFgfgtQAfAAAcgMQAFgCAAgNIBAAAIAVAAQBVAABTgNQACgBABgNICVAAIAWAAIA/AAIAVAAQA1AuB2gSQAJgBANAAQE8AbFXAAIAWAAIArAAIAWAAQAqAtBrgRQAKgCAKAAQBFA5BmAVQALADAKAAQAWA1AdAwQADAFALAAQAAAbAJAXQACADAJAAQAAAOgEALQh2ENlEgaIAAAaIgWABIhBgBIgVABQmwAOllBdIAAAaIgUACIiAAZQgLAAgKAEQhSAmhuAMIAAAaIgWAAIhVAAIAAAbQgLAAgJADQpjDUneFaIAAAaQgKAAAAACQgEAogygOIAAAaIAAAbIgWAAgECJgACxQgOgcgtgCQAAgNgCgNQgIgbgLgbQAli6gPjwIgBgcIAWAOQAvi+hFARIAAgcIAAqcQA5A7AEhvQAMkVhJgtIAAgaIAAnHIAWANQAvi+hFARIAAgbIAAlbQBGA8A0hBQAHgIAAgNQBKgBBKABIAVAAMAAAAqJIAAAbQgJAAgHAFQgsAhhYgMQAHBUB5gcQAKgCAKAAIAAAbIgVAAQh7gEhaAfQABgOgGgKg");
	this.shape_953.setTransform(1014.8,814.4875);

	this.shape_954 = new cjs.Shape();
	this.shape_954.graphics.f("#59A300").s().p("AgigCQgDgBAAgMQBUAfgLAAQgHAAg/gSg");
	this.shape_954.setTransform(1877.8129,550.3164);

	this.shape_955 = new cjs.Shape();
	this.shape_955.graphics.f("#6EAF08").s().p("Ag/ALIAAgZQAngnBUAYQAEABAAAOQAAANgHAHQgbAigfAAQgdAAghgdg");
	this.shape_955.setTransform(1895.35,550.1932);

	this.shape_956 = new cjs.Shape();
	this.shape_956.graphics.f("#545D01").s().p("AB/AOIkTAAIAAgbIAVAAID+AAIAWAAIAAAbIgWAAg");
	this.shape_956.setTransform(1903.85,539.275);

	this.shape_957 = new cjs.Shape();
	this.shape_957.graphics.f("#70AC0E").s().p("ACKAbQhKgBhJABQAAgOgEgBQhVgXgnAmQAAgOgFgLQgGgPgLgNIAWAAIETAAIAWAAIAAAaIAAAbIgWAAg");
	this.shape_957.setTransform(1902.775,545.975);

	this.shape_958 = new cjs.Shape();
	this.shape_958.graphics.f("#82AA27").s().p("AB/ANIkTAAIAAgZIETAAIAWAAIAAAZIgWAAg");
	this.shape_958.setTransform(1903.85,541.95);

	this.shape_959 = new cjs.Shape();
	this.shape_959.graphics.f("#5D380D").s().p("AB1ANIj+AAIAAgZID+AAIAVAAIAAAZIgVAAg");
	this.shape_959.setTransform(1904.9,536.575);

	this.shape_960 = new cjs.Shape();
	this.shape_960.graphics.f("#6A351C").s().p("AB1BQIj/AAIAAgaQBdAEAxgoQAHgEAAgOQA7ghAzgpQAHgFAKAAQABBDgBBCIAAAaIgVAAg");
	this.shape_960.setTransform(1904.925,527.225);

	this.shape_961 = new cjs.Shape();
	this.shape_961.graphics.f("#592D13").s().p("AAhBQIjVgaIAAgbQCxguCkg5QAKgDAKAAIAAA2IAAAZQgKAAgHAFQgzAqg7AhIgVAAg");
	this.shape_961.setTransform(1900.625,519.2);

	this.shape_962 = new cjs.Shape();
	this.shape_962.graphics.f("#613415").s().p("AhKAAIB/gYQALgCALAAQAAAOgFADQhAAdhQAHIAAgbg");
	this.shape_962.setTransform(1900.675,497.825);

	this.shape_963 = new cjs.Shape();
	this.shape_963.graphics.f("#7E4521").s().p("AhnFnQhAgHAWjoQBihLBRhYQAhgkgHhCQgFgthIASIAAgcQAkgJAEgsQABgNAAgOQBUgKAfhCQADgEAKAAIAAIwIAAAbQgWAAgPAJQhlA6hfBDIgWgCg");
	this.shape_963.setTransform(1903.5797,432.425);

	this.shape_964 = new cjs.Shape();
	this.shape_964.graphics.f("#623220").s().p("AhJAKQBFgUA7gcQAJgFAKAAIAAAbIAAAaQgKAAgGAFQghAdgeAAQgjAAghgig");
	this.shape_964.setTransform(1911.325,387.3275);

	this.shape_965 = new cjs.Shape();
	this.shape_965.graphics.f("#C0BEBC").s().p("AgpAoIhWAAIAAgbQBughB8gSIAVgBIAAAaQgKAAgJAFQg9AbhEAVIgVAAg");
	this.shape_965.setTransform(1905.975,384.325);

	this.shape_966 = new cjs.Shape();
	this.shape_966.graphics.f("#65341F").s().p("AguAoQg+ADgDgrQBMAJAjgeQAGgFAKAAQAtgBAXgUQAHgFAKAAQAAANAGAKQAfAzi4Afg");
	this.shape_966.setTransform(1874.5219,396.325);

	this.shape_967 = new cjs.Shape();
	this.shape_967.graphics.f("#B7A89B").s().p("AhVAAQALAAAFgEQAGgJAAgMIB/AAIAVAAQAAAMgDACQgnALgrAAQgKAAgGAFQgXAVguABIAAgbg");
	this.shape_967.setTransform(1884.65,391);

	this.shape_968 = new cjs.Shape();
	this.shape_968.graphics.f("#D9F0FC").s().p("AALAbIg/AAIAAgaQATgZAsgBIAUgBQAAAOAHAIQAFAFAKAAQAAAMgGAJQgFAFgLAAIgUAAg");
	this.shape_968.setTransform(1872.95,388.3);

	this.shape_969 = new cjs.Shape();
	this.shape_969.graphics.f("#D8EFF1").s().p("ABAAOIh/AAQgKAAgFgFQgHgJAAgNICVAAIAVAAIAAAbIgVAAg");
	this.shape_969.setTransform(1884.65,386.975);

	this.shape_970 = new cjs.Shape();
	this.shape_970.graphics.f("#57350C").s().p("ABAANIiUAAIAAgZIB/AAIAVAAIAWAAIAAAZIgWAAg");
	this.shape_970.setTransform(1784.5,536.575);

	this.shape_971 = new cjs.Shape();
	this.shape_971.graphics.f("#5A2814").s().p("AA/AoIhVAAIAAgNQhOAGAOhIIArAAIAVAAQB6ALgMAqQgEANAAANIgVAAg");
	this.shape_971.setTransform(1767.5155,531.225);

	this.shape_972 = new cjs.Shape();
	this.shape_972.graphics.f("#582516").s().p("ABAAWIiUAAIAAgZQBvgnAzAtQAHAGAAANIgVAAg");
	this.shape_972.setTransform(1842.05,533.0429);

	this.shape_973 = new cjs.Shape();
	this.shape_973.graphics.f("#502D09").s().p("ACAANIgWAAIj+AAIAAgZIEUAAIAVAAIAAAZIgVAAg");
	this.shape_973.setTransform(1876.15,536.575);

	this.shape_974 = new cjs.Shape();
	this.shape_974.graphics.f("#5E2A17").s().p("ABgA1IkUAAIgVAAIhBAAIAAgaQC7AIBfhTQAFgEALAAIDVAaIAWAAQAAAOgHAEQgyAnhdgEIAAAaIgVAAg");
	this.shape_974.setTransform(1879.35,529.925);

	this.shape_975 = new cjs.Shape();
	this.shape_975.graphics.f("#465200").s().p("ACVAOIk/AAIAAgbIArAAIAWAAID+AAIAWAAIAAAbIgWAAg");
	this.shape_975.setTransform(1871.875,539.275);

	this.shape_976 = new cjs.Shape();
	this.shape_976.graphics.f("#482700").s().p("ACKANIkpAAIAAgZIAVAAIBqAAIAWAAICUAAIAWAAIAAAZIgWAAg");
	this.shape_976.setTransform(1809.025,536.575);

	this.shape_977 = new cjs.Shape();
	this.shape_977.graphics.f("#3F1F00").s().p("ACgANIgrAAIgVAAIkUAAIAAgZIAVAAIArAAIAVAAICUAAIAVAAIAWAAIBAAAIAVAAIAAAZIgVAAg");
	this.shape_977.setTransform(1843.125,536.575);

	this.shape_978 = new cjs.Shape();
	this.shape_978.graphics.f("#6F3C1B").s().p("Ag/ACQAfgjBLAHQAKACALAAQAAANgFADQg7AXg/ANIAAgag");
	this.shape_978.setTransform(1822.85,524.4103);

	this.shape_979 = new cjs.Shape();
	this.shape_979.graphics.f("#733D20").s().p("AhpA1IgWAAIAAgaIAAgbQB9gTBtgfQAKgCALAAIAAAaIgWAAQgKAAgIAEQhHAnhmAKIAAAaIgUAAg");
	this.shape_979.setTransform(1803.675,529.925);

	this.shape_980 = new cjs.Shape();
	this.shape_980.graphics.f("#69321C").s().p("AALAoIhqAAIAAgaQBmgKBGgnQAJgEAKAAQAAAOgEABQgoANgUAZIAAAaIgVAAg");
	this.shape_980.setTransform(1804.7,531.225);

	this.shape_981 = new cjs.Shape();
	this.shape_981.graphics.f("#7C441E").s().p("AhCgEIAAgbIAVAAIAWAAQALAAAHAFQBfA6gfAAQgXAAhmgkg");
	this.shape_981.setTransform(1810.3279,517.077);

	this.shape_982 = new cjs.Shape();
	this.shape_982.graphics.f("#6C391C").s().p("Ak0D9IgWAAIAAgaQFJjmE6j0QAHgFAKAAQABCSgBCSIAAAaIgWAAIhUAAQgLAAgKACIiBAZIAAAbQgKAAgIAFQiVBUjCAsIgVAAg");
	this.shape_982.setTransform(1885.75,488.525);

	this.shape_983 = new cjs.Shape();
	this.shape_983.graphics.f("#51250E").s().p("AjfDIQAAgNgHgGQgzguhwAnIAAAaIgWAAIgqAAIAAgaIAAgbQAsgWA6gQQAEgCAAgNIC7hbQAFgDAAgNQDBgsCWhUQAIgFAKAAQBRgGBAgeQAFgEAAgNIBUAAIAWAAQABBDgBBDIAAAaQgKAAgKADQilA4iyAvIAAAbQgKAAgGAFQheBTi7gIIAAAaIgVAAg");
	this.shape_983.setTransform(1872.975,515.2);

	this.shape_984 = new cjs.Shape();
	this.shape_984.graphics.f("#5E2C15").s().p("AAWBQIgWAAIiUAAIAAgaQAUgaAogNQAEgBAAgOIAVAAQA/gMA7gYQAFgDAAgNQAtgCAYgUQAGgFAKAAIAAAbIAAAbQAAANgEACQg5APgtAWIAAAbIAAAaIgVAAg");
	this.shape_984.setTransform(1822.825,527.225);

	this.shape_985 = new cjs.Shape();
	this.shape_985.graphics.f("#5B2C11").s().p("AhfAbIAAgbQAhAAAagKQAFgDAAgMQAqAAAmgNQAEgBAAgOIAWAAIAVAAQAAAOgFADIi6BaIAAgbg");
	this.shape_985.setTransform(1847.35,519.225);

	this.shape_986 = new cjs.Shape();
	this.shape_986.graphics.f("#7B4220").s().p("AgUAXQgwABAFgoQA8gwA1BEQAEAFALAAQAAAOgEABQgnANgqAAg");
	this.shape_986.setTransform(1846.247,512.9196);

	this.shape_987 = new cjs.Shape();
	this.shape_987.graphics.f("#7C4623").s().p("AnzJbIiAAAQgBgNAEgNQAMgrh6gLQgBgNgEgCQgbgLggAAIAAgbQEKAaCihLQAJgEALAAQDoBUishrQgHgFgLAAIAAgaQBViNDqAHIAVAAQA0g/BigPQAKgCALAAQC+mMDtleQBJgSAEAtQAIBCgiAkQhRBZhjBLQgVDoBAAHIAVACQBhhDBkg6QAQgJAVAAIAAA1IAAAcQgJAAgHAFQk7DzlJDnIAAAaQgKAAgFgFQg2hFg7AwQgGApAxgBIAAAOQAAAMgFADQgbALggAAQgKAAgGAFQgYAUgsACQgMAAgJgCQhNgHgeAkQgLAAgKACQhvAfh8AUIAAAbIAAAaIgVAAg");
	this.shape_987.setTransform(1838.8,474.9179);

	this.shape_988 = new cjs.Shape();
	this.shape_988.graphics.f("#6C391D").s().p("ArbJUQgOgIgLgOQKLnTIYpEQAGgHAAgNQCRg6CagvQAKgCALAAQAAAOgCANQgDArgmAJIAAAcQjtFfi9GMQgLAAgLABQhhAQg0A+IgWAAQjpgHhVCNIAAAbIgWAAIgVAAIAAAbQgKAAgJAEQiiBLkLgaIAAAbQgKAAgHgFg");
	this.shape_988.setTransform(1830.325,464.475);

	this.shape_989 = new cjs.Shape();
	this.shape_989.graphics.f("#5CA106").s().p("Ai/gXQDEgxC2BVQAFADAAANQg/ANg8AAQiIAAh8hBg");
	this.shape_989.setTransform(1652.325,577.7887);

	this.shape_990 = new cjs.Shape();
	this.shape_990.graphics.f("#82BE17").s().p("AhqgkQAyAbBOAAIAVAAQAgAAAbAKQAFACAAANQAAAOgDAAQglAHggAAQhlAAgohJg");
	this.shape_990.setTransform(1648,635.1779);

	this.shape_991 = new cjs.Shape();
	this.shape_991.graphics.f("#84BD18").s().p("EhewAgoICAgZIAUgBIAMAAQgsBHgtAAQgjAAgkgtgEBaxgbEIArAAIAVAAQBVAbBXAYQAJADALAAIAAANIgVAAQiRAAhahDgEBAjghBQgGgGAAgNQE6gDgtBOQgCAFgLAAQgfADgbAAQh/AAhBhAg");
	this.shape_991.setTransform(1022.325,794.0403);

	this.shape_992 = new cjs.Shape();
	this.shape_992.graphics.f("#83BC14").s().p("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");
	this.shape_992.setTransform(976.4362,868.907);

	this.shape_993 = new cjs.Shape();
	this.shape_993.graphics.f("#68A01F").s().p("AlpALIAAgZIDqAAIAVAAIGqAAIAVAAIAVAAIAAAZIgVAAQi2AEiuAAQiwAAiqgEg");
	this.shape_993.setTransform(1624.575,542.1);

	this.shape_994 = new cjs.Shape();
	this.shape_994.graphics.f("#3A1D10").s().p("ADLDVIjqAAQAAgNgFgLQgPgggBgyQAKAAACgDQAohxhfAJIAAAbQgLAAgBgEQgkhOg7gzQAAgOgCgMQgIgcgLgaQALAAAEgFQAGgIAAgNQCEAmBpA/QAIAFAKAAQBvCHA8C4IgVAAg");
	this.shape_994.setTransform(1589.375,513.9);

	this.shape_995 = new cjs.Shape();
	this.shape_995.graphics.f("#2F4B00").s().p("AB1AOIjpAAIgWAAIAAgbID/AAIAVAAIAAAbIgVAAg");
	this.shape_995.setTransform(1600.05,539.275);

	this.shape_996 = new cjs.Shape();
	this.shape_996.graphics.f("#261400").s().p("ACAANIgWAAIj+AAIAAgZIDpAAIAVAAQAWAAAPAJQAGADAAANIgVAAg");
	this.shape_996.setTransform(1601.125,536.575);

	this.shape_997 = new cjs.Shape();
	this.shape_997.graphics.f("#331A09").s().p("ACgAoIlUAAIAAgbQBrAABngNQACAAAAgMQAgAAAbgLQAFgDAAgNQAsAPAaAgQAEAFALAAIAAAbIgVAAg");
	this.shape_997.setTransform(1638.425,533.925);

	this.shape_998 = new cjs.Shape();
	this.shape_998.graphics.f("#314D00").s().p("ADKAOImpAAIAAgbIAVAAIAVAAIAWAAIFUAAIAVAAIAWAAIAAAbIgWAAg");
	this.shape_998.setTransform(1636.3,539.275);

	this.shape_999 = new cjs.Shape();
	this.shape_999.graphics.f("#3C1E10").s().p("AgfBCIAAifQCACAiAA7g");
	this.shape_999.setTransform(1623.5375,520.575);

	this.shape_1000 = new cjs.Shape();
	this.shape_1000.graphics.f("#391B0B").s().p("AgKBoQgZhvgchjIAVAAQAnBeA9BHQAGAIAAANQAAANgFADQgbALggAAQgKAAAAgDg");
	this.shape_1000.setTransform(1641.6,521.925);

	this.shape_1001 = new cjs.Shape();
	this.shape_1001.graphics.f("#6E9E1C").s().p("ANqANIgVAAI7UAAIAAgZIWUAAIAVAAIFAAAIAVAAIAAAZIgVAAg");
	this.shape_1001.setTransform(1799.4,541.95);

	this.shape_1002 = new cjs.Shape();
	this.shape_1002.graphics.f("#452301").s().p("AFKApIqTAAIAAgbQAAgNgGgLQgFgPgLgNQA9gMgIBAIALAAIH+AAIAWAAIBVAAIAWAAIAAAbIgWAAg");
	this.shape_1002.setTransform(1740.775,533.8248);

	this.shape_1003 = new cjs.Shape();
	this.shape_1003.graphics.f("#6CAD0A").s().p("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");
	this.shape_1003.setTransform(926.35,745);

	this.shape_1004 = new cjs.Shape();
	this.shape_1004.graphics.f("#5DA106").s().p("AJ5YXQAbgTgigsQAegJArghQANgLAkgHQA5gKCig/Qh7hTBRhoQAfgkA7AkQDRCAgWk7QByheCjh4IAWAAQgkk2AOkWQhSgZASi8QgfAoAIgbQA7i8h5hcIhVAAQgrAAgBgGQgjjqiHCFQgVgNgPgTIgaghQA8AVAthZIhVAAQgrAAgBgIQgtj0h8CRQh6ASg1hSQhHhwg0gLQgRBNg3goIgOgLQBZiPhuAKQAAANgEABQjrBAAvhpIgVgCQj+gujWiLQAKgOAJACQCHARAGhWQAJiHBWgzIgqAAQhAAAgpAeQixCIh7imQggAAgTAPQiQB8ioggQhsgFBYgRIAfgFQhzgNgtgpIggAAQD6g+kagSQgVAAgVgEQgngGAPgIQCUhSjnAwQgWAMgEASIgGAWQkuALkyh2ILAAAIAVAAQFUAGFsgGIAVAAIC/AAIAWAAID/AAIAVAAIbUAAIAWAAQALAOAGAPQAEALAAAPIAAAaIAAFbIAAAbIAACFIAAAbIAAHGIAAAbIAAFbIAAAbIAAKbIAAAbIAACFIAAAbIABAbQAPDwglC7QALAcAHAbQADAMAAAOQAAANgHAIQgDAFgLAAQALANAGAQQAEAMAAANIgVAAIgWAAIgVAAQiCABhoAZIAAAbIgWAAIgqAAIgWgBQhxgOg5AqIAAAbIgVAAIhWAAIgVAAIgVAAQAAgOADgMQAMgriQAPQADArA+gDIAAAOQgLAAgDAFQgeAohVgTIAAAbQgKAAgKADQiHAxi6ACQAAgOAHgEgAVyVgQEdAAkdgNgAa13kQCSAsiVg5QAAAMADABg");
	this.shape_1004.setTransform(1702.6267,700.925);

	this.shape_1005 = new cjs.Shape();
	this.shape_1005.graphics.f("#6FA01E").s().p("ABVANIi/AAIAAgZICVAAIAVAAIAVAAIAVAAIAAAZIgVAAg");
	this.shape_1005.setTransform(1671.45,541.95);

	this.shape_1006 = new cjs.Shape();
	this.shape_1006.graphics.f("#6C9E1B").s().p("AB2ANIkAAAIAAgZIEAAAIAVAAIAAAZIgVAAg");
	this.shape_1006.setTransform(1695.975,541.95);

	this.shape_1007 = new cjs.Shape();
	this.shape_1007.graphics.f("#3C4D00").s().p("ANgAOI2UAAIgVAAIkAAAIgWAAIgVAAIAAgbIArAAIAVAAIDWAAIAVAAIKUAAIAVAAICWAAIAVAAIEqAAIAWAAIEVAAIAVAAIAAAbIgVAAg");
	this.shape_1007.setTransform(1766.325,539.275);

	this.shape_1008 = new cjs.Shape();
	this.shape_1008.graphics.f("#425300").s().p("ABKAOIiUAAIgVAAIAAgbICpAAIAWAAIAAAbIgWAAg");
	this.shape_1008.setTransform(1668.275,539.275);

	this.shape_1009 = new cjs.Shape();
	this.shape_1009.graphics.f("#642D23").s().p("ABrANIgWAAIjUAAIAAgZQB/AAB+AMQACAAAAANIgVAAg");
	this.shape_1009.setTransform(1673.6,533.95);

	this.shape_1010 = new cjs.Shape();
	this.shape_1010.graphics.f("#4D2E0A").s().p("AB1ANIgqAAIgWAAIipAAIgWAAIAAgZIAWAAIAVAAIDUAAIAWAAIAAAZIgWAAg");
	this.shape_1010.setTransform(1670.4,536.575);

	this.shape_1011 = new cjs.Shape();
	this.shape_1011.graphics.f("#2D1300").s().p("ABgANIjUAAIAAgZIAVAAIAVAAICqAAIAWAAIAAAZIgWAAg");
	this.shape_1011.setTransform(1696,536.575);

	this.shape_1012 = new cjs.Shape();
	this.shape_1012.graphics.f("#4B2110").s().p("AhkBQQAHhBg8AMQAKANAGAPQAFAMAAANIgVAAIirAAIAAgaQB9hjDWgUIABgOQD9AOA4BcIgKAAQitg7gTA7IAqAAIArAAQhBAtjogFIAAANg");
	this.shape_1012.setTransform(1721.025,527.225);

	this.shape_1013 = new cjs.Shape();
	this.shape_1013.graphics.f("#733A17").s().p("AhKAYIAAgaQBYALArggQAHgFALAAQAAAMgHAKQgaAjg/AAQgYAAgdgFg");
	this.shape_1013.setTransform(1698.125,466.1017);

	this.shape_1014 = new cjs.Shape();
	this.shape_1014.graphics.f("#633417").s().p("AhVgMICVAAIAVAAQAAAMgBAAQhUANhVAAIAAgZg");
	this.shape_1014.setTransform(1688.5,475.175);

	this.shape_1015 = new cjs.Shape();
	this.shape_1015.graphics.f("#7D4623").s().p("Ag0gCQALAAAEgGQAGgIAAgNIAqAAIAVAAQALANAGAPQAEAKAAAOQgKAAgKACQgTAFgOAAQgrAAgJggg");
	this.shape_1015.setTransform(1683.175,466.1519);

	this.shape_1016 = new cjs.Shape();
	this.shape_1016.graphics.f("#4A2D14").s().p("Ag0gEQDTgKjTAWg");
	this.shape_1016.setTransform(1710.9,431.559);

	this.shape_1017 = new cjs.Shape();
	this.shape_1017.graphics.f("#704427").s().p("AhUgPQBUAABTAMQACABAAAMIgVACQgdAEgZAAQg/AAgfgfg");
	this.shape_1017.setTransform(1603.225,397.9831);

	this.shape_1018 = new cjs.Shape();
	this.shape_1018.graphics.f("#D6E2E6").s().p("AkfAPIAAgaQD+glErAKIAWABQAAANgGAEQgQAJgVAAIgWAAIkpAAIAAAaIgVAAQhvgBhRAbIAAgag");
	this.shape_1018.setTransform(1580.875,362.7936);

	this.shape_1019 = new cjs.Shape();
	this.shape_1019.graphics.f("#A68D7F").s().p("AifgMIEpAAIAWAAIgBAMQifANifAAIAAgZg");
	this.shape_1019.setTransform(1589.375,362.925);

	this.shape_1020 = new cjs.Shape();
	this.shape_1020.graphics.f("#95562E").s().p("AhagOICUAAIAVAAQALAAAAABQAGAcgsAAQgtAAhhgdg");
	this.shape_1020.setTransform(1640.0851,360.494);

	this.shape_1021 = new cjs.Shape();
	this.shape_1021.graphics.f("#71492B").s().p("ABKANIiTAAQgLAAgFgEQgGgJAAgNICpAAIAWAAIAAAaIgWAAg");
	this.shape_1021.setTransform(1638.425,357.6);

	this.shape_1022 = new cjs.Shape();
	this.shape_1022.graphics.f("#BECAC7").s().p("ABKANIipAAIAAgZQBfAABeAMQACAAAAANIgWAAg");
	this.shape_1022.setTransform(1638.425,354.925);

	this.shape_1023 = new cjs.Shape();
	this.shape_1023.graphics.f("#C1B8B2").s().p("AhVgBIAAgbIAWAAIAVAAQAgAtBfgFIAAANIgVABQgYADgVAAQhDAAglgeg");
	this.shape_1023.setTransform(1662.95,356.4724);

	this.shape_1024 = new cjs.Shape();
	this.shape_1024.graphics.f("#DAEFF4").s().p("ABAAdIgVAAIAAgNQhgAFgfgtQBvgPA0AwQAGAHAAANIgVAAg");
	this.shape_1024.setTransform(1667.2,356.0978);

	this.shape_1025 = new cjs.Shape();
	this.shape_1025.graphics.f("#926A4C").s().p("Ag/gLQAVAAAPgKQAGgDAAgOIA/AAIAWAAIAAAbQgLAAgBAEQgPAugcAAQgdAAgrgyg");
	this.shape_1025.setTransform(1720.525,368.1135);

	this.shape_1026 = new cjs.Shape();
	this.shape_1026.graphics.f("#D8E6E7").s().p("AA1AbIg/AAQgLAAgIgEQgYgJgVgOIAAgZQBbgFAyAmQAHAGABANIgWAAg");
	this.shape_1026.setTransform(1719.45,361.5767);

	this.shape_1027 = new cjs.Shape();
	this.shape_1027.graphics.f("#C8D0CE").s().p("AB1ANIgVAAIjqAAIAAgZID/AAIAWAAIAAAZIgWAAg");
	this.shape_1027.setTransform(1698.125,360.275);

	this.shape_1028 = new cjs.Shape();
	this.shape_1028.graphics.f("#784E2F").s().p("ACWANIlAAAIAAgZIBAAAIAWAAIDqAAIAVAAIAAAZIgVAAg");
	this.shape_1028.setTransform(1692.775,362.925);

	this.shape_1029 = new cjs.Shape();
	this.shape_1029.graphics.f("#93572E").s().p("EhD8AIXIAAgcIBqAAIAWAAQAAAOgCAAQhMANgyAbIAAgagEA+TgIwIAVAAIFAAAIAVAAQAAANgCABQhnAWhSAAQhoAAhHgkg");
	this.shape_1029.setTransform(1274.925,420.375);

	this.shape_1030 = new cjs.Shape();
	this.shape_1030.graphics.f("#653014").s().p("Ag1AnIAAgbQA3gMAjgiQAFgGAMAAQAAAOgEAMQgLA3hDAAIgZgCg");
	this.shape_1030.setTransform(1826.05,432.4541);

	this.shape_1031 = new cjs.Shape();
	this.shape_1031.graphics.f("#D1DBDB").s().p("AhbAVQgEgFgLAAIAAgZQBDgrB9APIAVAAQAAAOgGADQhSAshnASQAAgNgHgIg");
	this.shape_1031.setTransform(1810.025,416.131);

	this.shape_1032 = new cjs.Shape();
	this.shape_1032.graphics.f("#492D15").s().p("AhUAdQBmiaA+CIQAUAqg5AAQgqAAhVgYg");
	this.shape_1032.setTransform(1741.8225,436.217);

	this.shape_1033 = new cjs.Shape();
	this.shape_1033.graphics.f("#4D2D1A").s().p("ABKKOIgVAAQAAgNgGgEQgPgJgWAAQg7i5huiIQgLAAgIgEQhpg/iEgnQgKAAgLgEQgqgKgsgNQAAgOgDAAQiCgkhlg6QAAgMgHgFQgwgkgeg0IAABPIAAAaQgLAAgGgEQgYgVgtgBIAAgaQAAgOgEgLQgWhBhlALIAAAaQg4gkhJgHQjNgWhch6QAAgOgHgHQgEgGgLAAIAAgbIAAjwQALAAAEgFQAHgIAAgNQAWBmAxBPQADAFALAAQBeA3BlAsQARAIAWAAQCKg1CNgvQATgHAWAAQAfg1AngwQAEgFALAAQCogwDnh7QAGgDAAgNQDfA+CmByQAPALAVAAIArKAQAGlnA6k0QD3jxFcC/QBmA5AHCZQAag+B0hqQAHgGAAgNQFrACBcCZQADAFALAAIAAAbQAAANgBAAQnEAqklC6IgWAAIgrAAQgKAAgJAEQjvB7iTDaIAAAbIAAAbIgVAAIAAA2IAAAaIgVAAQAcBkAZBwQAAADALAAQAAAMgCAAQhoAOhrAAIAAAaIgWAAgABgIjIAAAcQCBg7iBiBIAACggATKlNQDHA5gihLQgdhAgmAAQgsAAg2BSgAO1mdIAAANQCVgQg9AAQgZAAg/ADg");
	this.shape_1033.setTransform(1610.725,472.475);

	this.shape_1034 = new cjs.Shape();
	this.shape_1034.graphics.f("#D7E6ED").s().p("Ag0BYQAAgNgFgMQgdhFgJhcQCtg8AHClIALAAIAAAbQgLAAgEAGQgxA4hUATIAAgbg");
	this.shape_1034.setTransform(1766.325,427.6188);

	this.shape_1035 = new cjs.Shape();
	this.shape_1035.graphics.f("#D1D9DB").s().p("AhUAnIAAgZIAAgaQBpAEAwg1QAFgEAMAAIAAAaIAAAbQgBANgEAAQhZAfhMAiIAAgbg");
	this.shape_1035.setTransform(1784.5,424.4);

	this.shape_1036 = new cjs.Shape();
	this.shape_1036.graphics.f("#CFD2CB").s().p("AgpAAIAAgZIApAAIAVAAQALAAAEAEQAGAJAAAMQAAANgDABQgnANgpAAIAAgbg");
	this.shape_1036.setTransform(1797.275,420.4);

	this.shape_1037 = new cjs.Shape();
	this.shape_1037.graphics.f("#D5F1FC").s().p("Ag8AAQgBAAAAgNQCQAbgYAAQgRAAhmgOg");
	this.shape_1037.setTransform(1782.1563,395.067);

	this.shape_1038 = new cjs.Shape();
	this.shape_1038.graphics.f("#5D3921").s().p("AA/iSQgUAAgQgKQilhzjgg+QABAOgHACQjnB7ioAwQgLAAgEAGQgmAvggA2QgWAAgTAGQiNAuiKA2QgVAAgSgJQhlgrheg2QgLAAgDgFQgxhPgWhnIAAgaQAfhBAugxQAIgHAAgOQAVgNAPgSQAHgIAAgOQALAAgBABQAIBeg9AnQAWB1CthUQBogzCpASIAAAaIgVAAIgqAAQBqAvCoghQADAAAAgOIAAgaQERg8EFhHQAJgDALAAQAqAtBsgRIAUgBQDdgJC0g5QAEgBAAgNQGcARDODgQEuBbASj8QAWAaAVAOIAAgOQAkAOgEBDIAKAAQAAAoAKAlQABADAKAAQAKBcAdBGQAEAMAAANQgLAAgCgFQhdiZlrgDQAAAOgHAGQh0BqgaA+QgHiahmg4QlbjAj4DxQg5E0gHFnIgrqAg");
	this.shape_1038.setTransform(1611.8,440.425);

	this.shape_1039 = new cjs.Shape();
	this.shape_1039.graphics.f("#D4DEE2").s().p("AAQBNIgLAAQAEhDgjgNIAAgaIAAgbQA7hMgHDRg");
	this.shape_1039.setTransform(1753.082,402.0037);

	this.shape_1040 = new cjs.Shape();
	this.shape_1040.graphics.f("#5B3D2B").s().p("AgVAUIAAgZIAAgbIAAgbIAVAAQAKANAGAPQAFAMABAOIAAAZIAAAbIAAANQgWgOgVgag");
	this.shape_1040.setTransform(1748.25,397);

	this.shape_1041 = new cjs.Shape();
	this.shape_1041.graphics.f("#895935").s().p("AgngoIAqAAIAVAAQALAOAGAPQAFALAAANIgWAAIAAAbIgVAAIgGABQg6AAAWhRg");
	this.shape_1041.setTransform(1743.6665,389.6613);

	this.shape_1042 = new cjs.Shape();
	this.shape_1042.graphics.f("#875737").s().p("AQfEaQjOjgmcgRQAAANgEACQi0A5jeAIQAAgNgCgBQhSgMhVAAQgLAAgJACQkFBIkRA7IgWAAIjAAAQipgRhoAzQitBUgWh2QA9gmgIheQABgBgLAAIAAgbQAwAOAFgoIAKgBQCEhICTg4QAJgEALAAQAgBQCHgoQADAAAAgOQAqglA7gbQAGgDAAgNQA/gNA8gZQAFgCAAgOQBRgbBuABIAWAAQCgAACfgNIAAgOQAWAAAOgJQAHgEAAgNQBwAOA9gkQAIgFAKAAQABAOAFAIQAFAFALAAQDBA9gMg8QAAgBgLAAIAAgbIArAAIAVAAQAwAoBlgMIAWgBIAVAAIAVAAIBAAAIAWAAIAAAaIgWAAIhAAAIAAAbIgVAAQB+BBDqgzQADgBgBgNIAAgbIAWAAQAVAOAYAJQAIAEALAAQAAANgHAEQgPAJgVAAQBVBkAfhgQABgEALAAQBwBABKBlQAGAJAAANIgWAAIgqAAQgYBVBCgFIAWAAIAAAbIAAAaQgNC5imAAQg8AAhRgYg");
	this.shape_1042.setTransform(1608.6,386.8821);

	this.shape_1043 = new cjs.Shape();
	this.shape_1043.graphics.f("#5D2E17").s().p("AiULeIn/AAIAAgNQDpAGBBguIgrAAIgqAAQATg8CtA8IAKAAQg4hdj9gOIgBAOQjXAUh9BkIAAAaIgVAAQAAgNgCAAQh/gNh/AAIAAAaIgVAAIgWAAQgLAAgEgFQgaghgsgPQAAgNgHgIQg9hHgnhfIAAgaIAAg2IAVAAQBNBEBmirQBJh4CZgsQBWAABTgOQACAAAAgMQEog/FtAJIAVAAQEZicERikQBbALANhCQADgMAAgOQCEhuCghWQAGgDAAgNIAAgbQA+AQAMgpQAAgCAMAAQC5gggfgzQgGgLAAgNQArAAAngMQAEgCAAgMIBVAAIAWAAQBABABEg7QAGgGAKABIAAA1IAAAbQgKAAgCADQggBChTALQgLgBgKADQiaAviRA6QAAANgGAHQoZJDqKHUQALAOAOAIQAHAFAKAAQAhAAAbALQAEACAAANIgVAAIgrAAQgOBKBOgHIAAANIgVAAg");
	this.shape_1043.setTransform(1778.025,461.8);

	this.shape_1044 = new cjs.Shape();
	this.shape_1044.graphics.f("#6B3A1E").s().p("AxUHyIAAgbIAAgbQCSjaDwh8QAJgEAKAAQAAANgFAIQgFAGgLAAQANAsBJgQQAKgCAKAAIAWAAQBrATAkgyQAGgJAAgNIAAgbQGwghFOiAQFriLC0jZQABgDgLgNQBLgbBMgYQAKgDAKAAQAgAbAkAWQAHAFALAAQAAANgGADQigBXiEBuQgMAAgFAGQgjAig4ANIAAAbQkQCkkaCcIgWAAQlrgIkoA+IgWAAIiVAAIAAAaQiZAshKB5QhJB5g7AAQgYAAgWgTg");
	this.shape_1044.setTransform(1750.35,453.3842);

	this.shape_1045 = new cjs.Shape();
	this.shape_1045.graphics.f("#C9CAC9").s().p("Ag/AaIAAgaIAAgbIAWAAIAVAAIA/AAIAVAAIAAAbQgKAAgGAEQgcAYgzAAQgPAAgRgCg");
	this.shape_1045.setTransform(1869.725,393.7763);

	this.shape_1046 = new cjs.Shape();
	this.shape_1046.graphics.f("#723720").s().p("AgRAwQgkgVgggbQALAAAEgFQAGgHABgOQA9ARALgpQABgCALAAQACArA/gEIAAANQgMAAgBACQgMApg9gQIAAAbQgKAAgHgGg");
	this.shape_1046.setTransform(1861.25,401.7);

	this.shape_1047 = new cjs.Shape();
	this.shape_1047.graphics.f("#794425").s().p("ArZEzQAAgOgEgLQgGgPgLgNQEmi6HDgqQABAAAAgNQBVgRAwg5QAFgFALAAQBNgjBZgfQAFAAAAgOQAqAAAngNQADgBAAgNQBpgTBSgsQAFgEAAgOQBAgMA7gaQAGgBAAgNIAUAAQALANgCADQizDZlrCKQlOCBmwAhIAAAbQgLAAgGAFQgrAhhZgLIAAAaIgWAAg");
	this.shape_1047.setTransform(1761.4654,437.775);

	this.shape_1048 = new cjs.Shape();
	this.shape_1048.graphics.f("#D0DEDF").s().p("AhpA6IAAgbIAAgbQAthgCiA4QAEABAAANQAAAOgGAIQgEAEgLAAQgKAAgKADQhLAYhLAbIgUAAg");
	this.shape_1048.setTransform(1844.175,401.2752);

	this.shape_1049 = new cjs.Shape();
	this.shape_1049.graphics.f("#D6F0FA").s().p("AhQgzIChAlQgeBCgkAAQgrAAg0hng");
	this.shape_1049.setTransform(1820.325,398.8259);

	this.shape_1050 = new cjs.Shape();
	this.shape_1050.graphics.f("#B4E7FB").s().p("AgeAEQAfgOAeAOg");
	this.shape_1050.setTransform(1836.8,102.875);

	this.shape_1051 = new cjs.Shape();
	this.shape_1051.graphics.f("#B7E8FD").s().p("Ag5gGQDmALjmACg");
	this.shape_1051.setTransform(1849.525,100.4);

	this.shape_1052 = new cjs.Shape();
	this.shape_1052.graphics.f("#C6C854").s().p("AE3BDIoCAAIhpAAIhoAAIAAiFQGcAAGYBCQAFAAAABDIhmAAg");
	this.shape_1052.setTransform(5785.425,5351.525);

	this.shape_1053 = new cjs.Shape();
	this.shape_1053.graphics.f("#9DB72E").s().p("AnRAmIAAiAIIDAAIBmAAIDRAAIBpAAIAACAQg0AAgzAKQiwArjDAAQjZAAjwg1g");
	this.shape_1053.setTransform(5811.55,5367.2622);

	this.shape_1054 = new cjs.Shape();
	this.shape_1054.graphics.f("#7BBF06").s().p("AmCgfQYMA/4MgBg");
	this.shape_1054.setTransform(5875.925,5387.15);

	this.shape_1055 = new cjs.Shape();
	this.shape_1055.graphics.f("#83BB1C").s().p("AlSgfQVLgR1LBSg");
	this.shape_1055.setTransform(6120.1125,5438.9055);

	this.shape_1056 = new cjs.Shape();
	this.shape_1056.graphics.f("#CFC760").s().p("AFqBAIhmAAQlugFloAFIAAh/QHQAAHLA8QAKADAABAIhpAAg");
	this.shape_1056.setTransform(5904.8,5364.65);

	this.shape_1057 = new cjs.Shape();
	this.shape_1057.graphics.f("#D7CD69").s().p("AE4BAImfAAIhoAAIjOAAIAAiAQGeAAGUA/QAKABgBBAIhmAAg");
	this.shape_1057.setTransform(6065.4,5377.55);

	this.shape_1058 = new cjs.Shape();
	this.shape_1058.graphics.f("#A2BB31").s().p("AmehPIBpAAIJrAAIBpAAIAACAIhpAAQgzAAgxAKQh9AVhnAAQkaAAhyifg");
	this.shape_1058.setTransform(5982.475,5379.097);

	this.shape_1059 = new cjs.Shape();
	this.shape_1059.graphics.f("#89B81F").s().p("AkDguQA1AAAWgaQAdgnAAg/IBpAAIDNAAIBpAAIAACAQAABDggAgQh2B6hrAAQiOAAh4jdg");
	this.shape_1059.setTransform(6029.05,5401.5232);

	this.shape_1060 = new cjs.Shape();
	this.shape_1060.graphics.f("#8DC021").s().p("Ak1BFQB1jkDQiIQAigYAzAAQA1BEBCAnQAnAYAzAAIAACBIAACAQgzAAgWAYQi8DjiGAAQiOAAhSj7g");
	this.shape_1060.setTransform(5422.75,5337.9825);

	this.shape_1061 = new cjs.Shape();
	this.shape_1061.graphics.f("#87BC17").s().p("A58hXQEuBOA4jAQAHgPAzAAQECDdI+hVQAwgHA2AAQKNCAN3jCQAPAAAAg/IBmAAIBpAAIBoAAIBpAAIAACBQg2AAgsARQrgEfsZAAQswAAtukwg");
	this.shape_1061.setTransform(5598.925,5379.8781);

	this.shape_1062 = new cjs.Shape();
	this.shape_1062.graphics.f("#76C306").s().p("AnShPQHUAAHHA9QAKACAABBQg2AAgwAHQigAYiHAAQleAAi6ifg");
	this.shape_1062.setTransform(5521.125,5366.1906);

	this.shape_1063 = new cjs.Shape();
	this.shape_1063.graphics.f("#D0C35D").s().p("AJxCBI1EAAIAAiBIAAiAIBlAAIBpAAQGbDcLbhVQAxgHAzAAIAACBIhkAAg");
	this.shape_1063.setTransform(5526.2,5331.95);

	this.shape_1064 = new cjs.Shape();
	this.shape_1064.graphics.f("#99BA2F").s().p("AoGhQIJtAAIBpAAIDOAAIBpAAIAACEIhpAAIhmAAQg1AAgzAIQiLAVhzAAQlBAAiXihg");
	this.shape_1064.setTransform(5692.175,5352.9631);

	this.shape_1065 = new cjs.Shape();
	this.shape_1065.graphics.f("#FFC58C").s().p("AlhBBIAAiBQUUAgxDBeQg1ACgzABIhpAAg");
	this.shape_1065.setTransform(5737.8657,5325.5);

	this.shape_1066 = new cjs.Shape();
	this.shape_1066.graphics.f("#E7D179").s().p("AHTBAIptAAIhpAAIk4AAIAAiAIOoAAIBmAAIBoAAIAACAIhoAAg");
	this.shape_1066.setTransform(5655.8,5338.4);

	this.shape_1067 = new cjs.Shape();
	this.shape_1067.graphics.f("#A1B232").s().p("AkYAKQgdhKg1hAQFqgEFiBBQAJADAABAQg1AAgsARQjiBakqAWQAAhBgWg2g");
	this.shape_1067.setTransform(5676.6,5240.9855);

	this.shape_1068 = new cjs.Shape();
	this.shape_1068.graphics.f("#CDC75B").s().p("AFSCYQAAhBgJgDQlihBlrAEIAAiEQLAicBJGhg");
	this.shape_1068.setTransform(5679.15,5225.7669);

	this.shape_1069 = new cjs.Shape();
	this.shape_1069.graphics.f("#80B815").s().p("ABjCFIhoAAQg2AAgkgWQhEgsgxhCQHIkKgiEKQgHBCAABCIhoAAg");
	this.shape_1069.setTransform(5537.2677,5279.7875);

	this.shape_1070 = new cjs.Shape();
	this.shape_1070.graphics.f("#8EBC21").s().p("AlsFVQAAg/AggiQCqijkwiDQgzAAgzANQoNB7AHmMQSshhNtDYQAxAMAzAAQAABCgdAYQi+CPkoAbQAAhCAHhBQAikLnJELQAwBBBFAsQAkAWA1AAQAAA/gfAYQjUCtl6AAIhpAAg");
	this.shape_1070.setTransform(5500.4454,5284.9613);

	this.shape_1071 = new cjs.Shape();
	this.shape_1071.graphics.f("#81BA0C").s().p("AAHDEQgyAAgngYQhBgng2hEIAAiAQBpAABLgxQAcgRAAhCQEwCEiqCiQggAiAAA/IhmAAg");
	this.shape_1071.setTransform(5453.0485,5299.475);

	this.shape_1072 = new cjs.Shape();
	this.shape_1072.graphics.f("#E9CE75").s().p("AI9BAIzfAAIAAh/QCeAECZgEIBpAAQHUgBHHBBQAKAAAAA/IhmAAg");
	this.shape_1072.setTransform(5500.325,5208.3);

	this.shape_1073 = new cjs.Shape();
	this.shape_1073.graphics.f("#FFC48D").s().p("AAyA/IhoAAImbAAIAAiAQHRAAHKBBQAIAAAAA/IhpAAQhNADhNAAQhOAAhPgDg");
	this.shape_1073.setTransform(5427.875,5195.525);

	this.shape_1074 = new cjs.Shape();
	this.shape_1074.graphics.f("#96B823").s().p("ARyBDMglMAAAIAAiFQCaAFCZAAQA2gFAzAAITeAAIBmAAIJsAAIBoAAIAACFIhoAAg");
	this.shape_1074.setTransform(5516,5221.425);

	this.shape_1075 = new cjs.Shape();
	this.shape_1075.graphics.f("#83BB19").s().p("AjigIQOMiAuMDEg");
	this.shape_1075.setTransform(5434.925,5072.8886);

	this.shape_1076 = new cjs.Shape();
	this.shape_1076.graphics.f("#CFC561").s().p("ArVgCQEHAEDxhAQARgCAAhDIM5AAIBpAAQAABDgKACQrLB/rWBDIAAiGg");
	this.shape_1076.setTransform(5567.675,5124.05);

	this.shape_1077 = new cjs.Shape();
	this.shape_1077.graphics.f("#9FB733").s().p("AgyCEIoJAAIAAiFQG2iSJXARIBpAAQAABCgQADQjyBAkGgEIAACFIhlAAg");
	this.shape_1077.setTransform(5490,5123.9613);

	this.shape_1078 = new cjs.Shape();
	this.shape_1078.graphics.f("#B3C148").s().p("AnTg/IM/AAIBoAAQAABAgMAAQnHA/nUAAIAAh/g");
	this.shape_1078.setTransform(5718.175,5104.475);

	this.shape_1079 = new cjs.Shape();
	this.shape_1079.graphics.f("#8AB822").s().p("AHTCiIhmAAIhpAAIs+AAIAAiBQHHl4JSFfQAnAZA1AAIAACBIhoAAg");
	this.shape_1079.setTransform(5728.5,5081.8585);

	this.shape_1080 = new cjs.Shape();
	this.shape_1080.graphics.f("#79BF06").s().p("AnQhPIGdAAIBlAAQDRAAC9A9QARACAABBQgwAAg1AHQigAYiHAAQldAAi4ifg");
	this.shape_1080.setTransform(5821.75,5067.1306);

	this.shape_1081 = new cjs.Shape();
	this.shape_1081.graphics.f("#C7C156").s().p("Amcg/QFlgCFuACIBmAAQAABBgJAAQmVA/mbAAIAAiAg");
	this.shape_1081.setTransform(5826.975,5091.5375);

	this.shape_1082 = new cjs.Shape();
	this.shape_1082.graphics.f("#B9C14A").s().p("ApsAAQF5ABD8hxQArgRA2AAIGdAAIBmAAQAAA/gJAFQpgCApwA/IAAiCg");
	this.shape_1082.setTransform(5972.025,5072.15);

	this.shape_1083 = new cjs.Shape();
	this.shape_1083.graphics.f("#87BA18").s().p("Eg79AOzQA4AAATgYQAegqAAg/IIIAAIBmAAQAAA/ATA9QAqCXi+AAQi7AAmbiSgEAvBgJjIk6AAIAAiDQAAhCgRgCQi+g9jRAAIAAiBQM9BfEEh1QGojCAuFZQg2AAgrARQj9Byl5gCIAACDIhmAAg");
	this.shape_1083.setTransform(5598.8,5146.3227);

	this.shape_1084 = new cjs.Shape();
	this.shape_1084.graphics.f("#99B72A").s().p("AE3BDQlrgFlrAFIAAiFILWAAIBpAAIAACFIhpAAg");
	this.shape_1084.setTransform(5350.175,5221.425);

	this.shape_1085 = new cjs.Shape();
	this.shape_1085.graphics.f("#A9BD3B").s().p("AE3BDIhoAAIhmAAIoIAAIAAiFIGfAAIBpAAIDOAAIBpAAIAACFIhpAAg");
	this.shape_1085.setTransform(5267.025,5221.425);

	this.shape_1086 = new cjs.Shape();
	this.shape_1086.graphics.f("#EED27D").s().p("AFuA+IhpAAIrWAAIhoAAIjPAAIAAiAIOlAAIBoAAIGbAAIBpAAIAACAQgzAAg2AFQiZAAiZgFg");
	this.shape_1086.setTransform(5355.175,5208.55);

	this.shape_1087 = new cjs.Shape();
	this.shape_1087.graphics.f("#7EC00A").s().p("AmqggQaqBB6qAAg");
	this.shape_1087.setTransform(5361.725,5114.2);

	this.shape_1088 = new cjs.Shape();
	this.shape_1088.graphics.f("#ABBC3F").s().p("Ak3CKIk4AAIAAiBQHAi9K2A4QAzAFA2AAQAAA/gMAAQmUBBmfAAIAACBIhoAAg");
	this.shape_1088.setTransform(5329.375,5149.1863);

	this.shape_1089 = new cjs.Shape();
	this.shape_1089.graphics.f("#F7CA84").s().p("AAxEKImeAAIhoAAIrTAAIAAiBQAzAAAUgYQAignAAhCQDnjDHrAAIAAhAIE3AAIBnAAIE4AAIBpAAQHthBDKDiQAfAkAAA+IAACBIhoAAIumAAIAACBIhpAAg");
	this.shape_1089.setTransform(5262.05,5188.1141);

	this.shape_1090 = new cjs.Shape();
	this.shape_1090.graphics.f("#A8BB3C").s().p("AmcCCIAAiBQBohCBtgvQAsgRA2AAIGaAAIBoAAIAAA/QnqABjnDDIhoAAg");
	this.shape_1090.setTransform(5184.125,5175.95);

	this.shape_1091 = new cjs.Shape();
	this.shape_1091.graphics.f("#BCC34B").s().p("AHQBDIwIAAIAAiFIDOAAIBpAAILRAAIBpAAIAACFIhpAAg");
	this.shape_1091.setTransform(5168.55,5221.425);

	this.shape_1092 = new cjs.Shape();
	this.shape_1092.graphics.f("#89BA1E").s().p("Ag0DNIk3AAIAAiBQD7moHDDaQAYAKAABCQg1AAgsARQhtAthoBEIAACBIhpAAg");
	this.shape_1092.setTransform(5137.55,5168.4683);

	this.shape_1093 = new cjs.Shape();
	this.shape_1093.graphics.f("#EDD17F").s().p("AmfgPQCeAACBg1QAYgKAAhCIE2AAIBpAAIBpAAQAABCgiAnQgUAYgzAAIAACAIhpAAIjOAAQg1AAgwAPQhKARg5AAQiwAAgHigg");
	this.shape_1093.setTransform(5111.675,5203.4022);

	this.shape_1094 = new cjs.Shape();
	this.shape_1094.graphics.f("#A2B837").s().p("AlrAAIAAiAIGgAAIBoAAIBmAAIBoAAQAABCgYAJQiBA1idAAQg0AAgfAbQhyBjjbADIAAiBg");
	this.shape_1094.setTransform(5064.85,5201.85);

	this.shape_1095 = new cjs.Shape();
	this.shape_1095.graphics.f("#90B720").s().p("AwMAIIAAiAINAAAIBoAAIQJAAIBoAAQAABAgdApQgUAXg3AAQgxAAgzAKQn4BnnIAAQngAAmthxg");
	this.shape_1095.setTransform(5121.75,5240.1529);

	this.shape_1096 = new cjs.Shape();
	this.shape_1096.graphics.f("#C0CE50").s().p("AFrCDIs+AAIAAiEIBoAAQDbgDByhjQAfgbAzAAQAKDSEwhEQAwgNA2AAIAACEIhpAAg");
	this.shape_1096.setTransform(5064.85,5214.975);

	this.shape_1097 = new cjs.Shape();
	this.shape_1097.graphics.f("#87BA19").s().p("AknErQi5g1BOlDQDRlNJcCIQAPAFAAA/IhoAAImfAAIAACBIAACAIhpAAIAACGIAACBQgwAAgxgPg");
	this.shape_1097.setTransform(5037.9288,5209.6031);

	this.shape_1098 = new cjs.Shape();
	this.shape_1098.graphics.f("#F4C882").s().p("AmniVQXyDEy6BmIgYABQi+AAhikrg");
	this.shape_1098.setTransform(1079.4,5411.8563);

	this.shape_1099 = new cjs.Shape();
	this.shape_1099.graphics.f("#C6C45A").s().p("AnRABIAAiAQGggEGaAEIBpAAQAAA/gRAIQmnCTnrAnIAAiBg");
	this.shape_1099.setTransform(1073.125,5461.9);

	this.shape_1100 = new cjs.Shape();
	this.shape_1100.graphics.f("#67AF09").s().p("As8BPQKhjoNwgYIBoAAQnSFjo2AAQkrAAlGhjg");
	this.shape_1100.setTransform(1130.375,5479.878);

	this.shape_1101 = new cjs.Shape();
	this.shape_1101.graphics.f("#81B610").s().p("AhNCrQioirkQhCIAAiBIIEAAIBnAAIE3AAIBpAAQAABCggAnQgTAYg2AAIAACFIhmAAIk4AAIAACBQgxAAgbgZg");
	this.shape_1101.setTransform(1316.875,5442.475);

	this.shape_1102 = new cjs.Shape();
	this.shape_1102.graphics.f("#9DAE34").s().p("AoGB4IAAiFQIYAIGRh6QAvgOA1AAIAACAQg1AAgnAVQjvCGl6AAQiZAAivgWg");
	this.shape_1102.setTransform(1213.175,5437.1087);

	this.shape_1103 = new cjs.Shape();
	this.shape_1103.graphics.f("#D2CC69").s().p("AgBCIIoEAAIAAiBQFjiuI/AnQA2AFAzAAQAABEgRACQi+A6jRACIAACBIhnAAg");
	this.shape_1103.setTransform(1316.875,5409.2946);

	this.shape_1104 = new cjs.Shape();
	this.shape_1104.graphics.f("#6CAF0D").s().p("Ak3gEQgHgFAAg/QLfCRhwAAQhSAAoWhNg");
	this.shape_1104.setTransform(861.544,5625.1948);

	this.shape_1105 = new cjs.Shape();
	this.shape_1105.graphics.f("#B3BC47").s().p("AmcAAQESiVHBAUIBmAAQAABBgRAIQmNB4mbBEIAAiEg");
	this.shape_1105.setTransform(705.125,5539.7118);

	this.shape_1106 = new cjs.Shape();
	this.shape_1106.graphics.f("#F7C880").s().p("Ai6BLQgNAAAAg/IAAiFQImDzjRAAQhbAAjtgvg");
	this.shape_1106.setTransform(642.1825,5357.0148);

	this.shape_1107 = new cjs.Shape();
	this.shape_1107.graphics.f("#68AF09").s().p("AoGgpQBoAABMguQAbgRAAhBIE3AAIBnAAIDRAAIDPAAQj1FTkmAAQjpAAkJjTg");
	this.shape_1107.setTransform(943.525,5517.9954);

	this.shape_1108 = new cjs.Shape();
	this.shape_1108.graphics.f("#67AE07").s().p("AkLiuIDRAAIBnAAQAxAAATAbQDZFChXAAQhbAAmjldg");
	this.shape_1108.setTransform(804.4052,5544.1818);

	this.shape_1109 = new cjs.Shape();
	this.shape_1109.graphics.f("#C2BF55").s().p("ApsCDIAAiBQHYifKZAdIBoAAIAACCIhoAAIk3AAQgxAAgsATQj1BxlrAAQg9AAhAgDg");
	this.shape_1109.setTransform(891.725,5500.7358);

	this.shape_1110 = new cjs.Shape();
	this.shape_1110.graphics.f("#B7B94E").s().p("AmchRQGcAAGWBCQAHACAABBQgzAAgwAHQiNAXh2AAQk+AAiVijg");
	this.shape_1110.setTransform(850.275,5222.9121);

	this.shape_1111 = new cjs.Shape();
	this.shape_1111.graphics.f("#C4BF59").s().p("AmdhQQGgAAGTBCQAIAAAAA+QgxAAgzAIQiTAZh6AAQk2AAiUihg");
	this.shape_1111.setTransform(663.55,5197.0039);

	this.shape_1112 = new cjs.Shape();
	this.shape_1112.graphics.f("#B0BD4C").s().p("AmfhRQGfAAGWBCQAKAAAAA+QgxAAg4AMQiMAXh1AAQk8AAiZijg");
	this.shape_1112.setTransform(746.475,5210.022);

	this.shape_1113 = new cjs.Shape();
	this.shape_1113.graphics.f("#B3BF4F").s().p("AmfhOQGfAAGWA8QAKAFAAA+Qg2AAgzAIQiOAWh2AAQk6AAiYidg");
	this.shape_1113.setTransform(580.625,5184.0306);

	this.shape_1114 = new cjs.Shape();
	this.shape_1114.graphics.f("#89A42A").s().p("AlrCBIAAiDQF7ACD9hxQArgRA0AAQAAA/giAaQjbCsl/AAQgsAAgvgCg");
	this.shape_1114.setTransform(731,4838.3628);

	this.shape_1115 = new cjs.Shape();
	this.shape_1115.graphics.f("#7CBF10").s().p("Ak9DCIAAiBIAAiAQDxBGAWjEQAAgHAxAAQBnAAAnA1IAPAPQG9FFrtAAQhMAAhZgDg");
	this.shape_1115.setTransform(1327.7295,5234.493);

	this.shape_1116 = new cjs.Shape();
	this.shape_1116.graphics.f("#EBD177").s().p("AoEhQIDPAAIBoAAIJrAAIBnAAIAACAQgxAAgzAIQiwAZiXAAQmBAAjdihg");
	this.shape_1116.setTransform(1264.975,5275.0539);

	this.shape_1117 = new cjs.Shape();
	this.shape_1117.graphics.f("#B8C050").s().p("AFrBCIjOAAIhpAAIoHAAIAAiDIM+AAIBpAAIAACDIhpAAg");
	this.shape_1117.setTransform(1197.6,5260.45);

	this.shape_1118 = new cjs.Shape();
	this.shape_1118.graphics.f("#EACD78").s().p("AlohkIIDAAIBoAAIBmAAIAACCQgwAAgzAMQjhA7iPAAQkKAAAMjJg");
	this.shape_1118.setTransform(1114.6713,5264.0067);

	this.shape_1119 = new cjs.Shape();
	this.shape_1119.graphics.f("#E9D27A").s().p("AoGhPIE3AAIBpAAIIHAAIBmAAIAACAQg1AAgxAHQivAYiWAAQmDAAjfifg");
	this.shape_1119.setTransform(1005.775,5248.9906);

	this.shape_1120 = new cjs.Shape();
	this.shape_1120.graphics.f("#B8B749").s().p("AE2BAIoDAAIhoAAIhoAAIAAh/QGcgBGTBAQAMAAAABAIhoAAg");
	this.shape_1120.setTransform(1099.15,5247.45);

	this.shape_1121 = new cjs.Shape();
	this.shape_1121.graphics.f("#A7B743").s().p("AmfhNQGfAAGWA9QAKADAABAIhpAAIk3AAQgwAAgzAKQhLARg5AAQivAAgJibg");
	this.shape_1121.setTransform(953.875,5235.8907);

	this.shape_1122 = new cjs.Shape();
	this.shape_1122.graphics.f("#67B104").s().p("AlzANQXPjM3PELg");
	this.shape_1122.setTransform(514.25,5603.7199);

	this.shape_1123 = new cjs.Shape();
	this.shape_1123.graphics.f("#6BAF0D").s().p("AjegeQgWgCAAhFQIWDLgyAAQgoAAmmiEg");
	this.shape_1123.setTransform(532.4093,5640.9122);

	this.shape_1124 = new cjs.Shape();
	this.shape_1124.graphics.f("#B5BB4B").s().p("AoGAAQGMiHIZAHIBoAAQAABCgJAAQonBUndBrIAAiBg");
	this.shape_1124.setTransform(570.3,5565.8329);

	this.shape_1125 = new cjs.Shape();
	this.shape_1125.graphics.f("#BFB84E").s().p("AGdBAIuiAAIAAh/IOiAAIBpAAIAAB/IhpAAg");
	this.shape_1125.setTransform(300.775,5598.55);

	this.shape_1126 = new cjs.Shape();
	this.shape_1126.graphics.f("#8CA62A").s().p("AnSg/IBoAAIBnAAIJwAAIBmAAQAAA/gKAAQnKBAnRAAIAAh/g");
	this.shape_1126.setTransform(399.25,5598.55);

	this.shape_1127 = new cjs.Shape();
	this.shape_1127.graphics.f("#C3C35D").s().p("ADRBDIpwAAIAAiFIIHAAIBpAAIBmAAIBpAAQAABCggAoQgWAbgzAAIhmAAg");
	this.shape_1127.setTransform(414.825,5585.425);

	this.shape_1128 = new cjs.Shape();
	this.shape_1128.graphics.f("#F0A152").s().p("AmfhBILWAAIBpAAQAABBgUAGQjfA8itAAQkFAAiaiDg");
	this.shape_1128.setTransform(352.575,5351.4591);

	this.shape_1129 = new cjs.Shape();
	this.shape_1129.graphics.f("#F7B669").s().p("AnTgBQGghBGeg4QAzgHA2AAQAAA/gWAHQmnCTnqAqIAAiDg");
	this.shape_1129.setTransform(388.9,5397);

	this.shape_1130 = new cjs.Shape();
	this.shape_1130.graphics.f("#F8BF7A").s().p("AyogjQT3isPxClQAzAHA2AAIAACAIhpAAIoGAAIhoAAIrWAAQgzAAgxAHQigAYiHAAQleAAi7ifg");
	this.shape_1130.setTransform(337.125,5335.5222);

	this.shape_1131 = new cjs.Shape();
	this.shape_1131.graphics.f("#F7BD76").s().p("ALVCDIhnAAQAAhEgHAAQrOhArVAAIAAiBQM6AAM4BBQAHAAAABAIAACEIhoAAg");
	this.shape_1131.setTransform(539.3,5345.075);

	this.shape_1132 = new cjs.Shape();
	this.shape_1132.graphics.f("#66B005").s().p("EggZACOIAAiDIAAiAUAi8gBhAduAEgQAJAFAAA/UgdCgCIgjxACIg");
	this.shape_1132.setTransform(207.4,5629.6718);

	this.shape_1133 = new cjs.Shape();
	this.shape_1133.graphics.f("#D4C764").s().p("AR1BAMglRAAAIAAh/MAlRAAAIBoAAIAAB/IhoAAg");
	this.shape_1133.setTransform(124.5,5598.55);

	this.shape_1134 = new cjs.Shape();
	this.shape_1134.graphics.f("#F3AE61").s().p("AmfhCILWAAIBpAAQAABCgKABQmWBCmfAAIAAiFg");
	this.shape_1134.setTransform(41.575,5442.45);

	this.shape_1135 = new cjs.Shape();
	this.shape_1135.graphics.f("#EF9C48").s().p("EgjoAKJIrXAAIAAiBIAAyQQECACEHgCIBoAAQKrCqL+BSQAzAIA2AAQECDdI8hVQAxgHAzAAQECDdIqiVQAUgHAAhBIIGAAIBoAAQLVAALPBBQAIAAAABFQg2AAgzACQtOA7rEDDQg1AAgzAHQmgA4mgBCIAACDQgwABgzAEQzCCaz3BjIhpAAg");
	this.shape_1135.setTransform(300.775,5370.85);

	this.shape_1136 = new cjs.Shape();
	this.shape_1136.graphics.f("#E1CB73").s().p("AmbjVQE6hEE2g2QAxgKAzAAIAACEIhpAAQjVAFhhB8IAAB/QA6DZFnhLQAzgNAzAAIAACGQgzAAgzAKQiWAeh4AAQoBAAA5ovg");
	this.shape_1136.setTransform(113.8637,5106.5885);

	this.shape_1137 = new cjs.Shape();
	this.shape_1137.graphics.f("#619B0A").s().p("AE3CBIrWAAIAAiBQBhh7DWgFIBoAAQDPBCCzBsQAeAUAAA/IhpAAg");
	this.shape_1137.setTransform(145.175,5098.025);

	this.shape_1138 = new cjs.Shape();
	this.shape_1138.graphics.f("#FCBC77").s().p("Ak4CCIAAiBIAAiDQE5BCEdB5QAaAHAABCIhoAAIkFABIkDgBg");
	this.shape_1138.setTransform(31.25,5292.975);

	this.shape_1139 = new cjs.Shape();
	this.shape_1139.graphics.f("#C3BF5A").s().p("AmchQILTAAIBmAAIAACDQgwAAgzAHQiPAXh3AAQk8AAiUihg");
	this.shape_1139.setTransform(497.725,5171.0062);

	this.shape_1140 = new cjs.Shape();
	this.shape_1140.graphics.f("#5E9908").s().p("AGdBAIhoAAIhmAAIrUAAIAAiAIBpAAIBmAAILTAAIBpAAIAACAIhpAAg");
	this.shape_1140.setTransform(508.175,5156.5);

	this.shape_1141 = new cjs.Shape();
	this.shape_1141.graphics.f("#54A502").s().p("AEBBKIrTAAIAAiAQRFhEi7CpQgZAbg1AAIhpAAg");
	this.shape_1141.setTransform(523.7649,5142.6536);

	this.shape_1142 = new cjs.Shape();
	this.shape_1142.graphics.f("#6F9919").s().p("ArWhPILWAAIBpAAQE2AAEpBCQAPAAAAA+IhpAAIs8AAQgzAAgzAMQhdAThIAAQjSAAgrifg");
	this.shape_1142.setTransform(176.3,5118.9398);

	this.shape_1143 = new cjs.Shape();
	this.shape_1143.graphics.f("#A5B74B").s().p("AGfBDIjPAAIhpAAIptAAIAAiFIM8AAIBpAAQAzAAAWAdQAfAmAABCIhoAAg");
	this.shape_1143.setTransform(207.525,5130.5);

	this.shape_1144 = new cjs.Shape();
	this.shape_1144.graphics.f("#F3C981").s().p("ApvA4QOSA2kCjaQgggdAAg/IDPAAIBpAAIDOAAIBoAAIAACAQg1AAgRAZQjAD4lhAAQkMAAlriRg");
	this.shape_1144.setTransform(228.2,5157.3323);

	this.shape_1145 = new cjs.Shape();
	this.shape_1145.graphics.f("#57A004").s().p("AmdBDQBohDBGhaQAjgnAAg/IBmAAQDTBHCWA8ICcBBQgxC9j2AAQjIAAlNh+g");
	this.shape_1145.setTransform(248.85,5078.4298);

	this.shape_1146 = new cjs.Shape();
	this.shape_1146.graphics.f("#86A029").s().p("ABnCJIAAhBQnPAaiejZIBoAAIBnAAQHvhCD1CoQAlAZA1AAIAACBIhoAAIicACIicgCg");
	this.shape_1146.setTransform(404.475,5149.2067);

	this.shape_1147 = new cjs.Shape();
	this.shape_1147.graphics.f("#D3C566").s().p("AIFCBQp1gFn8h8IAAiAIIDAAIBpAAQCdDaHQgbIAABCIhoAAg");
	this.shape_1147.setTransform(352.675,5150.075);

	this.shape_1148 = new cjs.Shape();
	this.shape_1148.graphics.f("#5C9404").s().p("AE3BDIhoAAIhpAAIoDAAIAAiFILUAAIBmAAIAACFIhmAAg");
	this.shape_1148.setTransform(331.9,5130.5);

	this.shape_1149 = new cjs.Shape();
	this.shape_1149.graphics.f("#53A502").s().p("AE3BAIrTAAIAAiAQGaAAGWBBQAJABABA+IhnAAg");
	this.shape_1149.setTransform(331.9,5117.35);

	this.shape_1150 = new cjs.Shape();
	this.shape_1150.graphics.f("#50A104").s().p("AlZgfQVnA+1nAAg");
	this.shape_1150.setTransform(325.1375,5049.4);

	this.shape_1151 = new cjs.Shape();
	this.shape_1151.graphics.f("#D8C76D").s().p("Am9AbQgWgZgxAAIAAiEQHRAEHSgEIBmAAIAACEIhmAAQnSAKlqB3QAAhBgggng");
	this.shape_1151.setTransform(279.975,5033.125);

	this.shape_1152 = new cjs.Shape();
	this.shape_1152.graphics.f("#CBC264").s().p("AlqBBQEGiAEIhwQArgRA2AAQAxAAAVAYQAgAnAABCIAACAIhmAAQg2AAgrARQjhBaktAVIAAiAg");
	this.shape_1152.setTransform(202.2,5052.675);

	this.shape_1153 = new cjs.Shape();
	this.shape_1153.graphics.f("#BEBD5A").s().p("AjvkNIDRAAIBlAAQAAA/ggAUQhFAuhpAAQgsF6HGg1IAAA/QgxAAgzAHQhQAPhDAAQmVAACKobg");
	this.shape_1153.setTransform(273.0262,4930.2636);

	this.shape_1154 = new cjs.Shape();
	this.shape_1154.graphics.f("#629D0E").s().p("AEaEDIoHAAIAAg/QnHA1Asl6QBpAABGguQAggUAAg/IGdAAIBlAAIGgAAIBpAAQAAA/AfAqQByCZlgCCIAACBIhpAAg");
	this.shape_1154.setTransform(324.3489,4929.175);

	this.shape_1155 = new cjs.Shape();
	this.shape_1155.graphics.f("#5B9B05").s().p("AnRALQAzAAAWgXQAggnAAhCIDRAAIBmAAIGfAAIBkAAQAABCgbAuQhSB7jwAAQjeAAlohrg");
	this.shape_1155.setTransform(450.925,5018.8704);

	this.shape_1156 = new cjs.Shape();
	this.shape_1156.graphics.f("#95A730").s().p("AmfgBQFNhdGJgiQAzgCA2AAQAABBggAnQgWAZgzAAQg1AAgqAVQj5Bvl+AAIAAiEg");
	this.shape_1156.setTransform(373.225,5020.225);

	this.shape_1157 = new cjs.Shape();
	this.shape_1157.graphics.f("#539E06").s().p("AEZCmIhkAAImfAAIhmAAIAAiBIAAiAQK5jlgZHmg");
	this.shape_1157.setTransform(469.4165,4964.2988);

	this.shape_1158 = new cjs.Shape();
	this.shape_1158.graphics.f("#B6BC4C").s().p("ACeCDImfAAIAAiBIAAiEIGfAAIBkAAIAACEIAACBIhkAAg");
	this.shape_1158.setTransform(471.725,4993.975);

	this.shape_1159 = new cjs.Shape();
	this.shape_1159.graphics.f("#8FA734").s().p("AjPCDImgAAIAAiFQJDAtFsiaQArgUA2AAIBmAAIBpAAQAABDggAmQgWAZgzgBQg1AAgqATQjiBaksAYIhpAAg");
	this.shape_1159.setTransform(394.025,4890.15);

	this.shape_1160 = new cjs.Shape();
	this.shape_1160.graphics.f("#F9C483").s().p("Ag6DGIAAg/QkmgFBVlAQOFgzoyFkQgdAUAAA/IhlAAg");
	this.shape_1160.setTransform(441.6433,4857.2316);

	this.shape_1161 = new cjs.Shape();
	this.shape_1161.graphics.f("#55A400").s().p("Ak3AYIAAiFIBoAAIBpAAQCdAFCZgFIBoAAQAABEgdAOQjhCJieAAQh+AAhVhWg");
	this.shape_1161.setTransform(528.725,4900.9433);

	this.shape_1162 = new cjs.Shape();
	this.shape_1162.graphics.f("#CBC263").s().p("AmgCDIk1AAIAAiBQJSiRLwAPQAzACA2AAQAABCgdARQhMAthmAAQg1AAgzgCQm/gTkXCWIhpAAg");
	this.shape_1162.setTransform(549.625,4863.9345);

	this.shape_1163 = new cjs.Shape();
	this.shape_1163.graphics.f("#5D9807").s().p("AlpgQQAzAAAVgYQAggnAAhCIBpAAIBmAAIE0AAIBoAAIAACBIhoAAIhpAAIAACFQgxAAgzAKQhaAThIAAQjRAAgriig");
	this.shape_1163.setTransform(482.175,4891.5928);

	this.shape_1164 = new cjs.Shape();
	this.shape_1164.graphics.f("#789A17").s().p("AmfCCIAAiBQEYiWG+AUQAzACA2AAQAABCgUAHQi9A3jPAAIAACBIhoAAQhMAChOAAQhOAAhPgCg");
	this.shape_1164.setTransform(559.975,4876.9132);

	this.shape_1165 = new cjs.Shape();
	this.shape_1165.graphics.f("#FABD72").s().p("AmEBtIAAiEQFqAAFeg9QALgDAAhBIA2AAQg2ExmAAAQiSAAjBgsg");
	this.shape_1165.setTransform(329.45,4424.5324);

	this.shape_1166 = new cjs.Shape();
	this.shape_1166.graphics.f("#F1B266").s().p("AmchQQGeAAGUBCQAIAAgBA+QgzAAgwAIQiTAZh6AAQk2AAiTihg");
	this.shape_1166.setTransform(269.65,4404.3539);

	this.shape_1167 = new cjs.Shape();
	this.shape_1167.graphics.f("#EF9E4D").s().p("A8WIHIAAyOQHrBpHACKQAtAPA0AAQKJA1H0C+QAsARA1AAQDMDfILhYQAxgGAzAAIGfAAIBpAAQAABAgMADQleA9lqAAIAACFIhpAAQ3iBV0OEuIAAiBg");
	this.shape_1167.setTransform(181.5,4409.325);

	this.shape_1168 = new cjs.Shape();
	this.shape_1168.graphics.f("#9CAD3E").s().p("AECCDQmwgHi7j+QF4AAD9BvQArATAzAAIAACDIhoAAg");
	this.shape_1168.setTransform(119.375,4162.425);

	this.shape_1169 = new cjs.Shape();
	this.shape_1169.graphics.f("#5DA003").s().p("AiaDLIAAiFIAAmCQDlB3BCEQQAOA/ABBBQg0AAgHAPQghBjg8AAQg/AAhfhyg");
	this.shape_1169.setTransform(140.05,4090.2691);

	this.shape_1170 = new cjs.Shape();
	this.shape_1170.graphics.f("#FAC47D").s().p("AGkE2Qm+iKnrhpIAAiFIAAkCQH3EWH8EiQAYAPAABBQg0AAgugOg");
	this.shape_1170.setTransform(51.8,4337.85);

	this.shape_1171 = new cjs.Shape();
	this.shape_1171.graphics.f("#5EA107").s().p("AByWFQj7h1l8AFIAAiBMAAAgopQF3NfJ0JaQAgAgAABCQkLGYDYF0IhtBEQhiA9gzCBIAACBIAACBQg1AAgqgRg");
	this.shape_1171.setTransform(51.8,4006.325);

	this.shape_1172 = new cjs.Shape();
	this.shape_1172.graphics.f("#8AA827").s().p("AE6B8QmnhEkvi6IIHAAIBmAAQAABBAdAnQAWAYA2AAQAyAAAWAdQAbAnAABBQgxAAgygHg");
	this.shape_1172.setTransform(456.15,4240.475);

	this.shape_1173 = new cjs.Shape();
	this.shape_1173.graphics.f("#70AE0D").s().p("AjjCpQgdgnAAhBIAAiAIAAiBQPHDatXBoQgHAAAAA/Qg2AAgWgYg");
	this.shape_1173.setTransform(502.7235,4220.875);

	this.shape_1174 = new cjs.Shape();
	this.shape_1174.graphics.f("#F5C682").s().p("EAKYAmbQgTgFAAg/QGeCfgzAAQgnAAkxhbgEgPXgmFQgdguAAhCQElHVgMAAQgKAAjyllg");
	this.shape_1174.setTransform(308.7406,4573.2552);

	this.shape_1175 = new cjs.Shape();
	this.shape_1175.graphics.f("#C4BE5D").s().p("AmfixQHDgWEaCDQAsAUA2AAIAACCQg2AAgsARQi/BSiQAAQktABhhlng");
	this.shape_1175.setTransform(207.425,4193.3845);

	this.shape_1176 = new cjs.Shape();
	this.shape_1176.graphics.f("#62980D").s().p("AG6CCQg2AAgsgTQkaiDnDAVIhmAAIAAiCIJtAAIBoAAQCaCCBoCBg");
	this.shape_1176.setTransform(204.85,4175.425);

	this.shape_1177 = new cjs.Shape();
	this.shape_1177.graphics.f("#58A204").s().p("ALxEDIhoAAIpuAAQgzAAgrgUQj9hvl5AAIhpAAIAAiAIAAiBQDNhCDTg1QA0gKAzAAQC4DbBFjMQAGgPAzAAQGKAKF9H7g");
	this.shape_1177.setTransform(152.95,4136.5);

	this.shape_1178 = new cjs.Shape();
	this.shape_1178.graphics.f("#76A712").s().p("AFtDDIk4AAIAAhAQmcAThrjVIAAiCQH0BeGWDXQAbAPAABAIhmAAg");
	this.shape_1178.setTransform(357.675,4207.9);

	this.shape_1179 = new cjs.Shape();
	this.shape_1179.graphics.f("#B9BC4E").s().p("AnRiFIEzAAIBoAAQBrDVGcgUIAABAQgzAAg1AEQhNAGhHAAQnYAAjOkLg");
	this.shape_1179.setTransform(316.45,4214.9791);

	this.shape_1180 = new cjs.Shape();
	this.shape_1180.graphics.f("#DECA70").s().p("Ak1CtIk3AAIAAiBQIIlWJwDHQAxAPAwAAIAACAIhoAAIrSAAIAACBIhoAAg");
	this.shape_1180.setTransform(1264.975,4677.8568);

	this.shape_1181 = new cjs.Shape();
	this.shape_1181.graphics.f("#EDCA79").s().p("AhnDDIhoAAIAAiBIAAiBQDVj7CIDkQAPAXAzAAQAAA/gdAVQhLAthoAAIAACBIhnAAg");
	this.shape_1181.setTransform(1109.35,4701.5999);

	this.shape_1182 = new cjs.Shape();
	this.shape_1182.graphics.f("#B9BD4C").s().p("AlsABQBpAABLgtQAegWAAg/IGeAAIBpAAQAAA/gPAFQl8BglOBfIAAiBg");
	this.shape_1182.setTransform(1145.7,4708.15);

	this.shape_1183 = new cjs.Shape();
	this.shape_1183.graphics.f("#CDC161").s().p("AicCCIjOAAIAAiBIAAiCIJtAAIBpAAQAABCgXAHQi6A5jPAAIAACBIhoAAg");
	this.shape_1183.setTransform(1042.25,4734.175);

	this.shape_1184 = new cjs.Shape();
	this.shape_1184.graphics.f("#A7B647").s().p("AicCCIjPAAIAAiBQF6AAD7hvQAsgTA1AAQAABEgdARQiyBujQBAIhoAAg");
	this.shape_1184.setTransform(959.1,4760.2);

	this.shape_1185 = new cjs.Shape();
	this.shape_1185.graphics.f("#5D9C08").s().p("AlwgkQBoAABMgvQAbgRAAhBIBoAAIDOAAIBoAAQgfDJB3BXQA3ArgyAAQhtAApdjKg");
	this.shape_1185.setTransform(928.5446,4789.8133);

	this.shape_1186 = new cjs.Shape();
	this.shape_1186.graphics.f("#CDC869").s().p("AloB+IAAh/QDziEF4ADIBmAAQAABBgbARQhLAvhpAAQgzAAgdAXQhwBtjcAAQgxAAg1gFg");
	this.shape_1186.setTransform(876.175,4786.3388);

	this.shape_1187 = new cjs.Shape();
	this.shape_1187.graphics.f("#5FA207").s().p("AoIeeQA1AAAZgbQC7iqxGBEIAACBIhmAAIhpAAQg1AAglgbQj1ionwBCIAAiGQAAg/gKAAQmWhCmbAAIAACBIAACGIhpAAIjOAAQAAhCgggmQgWgegzAAQAAg/gPAAQkohCk3AAQAAg/gegTQizhujPhBIAAiEIBoAAIBnAAQEtgVDihaQAsgRA1AAQAAA/giAnQhGBahpBEQLmEXBXlWIibhCQiXg9jThGIAAiBQFqh3HTgKIBmAAQF9AAD7hwQApgWA2AAQLqDdCejuQAbguAAhCIAAiBIAAiFIA4AAQAYnmq6DkIAACBIAACBQg1AAgxgMQk5h1k4iBIAAiAQFhiDhyiZQgggqAAg/QEugYDihaQApgUA2AAQA6DbFlhLQAzgKAxAAQDADFGUj4QAdgPAAhEIAAiBQDPAAC9g3QAUgIAAhBQBmAABKgvQAdgRAAhBIJvAAIBmAAQHCAWDzjBQAigaAAg/QF7g9ECiyQAkgYA2AAQEpAdCKiGQAdgYAzAAQN1EpiviIQh3hYAgjKQDRg/CxhwQAegRAAhEIBoAAIDPAAIBoAAQIOgHiEHtQjbMqpOQQQg2AAgkAaUgaEAQMgokAL3IAAiBgEgyOAPPQVnAA1ng/g");
	this.shape_1187.setTransform(612.091,4955.0694);

	this.shape_1188 = new cjs.Shape();
	this.shape_1188.graphics.f("#F9C77F").s().p("AjAAeQgFAAAAhDQJWBLk0AAQhgAAi9gIg");
	this.shape_1188.setTransform(766.2127,4750.9787);

	this.shape_1189 = new cjs.Shape();
	this.shape_1189.graphics.f("#85A61F").s().p("AE3BCQlpgDltADIAAiDIDPAAIBpAAIDNAAIBpAAQBoAABMAvQAdARAABDIhpAAg");
	this.shape_1189.setTransform(933.175,4285.925);

	this.shape_1190 = new cjs.Shape();
	this.shape_1190.graphics.f("#E8CD7B").s().p("AnQhPIBoAAQFogCFuACIBjAAIAACAQgzAAgwAHQihAZiJAAQlbAAi5igg");
	this.shape_1190.setTransform(845.05,4300.4684);

	this.shape_1191 = new cjs.Shape();
	this.shape_1191.graphics.f("#A8B040").s().p("AE6BCQlugDloADIAAiDILWAAIBjAAIAACDIhjAAg");
	this.shape_1191.setTransform(850.275,4285.925);

	this.shape_1192 = new cjs.Shape();
	this.shape_1192.graphics.f("#D2C760").s().p("AE3BCIhoAAIpuAAIAAiDILWAAIBpAAIAACDIhpAAg");
	this.shape_1192.setTransform(767.375,4285.925);

	this.shape_1193 = new cjs.Shape();
	this.shape_1193.graphics.f("#EACB7A").s().p("Alqh1IJtAAIBpAAIAAB/Qg2AAgsAWQjBBWiIAAQjjAAhIjrg");
	this.shape_1193.setTransform(565.2,4278.3223);

	this.shape_1194 = new cjs.Shape();
	this.shape_1194.graphics.f("#F2D07E").s().p("AnRhqIGgAAIBlAAQCcADCZgDIBpAAIAACDQgzAAgqATQiMA/iRAAQkLAAkejVg");
	this.shape_1194.setTransform(679.225,4290.0133);

	this.shape_1195 = new cjs.Shape();
	this.shape_1195.graphics.f("#B1B649").s().p("AE3BAIptAAQgzAAgWgbQgggmAAg/IIHAAIBnAAQBoAABLAuQAeARAABBIhpAAg");
	this.shape_1195.setTransform(559.975,4260.05);

	this.shape_1196 = new cjs.Shape();
	this.shape_1196.graphics.f("#77A717").s().p("AEFCDImfAAQABhCgegRQhLguhpAAIAAiEQGJAkE1CRQAZAOgBBCIhmAAg");
	this.shape_1196.setTransform(617,4253.35);

	this.shape_1197 = new cjs.Shape();
	this.shape_1197.graphics.f("#B0BE4D").s().p("AE5BAImfAAIhpAAIjPAAIAAh/IGfAAIBmAAQCcAACDA3QAZAIAABAIhmAAg");
	this.shape_1197.setTransform(643,4272.925);

	this.shape_1198 = new cjs.Shape();
	this.shape_1198.graphics.f("#85BD11").s().p("Aj7gJQgPAAAAhCQJcCXhRAAQg8AAnAhVg");
	this.shape_1198.setTransform(949.4325,3975.2092);

	this.shape_1199 = new cjs.Shape();
	this.shape_1199.graphics.f("#93B726").s().p("ADQCfIAAg/Qo6AdkCjfQMai2GdFdQAiAbAAA/IhoAAQhNAChNAAQhNAAhOgCg");
	this.shape_1199.setTransform(1244.275,4315.2727);

	this.shape_1200 = new cjs.Shape();
	this.shape_1200.graphics.f("#C3C353").s().p("AJxCBQrXgKpwh3IAAiAIIIAAIBpAAQEBDfI7gdIAAA/IhmAAg");
	this.shape_1200.setTransform(1192.4,4318.275);

	this.shape_1201 = new cjs.Shape();
	this.shape_1201.graphics.f("#86BD17").s().p("AmDAdQYOkN4OFMg");
	this.shape_1201.setTransform(1158.475,4263.6052);

	this.shape_1202 = new cjs.Shape();
	this.shape_1202.graphics.f("#87BB1B").s().p("AFrCLQjRgDjNADIhpAAIhmAAQAAhEgdgRQhMgvhoAAIAAh/QJhhMEkDyQAiAZAABEIhpAAg");
	this.shape_1202.setTransform(1000.65,4278.6051);

	this.shape_1203 = new cjs.Shape();
	this.shape_1203.graphics.f("#EAD077").s().p("ApshQILWAAIBoAAIEzAAIBoAAIAACAQgxAAgzAHQjQAai2AAQnJAAkmihg");
	this.shape_1203.setTransform(1057.575,4313.4816);

	this.shape_1204 = new cjs.Shape();
	this.shape_1204.graphics.f("#C0C459").s().p("AGfBBIulAAIAAiAQFtgCFpACIBoAAIBnAAIBoAAIAACAIhoAAg");
	this.shape_1204.setTransform(943.525,4298.8875);

	this.shape_1205 = new cjs.Shape();
	this.shape_1205.graphics.f("#9CB72C").s().p("AE3BBIrWAAIAAiAQDPgCDQACIBoAAQCaAACDA2QAbALAAA/IhpAAg");
	this.shape_1205.setTransform(1037.025,4298.8875);

	this.shape_1206 = new cjs.Shape();
	this.shape_1206.graphics.f("#86BD13").s().p("AkjAMQSOjJyOEIg");
	this.shape_1206.setTransform(1024.625,3875.5232);

	this.shape_1207 = new cjs.Shape();
	this.shape_1207.graphics.f("#85BD19").s().p("ANmgIQgRgHAAhCQGhCjg4AAQgpAAkvhagAzEhRQfwBC/wAAg");
	this.shape_1207.setTransform(2652.04,5677.8093);

	this.shape_1208 = new cjs.Shape();
	this.shape_1208.graphics.f("#83BD1A").s().p("AsIhQIWoAAIBpAAQmFChmEAAQmEAAmEihg");
	this.shape_1208.setTransform(2400.225,5664.875);

	this.shape_1209 = new cjs.Shape();
	this.shape_1209.graphics.f("#F8C787").s().p("EjFYAbRQxXiBa3v7QNdnoQ3noQsKjUAzgsUAC5gBoAp8gH/UBWcgQQBuZAG9UBoGAGTALVAQnQCqD/EfB+QFPCWDbDqUAHbAY5jU3AABUhRuAAAhyLgDrg");
	this.shape_1209.setTransform(3363.5963,5199.274);

	this.shape_1210 = new cjs.Shape();
	this.shape_1210.graphics.f("#78B80F").s().p("AmchQQGbAAGVBAQAJAFAAA+QgzAAgwAHQiOAXh2AAQk9AAiVihg");
	this.shape_1210.setTransform(1866.375,5638.8194);

	this.shape_1211 = new cjs.Shape();
	this.shape_1211.graphics.f("#6EAD0A").s().p("EixrAUOI+eAAQlSjdgbndUAjzgCIAdBACIQAAg/gJgFUgdugEhgi9ABhIAAiBMAlSAAAIBoAAIOjAAIBpAAQHQAAHMhBQAKAAAAhAQAzAAAVgaQAggqAAhAIIEAAIBoAAQHdhrIohVQAJAAAAhCIE4AAIBoAAQGbhEGPh6QARgHAAhCIDRAAIBmAAQM4Ktm6qSQgUgbgwAAIAAiBIBmAAIBoAAQHAAWEfiDQArgTAxAAQAABBgbARQhLAuhpAAQJZHiG2piIjPAAIjRAAIAAiEQF7ADD7hzQArgRA2AAQHrgnGniUQARgHAAg/IE3AAIBpAAQJiBLFQi7QAngWA1AAQEQBCCoCsQAbAZAxAAUAQ5AjKA85gItQAzgHA2AAQDMDdILhSQAwgIAzAAIE4AAIBoAAUA6GAHiBBDABmIAABBMlCWAAAQzMAAzFAxIeeAAQ2HA419B6QiaANiKAAQoOAAkji/gEiGJAIXQOyEpvHlvQAABEAVACgEhUGAGUQTyC5z6j9QAAA/AIAFgEiLTADPIAAA/QNLiXhxAAQhWAAqEBYgEgyLgPEQOyEfLIogIhoAAQtxAYqhDpg");
	this.shape_1211.setTransform(1368.675,5584.2539);

	this.shape_1212 = new cjs.Shape();
	this.shape_1212.graphics.f("#84BC19").s().p("An8geQfyA9/yAAg");
	this.shape_1212.setTransform(1574.925,5608.15);

	this.shape_1213 = new cjs.Shape();
	this.shape_1213.graphics.f("#88BE11").s().p("AjfCCIAAiFQA2AAATgYQAggnAAhBIBoAAIBmAAQAzAAAYAaQDPDtnvAAQguAAg0gCg");
	this.shape_1213.setTransform(1380.5805,5436.1264);

	this.shape_1214 = new cjs.Shape();
	this.shape_1214.graphics.f("#97B730").s().p("ABoCCIhoAAIhoAAIk3AAIAAiBQDRgBC+g7QAQgCAAhEQCZACCegCIBpAAQAABEgdARQhMAthoAAIAACBIhnAAg");
	this.shape_1214.setTransform(1368.675,5409.875);

	this.shape_1215 = new cjs.Shape();
	this.shape_1215.graphics.f("#DCCC6B").s().p("AnQCMIAAiBQEXjJInBCQAxAHAyAAQAAA/gOAFQjzA8kBAAIAACBIhoAAIidABIiagBg");
	this.shape_1215.setTransform(1456.8,5382.8606);

	this.shape_1216 = new cjs.Shape();
	this.shape_1216.graphics.f("#97BA28").s().p("AoEA2IAAiAQECAADzg9QAPgFAAg/IBoAAIE3AAIBmAAQjPCBgzCCQgcCUjAAAQjBAAlqiWg");
	this.shape_1216.setTransform(1503.475,5391.4814);

	this.shape_1217 = new cjs.Shape();
	this.shape_1217.graphics.f("#DCCA6A").s().p("AGeBBIoHAAIhmAAIk3AAIAAiAIOkAAIBpAAIAACAIhpAAg");
	this.shape_1217.setTransform(1565.75,5364.65);

	this.shape_1218 = new cjs.Shape();
	this.shape_1218.graphics.f("#A0BA33").s().p("Ak0CDIhoAAIAAiBQF2AAD+hvQAsgVAxAAIBoAAQAABBgfAbQjUCpl4AAIhmAAg");
	this.shape_1218.setTransform(1658.975,5357.975);

	this.shape_1219 = new cjs.Shape();
	this.shape_1219.graphics.f("#86BB1D").s().p("Ao5ABQF5AADSipQAggbAAhBQCeAECZgEIBpAAIBoAAQAABBgaA2QjBGSlCAAQkBAAlVkEg");
	this.shape_1219.setTransform(1695.325,5370.9652);

	this.shape_1220 = new cjs.Shape();
	this.shape_1220.graphics.f("#EAD278").s().p("AgyCAIhoAAIAAhAQjsAIAdjJIDPAAIBoAAQA6DVFlgUIAABAIhoAAQhNAChOAAQhOAAhOgCg");
	this.shape_1220.setTransform(1705.391,5332.0625);

	this.shape_1221 = new cjs.Shape();
	this.shape_1221.graphics.f("#C8C551").s().p("ABcCBIAAhAQllAUg6jVIDRAAIBmAAQHNBMiqCcQgdAZg2AAIhoAAg");
	this.shape_1221.setTransform(1732.748,5331.95);

	this.shape_1222 = new cjs.Shape();
	this.shape_1222.graphics.f("#8BB715").s().p("AGfCfIjSAAIhoAAIjOAAIhjAAIAAg/QkuAMgKjQQIbitHOFWQAgAbAAA/IhmAAg");
	this.shape_1222.setTransform(1679.775,5303.161);

	this.shape_1223 = new cjs.Shape();
	this.shape_1223.graphics.f("#B1BA41").s().p("AGiB0QmRh5oZAFIAAiBIJwAAIBpAAQAKDQEtgMIAAA/Qg1AAgxgOg");
	this.shape_1223.setTransform(1607.2,5306.05);

	this.shape_1224 = new cjs.Shape();
	this.shape_1224.graphics.f("#85BB18").s().p("Aj4iEQNwDkqmAkIgJABQipAAgYkJg");
	this.shape_1224.setTransform(1466.2147,5176.21);

	this.shape_1225 = new cjs.Shape();
	this.shape_1225.graphics.f("#8FBA23").s().p("AGdDQIkyAAIAAhCQnUAYicjaQK0l0E6IIQAdAuAABCIhpAAg");
	this.shape_1225.setTransform(1441.125,5272.2724);

	this.shape_1226 = new cjs.Shape();
	this.shape_1226.graphics.f("#E8CD78").s().p("AqfhPIDOAAIBpAAIEyAAIBoAAIIIAAIBmAAIAACAQgwAAg2AHQjbAYjDAAQnvAAlMifg");
	this.shape_1226.setTransform(1487.925,5301.0809);

	this.shape_1227 = new cjs.Shape();
	this.shape_1227.graphics.f("#CBC45C").s().p("AI7CCIjOAAQg2AAgzgHQm8hTnrgoIAAiBIJxAAIBlAAQCcDaHVgZIAABCIhpAAg");
	this.shape_1227.setTransform(1384.225,5280.025);

	this.shape_1228 = new cjs.Shape();
	this.shape_1228.graphics.f("#83BC17").s().p("Am1irIAAiBIGgAAIBoAAQH+gujgCDQhQAsgdAuQkGG2isAAQi2AAhRnkg");
	this.shape_1228.setTransform(1909.9157,4946.2416);

	this.shape_1229 = new cjs.Shape();
	this.shape_1229.graphics.f("#B9BB4F").s().p("AnTAAIAAiGQG9BaHbBnQAPADAABBQg2AAgzADQhUAFhPAAQmTAAkIiHg");
	this.shape_1229.setTransform(1975.2,4578.5626);

	this.shape_1230 = new cjs.Shape();
	this.shape_1230.graphics.f("#ABB747").s().p("AlrAAQE4g+E2g7QAzgHA2AAQAABCgcAKQkyCVmJAgIAAiBg");
	this.shape_1230.setTransform(1954.55,4630.225);

	this.shape_1231 = new cjs.Shape();
	this.shape_1231.graphics.f("#8EA724").s().p("AoFB+IAAiEQFqAAFdg9QAPgCAAhCIDMAAIBpAAQAABCgdARQktC8ncAAQhuAAh3gKg");
	this.shape_1231.setTransform(1835.25,4656.7245);

	this.shape_1232 = new cjs.Shape();
	this.shape_1232.graphics.f("#E6CD77").s().p("AnRhRIDRAAIBkAAQEGAFECgFIBmAAIAACFQgxAAgzAHQieAXiFAAQliAAi6ijg");
	this.shape_1232.setTransform(1881.825,4573.2616);

	this.shape_1233 = new cjs.Shape();
	this.shape_1233.graphics.f("#B5BE51").s().p("AmchPIJtAAIBpAAQAwAAAXAbQAcAnAAA+IhjAAIjSAAQg1AAgxAMQhbAThJAAQjRAAgpifg");
	this.shape_1233.setTransform(1824.8,4560.1898);

	this.shape_1234 = new cjs.Shape();
	this.shape_1234.graphics.f("#BEBE4E").s().p("Amfg/ILWAAIBpAAQAAA/gMAEQmUA8mfAAIAAh/g");
	this.shape_1234.setTransform(1907.725,4506.825);

	this.shape_1235 = new cjs.Shape();
	this.shape_1235.graphics.f("#E9D17A").s().p("AACBAIhnAAQieACiagCIAAiAILWAAIBlAAIAACAIhlAAIicABIibgBg");
	this.shape_1235.setTransform(1824.8,4506.8875);

	this.shape_1236 = new cjs.Shape();
	this.shape_1236.graphics.f("#DACB65").s().p("AmehRILXAAIBlAAIAACAQg1AAgwAMQiNAXh1AAQk+AAiXijg");
	this.shape_1236.setTransform(1928.5,4417.3621);

	this.shape_1237 = new cjs.Shape();
	this.shape_1237.graphics.f("#75BB07").s().p("AnThPIM+AAIBpAAIAACAQg4AAgxAHQifAYiHAAQleAAi6ifg");
	this.shape_1237.setTransform(2120.35,4508.3806);

	this.shape_1238 = new cjs.Shape();
	this.shape_1238.graphics.f("#C5C75A").s().p("AE3BAIrWAAIAAiAILWAAIBpAAIAACAIhpAAg");
	this.shape_1238.setTransform(1990.875,4493.95);

	this.shape_1239 = new cjs.Shape();
	this.shape_1239.graphics.f("#F4C980").s().p("AukAhQNZgrrmiXQgMgCAAhCIDRAAIBkAAIBoAAIBoAAQDPDgIIhTQAwgMA2AAQDRAAC+A/QARAFAABBQg2AAgsARQmmC0muAAQnEAAnPjFg");
	this.shape_1239.setTransform(1918.3,4432.1548);

	this.shape_1240 = new cjs.Shape();
	this.shape_1240.graphics.f("#79BE0A").s().p("AnSgIQFtgCFdg9QAMgFAAg/IBmAAIBpAAQAAA/ggAdQjnC7juAAQjVAAjbiUg");
	this.shape_1240.setTransform(1964.875,4384.3158);

	this.shape_1241 = new cjs.Shape();
	this.shape_1241.graphics.f("#B8BF48").s().p("AIHCDQlqgElpAEQAAhBgRgFQi+g+jRAAIAAiBQJwBBJgCAQAJADAABBIhmAAg");
	this.shape_1241.setTransform(2032.075,4422.325);

	this.shape_1242 = new cjs.Shape();
	this.shape_1242.graphics.f("#D1C865").s().p("AlqBAIhpAAIAAiAIM+AAIBpAAQAABBgPACQldA+lqgBIhoAAg");
	this.shape_1242.setTransform(1809.35,4649.55);

	this.shape_1243 = new cjs.Shape();
	this.shape_1243.graphics.f("#BABB4A").s().p("AE3BDQlpgFltAFIAAiFQEHAFEBgFIBmAAIBoAAIBpAAIAACFIhpAAg");
	this.shape_1243.setTransform(1741.875,4662.675);

	this.shape_1244 = new cjs.Shape();
	this.shape_1244.graphics.f("#D8CC64").s().p("AE1BDQjMgFjOAFIhpAAIjOAAIAAiFILRAAIBoAAIAACFIhoAAg");
	this.shape_1244.setTransform(1658.975,4662.675);

	this.shape_1245 = new cjs.Shape();
	this.shape_1245.graphics.f("#81A920").s().p("As8AmIAAiAILSAAIBpAAILWAAIBoAAQAABAgYAOQjSBnoKAAQlzAAoSg1g");
	this.shape_1245.setTransform(1327.325,4691.3319);

	this.shape_1246 = new cjs.Shape();
	this.shape_1246.graphics.f("#AABD4A").s().p("AFsBCIhpAAIrWAAIAAiAQFsgFFqAFIBpAAIBoAAIAACAIhoAAg");
	this.shape_1246.setTransform(1373.9,4675.6875);

	this.shape_1247 = new cjs.Shape();
	this.shape_1247.graphics.f("#79A516").s().p("ArWg/IQOAAIBoAAIDPAAIBoAAQAAA/gHAAQrQBBrWgBIAAh/g");
	this.shape_1247.setTransform(1576.05,4675.8);

	this.shape_1248 = new cjs.Shape();
	this.shape_1248.graphics.f("#88AE26").s().p("AE1BAIrRAAIAAh/ILRAAIBoAAIAAB/IhoAAg");
	this.shape_1248.setTransform(1462.025,4675.8);

	this.shape_1249 = new cjs.Shape();
	this.shape_1249.graphics.f("#EBD27B").s().p("AOkBDIwNAAIhpAAIrRAAIhpAAIAAiFIewAAIBpAAIAACFIhpAAg");
	this.shape_1249.setTransform(1513.95,4662.675);

	this.shape_1250 = new cjs.Shape();
	this.shape_1250.graphics.f("#D6C962").s().p("AqjiKIJxAAIBlAAQCcDfHVgbIAABCQg2AAgzACQiTANiHAAQpuAAlWkVg");
	this.shape_1250.setTransform(1384.225,4345.0483);

	this.shape_1251 = new cjs.Shape();
	this.shape_1251.graphics.f("#92B433").s().p("AAABCQjQgDjPADIAAiDQCeADCZgDIBoAAQCZADCegDIBpAAQAABAgbALQiDA4iZAAIhpAAg");
	this.shape_1251.setTransform(1783.475,4519.825);

	this.shape_1252 = new cjs.Shape();
	this.shape_1252.graphics.f("#86A524").s().p("ApugOIAAiBIBoAAQDOgDDSADIBoAAQCYDaHWgZIAAA/IhpAAIptAAQg2AAguANQheAThJAAQjSAAgrifg");
	this.shape_1252.setTransform(1793.8,4540.8136);

	this.shape_1253 = new cjs.Shape();
	this.shape_1253.graphics.f("#EACC79").s().p("AjLDDQi7gmgZjTQDqjDHsA7QAzAHA2AAIAACBIhpAAQiZACiegCIAACCIhnAAIAACBQgxAAgzgKg");
	this.shape_1253.setTransform(1741.875,4518.7987);

	this.shape_1254 = new cjs.Shape();
	this.shape_1254.graphics.f("#D4CB65").s().p("Ao6iLIGfAAIBpAAQCYDaHVgbIAABFQg1AAgxAEQiIAPh5AAQoVAAj5kXg");
	this.shape_1254.setTransform(1581.175,4371.3726);

	this.shape_1255 = new cjs.Shape();
	this.shape_1255.graphics.f("#BFC350").s().p("AIJCBIjRAAQg1AAgxgHQmfg4mfhCIAAiAQJtBCJiB7QAKAFAAA/IhkAAg");
	this.shape_1255.setTransform(1804.025,4396.325);

	this.shape_1256 = new cjs.Shape();
	this.shape_1256.graphics.f("#E7CE73").s().p("AmchNIDMAAIBmAAQDQgDDPAAQA1ADAzAAIAAB/QgzAAgwAIQiQAXh3AAQk7AAiUieg");
	this.shape_1256.setTransform(1700.575,4391.2556);

	this.shape_1257 = new cjs.Shape();
	this.shape_1257.graphics.f("#9EB930").s().p("AGdCDIkyAAIAAhBQnUAaicjeILWAAIBmAAQgdDJDsgFIAABBIhpAAg");
	this.shape_1257.setTransform(1441.125,4344.275);

	this.shape_1258 = new cjs.Shape();
	this.shape_1258.graphics.f("#82BD0D").s().p("AIHCMIrWAAIAAg/QllAVg4jXQQBhVC7DwQAdAnAAA/IhmAAg");
	this.shape_1258.setTransform(1410.125,4317.1555);

	this.shape_1259 = new cjs.Shape();
	this.shape_1259.graphics.f("#84BD17").s().p("AAfC9QgtgUgzAAQgxAAgHgRQguhwAAiAIAAiAQG3GxiHAAQgjAAhHgcg");
	this.shape_1259.setTransform(2754.1845,4639.0543);

	this.shape_1260 = new cjs.Shape();
	this.shape_1260.graphics.f("#82BB17").s().p("AFuErQnyhmlMkUIAAiBQMhlIB3LPQAJA/AABCQgwAAgzgNg");
	this.shape_1260.setTransform(2659.4,4547.2897);

	this.shape_1261 = new cjs.Shape();
	this.shape_1261.graphics.f("#83BD19").s().p("Ak4iFQCeAFCaAAQA0gFAzAAQCeAFARAxQBVDVh/AAQiOAAmWkLg");
	this.shape_1261.setTransform(2519.6035,4812.3061);

	this.shape_1262 = new cjs.Shape();
	this.shape_1262.graphics.f("#86BC18").s().p("AmkA5QObpkhaLKQgFAbjMAbQhnANhXAAQk5AAh5ipg");
	this.shape_1262.setTransform(2333.4994,4494.689);

	this.shape_1263 = new cjs.Shape();
	this.shape_1263.graphics.f("#B0BD40").s().p("ApvCDIAAiFQJ4gCH+h1QAzgJA2AAQAABBgWAKQn/C6qWAAIg0AAg");
	this.shape_1263.setTransform(2156.575,4474.3889);

	this.shape_1264 = new cjs.Shape();
	this.shape_1264.graphics.f("#89B81A").s().p("ACdC8IhpAAIs+AAIhpAAIkyAAIAAiBIIDAAIBmAAQK3AHISjBQAWgKAAhCIDRAAIBmAAIBmAAIBmAAQAABCgdApQjdEsoNAAQh5AAiJgQg");
	this.shape_1264.setTransform(2151.475,4481.6198);

	this.shape_1265 = new cjs.Shape();
	this.shape_1265.graphics.f("#D6C162").s().p("AmfhOQFrgEFrAEIBpAAIAACAQg4AAgxAIQiQAXh4AAQk5AAiVifg");
	this.shape_1265.setTransform(2198.275,4443.3411);

	this.shape_1266 = new cjs.Shape();
	this.shape_1266.graphics.f("#A8C738").s().p("AhKCEIhmAAQAAg/gggpQgWgZgwAAIAAiAQNZgunOEZQgkAWg2AAIhlAAg");
	this.shape_1266.setTransform(2267.7569,4448.0274);

	this.shape_1267 = new cjs.Shape();
	this.shape_1267.graphics.f("#83C017").s().p("Ai5BCIjPAAIAAiDQUuADuSB4QgvAIg2AAIhoAAg");
	this.shape_1267.setTransform(2538.1098,4519.825);

	this.shape_1268 = new cjs.Shape();
	this.shape_1268.graphics.f("#82BF18").s().p("Am0BhQVOosryH5QjaCViiAAQiDAAhdhig");
	this.shape_1268.setTransform(1598.8746,3451.2485);

	this.shape_1269 = new cjs.Shape();
	this.shape_1269.graphics.f("#82BF16").s().p("AlQgWIAAiAQFlBVBmjDQAKgTAzAAICZAAQgWIvjdAAQihAAkNkug");
	this.shape_1269.setTransform(1733.975,3398.0224);

	this.shape_1270 = new cjs.Shape();
	this.shape_1270.graphics.f("#6EAF0F").s().p("AqhgeQJuhCJrg9QA2gCA0AAQmHE/l6AAQkkAAkei+g");
	this.shape_1270.setTransform(2058.25,2684.2742);

	this.shape_1271 = new cjs.Shape();
	this.shape_1271.graphics.f("#59A200").s().p("AldAoQg/gog2hCIM/AAIBmAAQAABBgPACQleA9lpAFQg2AAgkgbg");
	this.shape_1271.setTransform(1995.975,2661.6);

	this.shape_1272 = new cjs.Shape();
	this.shape_1272.graphics.f("#5BA019").s().p("Ao4hCIQNAAIBkAAQAABCgKACQknBBjzAAQlbAAjyiFg");
	this.shape_1272.setTransform(1809.25,2648.6713);

	this.shape_1273 = new cjs.Shape();
	this.shape_1273.graphics.f("#5EA218").s().p("AOnBBIs+AAIhlAAIs/AAQgzAAgngXQg/gpg4hBIezAAIBmAAIAACBIhmAAg");
	this.shape_1273.setTransform(2032.1,2648.45);

	this.shape_1274 = new cjs.Shape();
	this.shape_1274.graphics.f("#5DA202").s().p("As8hPIYQAAIBpAAQmdCfmfAAQmdAAmgifg");
	this.shape_1274.setTransform(1617.4,2676.325);

	this.shape_1275 = new cjs.Shape();
	this.shape_1275.graphics.f("#6DB011").s().p("AoLgSUAgvgBOggvACOg");
	this.shape_1275.setTransform(1794.3,2734.863);

	this.shape_1276 = new cjs.Shape();
	this.shape_1276.graphics.f("#5DA000").s().p("AljBXQWOn82OI9g");
	this.shape_1276.setTransform(1528.4625,2776.3317);

	this.shape_1277 = new cjs.Shape();
	this.shape_1277.graphics.f("#6FAE0E").s().p("Al6AMQXqjL3qELg");
	this.shape_1277.setTransform(1448.125,2835.7619);

	this.shape_1278 = new cjs.Shape();
	this.shape_1278.graphics.f("#488245").s().p("AirBXIAAiAIAAiBIBmAAIBnAAQA2AAAMARQCYFEipAAQhVAAiphUg");
	this.shape_1278.setTransform(1489.4536,2555.2504);

	this.shape_1279 = new cjs.Shape();
	this.shape_1279.graphics.f("#4F874A").s().p("AgyEDIhmAAQAAg/gbg4QgbhJgzhCIAAiCIAAiBQDbBrEXBTQARAHAAA+IhpAAIhmAAIAACBIAACBIhlAAg");
	this.shape_1279.setTransform(1467.125,2538.075);

	this.shape_1280 = new cjs.Shape();
	this.shape_1280.graphics.f("#5FA121").s().p("APZCCMggZAAAIAAiAQM/AAM3g/QADAAAAhEQB3CdEpgWQA1gFAzABIAACAIhoAAg");
	this.shape_1280.setTransform(1632.975,2629);

	this.shape_1281 = new cjs.Shape();
	this.shape_1281.graphics.f("#519127").s().p("As8hBQMKADMJgDIBmAAQAABDgDAAQs4BAs+AAIAAiDg");
	this.shape_1281.setTransform(1606.95,2622.575);

	this.shape_1282 = new cjs.Shape();
	this.shape_1282.graphics.f("#568F4B").s().p("AQ9JEIhlAAQsLACsIgCIhnAAIhoAAQgBhCgfgkQjRjgl8g9IAAiGIBpAAIBmAAIBmAAQH1D4jknnQgMgRg2AAQAAg/gRgIQkYhSjbhrIAACAIAACEQg1AAgHgRQhhjzgxkFQGTAlNWBJQDzATDOA7QEBBJjTFBQguBEA2B/QIeEWH3kAQAsgWAyAAQCfCGB5CZQAgAnAABCIAACBIAACDQgzAAg2AFQgkADghAAQjyAAhpiLg");
	this.shape_1282.setTransform(1581.3,2558.0094);

	this.shape_1283 = new cjs.Shape();
	this.shape_1283.graphics.f("#85B17B").s().p("AjMh/QA1AAAWgYQAdgpAAhEQA2EsDjCNQAdAMAABEIhoAAIgNAAQlWAAAtmEg");
	this.shape_1283.setTransform(1689.7125,2460.032);

	this.shape_1284 = new cjs.Shape();
	this.shape_1284.graphics.f("#7EAD62").s().p("ABWGEQAWj9iugFQg2AAgVgYQhThpgxiCQDsBGgWjHQgHhCAAg/IBoAAQGMC5kMHgQgdAuAABAg");
	this.shape_1284.setTransform(1655.4923,2395.125);

	this.shape_1285 = new cjs.Shape();
	this.shape_1285.graphics.f("#8AB675").s().p("AhjHHQg1AAgFgPQgui2AAjDQElg1APlPIAAiBQA1AAADAMQCIH3kkCDIAACGIAACBIhoAAg");
	this.shape_1285.setTransform(1658.7133,2310.875);

	this.shape_1286 = new cjs.Shape();
	this.shape_1286.graphics.f("#7EB057").s().p("AhZI+IhoAAQi0gFBLj8QE7pHgFjFIAAiBIDSAAIBjAAIAACBQgOFQknA1QAADCAvC2QAEAPA2AAQAAA/AHBBQAQCUh8AAQgrAAg+gTg");
	this.shape_1286.setTransform(1637.0845,2324.6704);

	this.shape_1287 = new cjs.Shape();
	this.shape_1287.graphics.f("#92C07A").s().p("ADUDEIjRAAQg1AAgwgNQjxgwAglKIDRAAIBlAAQAABCgfAnQgWAYgwAAQA4DVFigRIAABCIhkAAg");
	this.shape_1287.setTransform(1638.0176,2245.825);

	this.shape_1288 = new cjs.Shape();
	this.shape_1288.graphics.f("#C0E4CC").s().p("AESCUQgMkPknAKIAACAQg2AAgzgFQi5gpgWjTQMbiqh4KqQgCAHgzAAQAAhBgDhAg");
	this.shape_1288.setTransform(1610.6303,2198.531);

	this.shape_1289 = new cjs.Shape();
	this.shape_1289.graphics.f("#88BB54").s().p("AhoRfQAfjHjzAnQjMAfgZhEQg6ibmxuxQCllhFCjTQAdgUAAhBQEek8I2DpICohOQBEgiA2hEIAAiBQEogKAMERQACA/AABCIhmAAIjQAAQggFKDwAxQAxAMA1AAIAACBQAGDFk8JHQhMD8C0AFIBoAAQAxCEBTBoQAVAYA2AAQAABCgYAKQmJCaksAAQjzAAi1hlg");
	this.shape_1289.setTransform(1545.05,2309.0843);

	this.shape_1290 = new cjs.Shape();
	this.shape_1290.graphics.f("#84B957").s().p("AAxQwQnqgOiBk4QAAg/AWg6QB6k/j4lTQByv9MwhTIAABCQAABBgdAUQlADTimFhQGwOxA7CbQAYBEDMgfQDzgngfDHQAABCggAYQjgColvAFg");
	this.shape_1290.setTransform(1467.3307,2333.475);

	this.shape_1291 = new cjs.Shape();
	this.shape_1291.graphics.f("#87B576").s().p("ACCHvQhhhhjwmNIAAiAIAAkBQA2AAATgdQAggnAAhCQCJE8CeJVQAPA9AAA/QgxAAgdgYg");
	this.shape_1291.setTransform(1544.825,2057.125);

	this.shape_1292 = new cjs.Shape();
	this.shape_1292.graphics.f("#82B45C").s().p("Am4R9QlbkABEm3QEyv/GokJQFQjNm6jCIDMAAIBmAAQAFCoA4ByIAABoIBLAAQBmBnCyAYQA1AHAzAAIAACBQAABCgfAnQgUAdg1AAIAAEBIAACBQAABDgKABQk/AwsoIXQFBFBicEyQgMAUgxAAQAAhAgigVg");
	this.shape_1292.setTransform(1461.3686,2063.7);

	this.shape_1293 = new cjs.Shape();
	this.shape_1293.graphics.f("#D2F1F6").s().p("AlqFHQiygYhmhnIGAAAIAAAGIAACAQgzAAg1gHgAsKi5IAAiBIA9gTIAAGtQg4hxgFiogAL2i+IAAgJQAMAGAJAIg");
	this.shape_1293.setTransform(1560.375,1958.9);

	this.shape_1294 = new cjs.Shape();
	this.shape_1294.graphics.f("#649946").s().p("EAiBADCIoIAAIhmAAI+zAAIhmAAIoIAAIhkAAIwPAAIhoAAIAAiAIAAiCIAAiCQA1AAASAZQAhAnAABCUAfgADjAkigBhIBpAAIAACAIhpAAg");
	this.shape_1294.setTransform(1970.1,2622.55);

	this.shape_1295 = new cjs.Shape();
	this.shape_1295.graphics.f("#84BE18").s().p("AjIgaQMjgpsjBqg");
	this.shape_1295.setTransform(1015.5625,3840.2821);

	this.shape_1296 = new cjs.Shape();
	this.shape_1296.graphics.f("#83BE17").s().p("Eh50AypQUmjz0mEzgEBt2gwzQWkm4z4J2QhLAlguAAQhyAAA/jjg");
	this.shape_1296.setTransform(1909.8932,3396.4533);

	this.shape_1297 = new cjs.Shape();
	this.shape_1297.graphics.f("#61942B").s().p("Ak2CEQAAg/gWg2QgghKgzhCQIHBaDljCQAdgZA2AAIAACBQAABCgZA1Qh5EFjhAAQiZAAjKh7g");
	this.shape_1297.setTransform(1026.575,3434.3546);

	this.shape_1298 = new cjs.Shape();
	this.shape_1298.graphics.f("#6FAD13").s().p("AnQgLQHxEsDMm3QAYg1AAhCQBpAABHAuQAcAUAAA/QgzAAgJAWQjEGEjtAAQjLAAjpkZg");
	this.shape_1298.setTransform(1042,3448.7699);

	this.shape_1299 = new cjs.Shape();
	this.shape_1299.graphics.f("#60981A").s().p("AkFBXQAAg/gcgUQhHgthpAAIAAiBIAAiDIAAiBQE3GyGukZQAkgYAxAAQClAxhwDTIA0AAQAABBgeAwQjIFniwAAQirAAiWlYg");
	this.shape_1299.setTransform(1114.7,3425.9895);

	this.shape_1300 = new cjs.Shape();
	this.shape_1300.graphics.f("#63A018").s().p("AlqAIQC6gyARjRQAGhCAAg/QDaBmEaBXQAQADAABBQgwAAgMAUQjUHkiuAAQiaAAh9l1g");
	this.shape_1300.setTransform(948.65,3408.1416);

	this.shape_1301 = new cjs.Shape();
	this.shape_1301.graphics.f("#73AB14").s().p("Ag7F0QiWk8ACm8QDoA9BaAwQAsAUAxAAQAABBggAnQgRAZg4AAIAACEIhmAAIAAECIAACBQgyAAgKgRg");
	this.shape_1301.setTransform(933.073,3317.725);

	this.shape_1302 = new cjs.Shape();
	this.shape_1302.graphics.f("#6EAD11").s().p("AiCgFQIMiBoMC/g");
	this.shape_1302.setTransform(915.1875,3227.6079);

	this.shape_1303 = new cjs.Shape();
	this.shape_1303.graphics.f("#62AF1E").s().p("Ao4h2QIGADIDgDIBoAAQAABEgWAKQlnCfkFAAQlAAAivjtg");
	this.shape_1303.setTransform(865.85,3186.6465);

	this.shape_1304 = new cjs.Shape();
	this.shape_1304.graphics.f("#489E12").s().p("Ak2BAIAAh/QA1AAARgbQAignAAg/QDOA/DTA1QAzANAxAAIAAA/QmwAGi9C7IAAiBg");
	this.shape_1304.setTransform(953.875,3155.425);

	this.shape_1305 = new cjs.Shape();
	this.shape_1305.graphics.f("#70AD0D").s().p("AjVBhQNXogtXJfg");
	this.shape_1305.setTransform(809.4375,3243.1125);

	this.shape_1306 = new cjs.Shape();
	this.shape_1306.graphics.f("#278A29").s().p("Ao4AIIAAiAQJrCWGiiHQAzgPAxAAIAACAQgxAAguAWQjRBbj1AAQkPAAk9hxg");
	this.shape_1306.setTransform(720.7,3173.9399);

	this.shape_1307 = new cjs.Shape();
	this.shape_1307.graphics.f("#62AF1F").s().p("Ao4iKQJYDVG6i/QAugWAxAAQAABEgbARQk1DAkBAAQk1AAjrkVg");
	this.shape_1307.setTransform(720.7,3188.6095);

	this.shape_1308 = new cjs.Shape();
	this.shape_1308.graphics.f("#04632B").s().p("AmfGfQBpiBBLiUQAbgxAAhCIAAh/IAAiEQCbiBB7ibQAignAAg/IBnAAQhMD8CcA9QAYAIAABBQhLEBCZA9QAbAHAAA/QAABCgiAsQkMFpjcAAQioAAiNjQg");
	this.shape_1308.setTransform(632.675,2964.5485);

	this.shape_1309 = new cjs.Shape();
	this.shape_1309.graphics.f("#096A2D").s().p("AmeEwQC5gzAUjTQACg/AAhBQDwBJgbjKQgFg/AAhCQA2g/AahMQAWg6AAg/QA2AAATAYQAgAnAABCQgnGiCvDQQAWAYAxAAIAACBIhnAAQgzAAgdAZQkgEUihAAQioAAgdktg");
	this.shape_1309.setTransform(736.125,2988.4503);

	this.shape_1310 = new cjs.Shape();
	this.shape_1310.graphics.f("#096115").s().p("AAlHvQivjRAnmiQCzgFg8kBQgPg9AAg/IBmAAIAAOMIAACBQgxAAgVgYg");
	this.shape_1310.setTransform(766.8955,2954.1);

	this.shape_1311 = new cjs.Shape();
	this.shape_1311.graphics.f("#016D31").s().p("Ak2DBQCgjAB6jVQAcgzAAg/IBmAAQAAA/AiApQAWAZAxAAQAABEAfAnQAUAYA1AAQAABCgfAeQkhEpiaAAQhoAAgriGg");
	this.shape_1311.setTransform(767.375,3051.6131);

	this.shape_1312 = new cjs.Shape();
	this.shape_1312.graphics.f("#6CAE14").s().p("AnmGwIgWAAQgggDgHgOQgYhJgNhLQgHgvAAgzQCciNApj3QAMhBAAhAQDWADBdA9IAAhAQQbkfpdK+QggAnAAA/QgwAAg4gFQmwgzi5C8IAACDIhoAAg");
	this.shape_1312.setTransform(919.9314,3040.8649);

	this.shape_1313 = new cjs.Shape();
	this.shape_1313.graphics.f("#1D7B1F").s().p("ACGIpIAWAAIAABCIgWhCgAkDAfIAAiBIAAmHIAAiBIBoAAQhJMHHonBIAABBQAABAgMBBQgpD4icCNQAAAyAHAvQh7jsjCh5g");
	this.shape_1313.setTransform(855.625,3028.75);

	this.shape_1314 = new cjs.Shape();
	this.shape_1314.graphics.f("#006328").s().p("AhmE9Qg2AAgTgYQgggnAAhEQGVgKgsn+IA2AAIAAGHIAACBQg2AAAAAHQgMCOiHAAQguAAg/gSg");
	this.shape_1314.setTransform(808.825,3013.2142);

	this.shape_1315 = new cjs.Shape();
	this.shape_1315.graphics.f("#429531").s().p("AhoGGIAAuMQC4ECgdIEIA1AAQABBCggAnQhJBchoBCIAAiBg");
	this.shape_1315.setTransform(788.05,2954.1);

	this.shape_1316 = new cjs.Shape();
	this.shape_1316.graphics.f("#08642F").s().p("AjhFsQgigpAAg/IAAiBQBphCBIhbQAggnAAhCIAAiBQAxg/BDgsQAkgVA2AAQAyAAAXAaQAfAnAAA/IAACBIg2AAQAtH+mWAKQgxAAgVgZg");
	this.shape_1316.setTransform(803.6,2992.9);

	this.shape_1317 = new cjs.Shape();
	this.shape_1317.graphics.f("#096414").s().p("AhQDiQAAg/gfgnQgWgbgzAAIAAiCQJOm9lhJOQgdAzAAA/IhoAAg");
	this.shape_1317.setTransform(837.6599,2944.2928);

	this.shape_1318 = new cjs.Shape();
	this.shape_1318.graphics.f("#71A231").s().p("AipGGQBwjTilgxQAAhCAigrQBciKjkkQIIFAAIBoAAQAABBAPBAQBaGXoIDzg");
	this.shape_1318.setTransform(1173.1134,3382.775);

	this.shape_1319 = new cjs.Shape();
	this.shape_1319.graphics.f("#78AB2F").s().p("AoFjiQGxCXJVApQAFAAAABBQgzAAgnAYQkhCsjNAAQlPAAh0nFg");
	this.shape_1319.setTransform(1088.8,3262.6249);

	this.shape_1320 = new cjs.Shape();
	this.shape_1320.graphics.f("#EFE494").s().p("AjRgIQgPgFAAhAQH9CbhEAAQgzAAl3hWg");
	this.shape_1320.setTransform(1059.5016,3325.7418);

	this.shape_1321 = new cjs.Shape();
	this.shape_1321.graphics.f("#7EAF3B").s().p("Ak4FGQA4AAARgYQAggnAAhCQAvtPG7D4QAeARAABBIg2AAQAWKypRBaIAAiGg");
	this.shape_1321.setTransform(974.65,3271.9954);

	this.shape_1322 = new cjs.Shape();
	this.shape_1322.graphics.f("#F2F8E7").s().p("As9N/IAAiBIAAiDQAAhCgRgCQkahYjbhmIAAiFIAAiBIAAkBIBmAAQJRhagWqzIA2AAIDOAAIBpAAQC7LfL2nFQAngYAzAAQHGC3CXHXQARA8AABCIhoAAIoGAAQDkEQhcCLQgiArAABCQgxAAgkAYQmvEak3mzIAACBIAACDQg0AAgeAZQicCFkkAAQiIAAikgdgAkmhKQNsDLt7kPQAAA/APAFg");
	this.shape_1322.setTransform(1068.025,3332.2736);

	this.shape_1323 = new cjs.Shape();
	this.shape_1323.graphics.f("#6AAD18").s().p("ACfC3QjSg1jPg/QgzAAgHgUQgvhxABiBIJtAAIBpAAQAABCgeARQhLAuhmAAQA1BCAbBKQAWA4AABCQgxAAgzgNg");
	this.shape_1323.setTransform(959.1,3129.425);

	this.shape_1324 = new cjs.Shape();
	this.shape_1324.graphics.f("#389823").s().p("AukJQIAAiBQXGCEqqt3QgUgWgxAAIAAiDQC6i7GvAzQA4AFAwAAQBiEyEmCLQAZAMAAA/IhpAAIpuAAQgBCAAvByQAHAUAzAAQAAA/giAnQgRAbg1AAIAACAIAACBIhpAAIoDABIoGgBg");
	this.shape_1324.setTransform(902.2,3115.5422);

	this.shape_1325 = new cjs.Shape();
	this.shape_1325.graphics.f("#73A431").s().p("AjVi4IBmAAQF/hig8FnQgMA9AABEIhnAAIgMAAQlcAAAymGg");
	this.shape_1325.setTransform(218.5718,3440.3421);

	this.shape_1326 = new cjs.Shape();
	this.shape_1326.graphics.f("#5C8923").s().p("AlpACQAzAAAWgaQAfgpAAhCQDbBrEoAWQA1AEAzAAQAAA/gRAFQjOA+iaAAQjhAAh5iCg");
	this.shape_1326.setTransform(316.325,3460.7795);

	this.shape_1327 = new cjs.Shape();
	this.shape_1327.graphics.f("#EFF1CD").s().p("An+gPQBmhBBJhaQAggnAAg/IICAAIBpAAIBoAAIBnAAIAACBQgxAAg2gFQnvglgYGuQgzAAgxAMQhKAQg5AAQjvAAA7kgg");
	this.shape_1327.setTransform(320.992,3397.3164);

	this.shape_1328 = new cjs.Shape();
	this.shape_1328.graphics.f("#7CAA3A").s().p("AjYGiIAAiAIAAiBQHxAOkBksQghgnAAg/IAAiBIAAhCQH4NNpoAAQgsAAgzgFg");
	this.shape_1328.setTransform(374.2774,3405.7238);

	this.shape_1329 = new cjs.Shape();
	this.shape_1329.graphics.f("#EEF5E8").s().p("AApGFQkngWjbhrIAAiAQBkAABLgvQAdgRAAhBQAYmuHvAlQA2AFAxAAQAAA/AiAnQEBEsnygOIAACBIAACAIAACGQgzAAg2gFg");
	this.shape_1329.setTransform(337.9853,3421.5324);

	this.shape_1330 = new cjs.Shape();
	this.shape_1330.graphics.f("#298F2D").s().p("AGhCBImgAAIAAhCQmcAWhrjVQIzAUHHCkQATAHAABCIhmAAg");
	this.shape_1330.setTransform(425.15,3148.975);

	this.shape_1331 = new cjs.Shape();
	this.shape_1331.graphics.f("#70AE0F").s().p("AkKhMQA2g/BBgsQAngWAxAAQA1AAAVAbQFNGAhrAAQhcAAmfkag");
	this.shape_1331.setTransform(545.0678,3208.4729);

	this.shape_1332 = new cjs.Shape();
	this.shape_1332.graphics.f("#63AE20").s().p("AFqBAIs8AAIAAh/ILWAAIBmAAIBpAAIAAB/IhpAAg");
	this.shape_1332.setTransform(617.1,3168.3);

	this.shape_1333 = new cjs.Shape();
	this.shape_1333.graphics.f("#27912D").s().p("AKlBAIrWAAIhpAAIpwAAIAAh/QMKAAMEA/QAHAAAABAIhmAAg");
	this.shape_1333.setTransform(575.425,3155.425);

	this.shape_1334 = new cjs.Shape();
	this.shape_1334.graphics.f("#75B125").s().p("AAEEGIoCAAIAAiFIAAiBQDsBGgWjGQgKhCAAg/QVagsueHjQgdAPAABBIhpAAg");
	this.shape_1334.setTransform(341.6901,3343.7956);

	this.shape_1335 = new cjs.Shape();
	this.shape_1335.graphics.f("#F0F9E4").s().p("ABrJKIk4AAQAAhEAMg9QA8lomABiIAAiCIAAkCQFbiyGDjAQArgWA1AAIAACBIAACFQABBAggAnQhJBZhmBCQhJFlGAhWQAxgMAzABQAABBgdARQhLAuhlAAIAACBQABBCggApQgWAbgzAAIhmAAg");
	this.shape_1335.setTransform(259.2,3402.35);

	this.shape_1336 = new cjs.Shape();
	this.shape_1336.graphics.f("#459D23").s().p("AIHC/QrRgkmlleIJwAAIBmAAIAACGQBrDVGegWIAABCQg2AAgzgFg");
	this.shape_1336.setTransform(362.9,3142.275);

	this.shape_1337 = new cjs.Shape();
	this.shape_1337.graphics.f("#4FA31A").s().p("AEACKIpvAAIAAiBQEGAADyg8QAPgCAAhCQDxhGgbDGQgHBCAAA/IhnAAg");
	this.shape_1337.setTransform(337.386,3096.0296);

	this.shape_1338 = new cjs.Shape();
	this.shape_1338.graphics.f("#2F9426").s().p("ABzDvQkPiDgzlwQCeACCYgCIBpAAIAACDIhpAAIhnAAQBnCBBRCOQAYAzAABEQgzAAgqgWg");
	this.shape_1338.setTransform(331.775,3057.925);

	this.shape_1339 = new cjs.Shape();
	this.shape_1339.graphics.f("#439F22").s().p("AkZA9IAAiCQA1hCAehGQAVg6AAhAQC4AvBEDFQAIAOAzAAQAABEAdArQDBEeh3AAQhyAAmUkLg");
	this.shape_1339.setTransform(380.7809,3038.7731);

	this.shape_1340 = new cjs.Shape();
	this.shape_1340.graphics.f("#2B8B15").s().p("AE3BAIpwAAQgwAAgWgYQgegnAAhAIBkAAIJwAAIBmAAIAAB/IhmAAg");
	this.shape_1340.setTransform(331.9,3116.275);

	this.shape_1341 = new cjs.Shape();
	this.shape_1341.graphics.f("#449B15").s().p("AE5B7QjTg2jNhBIAACAQgzAAghgYQh9hohliDQIAgfEbDNQAfAWAAA/QgwAAg0gJg");
	this.shape_1341.setTransform(331.9,2953.6415);

	this.shape_1342 = new cjs.Shape();
	this.shape_1342.graphics.f("#2B932A").s().p("AiqgcQDrBGgWjHQgHhBAAhAQAzAAACAKQCPIzhqAAQhPAAjZk7g");
	this.shape_1342.setTransform(452.8452,3034.6592);

	this.shape_1343 = new cjs.Shape();
	this.shape_1343.graphics.f("#138425").s().p("AD+F3QhEjGi5guQAAhCghgfQiviljOiBIAAiAQDOBBDSA2QA0AJAwAAQBnC8C2B2QAaATABBCIhnAAIAACBIAACBQgyAAgIgOg");
	this.shape_1343.setTransform(362.9,2992.9);

	this.shape_1344 = new cjs.Shape();
	this.shape_1344.graphics.f("#4EA11B").s().p("ADMF8QAAhCgdgxQhEiNjXgCQAAhCgbgTQi2h2hmi8QGHB/ARh/QAHg/AAhBQC2AuBJDFQACAOA2AAQAzBCAdBKQAYA4AABCQAAA/AHBCQARCTh9AAQgsAAg+gSg");
	this.shape_1344.setTransform(415.2688,2993.8204);

	this.shape_1345 = new cjs.Shape();
	this.shape_1345.graphics.f("#3C981B").s().p("ABkE1QhJjFi2guQAAhAgWg5QgfhLgzg/QCbgBCDg1QAagMAAhAQC3AvARDWQAHBAAABAIhoAAIAACAIAACBQg2AAgCgOg");
	this.shape_1345.setTransform(430.375,2947.4);

	this.shape_1346 = new cjs.Shape();
	this.shape_1346.graphics.f("#05843E").s().p("AGtTrIhoAAQAAhCgIAAQsEg/sKAAIAACBIhkAAIhoAAQAAhCgUgHQnGilo0gUIAAiGIAAiAQAAhAAHhBQAbjIjxBHQAAhEgYgzQhRiQhoiBIBoAAIBpAAQM4Ifl7oyQgdgsAAhDIAAiBIAAiBIBmAAQDYADBECNQAdAwAABCQH/Lgj6vYQgDgKgzAAQAAhBgYg4QgdhMgzhBIAAiBIAAiBIBoAAQEOjniIi5QgdgnAAg/IBmAAIBoAAQAAA/AdAnQAWAbAxAAQEQURgJuMIAzAAQHJLeClkXIAABBQFFHjHYp8QAigsAAhBIBmAAIBmAAQBmg/BpAAIAAA/QAABBgDBAQgTDTi5AzQA4JMJPozQAdgZAzAAQAAA/gdA0Qh6DUigDBQBrFNHknwQAfggAAhCQDxBEARi/QAAgHA1AAQDDB5B8DsQAMBLAYBJQAIAOAfADIAWBCIAAhCIBpAAQAwAAAUAWQKrN33GiDIhpAAIjRAAQgxAAgzAPQjGBAjzAAQkOAAlHhPg");
	this.shape_1346.setTransform(620.8542,3035.9973);

	this.shape_1347 = new cjs.Shape();
	this.shape_1347.graphics.f("#036D2F").s().p("Aicl9QEtgOAMEQIAACDIgzAAQAEF2gsAAQg/AAifr7g");
	this.shape_1347.setTransform(513.175,2953.2037);

	this.shape_1348 = new cjs.Shape();
	this.shape_1348.graphics.f("#016A2C").s().p("AmeA8QFBAWhjmfQgPg9AAg/IAAiGIBpAAIBnAAIAACGIAACBQBJFTD9CaQAiAYA1AAQABBCgbAwQhMCUhoCBIAAhBQguBNhDAAQiyAAlLoUg");
	this.shape_1348.setTransform(570.3,2947.979);

	this.shape_1349 = new cjs.Shape();
	this.shape_1349.graphics.f("#0D7F32").s().p("AB3FuQj8iZhJlUQC5DdARjdQAEhBAAg/IAAiGIBpAAQACD4BLCdQAZAxAABBIAACEIAACAQg2AAgigYg");
	this.shape_1349.setTransform(591.075,2927.825);

	this.shape_1350 = new cjs.Shape();
	this.shape_1350.graphics.f("#11802E").s().p("AGMVUIAAiEQgMkQkuAOQgxAAgWgaQgcgnAAg/QAyAAAWgbQAbgpAAhCQAAg/gFhCQiTydo5r+QKoE/DFNHQACAKAzAAQhLGGDCBrQAnAWAxAAQAAEEAzD6QACANAzAAQAAA/APA9QBfGLkeAAIgegBg");
	this.shape_1350.setTransform(489.2876,2817.6279);

	this.shape_1351 = new cjs.Shape();
	this.shape_1351.graphics.f("#048245").s().p("Ah6mzQFDgUhmGeQgNA+AAA/QgzAAgEAKQg9FXglAAQg7AAAEtog");
	this.shape_1351.setTransform(561.7829,2789.4511);

	this.shape_1352 = new cjs.Shape();
	this.shape_1352.graphics.f("#228C2D").s().p("AhmISIAAiAIAAiGIAAiBIAAsLIBmAAQAAIIAyICQADAIAzAAQAAA/gGBBQgIBvgzAAQgxAAhchvg");
	this.shape_1352.setTransform(580.75,2862.0125);

	this.shape_1353 = new cjs.Shape();
	this.shape_1353.graphics.f("#067F34").s().p("AA7FGQgRjWi2gvQAAhBgVg3QgghLgzhCIAAiBIAAiBIBoAAQCZCBB+CcQAgAnAABEQAAA+AdAnQCIC5kODnQAAhAgHhBg");
	this.shape_1353.setTransform(449.7806,2908.525);

	this.shape_1354 = new cjs.Shape();
	this.shape_1354.graphics.f("#1C8227").s().p("ACHE0QjtkpjRlFQHZhTBcFJQAFAMA1AAIAACCIhoAAIAACBIAACBQg2AAgTgYg");
	this.shape_1354.setTransform(404.475,2855.6379);

	this.shape_1355 = new cjs.Shape();
	this.shape_1355.graphics.f("#3B941F").s().p("ABpEGIhnAAQABhEgfgnQh/ibiZiBIAAiEQFHB8DZDwQAYAZAxAAQAABBgbAqQgWAbgzAAIhoAAg");
	this.shape_1355.setTransform(466.6,2876.05);

	this.shape_1356 = new cjs.Shape();
	this.shape_1356.graphics.f("#097C34").s().p("AhpMBQgzj6AAkEIAAiBIAAuPIBpAAQgHWLCft5QAFgJAzAAIAAMLIAACBIhpAAIhnAAIAACGQgzAAgDgNg");
	this.shape_1356.setTransform(554.725,2824.025);

	this.shape_1357 = new cjs.Shape();
	this.shape_1357.graphics.f("#449C21").s().p("AgZK1QjChrBLmHQCYmTBpnwQACgKAzAAIAACDIAACBIAACBIhoAAIAAOPIAACBQgxAAgmgWg");
	this.shape_1357.setTransform(532.8944,2778.425);

	this.shape_1358 = new cjs.Shape();
	this.shape_1358.graphics.f("#6CA73B").s().p("AoEgqIBmAAQC0hXIiBQQAzAHAzAAIBnAAQAABDgIAAQn9BAoEAAIAAiDg");
	this.shape_1358.setTransform(321.575,2620.2964);

	this.shape_1359 = new cjs.Shape();
	this.shape_1359.graphics.f("#79AE5E").s().p("AE4B6QohhRi1BYIAAiBIAAiAILUAAIBoAAIAACAIAACBQgyAAg0gHg");
	this.shape_1359.setTransform(321.55,2603.125);

	this.shape_1360 = new cjs.Shape();
	this.shape_1360.graphics.f("#5CA207").s().p("EgsjBMJMAAAiaUUAvhADFAmVgDAQA1gFA0AAQAABCgWA4QgeBIg1BFIAAEBIAACCQgzgBgDAKQhoHwiZGUQgzAAgDgKQjEtHqqk/QI6L/CUSdQAFBCAAA/QgxAAgYgYQjYjxlJh8Qg2AAgEgMQhdlInaBSQDSFGDtEpQAUAYA1AAQA0BCAfBLQAWA4AABCQAAA/gbAMQiDA2icgBQAzBAAgBLQAWA7AAA/QAABCgHA+QgRB/mIh/QABg/ghgVQkZjPoCAgQBkCDB+BoQAhAYAyAAQDPCCCvClQAiAfAABCQAABAgVA5QgeBHg2BCIhoAAQiZACiegCQAzFyEQCCQAqAWAyAAQAABCgOACQjzA+kHAAIAACAIhkAAQABBCAdAnQAWAYAwAAQGlFdLSAlQAzAEA1AAIGgAAIBmAAIBpAAIBkAAIJxAAIBoAAIAACBIhoAAIjRAAIAACEQgxAAgnAWQhCArg1A/QgzAAgiAbQuaJAwrG0IAACFQAABAAKBCQAVDHjshHQg1AAgqAWQmDDAlcCyQg2AAgYAYQyjRLspXEIAAiDg");
	this.shape_1360.setTransform(285.2,3142.4);

	this.shape_1361 = new cjs.Shape();
	this.shape_1361.graphics.f("#45A01D").s().p("AibEDIAAiBIAAkAQA2hFAdhIQAWg4AAhCIBnAAIBnAAQAABCgZA1QidE2iBFeIAAiDg");
	this.shape_1361.setTransform(565.075,2681.025);

	this.shape_1362 = new cjs.Shape();
	this.shape_1362.graphics.f("#68A838").s().p("AM9BDQwQAgrSjkIbiAAIBpAAIAACDQAABBggAnQgTAYg2AAg");
	this.shape_1362.setTransform(497.725,2629);

	this.shape_1363 = new cjs.Shape();
	this.shape_1363.graphics.f("#679C4D").s().p("ABpDBIjQAAIhnAAIAAiBIAAh/QA2AAARgbQAggnAAg/QDoA8AYC9QAAAHA2AAIAACBIhmAAg");
	this.shape_1363.setTransform(383.675,2596.675);

	this.shape_1364 = new cjs.Shape();
	this.shape_1364.graphics.f("#76AA5A").s().p("AAyEVQgZi+jog9IAAiFQFbmaA9IfQAHA/AABCQAAA/ggAnQgWAbgzAAQg1AAAAgHg");
	this.shape_1364.setTransform(394.025,2574.7025);

	this.shape_1365 = new cjs.Shape();
	this.shape_1365.graphics.f("#6CA04E").s().p("AkDg+QAzhBBEgqQAkgWA2AAQDVADBECNQAdAvAABCQg1AAggAYQh8BmhcAAQiTAAhHj+g");
	this.shape_1365.setTransform(430.375,2466.4434);

	this.shape_1366 = new cjs.Shape();
	this.shape_1366.graphics.f("#71A54E").s().p("AjjB4IAAiAIAAiFIBkAAQA3AAAnAaQHWEBl3AAQhsAAi1gWg");
	this.shape_1366.setTransform(510.329,2448.1191);

	this.shape_1367 = new cjs.Shape();
	this.shape_1367.graphics.f("#72B039").s().p("ATdBCMgoiAAAIAAiDMAoiAAAIBpAAIAACDIhpAAg");
	this.shape_1367.setTransform(134.95,2622.575);

	this.shape_1368 = new cjs.Shape();
	this.shape_1368.graphics.f("#5D9F13").s().p("EgtWABQIAAh/MAoiAAAIBpAAQICAAH/hAQAHAAAAhEIDRAAIBmAAQLSDkQRggIAAA/IhmAAIhpAAQgzAAg1AFQy7Bf1KAAQ1tAA4Ehkg");
	this.shape_1368.setTransform(290.325,2633.9883);

	this.shape_1369 = new cjs.Shape();
	this.shape_1369.graphics.f("#7AAD5C").s().p("AlwgzQWLhT0iDLQg2AHgzAAIAAh/g");
	this.shape_1369.setTransform(36.8562,2595.4769);

	this.shape_1370 = new cjs.Shape();
	this.shape_1370.graphics.f("#71A451").s().p("Al9KJQkngCBak/QFXp8CmmYIBGBmQB2CxAKBkQApIKG4AKQBTFNwqC9g");
	this.shape_1370.setTransform(152.2961,2414.425);

	this.shape_1371 = new cjs.Shape();
	this.shape_1371.graphics.f("#9DC278").s().p("AgwFGQAIi3jbnPQAzAAAWgbQAfgpAAhCQB8EiDTDLQAbAaA1AAIAACEQAABBgdAxQhECNjVACQAAg/AChBg");
	this.shape_1371.setTransform(36.475,2284.6);

	this.shape_1372 = new cjs.Shape();
	this.shape_1372.graphics.f("#9BC461").s().p("ABNGtQjTjMh8kgIAAiBIAAkHQESBCClCsQAZAZA1AAQAABBgYA4QgeBIgwBEIAAECIAACBQg2AAgagbg");
	this.shape_1372.setTransform(46.8,2245.575);

	this.shape_1373 = new cjs.Shape();
	this.shape_1373.graphics.f("#9FCA5D").s().p("AikD/Qgph0AAiBIAAiAIAAiBQEohTA9DFQACAPAzAAQAABBgVAKQiEA1iaAAIAACBIAACFQg2AAgIgRg");
	this.shape_1373.setTransform(83.05,2186.1074);

	this.shape_1374 = new cjs.Shape();
	this.shape_1374.graphics.f("#97C26E").s().p("AlQGHIAAkFQG+A9i9nEIA4AAQDVgCBEiNQAegxAAhBIAwAAQAWJSq2G7IAAiAg");
	this.shape_1374.setTransform(33.7087,2356.2);

	this.shape_1375 = new cjs.Shape();
	this.shape_1375.graphics.f("#D3F0DF").s().p("AidLHIAAiAIAA0UQAzBBBEAqQAkAWA1AAQAABBggAqQgVAagzAAQDaHQgHC2QgDBCAAA/Ig4AAQCoGOlHAAQgsAAg1gHg");
	this.shape_1375.setTransform(15.8124,2298.0873);

	this.shape_1376 = new cjs.Shape();
	this.shape_1376.graphics.f("#9DC370").s().p("Aj0DxQhDgqg0hBIAAiBIAAiFQBziZEsAWQAzACA2AAIBoAAQAACBApB1QAIAQA2AAIAACBQg2AAgZgZQikirkThCIAAEGIAACBQg1AAglgWg");
	this.shape_1376.setTransform(36.35,2212.8621);

	this.shape_1377 = new cjs.Shape();
	this.shape_1377.graphics.f("#D4F2FC").s().p("AlwABIAAiCQWNBp0lCVQg1AFgzAAIAAiBg");
	this.shape_1377.setTransform(36.9186,1927.3);

	this.shape_1378 = new cjs.Shape();
	this.shape_1378.graphics.f("#D1EFDE").s().p("Ah1E/QAAhAAagOQDYhyjyhCIAAiAIAAiDQA1AAARgbQAggnAAg/QA0A/AdBMQAWA6AAA/QAABCAPA8QA/ENjGAAQgmAAgvgJg");
	this.shape_1378.setTransform(136.3162,2077.1803);

	this.shape_1379 = new cjs.Shape();
	this.shape_1379.graphics.f("#A7CF7B").s().p("AAAFRQAAhAgbgzQiIjWgslCQEshOA4DFQAIAPAzAAQAAA/ggAnQgTAbg1AAIAAEAIAACEIhoAAg");
	this.shape_1379.setTransform(165.95,2036.706);

	this.shape_1380 = new cjs.Shape();
	this.shape_1380.graphics.f("#D3F1D7").s().p("AA1FGIhnAAQAAg/gWg7QgdhLg2hAIAAh/IAAiBIAAiGIBpAAQAsFDCHDVQAbA0AAA/IhnAAg");
	this.shape_1380.setTransform(150.275,2037.8);

	this.shape_1381 = new cjs.Shape();
	this.shape_1381.graphics.f("#D7F2F8").s().p("Ak9DUQguhyAAiAQBYk1IZCmQAzAOAyAAIAACBIAABBQiXhvlwAuIAACAIhoAAIAACGQgxAAgIgUg");
	this.shape_1381.setTransform(160.85,1995.4138);

	this.shape_1382 = new cjs.Shape();
	this.shape_1382.graphics.f("#74A653").s().p("AAkIFQhDiNjWgCQAAhCgggYQiUhrBLlCQDitFDMJeQAfBmAAEBQAAD3EJCQIAACBQg1AAgsARQhtAuhpBCQAAhCgdgxg");
	this.shape_1382.setTransform(449.8776,2409.8874);

	this.shape_1383 = new cjs.Shape();
	this.shape_1383.graphics.f("#A3C953").s().p("Aj+lJIBmAAQDwCmCSDyQAdAwAABAQAABBgYAMQiFA+hhAAQk/AAA4qTg");
	this.shape_1383.setTransform(222.6833,2220.068);

	this.shape_1384 = new cjs.Shape();
	this.shape_1384.graphics.f("#A1CB69").s().p("AKjJHQgzAAgggYQjujHkwDfQgxAAAAgCQgVjFjwBHQg0AAgCgPQg9jFkoBSIAACCIAACAIhpAAIAAiAIAAkFQIBAXC2krQAeguAAhEQEnA8hLlAQgPg9AAhCIBpAAIBmAAIBpAAQAABCggAnQgUAYg1AAQCtHqDaGxQAZAzAAA/IhmAAg");
	this.shape_1384.setTransform(129.725,2128.75);

	this.shape_1385 = new cjs.Shape();
	this.shape_1385.graphics.f("#BDD863").s().p("AneioQI2pgFbLtQCqFnnwBmQgnAHgmAAQlPABivpig");
	this.shape_1385.setTransform(296.8697,2113.0574);

	this.shape_1386 = new cjs.Shape();
	this.shape_1386.graphics.f("#C3E5B9").s().p("ABkCCQgzAAgIgPQg3jEktBOIAAiBQFwguCXBwIAAhCIBmAAQAABCAIA/QAUCWiCAAQgsAAg8gRg");
	this.shape_1386.setTransform(176.7815,2005.6492);

	this.shape_1387 = new cjs.Shape();
	this.shape_1387.graphics.f("#B0D387").s().p("Ak4ADQEDj/EWDnQAgAYA4AAQAABBgPADQkqA9k4AAIAAiBg");
	this.shape_1387.setTransform(238.65,1979.1908);

	this.shape_1388 = new cjs.Shape();
	this.shape_1388.graphics.f("#D6F1F2").s().p("AmeGGIAAiBQAAg/AZgPQGQi6mpmCQFmAVFzBiQAuAMA1AAQABBCggAmQgWAZgwAAIAACBIAACCIAACDQg4AAgggYQkWjnkDD/IAACBIhmAAg");
	this.shape_1388.setTransform(238.65,1953.325);

	this.shape_1389 = new cjs.Shape();
	this.shape_1389.graphics.f("#70A14D").s().p("AjaCpIGJmSQCFHTkOAAQhjAAidhBg");
	this.shape_1389.setTransform(747.685,2404.0947);

	this.shape_1390 = new cjs.Shape();
	this.shape_1390.graphics.f("#5EA01C").s().p("Ad+CCMg9kAAAIAAiAQCeAACGg3QAWgIgBhEIBnAAIBoAAQZBDkeEggIAAA/IhpAAg");
	this.shape_1390.setTransform(1311.55,2629);

	this.shape_1391 = new cjs.Shape();
	this.shape_1391.graphics.f("#599632").s().p("AnRgQQB6jzLHDkQAvAPAzAAQAABDgWAHQiGA4ieAAQgxAAgzAHQhuAWhZAAQjzAAhLifg");
	this.shape_1391.setTransform(1094.025,2617.745);

	this.shape_1392 = new cjs.Shape();
	this.shape_1392.graphics.f("#69A151").s().p("AjRCrQgfgmAAhFIAAh/IAAiEQOMFIskAAIAAA/QgzAAgWgZg");
	this.shape_1392.setTransform(1143.8109,2518.625);

	this.shape_1393 = new cjs.Shape();
	this.shape_1393.graphics.f("#6BA150").s().p("AYSJJMglLAAAIAAiBQAwAAAHgPQAviUumjlQdBAAEjoTQAbgzAAhCQFhD2ByIMQAAAMA1AAQF8A9DRDgQAfAkAABCIhoAAg");
	this.shape_1393.setTransform(1337.525,2557.525);

	this.shape_1394 = new cjs.Shape();
	this.shape_1394.graphics.f("#63A032").s().p("AawCCIAAg/Q+DAg5CjkINAAAIBoAAMAlMAAAIBoAAIBpAAIBmAAIAACDIAACAIhmAAg");
	this.shape_1394.setTransform(1342.65,2629);

	this.shape_1395 = new cjs.Shape();
	this.shape_1395.graphics.f("#6DA350").s().p("AkDihQEUCiBtizQAeguAAhCIBoAAIAACBIAACGQAAA+gRA9QgzDDhaAAQiHAAjinEg");
	this.shape_1395.setTransform(1176.825,2450.0619);

	this.shape_1396 = new cjs.Shape();
	this.shape_1396.graphics.f("#528843").s().p("AjIC4IAAiGQBmiAB9hmQAdgbA2AAQAxAAAEAPQCBGQk5AAQhMAAhngYg");
	this.shape_1396.setTransform(1233.4039,2428.8655);

	this.shape_1397 = new cjs.Shape();
	this.shape_1397.graphics.f("#639A52").s().p("AHJLDQg1iAAuhEQDTlBkBhJQjPg7jygTQtWhImTglQAwEEBiDzQAHARA1AAQAzBBAbBJQAbA4AAA/IhpAAIAACGQg1AAAAgMQhyoNlhj2Qg1AAgigYQhFgmgzhCIBpAAQDbpRJnC+QAuAOAzAAQFvgEDgioQAggZAAhBQGXDiLGkYQAYgJAAhCQCwAFgWD9IAzAAIBoAAQAABEgdApQgWAYg1AAQguGNFlgIIBoAAQA2AAAWAbQF2GwoqA9QA1BBAeBJQAVA4AAA/QgzAAgrAWQjyB6j6AAQkQABkaiRg");
	this.shape_1397.setTransform(1551.0235,2493.2489);

	this.shape_1398 = new cjs.Shape();
	this.shape_1398.graphics.f("#69A050").s().p("AlmEDQAWmBjpiGQEthfBzgWQAzgMA1AAQCAE3HrAPIAABAQgzAAgugNQpmi+jbJQQAAhEACg/g");
	this.shape_1398.setTransform(1415.225,2447.125);

	this.shape_1399 = new cjs.Shape();
	this.shape_1399.graphics.f("#4E9D21").s().p("AAYFVQiWkJgdmQIAAiBQFCgZg8GgIAxAAIAACAIAACBQAAA/gXA6QgaBMg1A/QgBg/gdgzg");
	this.shape_1399.setTransform(730.9,2908.4569);

	this.shape_1400 = new cjs.Shape();
	this.shape_1400.graphics.f("#08621D").s().p("AgEH9IAAg/QhoAAhnA/IAAiBIAAiAQC3kEgboIIAzAAQAcGRCXEIQAdAzAABAQAABBAFA/QAUCVh9AAQgtAAg/gUg");
	this.shape_1400.setTransform(715.8315,2928.8189);

	this.shape_1401 = new cjs.Shape();
	this.shape_1401.graphics.f("#0D6119").s().p("AAEIfQgSgYg2AAIAAiBIAAiAQAAhEgHg+QgpmIg2mDIBmAAQBCGpB7FlQATA6AABFQAAA+APA9QA9ECi0AFQAAhCgggng");
	this.shape_1401.setTransform(753.311,2876.05);

	this.shape_1402 = new cjs.Shape();
	this.shape_1402.graphics.f("#23770B").s().p("AhnGFQADnGgDnHQA2BFA+AmQAoAZAyAAIAACBIgyAAQAaIHi2EEIAAiDg");
	this.shape_1402.setTransform(705,2901.95);

	this.shape_1403 = new cjs.Shape();
	this.shape_1403.graphics.f("#80BC64").s().p("ABAKJIhlAAQAAg/gbgHQiZg9BMkCQFaiPiBp8QgMg9AAhEIBmAAQADHHgDHFIAACEIAACAIAACBIhmAAg");
	this.shape_1403.setTransform(678.0402,2914.825);

	this.shape_1404 = new cjs.Shape();
	this.shape_1404.graphics.f("#4C9814").s().p("AEFKLQA9mglCAYQgzAAgngZQg/gmg2hFIhmAAIAAiAIAAiAQHGEKhcsTIAyAAQAYDUCaBdQAdATAABEIhmAAQA1GCAqGJQAHA+AABEg");
	this.shape_1404.setTransform(715.45,2837.15);

	this.shape_1405 = new cjs.Shape();
	this.shape_1405.graphics.f("#077D38").s().p("AiBGVQhLiegDj3IAAiBQBmiBBMiSQAdgzAAg/QCzDFgbHGIA4AAQAAA/giAnQh8CbibCBQAAhBgYgxg");
	this.shape_1405.setTransform(622.325,2888.925);

	this.shape_1406 = new cjs.Shape();
	this.shape_1406.graphics.f("#13832E").s().p("AAxHQIg3AAQAanHizjEIAAiAQAzAAAWgbQAfgnAAg/QDrhJgWDKQgHA/AABBQAABAggAnQgVAagxAAQhKFFCQBrQAgAWAABEIhmAAg");
	this.shape_1406.setTransform(638.2188,2855.7561);

	this.shape_1407 = new cjs.Shape();
	this.shape_1407.graphics.f("#489E1B").s().p("AicLGQgzoEAAoHIAAiBIAAkGIBpAAIAAINIAACBQARKNDtp8QACgRA2AAIAAB/QAABAgdAzQhMCShmCBIAACAIhnAAIAACGQgzAAgDgHg");
	this.shape_1407.setTransform(601.425,2830.475);

	this.shape_1408 = new cjs.Shape();
	this.shape_1408.graphics.f("#5EA305").s().p("AiagzQCcmACCEJQAXA1AABCQg1AAgDARQh0E5hAAAQhBAAgIlKg");
	this.shape_1408.setTransform(606.65,2829.3342);

	this.shape_1409 = new cjs.Shape();
	this.shape_1409.graphics.f("#198527").s().p("AAGDEQAWjJjrBIIAAiEQAxgBAWgYQAhgnABhCQAwhBBEgpQAkgXA2AAQAyBAAbBLQAbA4AABAQAABBgdA1QhLCPhoCAQAAhBAGg/g");
	this.shape_1409.setTransform(653.45,2804.55);

	this.shape_1410 = new cjs.Shape();
	this.shape_1410.graphics.f("#57A210").s().p("AAbLXQiAkJieGAIAAiBIAAoNIAAiBIAAoFQCvgFg4kBQgOhAAAhBIBlAAQiDN5FsGCQAYAZA4AAQAABBgiAnQgWAZgxAAIAACFQABA/ggAnQgWAbgzAAQAAhCgYg1g");
	this.shape_1410.setTransform(617.1,2739.525);

	this.shape_1411 = new cjs.Shape();
	this.shape_1411.graphics.f("#318916").s().p("AitBjIAAiAIAAiDQKLjso7JXQgaAZg2AAIAAiBg");
	this.shape_1411.setTransform(722.2529,2723.0709);

	this.shape_1412 = new cjs.Shape();
	this.shape_1412.graphics.f("#599F0F").s().p("AjZNGQicg+BMj8QAAhEgggWQiShrBLlGQAxAAAWgaQAggnAAg/QBoiABMiQQAdg2AAhBQCdiLBcjnQAHgVAxAAQBpAABLAyQAdASAABBIgzAAQBcMTnGkLIAACBIAACAQAABEAMA9QCBJ9lbCPQAAhBgYgHg");
	this.shape_1412.setTransform(683.1745,2849.8);

	this.shape_1413 = new cjs.Shape();
	this.shape_1413.graphics.f("#20862A").s().p("Ah/EOQgbhLgyhAIAAiEIAAiBQEnAOA9kEQAFgMAwAAIAACBIAACBIAACBQgxAAgHAUQhcDnidCLQAAg/gbg4g");
	this.shape_1413.setTransform(684.35,2758.975);

	this.shape_1414 = new cjs.Shape();
	this.shape_1414.graphics.f("#13812A").s().p("AhANMQAAhAAMg/QBlmdlCATIAAiBIAAiBQCBldCdk3QAYg1AAhCQA2AAATgYQAggnAAhCIBoAAIAACBIAACBQAABBAPBAQA4EBivAFIAAIFIAACBIhpAAIAAEHIAACBIhlAAg");
	this.shape_1414.setTransform(576.9288,2713.525);

	this.shape_1415 = new cjs.Shape();
	this.shape_1415.graphics.f("#74A54E").s().p("AkIggQQjANwjA0g");
	this.shape_1415.setTransform(690.3,2411.4);

	this.shape_1416 = new cjs.Shape();
	this.shape_1416.graphics.f("#5CA107").s().p("EhGKAVjQAAg/AegzQFgpPpPG9IAACDQg1AAglAWQhEAsgwA/IAACBIg2AAQAdoGi4kCIhnAAQAAhEgTg6Qh8lmhCmoQAAhEgdgUQiZhcgYjUQAAhBgegRQhLgzhoAAIAAiBQA1AAAbgZQI7pYqLDsIAACDQgxAAgFAMQg9EEkogOIAACBIAACFQg2AAgkAWQhEAqgxBBQg4AAgYgYQltmDCDt6IAAiBMAtXAAAIBnAAIdLAAIBmAAMA9kAAAIBpAAIBmAAMAgaAAAIBpAAIBoAAQGbDjLNieQAKgDAAhCIIJAAIBmAAQA4BCA/ApQAnAWAzAAQA1BCA/ApQAlAbA1AAIAAA/Qu+gwpTF0QjxBGBpgwQCnhRhjgnQ8bro82JIQBpA/BhgHQd8hmUXGzQhoAAhhAbQyIEy2glNQARKJu0CBICZAFQiDFntVhlQAAA+gZAOQsEGZtdEmQh8sTi7INIA2AAQrXOv3hBfIAACFIAACBIAABAQhdg9jWgDIAAhBQizClhoAAQizAAAunrg");
	this.shape_1416.setTransform(1289.1086,2828.9836);

	this.shape_1417 = new cjs.Shape();
	this.shape_1417.graphics.f("#5F9F24").s().p("ANyCCI9KAAIAAiAQFvAAFeg/QAKAAAAhEIIHAAIBpAAQBmDaGghQQAzgIAxABIAACAIhnAAg");
	this.shape_1417.setTransform(1010.775,2629);

	this.shape_1418 = new cjs.Shape();
	this.shape_1418.graphics.f("#6AA157").s().p("Ak1CXIAAiBQD7hUC6iUQAfgbAzAAQAABEAeAxQC7Fmk2AAQiYAAkShXg");
	this.shape_1418.setTransform(943.2987,2548.8781);

	this.shape_1419 = new cjs.Shape();
	this.shape_1419.graphics.f("#6BA055").s().p("ACeB8QksgRjbhrIAAiAIJrAAIBoAAQAAA/gdAnQgWAag1AAIAACBQgzAAgxgFg");
	this.shape_1419.setTransform(865.825,2603.125);

	this.shape_1420 = new cjs.Shape();
	this.shape_1420.graphics.f("#5F9A33").s().p("AsIgKIAAiBQDbBrEtARQAxAFAzAAIM/AAIBmAAQAABDgKAAQleBAlvAAQgxAAgyAEQh1APhmAAQlKAAiyiWg");
	this.shape_1420.setTransform(907.3,2617.0711);

	this.shape_1421 = new cjs.Shape();
	this.shape_1421.graphics.f("#5E9F1F").s().p("A4RDDIAAiCIAAh/QRyAARzhAQADAAAAhDQDpDDHug7QAzgFAxAAIAAB/IhnAAMgtWAAAIAACCIhmAAg");
	this.shape_1421.setTransform(756.925,2635.45);

	this.shape_1422 = new cjs.Shape();
	this.shape_1422.graphics.f("#66A339").s().p("AynBCIAAiDILXAAIBoAAIWoAAIBpAAQgBBDgCAAQx0BAxxAAIhoAAg");
	this.shape_1422.setTransform(710.35,2622.575);

	this.shape_1423 = new cjs.Shape();
	this.shape_1423.graphics.f("#6CA14D").s().p("AKgBBI2oAAIAAiBIWoAAIBpAAIAACBIhpAAg");
	this.shape_1423.setTransform(751.925,2609.55);

	this.shape_1424 = new cjs.Shape();
	this.shape_1424.graphics.f("#679D51").s().p("AawIHItAAAIhoAAIhnAAQgzAAgugOQrHjlh6DzIhpAAIoIAAIhmAAIs/AAIAAiBQA1AAAWgbQAdgnAAg/QA2hBAahLQAXg5AAhBQM8EJkXoZQgegwAAhFIAAiAQKkHOMMk8QAwgRAxgBQABBFAfAnQAWAYAzAAQgWM3SNinQAwgIA4AAIAACBIhoAAg");
	this.shape_1424.setTransform(1073.25,2564.1);

	this.shape_1425 = new cjs.Shape();
	this.shape_1425.graphics.f("#95C05B").s().p("AkHGGQJuhunrqxQgagrAAhFQAwAAAgAdQL/Jsu4GJIAAiDg");
	this.shape_1425.setTransform(824.8784,2252.15);

	this.shape_1426 = new cjs.Shape();
	this.shape_1426.graphics.f("#92BD5F").s().p("Ak1BqQAzhAAdhIQAZg4AAhBIBoAAQE+jMBOFSQAOA7AABAQgzAAgnAaQioBhh+AAQiQAAhbh7g");
	this.shape_1426.setTransform(891.75,2189.4371);

	this.shape_1427 = new cjs.Shape();
	this.shape_1427.graphics.f("#B8D464").s().p("Ap6B/QIryFKjRIQDRFPuKBCIgbABQkWAAjklVg");
	this.shape_1427.setTransform(633.882,2200.6995);

	this.shape_1428 = new cjs.Shape();
	this.shape_1428.graphics.f("#94BE56").s().p("AjPBCIAAkEQDQAAC+A9QARAHAABAQgxAAgVAYQiCCijXBGIAAiAg");
	this.shape_1428.setTransform(767.25,2310.6);

	this.shape_1429 = new cjs.Shape();
	this.shape_1429.graphics.f("#94BF54").s().p("AlpDWIAAiBQAzAAAWgbQAfgnAAg+QFiCREJlWIAAA/QgzAAAAAFQgdGdmaAAQhoAAiBgbg");
	this.shape_1429.setTransform(689.575,2347.8062);

	this.shape_1430 = new cjs.Shape();
	this.shape_1430.graphics.f("#97C35C").s().p("EAoiAUYIk6AAQqLjbiyqyQpOiJoXFJQtJIDgFrDIjOAAIjNAAQBiIlmYggIg2BCQh+lckYinQhyhEgnhFQj5mXq5kyQCeAECDg6QAWgKAAhBQEwjgDuDHQAgAZAzAAQhJNbI2kGQAZgMAAhCQXCgOgYyAIAAiGQMXgwQcFvQAXAHAABCQmgEhBoHrQggXDQzkmQAvgKA1AAQAAA/gfAnQgXAbgzAAIAACBIhmAAg");
	this.shape_1430.setTransform(383.7,2238.8419);

	this.shape_1431 = new cjs.Shape();
	this.shape_1431.graphics.f("#8ABA5D").s().p("EgvyAPiIAAiBIAAiBQK4m6gWpTIgxAAIAAiDIAAiBIAAkCQAxhEAdhJQAYg4AAhBIAAiBIAAiGIAAiBQCcAACDg1QAWgKAAhCQDxhGAWDFQAAACAwAAQAABCgWAKQiDA6iegFQK6EyD4GZQAnBEByBEQEYCoB+FbIA2hBQGYAghhomIDLAAIDPAAQAFLDNJoDQIXlIJPCIQCxKyKMDaQAABAgRA8QivJBu3i3IAACBIhkAAIAACGQkJiQAAj4QAAkBgfhmQjNpdjiNEQhLFDCUBrQAgAYAABCQg2AAgkAWQhEApgzBCQnCClpkjgIkQhjQi+pWlUHtIg2AAQm4gKgpoKQgKhkh3iyIhGhmQimGZlXJ9QhaE+EnADIAABEQAABCgNACQixAkiXAAQpxAAivpzg");
	this.shape_1431.setTransform(305.875,2334.4666);

	this.shape_1432 = new cjs.Shape();
	this.shape_1432.graphics.f("#93BD56").s().p("AieBZQAAg/gWg5QgdhHg2hCQDxhGAWDCQAAAFAvAAQAABBAeAPQEBCThhAAQhPAAk8hjg");
	this.shape_1432.setTransform(741.743,1944.279);

	this.shape_1433 = new cjs.Shape();
	this.shape_1433.graphics.f("#97C162").s().p("AkDg4QDsBDAWi/QAAgHA0AAQBpA/BGBfQAiAmAAA/IhoAAQg2AAgbAbQhbBZhHAAQh0AAg4j0g");
	this.shape_1433.setTransform(855.625,2167.0313);

	this.shape_1434 = new cjs.Shape();
	this.shape_1434.graphics.f("#99C15F").s().p("AgDGEQgKmciPjqQAzhBBEgqQAigWA3AAQDFFGitFOQgYA0AAA/g");
	this.shape_1434.setTransform(803.7516,2161.2);

	this.shape_1435 = new cjs.Shape();
	this.shape_1435.graphics.f("#A3C654").s().p("A2JFJQDxClCRDzQAeAuAABCQIoAHDTFoQAPAWA1AAQH0ssDdrqQrzEnDtuyIg7AzQkYDiAgmWQRRvUFGRcQATA6AABAIAACFQg4AAgiAWQhEAqgzBBQCQDqAJGcIA4AAQAABEAbAsQHrKypuBuIAACDIhpAAQAAg/gRgHQi+g9jRAAIAAEEIAACBQAABCgdARQjRB3AgjKIAAg/QkJFXliiSQg2AAguAJQizAxiUAAQrnAAAbzOg");
	this.shape_1435.setTransform(691.3477,2193.3819);

	this.shape_1436 = new cjs.Shape();
	this.shape_1436.graphics.f("#5A8E4E").s().p("AiOFPIAAiGIAAiBQAAg/gWgHQieg8BLkCQDxhEAQDAQAAAIA1AAIBpAAIBoAAIAACAQg1AAgdAbQh/BlhlCBIAACGIhoAAg");
	this.shape_1436.setTransform(1217.1794,2413.7858);

	this.shape_1437 = new cjs.Shape();
	this.shape_1437.graphics.f("#7FB35E").s().p("ACZIaIhoAAQAAhAAdgzQDzmCpGgRQAAhDgRg7Qgnh8gvkQQG4itCAKqQAAANA2AAQDFD1ilCtQggAkAABAIhpAAg");
	this.shape_1437.setTransform(1218.6354,2341.4609);

	this.shape_1438 = new cjs.Shape();
	this.shape_1438.graphics.f("#75AA56").s().p("Eg1bArqIrXAAIhoAAI7jAAIAAiBQAzAAAWgbQAfgnAAg/QTpAgm6mvQiyinLGAVINAAZQL0oJZdBCQGqAPGRhRQNPhtPolUQATgFAAhEIBmAAQF3LtCBnsQARg8AAhAIBoAAQINB6ignzQgFgOgxAAIAAiBQAAg/AgglQClisjFj2IAAiFQHHB5gkl6QgIhAAAhEQHTDegsleQgHhCAAg/QIhkYFDndQAPgaA1AAQAxAAAMgUQCckylBlBQMpoXE/gxQAKAAAAhEQDwGNBiBhQAdAYAwAAQC0D7iBGRIA2AAQAWDTC5AqQAzAFA1AAQg1BEhEAiIioBOQo3jqkfE8IAAhBQsxBShyP9QD4FUh5E+QgWA7AAA/Qg2AAgzAMQhyAWkuBfQDqCGgWGCQgDA/AABEIhoAAQAzBCBEAnQAiAYA2AAQAABCgbAzQkkIU9CAAQOmDlguCUQgHAPgxAAQg4AAgxAHQyMCoAWs4IAAg/QMkAAuNlJIAACEIAACAQgxAAgwARQsNE9qjnOIAACAQgzAAgfAbQi7CVj7BVIAACAQAABCgWA4QgbBLg1BCIhpAAIpsAAIAACBIhoAAI2pAAIAACBIhpAAg");
	this.shape_1438.setTransform(1005.775,2336.625);

	this.shape_1439 = new cjs.Shape();
	this.shape_1439.graphics.f("#82B75D").s().p("AjUB3IAAiAQEUg9CLiGIAABCQAAA/AHBCQAbDWilAAQhnAAi1hWg");
	this.shape_1439.setTransform(1306.8394,2279.2674);

	this.shape_1440 = new cjs.Shape();
	this.shape_1440.graphics.f("#7BB058").s().p("AicDcIhmAAIAAiBQDvBJgZjJQgHg/AAhBQA0AAAUgZQAfgnAAhEIBpAAQgBDFAvC2QADAJA1AAQAABCgeAuQg5BfhnAAQhdAAiEhOg");
	this.shape_1440.setTransform(1166.5,2411.873);

	this.shape_1441 = new cjs.Shape();
	this.shape_1441.graphics.f("#62974F").s().p("AiaGEQg1AAgDgKQgui2AAjEIAAiBIAAiBQAxAAAWgbQAfgnAAg/QJHARjzGCQgeAzAAA/Qg1AAAAgHQgRi/jwBEQhLEACeA9QAWAIAAA/IhpAAg");
	this.shape_1441.setTransform(1207.8722,2382.225);

	this.shape_1442 = new cjs.Shape();
	this.shape_1442.graphics.f("#6DA050").s().p("AgmHHQAAhCgfgWQiUhtBLlDQCzhEgWlBIAzAAQAuERAnB8QARA5AABEQAAA/gfAnQgWAbgxAAIAACBIAACBIhoAAg");
	this.shape_1442.setTransform(1175.5638,2336.625);

	this.shape_1443 = new cjs.Shape();
	this.shape_1443.graphics.f("#81B257").s().p("AguIfQjxgzAelIQC7gzgdjLQAAgIg2AAIAAiAQBVlBFKgFIAABBIgzAAQAWFBi0BEQhKFDCTBtQAfAWAABCQAABEgfAnQgUAYg1AAQgzAAgwgKg");
	this.shape_1443.setTransform(1155.9891,2339.925);

	this.shape_1444 = new cjs.Shape();
	this.shape_1444.graphics.f("#81B45A").s().p("EgmaAnnIhpAAMgoiAAAIAAiBQAzAAA1gHQUkjN2MBTIAAiBIAA2aQDYMKOQi8QAMgCAAhCQQsi9hTlNIA1AAQFVnuC9JWIERBkQJkDgHCimQB1GgE+kHQAggYA2AAQBohCBuguQArgRA2AAQMhBhpflNQgngag3AAIAAiBQO1C2CvpAQARg9AAg/IE6AAIBmAAQJ9CDAloFQAAgFAzAAQggDKDRh3QAdgRAAhCQDZhGCBijQAVgYAxAAIBpAAQO5mKsBpsQgfgdgxAAQAAhAAZgzQCslPjFlGIAAiGQCLDKETAxQAzAMA1AAIAACBQg1AAAAAHQgWDAjshEQBaGKD1juQAbgbA2AAQAABBgZA4QgdBJgzBAQCtDpFljPQAngaAzAAQG4CeHuBeQAzAKA1AAIAzAAQlqJ9s/GRQGYLqAHKrIAACDQmRBRmpgPQ5dhCr1IJIs/gZQrFgVCxCnQG6GvzoggQAAhCgHg/Qg9oglcGaIAACGQAAA/ggAnQgRAbg1AAIhpAAIrUAAIAACBIAACBIhmAAgEAg0AJJQJADwi2qEgAXIIKQQkg2wkgMg");
	this.shape_1444.setTransform(515.825,2362.525);

	this.shape_1445 = new cjs.Shape();
	this.shape_1445.graphics.f("#92BD55").s().p("AtBTRQgHqrmZrqQNAmRFqp9IgzAAIAAiBQKDAdK8AiQADAAAABCQAABCgKA/QhLGioagbQCeEEC5DqQAWAYAzAAQA2AAAAAIQAdDLi7AzQgeFIDxAzQAxAKAzAAQAABCAHA/QAZDJjvhIIAACAQAABEgTAFQvoFVtPBtIAAiDg");
	this.shape_1445.setTransform(1037.2641,2349.75);

	this.shape_1446 = new cjs.Shape();
	this.shape_1446.graphics.f("#AACB52").s().p("AxzDvIAAiBQA1AAAWgYQAdgnAAhDQEwm2GKDiQAdARAABCQBLD8h3hTIg9goQhFJbjiAAQirAAkElYgADRkWIAAiBIAAiGQLqjACrLLQAOBBAAA/QhoAAgYguIhkikQh3HXieAAQi6AAjwqJg");
	this.shape_1446.setTransform(1005.65,2059.3971);

	this.shape_1447 = new cjs.Shape();
	this.shape_1447.graphics.f("#89B959").s().p("AnofTQiBqrm4CtIAAhCQlLAFhVFBIAACBQgzAAgWgYQi5jqiekEQIaAbBLmiQAKhAAAhBQSAIxKmzhQCxlFCqmgIAAiBIAAkEQFXhYh5o0QgPg8AAhFQDZgEBEiLQAagzAAhCIBpAAIBoAAQG7DDlQDMQmpEJkyQAQhEG3FbD/QAiAWAAA/Qg1AAgPAbQlDHdohEXIAAhCQiKCGkVA9IAACBQAABEAIA/QAjF7nGh5IAACGQg1AAAAgNg");
	this.shape_1447.setTransform(1287.9962,2141.875);

	this.shape_1448 = new cjs.Shape();
	this.shape_1448.graphics.f("#A2C753").s().p("AGdN3QAAhCgCAAQq7giqFgdIAACBQg1AAgzgKQnuhfm4ieQAAg/gOg9QhOlSk/DMQAAg/gignQhGhfhpg/IAAiAIAAiBQBCjaDdhiQAWgJAAhCQJdMfB6wjIA9ApQB3BThMj9QEkEaDDkuQAfguAAg/QG9SzECwBIBkClQAYAuBpAAQGJK+L9oiQAigbA2AAQI5D/lNmdQgdgiAAhEIBoAAIBkAAQKLF2C+hcQApgWA2AAQiqGgiyFFQnUNeq2AAQk3AAlmiug");
	this.shape_1448.setTransform(1119.925,2137.5796);

	this.shape_1449 = new cjs.Shape();
	this.shape_1449.graphics.f("#AAC952").s().p("AiyBRIAAh/IAAiEIBpAAIBlAAQAABEAdAiQDND/iKAAQhWAAjYhig");
	this.shape_1449.setTransform(1262.3468,2075.1289);

	this.shape_1450 = new cjs.Shape();
	this.shape_1450.graphics.f("#A6C953").s().p("AogL4QAAhBAigWQEJjImOtxQJTKeisypQgMg9AAhEQBEDbD0AkQA2AIAwAAQAAA/gWAMQh8AziOADQHvAHC5GKQAYA1AABCQAABEAPA9QB5IzlXBXIAAEFIAACAQg1AAgpAWQgmATg4AAQjgAAoLktg");
	this.shape_1450.setTransform(1339.989,1981.2161);

	this.shape_1451 = new cjs.Shape();
	this.shape_1451.graphics.f("#99C256").s().p("ACdE9Qj1gkhEjbQAAg/gTg1QgehLg1hCQA1AAASgYQAfgnAAhBQDQEBC1EWQAaAvAABCQgxAAg1gIg");
	this.shape_1451.setTransform(1332.3,1868.95);

	this.shape_1452 = new cjs.Shape();
	this.shape_1452.graphics.f("#B0D389").s().p("ADMF4QijoskqC2IAAiFIAAkCQIugdhcKlIAxAAIAACEQgxAAgFgPg");
	this.shape_1452.setTransform(1290.875,1797.4135);

	this.shape_1453 = new cjs.Shape();
	this.shape_1453.graphics.f("#D1F0E5").s().p("AG/FqQjFjzj7EOIgxAAQBbqmouAeIAAiBQJEEGGnGhQAgAgAABCQgzAAgUgbg");
	this.shape_1453.setTransform(1316.875,1784.45);

	this.shape_1454 = new cjs.Shape();
	this.shape_1454.graphics.f("#B2D59A").s().p("AhlAeQCzgCg9kBQgOg9AAhBQA1AAARAYQAgApAABAIAAGGIAACBIAAA/IgKAAQjhAAAdlGg");
	this.shape_1454.setTransform(1140.3111,1781.1822);

	this.shape_1455 = new cjs.Shape();
	this.shape_1455.graphics.f("#CFEFDB").s().p("AkDCDIAAmGQElBhDDC/QAfAkAABCQg1AAgzgEQkqgZh1CeIAAiBg");
	this.shape_1455.setTransform(1176.825,1784.45);

	this.shape_1456 = new cjs.Shape();
	this.shape_1456.graphics.f("#A1CF69").s().p("AjehDIAAiBIE3AAIBoAAQAABBAPA9QA9EBi0ACQgzAAg1AIIgOAAQiZAAgokIg");
	this.shape_1456.setTransform(1121.297,1765.2749);

	this.shape_1457 = new cjs.Shape();
	this.shape_1457.graphics.f("#BFDA65").s().p("AGCNiIAAg/QpkCKtHtVIAAiCQC7oBGWkzQAbgbAAg/QGugaD6EeQEkFOHhhMQCeJTkTGAQkqGah/AAQg7AAgVhZg");
	this.shape_1457.setTransform(956.8827,1918.6148);

	this.shape_1458 = new cjs.Shape();
	this.shape_1458.graphics.f("#B4D253").s().p("Ai8IRQkvjsgZoIQHnjkIihhIAABBQAAA/gbAbQmWEzi6IAIAACDQg2AAgggYg");
	this.shape_1458.setTransform(860.625,1872.1);

	this.shape_1459 = new cjs.Shape();
	this.shape_1459.graphics.f("#B1D794").s().p("Ak1ghIAAiBIE4AAIBkAAQA2CBBSBlQAWAbAxAAIAABEQkzhEk4iAg");
	this.shape_1459.setTransform(881.3,1722.925);

	this.shape_1460 = new cjs.Shape();
	this.shape_1460.graphics.f("#D1EFE4").s().p("AmcBwIAAiAQEakHIYBCQAHADAABBIhjAAIk6AAIAACBIhlAAIAACAQg2AAgEARQghBig8AAQhAAAhghzg");
	this.shape_1460.setTransform(850.275,1721.2215);

	this.shape_1461 = new cjs.Shape();
	this.shape_1461.graphics.f("#B7DA96").s().p("Ak3BjIAAh/IAAiBQG8g4B5ElQAHATAzAAIAABEQk4gEk3hAg");
	this.shape_1461.setTransform(943.525,1722.477);

	this.shape_1462 = new cjs.Shape();
	this.shape_1462.graphics.f("#CAECDB").s().p("ApshFIAAiAQIjDLK2gHIAAA/IAACBQgzAAg1AEQg7ADg6AAQocAAngkLg");
	this.shape_1462.setTransform(1036.875,1739.3806);

	this.shape_1463 = new cjs.Shape();
	this.shape_1463.graphics.f("#A1C960").s().p("ALjSFQkTgwiKjKQAAhAgUg5QlFxbxSPSQAAg/gfgaQiXhrBOlCQEjmNGUknQAdgYAAhCQLADbnUkLQgdgPAAhBQDpg/gRjGQgHhCAAg+IBlAAQhsODOsEFQFDBYBaE1QAABEgdAnQgWAYg2AAIAACBQAABCgVAJQjeBihBDaIAACCQg2AAgzgNg");
	this.shape_1463.setTransform(776.3716,2018.35);

	this.shape_1464 = new cjs.Shape();
	this.shape_1464.graphics.f("#A7D167").s().p("AgBELQgWjCjwBGIAAiDIAAkBQFkhVBmDAQAKAWAzAAQAAA/AHBBQARDFjpA/QgwAAAAgFg");
	this.shape_1464.setTransform(741.7827,1913.0958);

	this.shape_1465 = new cjs.Shape();
	this.shape_1465.graphics.f("#A0C559").s().p("Aj0EGIAAiEQBpiBBLiOQAdg0AAhEQAwABAuATQHEC3qKFAIhpAAg");
	this.shape_1465.setTransform(812.5071,1810.35);

	this.shape_1466 = new cjs.Shape();
	this.shape_1466.graphics.f("#95BB55").s().p("AmgG9Qgzj7AAkFQEchTDoiBQgOEjDHBnQAZAOAABCIhnAAQgzAAgJgXQhli+lmBTIAAECIAACEQgzAAgCgKgABTkoQBkg8BfhHQAkgaAxAAIBpAAIAACAQABC2hpAAQhgAAi5iZg");
	this.shape_1466.setTransform(751.7008,1881.95);

	this.shape_1467 = new cjs.Shape();
	this.shape_1467.graphics.f("#AFD15D").s().p("AMmYVQAAhAgPhBQiqrLrqDAIAACGIAACBQAAA/gfAuQjDEtkkkaQAAhBgdgRQmKjikwG1Qhak0lDhaQutkFBuuCQAAhCgZgOQjHhnAOkjQAAgUADgbQAOAPARAPQGDE+gClcIAAiAQKLlBnEi3QgugTgxAAIAAiBQF+Bhg9llQgKg9AAhEIAAiBIBnAAQE5CBEzBEIAAhEQE3A/E5AFIAAhEQIVEpJcggQA2gFAzAAQApEVCmgMQA1gHAzAAQgdFNDsgHIAAhAQB1ieErAZQAzAFA1AAQBrCiGgiUQAugOA2AAQEri3CjItQAEAPAxAAQAABBggAnQgRAYg1AAQA1BCAeBLQATA2AAA/QAABEAMA9QCtSppUqfQGPNykJDIQgiAWAABBIhkAAIhoAAIhmAAIhpAAIAACEIAACAQg2AAgiAbQlPDwkIAAQlTAAjdmLgAm0OJQBEEYG1pZQETmAiepTQnhBMkklOQj6kemuAaIAAhBQojBhnnDkQAZIJEvDrQAgAYA2AAQNGNVJliKg");
	this.shape_1467.setTransform(1039.1381,1914.7231);

	this.shape_1468 = new cjs.Shape();
	this.shape_1468.graphics.f("#A9CF82").s().p("AjPB5IAAiCQChl+C1DiQARAbA4AAIAACBIAABDQjQiAjPFAIAAiBg");
	this.shape_1468.setTransform(788.15,1733.4462);

	this.shape_1469 = new cjs.Shape();
	this.shape_1469.graphics.f("#CCECD1").s().p("AlrgmQHVBZC3jBQAYgbAyAAIAACDIAACAQgyAAgvAPQjIBBiJAAQj2AAgujQg");
	this.shape_1469.setTransform(731,1749.4134);

	this.shape_1470 = new cjs.Shape();
	this.shape_1470.graphics.f("#BFDB63").s().p("AsFGEQgDAAA4hdQBAhhh4lJQDHmGFLgtQJkhRGbgDQjbIOB1MHQsAjqqogdg");
	this.shape_1470.setTransform(502.95,1953.55);

	this.shape_1471 = new cjs.Shape();
	this.shape_1471.graphics.f("#B6D698").s().p("AkDAJIAAh/QFHkCCKH2QADAPAzAAIAABBQjAiFlHhAg");
	this.shape_1471.setTransform(523.5,1731.4544);

	this.shape_1472 = new cjs.Shape();
	this.shape_1472.graphics.f("#CFEBDB").s().p("AptGiQgzmAgBmEQMDh8HcBvQAxANAzAAQgBA/gVA6QgeBHg1BBIAACDQgzAAgDgPQiKn2lIECIAACAQgxAAgcgaQitiXlvAxIAAIEIAACBQg1AAAAgCg");
	this.shape_1472.setTransform(492.6,1742.1605);

	this.shape_1473 = new cjs.Shape();
	this.shape_1473.graphics.f("#C7E7C9").s().p("AjPhuIAAiBQGwhXhHHZIA2AAQAABEgiATQgbATgeAAQiCAAjClrg");
	this.shape_1473.setTransform(580.75,1717.7233);

	this.shape_1474 = new cjs.Shape();
	this.shape_1474.graphics.f("#ADD184").s().p("AjpECQCmkoDVj6QAigkAAhAIA1AAQgrInmnDiIAAiDg");
	this.shape_1474.setTransform(303.45,1927.4);

	this.shape_1475 = new cjs.Shape();
	this.shape_1475.graphics.f("#ACCF5E").s().p("EAZkAvXQjUlooogHQAAhCgdguQiSjzjximQhonrGgkhQAAhCgWgHQwclvsWAwIAACGQAYSA3EAPQAAg/gdgxQiSjzjxilQAAhAgYgzQjbmwisnsQA1AAATgYQAggnAAhBIAAiEIAAkBQA2AAATgbQAggnAAg/QDwBEgajJQgIg/AAhCQE4AAErg9QAOgCAAhCIAAiDIBmAAQGnjiAsooIg1AAQAAhCgegnQgVgdg2AAIAAiBIAAiBQHzDgEElGQAWgaAzAAQCvjjDOjHQAigdAAhEIAAiBIAAoGQFwgxCsCXQAdAbAxAAQFHA/DACGIAAhCIAAiDQA2hCAdhGQAWg7AAg/QDuHACQhnQAigTAAhEQHmDuFchfQAugMAzAAQBGFGIwi2QAugPAzAAQDPlBDRCBIAAhEQC4DdBFjMQAEgRA2AAQAABEAKA9QA8Fll9hhIAACBQAABEgdAzQhMCPhoCBIAACEQgxAAgkAaQhfBHhkA9QgRgPgPgPQgCAbAAAUQjpCAkdBTQAAEHAzD6QADAKAzAAQA1BCAdBGQAWA6AABAQAABBgdAZQmUEmkjGOQhOFBCXBrQAfAaAAA/QgfGXEXjjIA9gzQjuOyL0kmQjdLqn1MtQg2AAgOgWgAKZfeQDvFmEmgRQOLhCjRlPQlJoWksAAQk9AAkdJSgEgn0ANKQDDKnGJhMQHwhmiqloQi/mdkDAAQjSAAj+EQgAj/x+QlLAujHGFQB3FKg/BiQg4BcACAAQKpAdL/DpQh0sHDboNQmbACpkBRg");
	this.shape_1475.setTransform(503.8641,2011.925);

	this.shape_1476 = new cjs.Shape();
	this.shape_1476.graphics.f("#D0EDE4").s().p("AmgD9Qgzi2AAjCQJrjnEhCZQAbAKAABEQgzAAgWAbQkEFFnxjgIAACBIAACBQg0AAgCgKg");
	this.shape_1476.setTransform(347.35,1848.877);

	this.shape_1477 = new cjs.Shape();
	this.shape_1477.graphics.f("#CCEBD0").s().p("AkBHIIAAiDIAAiBQAxAAAWgZQAfgmAAhCIAAiCIAAkCQCbAACDg6QAWgIAAhEQA2AAAVAdQAeAnAABCQAAA/giAlQjWD5ilEpIAACDIhmAAg");
	this.shape_1477.setTransform(295.675,1920.725);

	this.shape_1478 = new cjs.Shape();
	this.shape_1478.graphics.f("#C6E8D2").s().p("AHWIHIjNAAIhoAAQAAg/gKhCQgzkjj5hiIAAiEIAAiBIAAg/QnTCYAzlbQNBCID6LzQAFARAxAAIAACBIhmAAg");
	this.shape_1478.setTransform(1425.2989,1888.4);

	this.shape_1479 = new cjs.Shape();
	this.shape_1479.graphics.f("#93BE6C").s().p("AhOFdQi0kXjRkBIAAiDQD8kODGDzQASAbAzAAIAACDQgzFbHTiZIAAA/Qg2AAgfAbQjiCqjRDCQABhBgbgvg");
	this.shape_1479.setTransform(1363.45,1855.2767);

	this.shape_1480 = new cjs.Shape();
	this.shape_1480.graphics.f("#9BC37C").s().p("ABnEDQAAg/gYgKQkPhwgPlMIBpAAQD5BiAzEiQAKBCAAA/IhpAAg");
	this.shape_1480.setTransform(1420.575,1914.4);

	this.shape_1481 = new cjs.Shape();
	this.shape_1481.graphics.f("#9AC452").s().p("ACsGRQi3mKnwgHQCPgBB8gzQAWgNAAg/QDRjCDiiqQAfgbA1AAIAACBIAACFIhoAAQAOFMERBwQAYAKAAA/QAABCgbAzQhECLjYAEQAAhBgZg2g");
	this.shape_1481.setTransform(1380.1,1914.275);

	this.shape_1482 = new cjs.Shape();
	this.shape_1482.graphics.f("#D4F2F9").s().p("Ai8gMQLyg9ryBsg");
	this.shape_1482.setTransform(5701.65,1926.0838);

	this.shape_1483 = new cjs.Shape();
	this.shape_1483.graphics.f("#85BD15").s().p("AiHEDQClBXgumvQgHhAAAhBIAyiBQDPKvi8AAQhBAAh0hVg");
	this.shape_1483.setTransform(5953.86,3677.2322);

	this.shape_1484 = new cjs.Shape();
	this.shape_1484.graphics.f("#578419").s().p("AlrgPQGaBXCNjCQARgWA2AAQAzAAAWAbQAfAnAAA/QAABBgdARQhLAuhpAAQg2AAgwAMQhcAUhIAAQjRAAgqigg");
	this.shape_1484.setTransform(5718.2,3748.2165);

	this.shape_1485 = new cjs.Shape();
	this.shape_1485.graphics.f("#82B91F").s().p("AmDAkQAAg/gggnQgVgagzAAIAAiEQAzAAAVgaQAggnAAg/IBpAAQB0GBH0ADIBpAAIA1AAQjCE9jcAAQjbAAj2k9g");
	this.shape_1485.setTransform(5793.325,3743.0625);

	this.shape_1486 = new cjs.Shape();
	this.shape_1486.graphics.f("#E3EBCC").s().p("ACWD2QhFjGi1guIAACBIhoAAIAAiBIAAiFQAzAAATgYQAigmAAhCQEjA1AOFRIAACBQgwAAgHgOg");
	this.shape_1486.setTransform(5775.075,3694.6);

	this.shape_1487 = new cjs.Shape();
	this.shape_1487.graphics.f("#F8F0CC").s().p("ADtBdQiBjqnQBaIAAiEIDPAAIBpAAQIMh5ihHxQgCAPgzAAQAAhAgdgzg");
	this.shape_1487.setTransform(5759.0789,3634.9345);

	this.shape_1488 = new cjs.Shape();
	this.shape_1488.graphics.f("#F3E493").s().p("ADPCOImfAAQg2AAgHgRQgphwAAiCQHPhaCBDrQAdAzAAA/IhoAAg");
	this.shape_1488.setTransform(5754.525,3641.4558);

	this.shape_1489 = new cjs.Shape();
	this.shape_1489.graphics.f("#618B1D").s().p("ACaEDQn0gCh0mCIAAiBQC2AuBEDFQAHAOAxAAQFnBVBkjCQAJgTAzAAQA2AAAHARQCBEtkmg7IAACBIhpAAg");
	this.shape_1489.setTransform(5811.3291,3720.75);

	this.shape_1490 = new cjs.Shape();
	this.shape_1490.graphics.f("#5C8A14").s().p("AkCgGIAAiBIE2AAIBpAAQAwAAAXAZQAfApAAA/Qg1AAgRAXQheB3hqAAQh0AAiDiOg");
	this.shape_1490.setTransform(5884,3669.2638);

	this.shape_1491 = new cjs.Shape();
	this.shape_1491.graphics.f("#8CBF2F").s().p("AC/HqQgqgbg1g4QAAhBgigsQhGhYhohBQAAhAgggpQgWgYgwAAIAAiAQAAhEgPg9QgkiGg2iBQFiCmDHFKQAPAYA2AAQAABBAHBAQAmFohsAAQgWAAgbgPg");
	this.shape_1491.setTransform(5921.235,3654.1112);

	this.shape_1492 = new cjs.Shape();
	this.shape_1492.graphics.f("#DAE6C5").s().p("AjFCBQivgCBHj/IIHAAIBpAAIAACAIhpAAIk2AAIAACBIhpAAg");
	this.shape_1492.setTransform(5867.4377,3655.7);

	this.shape_1493 = new cjs.Shape();
	this.shape_1493.graphics.f("#85BA23").s().p("AAxCxImfAAIAAiBIAAiFQRMj1olGhQggAYAABCIhoAAg");
	this.shape_1493.setTransform(5832.3445,3547.0832);

	this.shape_1494 = new cjs.Shape();
	this.shape_1494.graphics.f("#D6EEB1").s().p("AlpAAQBoAABJgtQAbgTAAhAIGfAAIBoAAIAACAQgzAAgwAKQk7A1k1BCIAAiBg");
	this.shape_1494.setTransform(5811.425,3577.65);

	this.shape_1495 = new cjs.Shape();
	this.shape_1495.graphics.f("#F9FCEE").s().p("AjQK+IAAiBQgOlSkkg1Qg1AAgzAMQjxA9AfjKIGgAAIBpAAQAzAAACgPQChnxoNB5QAAg/gZgKQibg8BLkAQBpA/BvAxQAqARA1AAQE1hCE7g1QAxgKAzAAQEogKBCECQADAMAzAAQA1CBAlCGQAOA9AABEIhoAAIoJAAQhGD+CvADIBoAAQAABBgWA4QgdBMg1BBIAACBQgzAAgKATQhFCIjCAAQhWAAhugag");
	this.shape_1495.setTransform(5816.4679,3650.4094);

	this.shape_1496 = new cjs.Shape();
	this.shape_1496.graphics.f("#88BA2B").s().p("AgoGpQhwgxhpg/IAAiBIAAiBQHLt0kmKzQiPFRHtgPQgBBAgaATQhJAuhpAAIAACBQg1AAgogRg");
	this.shape_1496.setTransform(5769.85,3546.3436);

	this.shape_1497 = new cjs.Shape();
	this.shape_1497.graphics.f("#83B622").s().p("AEsNJQp8hEoDk/QHhmJh3uIIAzAAQGbJDC9HUQAWA6AABAQA3DYFohLQAxgNA1AAQGeFOrNA1QgfADgYAAQgZAAgSgDg");
	this.shape_1497.setTransform(5663.4872,3714.0625);

	this.shape_1498 = new cjs.Shape();
	this.shape_1498.graphics.f("#F2F9E8").s().p("AhnQAQgBg/gWg6Qi9nWmbpBQMOgxlTpnQgegzAAhAQGOjzFXDbQAkAYA2AAIAACBIAACBQhMEACcA8QAYAKAAA/IhoAAIjPAAIAACEQAACDApBvQAIARA1AAQggDKDxg9QAzgMA2AAQAABBgiAnQgUAYgzAAIAACGIAACBQABA/ghAnQgVAbgzAAIAACDQg2AAgRAWQhhCGjiAAQhlAAh+gbg");
	this.shape_1498.setTransform(5692.3,3644.2169);

	this.shape_1499 = new cjs.Shape();
	this.shape_1499.graphics.f("#88B13D").s().p("AkQECIAAiBQGTgKgnn7IAwAAQAAA/AeAzQFUJmsOAxIAAiDg");
	this.shape_1499.setTransform(5646.8848,3590.775);

	this.shape_1500 = new cjs.Shape();
	this.shape_1500.graphics.f("#85BD17").s().p("EkeXC5zIk4AAQAAg/gJgFQmXhAmaABIAAhCQvgAfqbjfUAi9gBTAWiAFXIiNAuQkCBTl7AAIhoAAgEFJPCbXQu5iPh9imQg8hSAAiEQPxiAC2KLgEDcvCA7QfuBC/ugBgED95i2fQgfgHgKhQQgIgxAAhLQAgARAgAUQHYD6iPAAQhPAAkJhMg");
	this.shape_1500.setTransform(3771.7,4454.8);

	this.shape_1501 = new cjs.Shape();
	this.shape_1501.graphics.f("#98BF54").s().p("AFLEwQm/k5leh6QHQBbC2jBQAbgaA1gBQAxg/BEgrQAkgWA2AAQAABBgZA5QgdBIgwA/QB8C2hHFFQgFANgwAAQAAhCgigTg");
	this.shape_1501.setTransform(5324.175,3226.8);

	this.shape_1502 = new cjs.Shape();
	this.shape_1502.graphics.f("#70992D").s().p("Aj8iQQCZAFCdgFIBpAAIBmAAQAABCggApQgWAbgwAAIAACAQg4AAgxAKQhKARg6AAQjtAAA7khg");
	this.shape_1502.setTransform(4971.142,3786.8804);

	this.shape_1503 = new cjs.Shape();
	this.shape_1503.graphics.f("#83B925").s().p("AldETIhmAAIAAiBQCvjhDNjFQAfggAAg/IBoAAQA1AAAWAYQJTLOoaABQjEAAldhhg");
	this.shape_1503.setTransform(5032.5521,3744.9018);

	this.shape_1504 = new cjs.Shape();
	this.shape_1504.graphics.f("#86BB1F").s().p("AgUFVIgzAAQAllEknA9IAAiAIAAiBQDvBwFnj6QBohJhLCnQhrD8hrE4IhoAAg");
	this.shape_1504.setTransform(5030.5584,3673.6921);

	this.shape_1505 = new cjs.Shape();
	this.shape_1505.graphics.f("#F1EDC0").s().p("AjZBEQAxAAAWgbQAignAAg+QAwhBAghMQAWg4AAhBQAyBBBEAqQAlAVA1AAQAABFAHA8QAvGEiGAAQhsAAjjj/g");
	this.shape_1505.setTransform(4926.0092,3700.9015);

	this.shape_1506 = new cjs.Shape();
	this.shape_1506.graphics.f("#F4F8E8").s().p("AullZQDRAAC+g9QARgEAAhFQBpBCBwAxQApATA4AAQAAA/giAnQgWAbgxAAQH7I4hVq+QgHg8AAhFIGgAAIBmAAQEmg8gkFDIAzAAQAAA/ggAgQjMDEivDiIAACBIhpAAQieAFiZgFIAAg/QjgB6i1AAQnXAAiktCg");
	this.shape_1506.setTransform(4935.125,3729.4269);

	this.shape_1507 = new cjs.Shape();
	this.shape_1507.graphics.f("#84B330").s().p("AsjraIBmAAIDRAAIBpAAIBnAAQgBBFgRAEQi+A9jRAAQDiSCMum6IAAA/QhJFoGAhYQAxgKA4AAIAxAAQmHEikuAAQqmAAjs21g");
	this.shape_1507.setTransform(4911.9,3754.5471);

	this.shape_1508 = new cjs.Shape();
	this.shape_1508.graphics.f("#84BA18").s().p("AAyGOIjQAAQAAg/gRgHQlIhthClRQGbnRGyE1QAiAYAzAAIBpAAIBoAAIAACEIhoAAIk3AAIAACCIAACBIAACBIAACAIhpAAg");
	this.shape_1508.setTransform(4857.675,3641.619);

	this.shape_1509 = new cjs.Shape();
	this.shape_1509.graphics.f("#83BE0F").s().p("Ag6C0IhoAAIAAiBQHUoCjMJ3QgIAMgwAAIhoAAg");
	this.shape_1509.setTransform(4910.1418,3598.5259);

	this.shape_1510 = new cjs.Shape();
	this.shape_1510.graphics.f("#F6FCE4").s().p("AA8DsQhvgxhphCIhmAAIAAh/IAAiBQEDj7DiETQAgApAABAQAABAgWA4QggBMgwBBQg4AAgpgTg");
	this.shape_1510.setTransform(4899.025,3669.3045);

	this.shape_1511 = new cjs.Shape();
	this.shape_1511.graphics.f("#93C042").s().p("AIIEDImfAAQg2AAgkgWQhEgpgzhCQAAg/gfgpQjikSkED5IAAiAIAAiDIE3AAIBoAAQIMBfDWCNQAlAXA1AAIAACBIAACBIhmAAg");
	this.shape_1511.setTransform(4935.375,3655.575);

	this.shape_1512 = new cjs.Shape();
	this.shape_1512.graphics.f("#82B821").s().p("AvYLvIAAiGQA2AAARgYQAfgnAAhCQINBRCNk/QAIgWA4AAQAwAAAFgMQBHlFh8i2QAwg/AdhJQAZg4AAhCQAyAAAWgYQD6kuLJDDQhiEylBAzQjMAgAAAOQgWE+h3DgQgggUgfgRQAABMAHAwQkYGWqpAAQhaAAhigHg");
	this.shape_1512.setTransform(5375.975,3242.8939);

	this.shape_1513 = new cjs.Shape();
	this.shape_1513.graphics.f("#F5FCEF").s().p("ABtD5Qluhcg1mfIBoAAIBpAAQESA/ByDTQAYAzAAA/QAABCgfAmQgRAZg2AAQgzAAgxgKg");
	this.shape_1513.setTransform(5256.575,3278.7);

	this.shape_1514 = new cjs.Shape();
	this.shape_1514.graphics.f("#84BB19").s().p("AgLBeQhfh5AAjFQDyHBghAAQgRAAhhiDg");
	this.shape_1514.setTransform(5174.1725,3223.2441);

	this.shape_1515 = new cjs.Shape();
	this.shape_1515.graphics.f("#83BA25").s().p("AkBB5QEQhXgPmuIAxAAQg3HmDoDKQAgAYAABEQgzAAgxAHQgpAGgmAAQkBAAhPkUg");
	this.shape_1515.setTransform(5210.125,3279.5923);

	this.shape_1516 = new cjs.Shape();
	this.shape_1516.graphics.f("#F0F7DC").s().p("AidHIQAAg/gZgzQhyjUkSg/IAAiAIAAkHIAAiBQDuhGATDFQACACA0AAQFdB6G/E5QAiATAABCQg4AAgHAWQhxD+llAAQhZAAhqgQg");
	this.shape_1516.setTransform(5303.5,3246.108);

	this.shape_1517 = new cjs.Shape();
	this.shape_1517.graphics.f("#AECE87").s().p("ADVIJIk2AAQAAhDgggZQjpjKA4nlQEmA9gglEIAyAAIAAEHIAACBIhnAAIhpAAQA2GfFuBcQAwAKA0AAIAACFIhpAAg");
	this.shape_1517.setTransform(5245.7084,3265.8);

	this.shape_1518 = new cjs.Shape();
	this.shape_1518.graphics.f("#85BA13").s().p("AmrD7IAAiBIAAiAIBmAAQQEoql3I9QgdAuAAA/Qg1AAgbAbQh9CCj9AAQh4AAiUgcg");
	this.shape_1518.setTransform(5320.2982,3188.5882);

	this.shape_1519 = new cjs.Shape();
	this.shape_1519.graphics.f("#89B923").s().p("ABnDAQgTjEjuBFQAAg/gWg5QgdhGg1hEQEDACD2A9QAMAFAAA/IhmAAIAAB/IAACBQg0AAgCgCg");
	this.shape_1519.setTransform(5261.8,3194.2);

	this.shape_1520 = new cjs.Shape();
	this.shape_1520.graphics.f("#83BE18").s().p("AvyhTQSshhM4DhIgzAAQlhBElpAAQpnAAqAjEg");
	this.shape_1520.setTransform(5036.4,2780.4646);

	this.shape_1521 = new cjs.Shape();
	this.shape_1521.graphics.f("#72AB0D").s().p("A1DhBMAofAAAIBoAAQAABBgHAAQpwBCo5AAQsiAAq1iDg");
	this.shape_1521.setTransform(4842.125,2648.6282);

	this.shape_1522 = new cjs.Shape();
	this.shape_1522.graphics.f("#83422E").s().p("ADOBmImeAAIhmAAIAAiAQDWiqF6DaQAdAOAABCIhpAAg");
	this.shape_1522.setTransform(5038.975,2592.9433);

	this.shape_1523 = new cjs.Shape();
	this.shape_1523.graphics.f("#71AB0E").s().p("AtxhCIZ6AAIBoAAQAABCgJACQmpBBlzAAQoUAAmpiFg");
	this.shape_1523.setTransform(5220.45,2648.6713);

	this.shape_1524 = new cjs.Shape();
	this.shape_1524.graphics.f("#656906").s().p("ARCBCI+zAAIhmAAIjRAAIAAiDQMNADMJgDIBpAAIIDAAIBoAAIBmAAIAACDIhmAAg");
	this.shape_1524.setTransform(5137.3,2622.575);

	this.shape_1525 = new cjs.Shape();
	this.shape_1525.graphics.f("#724716").s().p("As/BAIAAiAIGgAAIBpAAQI3AAI3A/QAHAAABBBIhpAAIsKABIsMgBg");
	this.shape_1525.setTransform(5101.2,2609.6125);

	this.shape_1526 = new cjs.Shape();
	this.shape_1526.graphics.f("#6E3A1D").s().p("AhAKLIAA2VIBlAAQAABCAHA/QBJNNi1JHIAAiAg");
	this.shape_1526.setTransform(5283.9949,2486.025);

	this.shape_1527 = new cjs.Shape();
	this.shape_1527.graphics.f("#81BF19").s().p("An8ggQfzBB/zAAg");
	this.shape_1527.setTransform(4778.8375,2788.275);

	this.shape_1528 = new cjs.Shape();
	this.shape_1528.graphics.f("#82AB25").s().p("AawBAIpsAAIhpAAMgofAAAIhoAAIhpAAIAAh/MAyOAAAIBmAAIDRAAIBmAAIAAB/IhmAAg");
	this.shape_1528.setTransform(4867.775,2635.575);

	this.shape_1529 = new cjs.Shape();
	this.shape_1529.graphics.f("#5F2C15").s().p("AjeEEIAAiBIAAiBIBnAAQDvBEgYjJQgHg/AAhCQC0AIg9EAQgPA9AABCIAACBIhoAAIiaABIidgBg");
	this.shape_1529.setTransform(4687.997,2590.0375);

	this.shape_1530 = new cjs.Shape();
	this.shape_1530.graphics.f("#532710").s().p("AhsF+IAAiBIAAqLQCzAFgWD/IAzAAIAACBIAACAQAABCAHA/QASCXiBAAQgsAAg8gRg");
	this.shape_1530.setTransform(4686.8839,2552.0813);

	this.shape_1531 = new cjs.Shape();
	this.shape_1531.graphics.f("#6C3B1B").s().p("AidJKIAAiBIAAwSQFWBGgdHFQgDBAAAA/IgzAAQAWj+izgEIAAKKIAACBIhmAAg");
	this.shape_1531.setTransform(4681.513,2531.65);

	this.shape_1532 = new cjs.Shape();
	this.shape_1532.graphics.f("#57310D").s().p("ARABAMgjlAAAIAAiAIBmAAIbiAAIBoAAIDPAAIBmAAIBmAAIAACAIhmAAg");
	this.shape_1532.setTransform(4899.025,2609.55);

	this.shape_1533 = new cjs.Shape();
	this.shape_1533.graphics.f("#6E3427").s().p("AM9BAI7iAAIAAh/QOkAAOfA/QAIAAAABAIhpAAg");
	this.shape_1533.setTransform(4883.575,2596.675);

	this.shape_1534 = new cjs.Shape();
	this.shape_1534.graphics.f("#515A00").s().p("AZ8BCMgyOAAAIhoAAIhnAAIAAiDQCfADCZgDIBoAAIDPAAIBoAAIE4AAIBoAAMAjmAAAIBmAAIAACDIhmAAg");
	this.shape_1534.setTransform(4841.875,2622.575);

	this.shape_1535 = new cjs.Shape();
	this.shape_1535.graphics.f("#4B210D").s().p("AgNKJIk3AAIAAiBQFWhJgcm/QgDg+AAhCQCYiPAsj7QAKg8AAhCIBoAAQAABCANA8QA8ECixAFIAAIKIAACBIAACAIhmAAIAACBIhoAAg");
	this.shape_1535.setTransform(4770.919,2551.075);

	this.shape_1536 = new cjs.Shape();
	this.shape_1536.graphics.f("#5A2B14").s().p("AioHIQC9lvAOogQADg/AAhCQC0BChCFGQgKBCAAA/QAABAADBAQAdG/lWBJIAAiBg");
	this.shape_1536.setTransform(4755.3354,2544.625);

	this.shape_1537 = new cjs.Shape();
	this.shape_1537.graphics.f("#733E1E").s().p("Ag0LLIjOAAIAAiBQFFoSCKr4QAAgKA2AAIAACDQAABCgDA/QgOIgi+FvIAACBIAACBIhoAAg");
	this.shape_1537.setTransform(4733.2,2544.525);

	this.shape_1538 = new cjs.Shape();
	this.shape_1538.graphics.f("#592B19").s().p("AgoHJQBAlGiyhCIAAiCIAAiAIAAmIQC1AzATDTQAIBAAABCQAwA+AdBMQAZA1AABDQAABCgKA9QgsD6iYCQQAAg/AKhCg");
	this.shape_1538.setTransform(4774.65,2479.6);

	this.shape_1539 = new cjs.Shape();
	this.shape_1539.graphics.f("#BDBEB5").s().p("ABnFEIhmAAQAAhBgGhAQgTjSi3gzIAAiBIAAiAQBhB+DVACIBpAAIAAGGIAACBIhpAAg");
	this.shape_1539.setTransform(4779.875,2427.7);

	this.shape_1540 = new cjs.Shape();
	this.shape_1540.graphics.f("#633D28").s().p("AiWEFQAAhEgYg1QgdhMgxg/IBmAAIBpAAQCugEgWkBIAzAAQAABEAdAwQDNFgm1A1IhpAAg");
	this.shape_1540.setTransform(4805.2545,2460.025);

	this.shape_1541 = new cjs.Shape();
	this.shape_1541.graphics.f("#633319").s().p("APaU8IjPAAQAAhBgHAAQugg/ujAAIAAiBIAAoLQCxgFg8kCQgNg8AAhCQG2g2jMlfQgdgxAAhEIAAiBIAAqGQRPo8kAPFQgRA9AAA/QFcFwCqIdQIQDMgKLEIAACAIhmAAg");
	this.shape_1541.setTransform(4899.0334,2469.0966);

	this.shape_1542 = new cjs.Shape();
	this.shape_1542.graphics.f("#BFB3AA").s().p("AC8EtQjwktjOlFQGTB4BjGSQAPBBAABAQg2AAgRgZg");
	this.shape_1542.setTransform(4733.2,2362.65);

	this.shape_1543 = new cjs.Shape();
	this.shape_1543.graphics.f("#DCE0E0").s().p("AhlFGQgCmEACmIIBkAAIBoAAQAABCgdAnQgWAYg1AAIAACGQAAA/ALA9QBEGGizCDIAAiAg");
	this.shape_1543.setTransform(4810.825,2362.65);

	this.shape_1544 = new cjs.Shape();
	this.shape_1544.graphics.f("#836C63").s().p("AhlHGIAAmHQCziChEmHQgLg9AAhAQA0ABAWAXQAdAoAABBIAAKGIAACBIgzAAQAWEBiuAGIAAiCg");
	this.shape_1544.setTransform(4810.875,2401.8);

	this.shape_1545 = new cjs.Shape();
	this.shape_1545.graphics.f("#D4C9C2").s().p("AiwCNQgdhMg1g+QEShCCninQAbgdAxAAQAABBgfAqQiwDZjQDDQAAhCgUg1g");
	this.shape_1545.setTransform(4857.45,2265.15);

	this.shape_1546 = new cjs.Shape();
	this.shape_1546.graphics.f("#9E6242").s().p("AEHD2QlThakfidQKBBnitlpIAzAAQA2BBBCAsQAnAUAxAAQgBBBgfAnQgRAZg2AAQA2BDAdBJQAUA4AABBQgxAAg0gOg");
	this.shape_1546.setTransform(5251.35,2200.225);

	this.shape_1547 = new cjs.Shape();
	this.shape_1547.graphics.f("#A06640").s().p("AL3JyQpqruvJmIQBoAABMguQAdgTAAhEQPfGFHJOOQgwAAgWgYg");
	this.shape_1547.setTransform(5173.65,2265.025);

	this.shape_1548 = new cjs.Shape();
	this.shape_1548.graphics.f("#A66C4A").s().p("A14HHIBnAAQDRjDCvjbQAfgpAAhBQIEj3JdjIQAVgIAAhBILVAAIBoAAQBmBCBxAuQArARA2AAQAABEgeATQhLAvhpAAQumA/mbJJIhmAAQrHgImxEMIAAiDg");
	this.shape_1548.setTransform(4971.6,2245.7);

	this.shape_1549 = new cjs.Shape();
	this.shape_1549.graphics.f("#DED2CA").s().p("AE2BBIrUAAIAAiBILUAAIBpAAIAACBIhpAAg");
	this.shape_1549.setTransform(5039.075,2180.65);

	this.shape_1550 = new cjs.Shape();
	this.shape_1550.graphics.f("#A97450").s().p("ADOE8QgxAAgzgFQkSg4iNjFQAAg+gKgFQkhgih1ieIAAiBQOWg8H4FqQAdAYAAA+IgzAAQCGEallAAQhnAAiPgYg");
	this.shape_1550.setTransform(5194.425,2168.386);

	this.shape_1551 = new cjs.Shape();
	this.shape_1551.graphics.f("#A06C45").s().p("AEFCCIpvAAIAAiBQDwBEARi/QAAgHA1AAQB0CdEiAiQAJAFABA/IhnAAg");
	this.shape_1551.setTransform(5127.1,2161.2);

	this.shape_1552 = new cjs.Shape();
	this.shape_1552.graphics.f("#58330F").s().p("ATdBAMgoiAAAIAAiAIBpAAIGgAAIBoAAIexAAIBpAAIAACAIhpAAg");
	this.shape_1552.setTransform(5961.7,2609.55);

	this.shape_1553 = new cjs.Shape();
	this.shape_1553.graphics.f("#71AB0F").s().p("Egz0gBBMBmAAAAIBpAAQAABBgDAAQ2hBC1qAAQ+jAA84iDg");
	this.shape_1553.setTransform(5712.95,2648.6282);

	this.shape_1554 = new cjs.Shape();
	this.shape_1554.graphics.f("#6B3226").s().p("AOlCBI+xAAIAAiBQKVgoSzgZIAAg/IBpAAIBoAAIAACAIAACBIhoAAg");
	this.shape_1554.setTransform(5992.95,2590.225);

	this.shape_1555 = new cjs.Shape();
	this.shape_1555.graphics.f("#5F321D").s().p("AAzKLIhnAAQAAhFgPg8QhclSAEm9QCxgGg8kDQgOg8AAhAIBnAAQgnKhCBHzQAPA8AABFIhpAAg");
	this.shape_1555.setTransform(6081.0645,2512.3);

	this.shape_1556 = new cjs.Shape();
	this.shape_1556.graphics.f("#84442C").s().p("AI5BAIzZAAIAAh/ITZAAIBpAAIAAB/IhpAAg");
	this.shape_1556.setTransform(5438.2,2596.675);

	this.shape_1557 = new cjs.Shape();
	this.shape_1557.graphics.f("#59340B").s().p("AIIBAIwQAAIhmAAIAAh/IBmAAIBpAAIOnAAIBnAAIAAB/IhnAAg");
	this.shape_1557.setTransform(5308.6,2609.55);

	this.shape_1558 = new cjs.Shape();
	this.shape_1558.graphics.f("#535D00").s().p("AIHBCIx2AAIAAiDIQQAAIBmAAIBpAAIAACDIhpAAg");
	this.shape_1558.setTransform(5318.925,2622.575);

	this.shape_1559 = new cjs.Shape();
	this.shape_1559.graphics.f("#714818").s().p("AI5BAIxxAAIhoAAIAAiAITZAAIBpAAIAACAIhpAAg");
	this.shape_1559.setTransform(5438.2,2609.55);

	this.shape_1560 = new cjs.Shape();
	this.shape_1560.graphics.f("#653319").s().p("AlrNOIAAiGQC2pHhJtNQgHg/ABhCIAAiBQGDMADeObQAOA9ABBEQgBA/gTAFQjMA9iaAAQjiAAh7iBg");
	this.shape_1560.setTransform(5313.85,2492.7209);

	this.shape_1561 = new cjs.Shape();
	this.shape_1561.graphics.f("#6D3422").s().p("AGhCBIunAAIAAiBIAAiAIBpAAQDODYH0iUQAUgFAAg/QAwA/BEAnQAlAaA1AAIAACBIhmAAg");
	this.shape_1561.setTransform(5318.925,2590.225);

	this.shape_1562 = new cjs.Shape();
	this.shape_1562.graphics.f("#9D633F").s().p("AjPjgQA2AAATgYQAggqAAhEQCzAIgWD/IAzAAQhJD8CZA/QAWAKAAA/IAABCQk5iXhmmwg");
	this.shape_1562.setTransform(5443.175,2469.75);

	this.shape_1563 = new cjs.Shape();
	this.shape_1563.graphics.f("#626703").s().p("ATcBCMgodAAAIAAiDMAodAAAIBmAAIAACDIhmAAg");
	this.shape_1563.setTransform(5692.175,2622.575);

	this.shape_1564 = new cjs.Shape();
	this.shape_1564.graphics.f("#734616").s().p("AUQBBMgodAAAIhoAAIAAiBMAqFAAAIBmAAIAACBIhmAAg");
	this.shape_1564.setTransform(5686.95,2609.55);

	this.shape_1565 = new cjs.Shape();
	this.shape_1565.graphics.f("#5E6403").s().p("AMJBCI56AAIAAiDIRxAAIBpAAQCeADCZgDIBpAAIBpAAIAACDIhpAAg");
	this.shape_1565.setTransform(5469.45,2622.575);

	this.shape_1566 = new cjs.Shape();
	this.shape_1566.graphics.f("#653317").s().p("AA/VKIAAiBIAAiBQAAhCgggrQj+lQiBnTQAAg/gWgKQiZg/BJj8IAAiBIAAiFQFe5nBEVqQA8TBHHLXIAACBIhpAAIiaABIidgBg");
	this.shape_1566.setTransform(5499.2736,2480.6105);

	this.shape_1567 = new cjs.Shape();
	this.shape_1567.graphics.f("#A56943").s().p("ABcHxQjElyiZmEQAzhBAbhMQAbg1AAg/QCiGsDbFuQAdAuAAA/QAABFggApQgTAYg2AAQgwAAgNgWg");
	this.shape_1567.setTransform(5407.075,2395.35);

	this.shape_1568 = new cjs.Shape();
	this.shape_1568.graphics.f("#A87154").s().p("ADkGbQjtlBljjaQAAhBgTg4QgdhJg2hEQA2AAARgZQAfgnAAhBQHqEJEVHvQAKAWA2AAQAAA/ggAnQhGBahpBBQAAhBgggsg");
	this.shape_1568.setTransform(5324.175,2239.125);

	this.shape_1569 = new cjs.Shape();
	this.shape_1569.graphics.f("#A76B46").s().p("AgbKcQivknhrl1QBohCBHhaQAggnAAg/QBjjFBSjMQAag4ABg/QAwA/BFApQAkAZAzAAQAABBgPA9QhaF7jMESQAzCBAiCGQATA9ABBEQgBA/gaA1QgbBMgzBBQAAhBgcgug");
	this.shape_1569.setTransform(5381.2,2291.275);

	this.shape_1570 = new cjs.Shape();
	this.shape_1570.graphics.f("#A76F4B").s().p("AjzGuQhFgpgwg/IAAiGQDMkSCXljQAFgRAyAAQCeAACDA2QAWAKAABBQgxAAgOAYQjqF7jbF5Qg0AAgkgZg");
	this.shape_1570.setTransform(5427.85,2180.775);

	this.shape_1571 = new cjs.Shape();
	this.shape_1571.graphics.f("#A46A45").s().p("AnRFAQFjlHGEkmQAggZAzAAQA1AAARAZQAiAnABBBQg0AAgWAYQmPH0lzAAQgrAAgsgHg");
	this.shape_1571.setTransform(5604.15,2167.9932);

	this.shape_1572 = new cjs.Shape();
	this.shape_1572.graphics.f("#9B623B").s().p("AjwBbQgRgYg1AAIAAiAQDWgHB2hiQAfgdA0AAQA1BEA/AnQAlAbA1AAQAAA+gCAAQlsAUiXCvQAAhCgigng");
	this.shape_1572.setTransform(5671.375,2128.625);

	this.shape_1573 = new cjs.Shape();
	this.shape_1573.graphics.f("#B26C48").s().p("AjPAFIAAiAIBpAAIBnAAQAxAAAaAZQDUDeiAAAQhdAAkSh3g");
	this.shape_1573.setTransform(5557.4987,2056.7479);

	this.shape_1574 = new cjs.Shape();
	this.shape_1574.graphics.f("#A7704D").s().p("AvvKAQiDg2ieAAIAAiBQFlk+G9j6QAdgPAAhDIBpAAIBmAAQKLEZlwmCQgZgYgxgBIAAiAQDahtEVhRQAUgHAAhCIJuAAIBpAAQAABCAfAnQAWAdAzAAQAAA/gdARQhLAxhpAAQggDHDxgHIAABCQgzgBgzALQzvEOuVJ0QAAhCgWgJg");
	this.shape_1574.setTransform(5562.575,2076.7);

	this.shape_1575 = new cjs.Shape();
	this.shape_1575.graphics.f("#DFE8EA").s().p("AFtB4IhpAAIhpAAIptAAIAAiAQHUjzG2EgQAbAUAAA/IhmAAg");
	this.shape_1575.setTransform(5655.825,1993.2129);

	this.shape_1576 = new cjs.Shape();
	this.shape_1576.graphics.f("#81726A").s().p("AhIGyQiRhwBLlBIAAh/IAAmIQEZEVgYJ3IA2AAQAABCgeARQhLAuhnAAQAAg/ghgWg");
	this.shape_1576.setTransform(6079.7995,2369.1);

	this.shape_1577 = new cjs.Shape();
	this.shape_1577.graphics.f("#5C3A2A").s().p("AAOE2Qi2g2BMlCQA1g/AdhMQAVg1AAhBIBpAAIAACAIAAGHIAACAQgzABgzgPg");
	this.shape_1577.setTransform(6053.9453,2336.75);

	this.shape_1578 = new cjs.Shape();
	this.shape_1578.graphics.f("#62341D").s().p("AgNCKQh1hLAAkEQFHGLhTAAQghAAheg8g");
	this.shape_1578.setTransform(6005.8533,2310.9241);

	this.shape_1579 = new cjs.Shape();
	this.shape_1579.graphics.f("#63331A").s().p("ArWaYImgAAQAAhBgdgWQiVhuBJlDQCjsCG7n3QIepqE0tEQHQBrB6iIQAfglAAg/IBpAAQA1CCAlCHQAOA9AAA/QAABCgWA1QgdBMg1A/QhMFDC3A2QAzAOAzAAQhLFCCRBwQAgAVAAA/IAACCIAACEQAABAAPA8QA8ECixAHQgFG9BcFSQAPA9AABEIAAA/Qy0AZqUApIAACAIhoAAgAISxHQFSDWnHolQAAEEB1BLg");
	this.shape_1579.setTransform(5951.541,2434.25);

	this.shape_1580 = new cjs.Shape();
	this.shape_1580.graphics.f("#673316").s().p("AhkBqQg4AAgugPQjbg6hfi4QIFAAH8A9QAIACAABCQAAA+ggAkQhEBMiwAAQiKAAjLgug");
	this.shape_1580.setTransform(5982.475,2267.7386);

	this.shape_1581 = new cjs.Shape();
	this.shape_1581.graphics.f("#764E37").s().p("ABkHHQAAhAgOg8QgliIg0iBQAAhCgWg5QhTjKhmjDIBmAAIBpAAQDvD7gdIOQgCBEAABAIhpAAg");
	this.shape_1581.setTransform(6045.006,2258.825);

	this.shape_1582 = new cjs.Shape();
	this.shape_1582.graphics.f("#A68366").s().p("ABnEEIhmAAQgyAAgngYQhCgpg1hEIAAiAIAAkCQDQDCCvDaQAgAqAABBIhpAAg");
	this.shape_1582.setTransform(6023.825,2187.325);

	this.shape_1583 = new cjs.Shape();
	this.shape_1583.graphics.f("#AB6D48").s().p("Aj2CpQg/gng2hEQEMipFihLQAzgNA1AAIAACBIAACAQg1AAgvAPQjTA1jQBCQg2AAgkgbg");
	this.shape_1583.setTransform(5718.2,2102.825);

	this.shape_1584 = new cjs.Shape();
	this.shape_1584.graphics.f("#7E4522").s().p("Egd8ArqIoEAAQAAhCgHAAQo3g/o4AAQAAhCgegOQl7jbjWCqQAKrDoQjNQiqoelclvQAAg/ARg9QEAvExQI6QAAhCgdgnQgWgYg2AAIAAiFQA2AAAWgYQAdgnAAhBQA1AAAWgZQAdgnAAhBQGxkMLGAIIBmAAQGdpKOmhAQPKGIJqLvQAWAYAwAAQnJuPvgmFQg1AAgsgRQhwgvhmhBIAAiBIBmAAIJxAAIBmAAQCNDFETA4QAzAFAxAAQEfCeFUBaQAzAOAxAAQFjDbDuFBQAgAsAABBQBrF3CvElQAdAuAABCQCZGFDFFxQAMAWAxAAQBlGxE5CXIAAhCQCBHTEAFQQAfArAABCIhoAAIzaAAQg1AAglgbQhEgngwg/QAAhEgPg9QjducmFsAIAACBIhmAAIAAWWIAACAIAACGIhpAAIAACBIAACBIhpAAIhmAAIAACBIhoAAgEA+XAppIhmAAMgqGAAAQnHrXg8zCQhF1pleZmIAACFIAACBIgzAAQAWj/i0gHQAAhAgdguQjalvijmsQAAhEgTg8QgiiFgziBQDMkTBal7QAPg9AAhCQDcl5Dpl7QAPgYAwAAQOVp0TwkQQA0gKAzAAIE3AAIBmAAQAzBEBEAnQAlAZA1AAIAACAQg1AAgzANQljBLkMCqQgzAAggAdQh3BijWAHIAACBQgzAAgfAYQmFEmljFJQGaBBHAovQAWgYAzAAQCXivFsgUQADAAAAg/QDRhCDTg1QAvgPA1AAQCZAFCeAAQAzgFAxAAQNzI0RGFNQAwANAxAAQA1BEBCApQAnAYAzAAQBmDDBTDKQAWA6AABCIhpAAQAAhCgHgCQn8g9oGAAQBfC5DbA6QAuAPA4AAQk1NDoeJqQm7H3ijMDQhJFDCVBtQAdAWAABCIhpAAg");
	this.shape_1584.setTransform(5427.625,2336.625);

	this.shape_1585 = new cjs.Shape();
	this.shape_1585.graphics.f("#AD7655").s().p("ADTDBIk2AAIAAhBQjxAHAgjGQBpAABLgxQAdgRAAg/QDOCBCvChQAfAeAABBIhmAAg");
	this.shape_1585.setTransform(5702.2929,2037.925);

	this.shape_1586 = new cjs.Shape();
	this.shape_1586.graphics.f("#A5683E").s().p("AjMB/IAAiAIAAiBIE2AAIBjAAIAACBIAACAQgwgBgzAGQidAAiZgFg");
	this.shape_1586.setTransform(5775.075,2096.4);

	this.shape_1587 = new cjs.Shape();
	this.shape_1587.graphics.f("#B38E70").s().p("AFpBAImfAAIhkAAIk3AAIAAh/QHQAAHMA8QAGAEAAA/IhoAAg");
	this.shape_1587.setTransform(5801.1,2076.825);

	this.shape_1588 = new cjs.Shape();
	this.shape_1588.graphics.f("#AB734D").s().p("AOsJGQxFlNtzozIAAiBIAAiBIGgAAIBoAAQEuhNA4DAQAHAOAzAAQE2BCE4A4QAzAHA1AAQA/FUFLBvQARADAABEIAAECIAACBQgxAAgwgNg");
	this.shape_1588.setTransform(5899.325,2140.5107);

	this.shape_1589 = new cjs.Shape();
	this.shape_1589.graphics.f("#E3EFF2").s().p("AEDB5Qk3g3k2hCIAAiAIGeAAIBmAAQggDJDygHIAAA/Qg2AAgzgIg");
	this.shape_1589.setTransform(5925.6,2096.15);

	this.shape_1590 = new cjs.Shape();
	this.shape_1590.graphics.f("#82BF19").s().p("AlZggQVnBB1nAAg");
	this.shape_1590.setTransform(3062.2375,2983.025);

	this.shape_1591 = new cjs.Shape();
	this.shape_1591.graphics.f("#70AF0C").s().p("AnQg/IM5AAIBoAAQAABAgHAAQnJBAnRAAIAAiAg");
	this.shape_1591.setTransform(3654.85,2869.5);

	this.shape_1592 = new cjs.Shape();
	this.shape_1592.graphics.f("#6EAA1B").s().p("EhlQgBAIIIAAIBpAAMC/KAAAIBmAAIAABCUhlRAA/hlQAAAIAAiBg");
	this.shape_1592.setTransform(2783.9,2648.45);

	this.shape_1593 = new cjs.Shape();
	this.shape_1593.graphics.f("#71A347").s().p("EBezACCMi/KAAAIAAiAUBewAAABexgA/IAAhEIBpAAIBlAAIAACDIAACAIhlAAg");
	this.shape_1593.setTransform(2815.15,2629);

	this.shape_1594 = new cjs.Shape();
	this.shape_1594.graphics.f("#C5ECC1").s().p("EiBmgBPIJuAAIBpAAMD2OAAAIBoAAIAABEUheyAA+hevAAAIhpAAQq5AdqdAAQ4mAA2Hifg");
	this.shape_1594.setTransform(2581.85,2624.0203);

	this.shape_1595 = new cjs.Shape();
	this.shape_1595.graphics.f("#E2FAFA").s().p("EB5fACBMj2OAAAIAAiBUB+eABfB5YgDfIBpAAQAAA/giAnQgUAagzAAIAACBIhoAAg");
	this.shape_1595.setTransform(2623.425,2603.125);

	this.shape_1596 = new cjs.Shape();
	this.shape_1596.graphics.f("#B2ABA4").s().p("AiYFFIhpAAIAAiCQAzAAAUgaQAignAAg/IAAiAQAwhEAdhJQAZg4AAhBIDLAAIBpAAQAABBgeAnQgTAYg4AAIAACGIAACAQgxAAgkATQhEAsgyBBIAACCIhmAAg");
	this.shape_1596.setTransform(3437.125,2583.55);

	this.shape_1597 = new cjs.Shape();
	this.shape_1597.graphics.f("#E5E5E2").s().p("AjRFnIjNAAIAAiBQHLkXFxk1IAABEQAABCghAYQj9DQjpDeIAACBIhoAAg");
	this.shape_1597.setTransform(3473.45,2515.225);

	this.shape_1598 = new cjs.Shape();
	this.shape_1598.graphics.f("#DED9D2").s().p("AkbBKQgbhKgzhCQF4AFD9hyQArgUAzAAIAACBQgzAAgkAbQjdCbk3BQQAAhCgag4g");
	this.shape_1598.setTransform(3613.375,2427.675);

	this.shape_1599 = new cjs.Shape();
	this.shape_1599.graphics.f("#90613D").s().p("AnSDCIAAiBQFth/FshzQAugRA1AAQABBEAhAnQASAZA1AAQAABAgZAKQllC3n+AAIgpgBg");
	this.shape_1599.setTransform(3696.3,2401.5642);

	this.shape_1600 = new cjs.Shape();
	this.shape_1600.graphics.f("#84BE17").s().p("AidBDQg1gRAAjEQIYEliSAAQhMAAkFhQg");
	this.shape_1600.setTransform(4500.1164,2864.6031);

	this.shape_1601 = new cjs.Shape();
	this.shape_1601.graphics.f("#85BF19").s().p("AlKAUQgFAAAAg+QNwBVkTAAQiPAAnJgXg");
	this.shape_1601.setTransform(4470.9626,2815.5731);

	this.shape_1602 = new cjs.Shape();
	this.shape_1602.graphics.f("#72B00B").s().p("AmchCILTAAIBmAAQAABCgHABQmUBCmeAAIAAiFg");
	this.shape_1602.setTransform(4396.075,2804.575);

	this.shape_1603 = new cjs.Shape();
	this.shape_1603.graphics.f("#83BE19").s().p("AnYAQQgzgXAAiBQbpADzEEFQgkAIgrABQimAAj9h5g");
	this.shape_1603.setTransform(4323.9809,2837.8003);

	this.shape_1604 = new cjs.Shape();
	this.shape_1604.graphics.f("#6FAD0F").s().p("AwMhBIezAAIBmAAQAABBgIAAQntBCm3AAQprAAoCiDg");
	this.shape_1604.setTransform(4375.3,2648.6282);

	this.shape_1605 = new cjs.Shape();
	this.shape_1605.graphics.f("#85AB24").s().p("EBgYABAI+yAAIhmAAI+0AAIhnAAMiBkAAAIAAh/MCVCAAAIBoAAMAodAAAIBpAAIBnAAIBoAAIAAB/IhoAAg");
	this.shape_1605.setTransform(4059.2,2635.575);

	this.shape_1606 = new cjs.Shape();
	this.shape_1606.graphics.f("#686406").s().p("ATbCCMgodAAAIAAiCIAAiBIBpAAQBjA/ByAuQAtAUAwAAMAiCAAAIBoAAIAACCIhoAAg");
	this.shape_1606.setTransform(4531,2616.125);

	this.shape_1607 = new cjs.Shape();
	this.shape_1607.graphics.f("#8C4A2B").s().p("EhKiAG6IAAiBIAAiGQA3AAATgYQAegnAAhBIAAiAQDpjeD9jRQAigYAAhCIBmAAQABBCAhAgQCoCjkwCAQCXJ1V7gnUA4+gBmA6GACjIAACBIhpAAIhoAAQ2gAc2DAAUgz3AAAgxbgCdg");
	this.shape_1607.setTransform(3929.6,2546.0418);

	this.shape_1608 = new cjs.Shape();
	this.shape_1608.graphics.f("#6B6C09").s().p("EBJtABCMiVCAAAIAAiDMCVCAAAIBoAAIAACDIhoAAg");
	this.shape_1608.setTransform(3914.15,2622.575);

	this.shape_1609 = new cjs.Shape();
	this.shape_1609.graphics.f("#7E4D1A").s().p("EBJtACBMiVCAAAIAAiBQA0hBBEgrQAkgUAxAAUBGbADfBLagBfIBoAAIAACBIhoAAg");
	this.shape_1609.setTransform(3914.15,2603.125);

	this.shape_1610 = new cjs.Shape();
	this.shape_1610.graphics.f("#793C18").s().p("AA6IUQhxguhkg/IAAiBQD6rsA9hhIgUDCQgwJnA/EmQgxAAgsgUg");
	this.shape_1610.setTransform(4422.325,2560.8);

	this.shape_1611 = new cjs.Shape();
	this.shape_1611.graphics.f("#84BF17").s().p("AjigFQOKiEuKDEg");
	this.shape_1611.setTransform(3827.9125,2876.593);

	this.shape_1612 = new cjs.Shape();
	this.shape_1612.graphics.f("#985A35").s().p("AmigoQCeAACEg4QAWgHAAhEQA1AAAnAYQI6E/i1AAQiTAAqGjUg");
	this.shape_1612.setTransform(4085.3618,2399.3232);

	this.shape_1613 = new cjs.Shape();
	this.shape_1613.graphics.f("#9E5F35").s().p("AjtgqIAAiBIDRAAIBlAAQAABCAiAnQDEDthgABQhcAAlgjWg");
	this.shape_1613.setTransform(3963.7791,2321.452);

	this.shape_1614 = new cjs.Shape();
	this.shape_1614.graphics.f("#9A603A").s().p("APiGxQv0m3yUDIQAAhBgggRQhJguhmAAIAAiAQK8hpKJiSQAvgMA0AAQLXG3l+nPQgignAAhCQGKAgEzCXQAYAMAAA/QAABCgdAmQgWAeg2AAQDDCdCZDJQATAbAxAAQAABEgWAIQiDA4ieAAQgzAAgqgWg");
	this.shape_1614.setTransform(3934.825,2349.775);

	this.shape_1615 = new cjs.Shape();
	this.shape_1615.graphics.f("#945C35").s().p("Al9CqQgignAAhEIAAiAQEugaDhhWQArgQA2gBQBmAABJAvQAgAQAABCQAAA/gRAEQl5BhlMBgQg2AAgRgZg");
	this.shape_1615.setTransform(3774.125,2375.8);

	this.shape_1616 = new cjs.Shape();
	this.shape_1616.graphics.f("#D9D0C9").s().p("Ak3AAIAAiAIIHAAIBoAAIAACAQg1AAgsARQjhBVktAbIAAiBg");
	this.shape_1616.setTransform(3763.775,2356.325);

	this.shape_1617 = new cjs.Shape();
	this.shape_1617.graphics.f("#AFA696").s().p("AE3BDIrWAAIAAiFIIIAAIBmAAQBoAABJAuQAgAUAABDIhpAAg");
	this.shape_1617.setTransform(4562.125,2245.825);

	this.shape_1618 = new cjs.Shape();
	this.shape_1618.graphics.f("#E6F7F7").s().p("AE4BAIoHAAIhoAAIhnAAIAAiAQGfAAGUBBQAJAAABA/IhnAAg");
	this.shape_1618.setTransform(4541.35,2232.7);

	this.shape_1619 = new cjs.Shape();
	this.shape_1619.graphics.f("#8A542C").s().p("AoGhAIBmAAIBoAAILXAAIBoAAQAAA/gRAEQkQA+jcAAQk9AAjTiBg");
	this.shape_1619.setTransform(4551.8,2259.0416);

	this.shape_1620 = new cjs.Shape();
	this.shape_1620.graphics.f("#D9DED6").s().p("AFqBDIhmAAIhoAAIjOAAIhpAAIk3AAIAAiFIJuAAIBoAAIBmAAIBpAAIAACFIhpAAg");
	this.shape_1620.setTransform(4473.875,2245.825);

	this.shape_1621 = new cjs.Shape();
	this.shape_1621.graphics.f("#8F5632").s().p("AmehAILUAAIBpAAQAAA/gPAEQjlA+ixAAQkBAAiXiBg");
	this.shape_1621.setTransform(4427.325,2271.9295);

	this.shape_1622 = new cjs.Shape();
	this.shape_1622.graphics.f("#B4927A").s().p("AE2BBIrUAAIAAiAIE1AAIBpAAIE2AAIBpAAIAACAIhpAAg");
	this.shape_1622.setTransform(4427.325,2258.95);

	this.shape_1623 = new cjs.Shape();
	this.shape_1623.graphics.f("#996139").s().p("AtVH9QkziYmKgfIAAiEQRBmBRFl5QAvgPA1ABQBkDCCICqQAWAbAwAAQFSCUCoApQAPACAABCIhoAAQq2gIolCIIhpAAIoFAAIAACEIAACBQgzAAgfAYQhyBmjcADQAAhAgXgLg");
	this.shape_1623.setTransform(4126.55,2271.7);

	this.shape_1624 = new cjs.Shape();
	this.shape_1624.graphics.f("#9B613B").s().p("AeINvUgi8gBigXhgPyQAAhCgOgCQiogplSiVIAAiFIAAiBQCeAACGg2QAVgMAAg/QLyAKGZFgQAdAdA1AAIAACBQEADdIuiZQAPgFAAg/IAAiBIDOAAIBpAAQFlDeKYiaQARgFAAg/QH8ETGIGTQAfAiAAA/QgzBCg4ACQlvATAiB8QBlF8hBAAIgCAAg");
	this.shape_1624.setTransform(4463.425,2301.2532);

	this.shape_1625 = new cjs.Shape();
	this.shape_1625.graphics.f("#9C6A48").s().p("AhJDsQiIirhkjBIAAiGQEyAAEtBCQAMACAABCQAABAgWALQiGA1idAAIAACBIAACGQgwAAgWgbg");
	this.shape_1625.setTransform(4230.35,2226.25);

	this.shape_1626 = new cjs.Shape();
	this.shape_1626.graphics.f("#94D3E2").s().p("AgrAQQArgQAsgPIAAAfg");
	this.shape_1626.setTransform(4142.975,1889.375);

	this.shape_1627 = new cjs.Shape();
	this.shape_1627.graphics.f("#F39B44").s().p("Ai/jKIExAAIBpAAIAAEDIAACBQgxAAgzAHQg7AKgyAAQkyAABpmVg");
	this.shape_1627.setTransform(9309.3189,5261.3456);

	this.shape_1628 = new cjs.Shape();
	this.shape_1628.graphics.f("#F29A44").s().p("AoHKEQR4D6CXoBIgxAAQAAg/gPAAQvci+tfkIQKmlNQ7AKIAAg/QAzAAADgMQAujshkiQIAAiFIGbAAIBpAAQAFPUgFPLIAACBQgxAAgzAFQixAKifAAQvXAAjumUg");
	this.shape_1628.setTransform(9217.425,5085.673);

	this.shape_1629 = new cjs.Shape();
	this.shape_1629.graphics.f("#6BB005").s().p("AlohYQGrA7DTijQAjgYAwAAIAAEFIAACBQgxAAgzAKQiTAhhxAAQlRAAgYkxg");
	this.shape_1629.setTransform(9295.1,4015.1984);

	this.shape_1630 = new cjs.Shape();
	this.shape_1630.graphics.f("#FEC58E").s().p("AhoCBIAAg/QjuAFAgjHQQjACreC7QgPAEAABAIhoAAg");
	this.shape_1630.setTransform(7548.2314,5565.85);

	this.shape_1631 = new cjs.Shape();
	this.shape_1631.graphics.f("#D1CA63").s().p("AnPhNIJwAAIBmAAIBpAAQAzAAAWAYQAbApAABDIhkAAIoFAAQg4AAguAKQg3ANgoAAQiNAAAYibg");
	this.shape_1631.setTransform(7511.4443,5586.5732);

	this.shape_1632 = new cjs.Shape();
	this.shape_1632.graphics.f("#ADBA41").s().p("AFpBAIprAAQg2AAgkgbQhEglgxg/IIFAAIBkAAIDRAAIBoAAIAAB/IhoAAg");
	this.shape_1632.setTransform(7543,5598.55);

	this.shape_1633 = new cjs.Shape();
	this.shape_1633.graphics.f("#DCCA69").s().p("AE4BAIrWAAIAAh/QGeAAGVA9QAKACAABAIhnAAg");
	this.shape_1633.setTransform(7631,5598.55);

	this.shape_1634 = new cjs.Shape();
	this.shape_1634.graphics.f("#87BB1C").s().p("A14A7QRaCZIAnDQAfgbAAhCIIJAAIBmAAQggDKDzg6QAvgKA4AAQAxA/BEAnQAkAbA1AAQAAA+gHAAQu8BysfDUQg1AAgzAFQhoAJhfAAQn9AAjikSg");
	this.shape_1634.setTransform(7377.05,5612.0491);

	this.shape_1635 = new cjs.Shape();
	this.shape_1635.graphics.f("#B8BF49").s().p("AmdhRQGeAAGWBCQAHACAABBQgzAAgyAHQiNAXh2AAQk/AAiUijg");
	this.shape_1635.setTransform(7133.3,5547.7621);

	this.shape_1636 = new cjs.Shape();
	this.shape_1636.graphics.f("#88BC1A").s().p("AlqgBQBmAABLguQAdgRAAhCQDOBCDUA1QAwAKA2AAQgBBBgTAHQjIA8iZAAQjmAAh7iEg");
	this.shape_1636.setTransform(7252.65,5578.918);

	this.shape_1637 = new cjs.Shape();
	this.shape_1637.graphics.f("#ACBD3D").s().p("AJxCBIpvAAQg0AAgxgKQjTg2jPhBQgzAAgngVQg/gpg2hCQK1BhLsBgQAIABAAA/IhkAAg");
	this.shape_1637.setTransform(7288.775,5565.85);

	this.shape_1638 = new cjs.Shape();
	this.shape_1638.graphics.f("#A6BB38").s().p("AoGhQQIHAAH/BCQAHAAAAA+Qg1AAgxAHQizAaiZAAQl+AAjdihg");
	this.shape_1638.setTransform(7039.925,5534.7816);

	this.shape_1639 = new cjs.Shape();
	this.shape_1639.graphics.f("#B9BC42").s().p("AE1BBIrRAAIAAiBQGeAAGUBBQAHAAAABAIhoAAg");
	this.shape_1639.setTransform(6946.675,5520.25);

	this.shape_1640 = new cjs.Shape();
	this.shape_1640.graphics.f("#F6B066").s().p("AqhhQQKhAAKaA/QAHAAABBDQg2AAgzAFQjeAajFAAQnsAAlLihg");
	this.shape_1640.setTransform(7221.65,5261.9816);

	this.shape_1641 = new cjs.Shape();
	this.shape_1641.graphics.f("#FDBB72").s().p("AE5BAIrWAAIAAiAILWAAIBmAAIAACAIhmAAg");
	this.shape_1641.setTransform(7216.2,5195.4);

	this.shape_1642 = new cjs.Shape();
	this.shape_1642.graphics.f("#F1AA5D").s().p("Amdg/ILTAAIBoAAQAABAgHACQmWA+megBIAAh/g");
	this.shape_1642.setTransform(7133.3,5208.3);

	this.shape_1643 = new cjs.Shape();
	this.shape_1643.graphics.f("#E79F53").s().p("ADOCDIpsAAIAAiBQE2AAEshAQAKAAAAhEIBoAAIBoAAQAABEghApQgSAXg1AAIAACBIhoAAg");
	this.shape_1643.setTransform(6967.45,5227.875);

	this.shape_1644 = new cjs.Shape();
	this.shape_1644.graphics.f("#EFB269").s().p("AqhgMQJyhBJtg9QAzgHAwAAQAABEgJAAQktBBk2AAIAACAQg1AAgwAIQh/AWhpAAQkWAAhzieg");
	this.shape_1644.setTransform(6920.65,5229.3787);

	this.shape_1645 = new cjs.Shape();
	this.shape_1645.graphics.f("#D3CB60").s().p("AlsCBIAAiDQF9ACD9hxQAsgRAzAAQAAA/giAaQjaCsmCAAQgsAAgvgCg");
	this.shape_1645.setTransform(7014.025,4838.3628);

	this.shape_1646 = new cjs.Shape();
	this.shape_1646.graphics.f("#F2B268").s().p("Ao5hPQFqgCFqACIBoAAIBmAAIBpAAQA1AAATAbQAgAnAAA+QgzAAgxAHQi/AZimAAQmnAAkDigg");
	this.shape_1646.setTransform(7356.25,5275.0039);

	this.shape_1647 = new cjs.Shape();
	this.shape_1647.graphics.f("#F49A42").s().p("AinCCIhmAAIAAhEQjuAHAdjGQaNAPzjCwQgKAAAABEIhpAAg");
	this.shape_1647.setTransform(7409.1164,5254);

	this.shape_1648 = new cjs.Shape();
	this.shape_1648.graphics.f("#F29841").s().p("AjtgYQgMgFAAg/QIpC5g8AAQgvAAmyh1g");
	this.shape_1648.setTransform(7314.0197,5237.4411);

	this.shape_1649 = new cjs.Shape();
	this.shape_1649.graphics.f("#F3AD5F").s().p("AE3BAIhmAAIhoAAIoIAAIAAiAILWAAIBpAAIAACAIhpAAg");
	this.shape_1649.setTransform(7299.225,5195.4);

	this.shape_1650 = new cjs.Shape();
	this.shape_1650.graphics.f("#F9B56E").s().p("Apug/IR2AAIBmAAQABBAgIAAQpnA/puAAIAAh/g");
	this.shape_1650.setTransform(7444.4,5182.525);

	this.shape_1651 = new cjs.Shape();
	this.shape_1651.graphics.f("#DDCD6D").s().p("AGgCCIjRAAIhmAAIAAhCQnSAbiejaQJcgWGZDHQAaAOAABCIhoAAg");
	this.shape_1651.setTransform(6625.225,5461.9157);

	this.shape_1652 = new cjs.Shape();
	this.shape_1652.graphics.f("#85BC12").s().p("AujiqQQzBOJIAuQAzAFA2AAIBjAAQAAA+gQAHQmVCPl0AAQo+AAnwlVg");
	this.shape_1652.setTransform(6479.95,5479.1107);

	this.shape_1653 = new cjs.Shape();
	this.shape_1653.graphics.f("#A7BC3B").s().p("AIFCBIoIAAIhjAAIAAhCQmgAWhmjVIIGAAIBjAAQCdDaHTgbIAABCIhoAAg");
	this.shape_1653.setTransform(6573.575,5462.025);

	this.shape_1654 = new cjs.Shape();
	this.shape_1654.graphics.f("#8CBC20").s().p("AtxB5QODhyCIiPIhLguQgdgRAAhBQGgAAGVA8QAKAFAAA/IAACBQAABBgVAHQofDInQAAQmKAAlUiQg");
	this.shape_1654.setTransform(6817.2,5527.4699);

	this.shape_1655 = new cjs.Shape();
	this.shape_1655.graphics.f("#D4CA63").s().p("AGiB0QmRh4oWAEIAAiAQJagUGYDJQAZAKAABEQgxAAgzgPg");
	this.shape_1655.setTransform(6770.4,5487.8392);

	this.shape_1656 = new cjs.Shape();
	this.shape_1656.graphics.f("#96B82A").s().p("AlrhqIDRAAIBpAAIE3AAIBlAAIAACAQg1AAgpARQioBEiAAAQjmAAhqjVg");
	this.shape_1656.setTransform(6682.25,5485.5624);

	this.shape_1657 = new cjs.Shape();
	this.shape_1657.graphics.f("#A9B93A").s().p("ApviTQJNBnKFBYQANAFAABAQg2AAgzAHQjCAcinAAQobAAjykng");
	this.shape_1657.setTransform(6241.675,5411.6257);

	this.shape_1658 = new cjs.Shape();
	this.shape_1658.graphics.f("#84BB1A").s().p("AjnhiQOeBqueBag");
	this.shape_1658.setTransform(6161.3625,5484.75);

	this.shape_1659 = new cjs.Shape();
	this.shape_1659.graphics.f("#BBBF4B").s().p("AE3BAIrWAAIAAh/IGfAAIBmAAQCcAACDA3QAbAIAABAIhpAAg");
	this.shape_1659.setTransform(6096.625,5390.425);

	this.shape_1660 = new cjs.Shape();
	this.shape_1660.graphics.f("#AEC044").s().p("AqgiFQKzAuKACPQAPAFAABEIhpAAQhfAFhZAAQqYAAmJkLg");
	this.shape_1660.setTransform(6423.2,5436.269);

	this.shape_1661 = new cjs.Shape();
	this.shape_1661.graphics.f("#FEC28C").s().p("AlZghQVoBD1oAAg");
	this.shape_1661.setTransform(6442.0375,5400.25);

	this.shape_1662 = new cjs.Shape();
	this.shape_1662.graphics.f("#87BA17").s().p("AlDAQQgDgFAAg+QM1BnjUAAQh8AAnigkg");
	this.shape_1662.setTransform(6336.7188,4934.2573);

	this.shape_1663 = new cjs.Shape();
	this.shape_1663.graphics.f("#BEC24E").s().p("AoFAAQEHAADug8QASgFAAg/IE4AAIBoAAIBkAAQAAA/gRAIQnHCkozAWIAAiBg");
	this.shape_1663.setTransform(6127.525,5046.25);

	this.shape_1664 = new cjs.Shape();
	this.shape_1664.graphics.f("#82BD0F").s().p("AGfCOIk4AAQg1AAgsgWQkKhvkCiAQOWhTBcDcQAbA4AABEIhoAAg");
	this.shape_1664.setTransform(6117.425,5019.1037);

	this.shape_1665 = new cjs.Shape();
	this.shape_1665.graphics.f("#FEC48E").s().p("AnBgYQcIgs8IBqg");
	this.shape_1665.setTransform(6514.9,4996.7463);

	this.shape_1666 = new cjs.Shape();
	this.shape_1666.graphics.f("#84BD16").s().p("AicCjQAAg/gWg7QgbhFg1hCQDPjHEWDsQAgAdAAA+Qg2AAgCAPQgpCJiiAAQhEAAhYgXg");
	this.shape_1666.setTransform(6464.65,4951.6837);

	this.shape_1667 = new cjs.Shape();
	this.shape_1667.graphics.f("#C9C559").s().p("AoGgBQHrgnG6hRQAzgJA1AAQAABBgWAFQnHCpowAWIAAiEg");
	this.shape_1667.setTransform(6272.8,5020.225);

	this.shape_1668 = new cjs.Shape();
	this.shape_1668.graphics.f("#B7BE47").s().p("AmeADQEWiVG+ARIBpAAQAABEgUAFQmLB7meBBIAAiBg");
	this.shape_1668.setTransform(6386.825,4993.8887);

	this.shape_1669 = new cjs.Shape();
	this.shape_1669.graphics.f("#ABBD3F").s().p("AmfAAQEuBRA6jCQADgPA0AAIE3AAIBpAAQAABCgdAPQlNCmnVAKIAAiBg");
	this.shape_1669.setTransform(6490.525,4967.95);

	this.shape_1670 = new cjs.Shape();
	this.shape_1670.graphics.f("#A2B933").s().p("EF+VAstQEViZHAAWIBoAAIAACDQgzAAgzAMQlQBTmHAiIAAiBgEl7FgqlIjMAAIhpAAIhpAAIAAhFQnVAbiZjaQKagdHADTQAYAKAABEIhmAAg");
	this.shape_1670.setTransform(4105.875,4656.0502);

	this.shape_1671 = new cjs.Shape();
	this.shape_1671.graphics.f("#86BA18").s().p("AkHAEQQgiuwgDwg");
	this.shape_1671.setTransform(6713.9375,4850.8397);

	this.shape_1672 = new cjs.Shape();
	this.shape_1672.graphics.f("#E6CF75").s().p("AnSB5IAAiCIDPAAIBoAAQFxAtCqiWQAdgYA2AAQAAA/ggAdQjiC5mWAAQh+AAiPgSg");
	this.shape_1672.setTransform(6682.375,4930.0594);

	this.shape_1673 = new cjs.Shape();
	this.shape_1673.graphics.f("#B0BE43").s().p("AlrB7IAAiAQE4hBE2g4QAzgHA1AAQAAA/gfApQgWAYgzAAQg1AAgeAYQiCBzj2AAQhMAAhXgLg");
	this.shape_1673.setTransform(6703.15,4916.7134);

	this.shape_1674 = new cjs.Shape();
	this.shape_1674.graphics.f("#E0D170").s().p("AlqB6IAAiAQEDAAD1g8QAMgFAAhAIBpAAIBoAAQAABAgfAkQidCrlNAAQhfAAhtgOg");
	this.shape_1674.setTransform(7615.45,4682.9488);

	this.shape_1675 = new cjs.Shape();
	this.shape_1675.graphics.f("#AABB3B").s().p("AjQCMIjNAAIAAiBQDljEHvA9QA2AHAwAAQAAA/gMAFQj2A8kDAAIAACBIhoAAg");
	this.shape_1675.setTransform(7589.55,4681.1789);

	this.shape_1676 = new cjs.Shape();
	this.shape_1676.graphics.f("#ACBE40").s().p("AlrABQDPg+DSg1QAvgPA4AAIBmAAIBoAAQAAA/gYAPQk1CTmJAiIAAiBg");
	this.shape_1676.setTransform(7480.75,4708.15);

	this.shape_1677 = new cjs.Shape();
	this.shape_1677.graphics.f("#88BA1C").s().p("Ag0EDIjQAAQAAg/AZg2QB5kFnJiLQImBTJEBrQAMADAABBQg4AAguANQjTA2jPA/IAACBIhnAAg");
	this.shape_1677.setTransform(7439.3,4695.25);

	this.shape_1678 = new cjs.Shape();
	this.shape_1678.graphics.f("#AFBD43").s().p("AlpABQE1hAE7g7QAwgHAzAAQAABCgaAJQkwCWmJAiIAAiBg");
	this.shape_1678.setTransform(7377.025,4734.175);

	this.shape_1679 = new cjs.Shape();
	this.shape_1679.graphics.f("#CAC75D").s().p("AlqCBIAAiBQFnBSBgjBQAKgTA2AAIBoAAIBnAAQAABEggATQjaCumDAAQgsAAgtgCg");
	this.shape_1679.setTransform(7294,4760.3118);

	this.shape_1680 = new cjs.Shape();
	this.shape_1680.graphics.f("#93B922").s().p("As8EFQSHkFqaixQoniRI9hCQLbBEGKB8QARADAABBQg1AAgKAUQhhDBlohTIAACBQgxAAguASQnDC6pPA2IAAiAg");
	this.shape_1680.setTransform(7226.775,4760.05);

	this.shape_1681 = new cjs.Shape();
	this.shape_1681.graphics.f("#B0BA3D").s().p("Ak4AFQB4idEnAWQAzACA2AAIBoAAQAABFgbAHQkdB4k4BCIAAiBg");
	this.shape_1681.setTransform(7091.95,4811.8462);

	this.shape_1682 = new cjs.Shape();
	this.shape_1682.graphics.f("#86BB14").s().p("AgdDIQkJiPjgikQNXmZCjIgQATA6AAA/Qg1AAgzgCQkpgWh2CeQAAhBgdgSg");
	this.shape_1682.setTransform(7060.825,4784.0199);

	this.shape_1683 = new cjs.Shape();
	this.shape_1683.graphics.f("#84BE1A").s().p("AArApInZgtQgCAAAAhBIJjBYQFEAzhZAAQhDAAkwgdg");
	this.shape_1683.setTransform(7570.8815,4000.4883);

	this.shape_1684 = new cjs.Shape();
	this.shape_1684.graphics.f("#F19941").s().p("AknhgQOgBYoQBeQg8ALgyAAQjUAAhOjBg");
	this.shape_1684.setTransform(8479.6671,5211.5463);

	this.shape_1685 = new cjs.Shape();
	this.shape_1685.graphics.f("#A6AF39").s().p("AIFBAIxxAAIAAiAIRxAAIBoAAIAACAIhoAAg");
	this.shape_1685.setTransform(9269.075,5650.35);

	this.shape_1686 = new cjs.Shape();
	this.shape_1686.graphics.f("#4FA403").s().p("A2qhCMArsAAAIBpAAQAABCgIABQqVBCpgAAQtiAAr2iFg");
	this.shape_1686.setTransform(9020.35,5676.3818);

	this.shape_1687 = new cjs.Shape();
	this.shape_1687.graphics.f("#6BAD08").s().p("AMzESIJZAAQiAAViWAAQiWAAitgVgAxqESQiKgRiXggIAAiBIAAkGQA1AAASgYQAigngBhBIBmAAIBpAAIRxAAIBoAAQAABBgYA2QisFwnSBRg");
	this.shape_1687.setTransform(9317.85,5686.3375);

	this.shape_1688 = new cjs.Shape();
	this.shape_1688.graphics.f("#EAD079").s().p("AKgBCIxxAAIhoAAIjPAAIAAiDIWoAAIBpAAIAACDIhpAAg");
	this.shape_1688.setTransform(9253.525,5637.325);

	this.shape_1689 = new cjs.Shape();
	this.shape_1689.graphics.f("#B7B74F").s().p("AIFBAIhmAAIhpAAIuiAAIAAiAIM6AAIBoAAIDPAAIBoAAIAACAIhoAAg");
	this.shape_1689.setTransform(9144.825,5650.35);

	this.shape_1690 = new cjs.Shape();
	this.shape_1690.graphics.f("#C8BD5D").s().p("AE3BBIrWAAIAAiAQFrgCFrACIBpAAIAACAIhpAAg");
	this.shape_1690.setTransform(9041.125,5650.2875);

	this.shape_1691 = new cjs.Shape();
	this.shape_1691.graphics.f("#5A9407").s().p("A9+hQIdJAAIBoAAILXAAIBpAAIOjAAIBpAAQAABCgjAmQgRAYg1AAIhpAAIhoAAMgrsAAAQg1AAgzAMQh6AVhkAAQkcAAh1ihg");
	this.shape_1691.setTransform(8994.45,5664.8646);

	this.shape_1692 = new cjs.Shape();
	this.shape_1692.graphics.f("#F3AB5E").s().p("AmdhQQGfAAGUBBQAIAAAAA/Qg0AAgxAMQiKAVh1AAQlAAAiXihg");
	this.shape_1692.setTransform(9124.05,5340.0631);

	this.shape_1693 = new cjs.Shape();
	this.shape_1693.graphics.f("#D2C766").s().p("AQMBAI9IAAIhpAAIhoAAIhmAAIAAiAMAh/AAAIBoAAIAACAIhoAAg");
	this.shape_1693.setTransform(8885.525,5650.35);

	this.shape_1694 = new cjs.Shape();
	this.shape_1694.graphics.f("#5BA206").s().p("AfmEEMhA0AAAIAAiAQEWhDByjSQAYgxAAhBIBpAAQCeDaHQhNQAzgMA2gBQUIDkZEifQAIgDAAhCIBoAAIAAEHIAACAIhoAAg");
	this.shape_1694.setTransform(8963.2,5682.8);

	this.shape_1695 = new cjs.Shape();
	this.shape_1695.graphics.f("#D4C662").s().p("AM9BAI7iAAIAAiAIbiAAIBpAAIAACAIhpAAg");
	this.shape_1695.setTransform(8678.125,5650.35);

	this.shape_1696 = new cjs.Shape();
	this.shape_1696.graphics.f("#FCB56B").s().p("AVEBCMgrwAAAIAAiCQWtAAWpBDQADgBAABAIhpAAg");
	this.shape_1696.setTransform(8688.45,5312.5);

	this.shape_1697 = new cjs.Shape();
	this.shape_1697.graphics.f("#B39949").s().p("AmahNILTAAIBmAAIAACDIhmAAQjRgDjLADQg1AAgvAMQg1AMgoAAQiPAAAZibg");
	this.shape_1697.setTransform(8709.0443,5170.7387);

	this.shape_1698 = new cjs.Shape();
	this.shape_1698.graphics.f("#49802E").s().p("AoGA/QDRAAC+g6QARgHAAg/QEsgbDihVQAqgRA1AAQAAA/gfAWQl+EUpwAcIAAiEg");
	this.shape_1698.setTransform(8802.475,5156.65);

	this.shape_1699 = new cjs.Shape();
	this.shape_1699.graphics.f("#F29945").s().p("AlaggQVqBB1qAAg");
	this.shape_1699.setTransform(8660.95,5270.3);

	this.shape_1700 = new cjs.Shape();
	this.shape_1700.graphics.f("#F19944").s().p("AGFHVQhirKm5ELQoIE8o+qaQEtAeBVitQAdgzAAhEIAAiBIBpAAQBpAABHAuQAfAUAAA/QDYGuM3ieQAvgKA1AAQBpBABtAuQAsATA2AAQggDHDzg3QAugMA2AAQAABBgSA8QiNHzlnCZQgyAKgrAAQjVAAggj7g");
	this.shape_1700.setTransform(8574.55,5182.9056);

	this.shape_1701 = new cjs.Shape();
	this.shape_1701.graphics.f("#D5A354").s().p("Ao5icQIgB+JMBGQAHAAAABBQg1AAgvAKQjdAqixAAQnjAAiek5g");
	this.shape_1701.setTransform(8579.775,5139.546);

	this.shape_1702 = new cjs.Shape();
	this.shape_1702.graphics.f("#3A8039").s().p("AOkFEIrUAAQg2AAgrgTQhuguhng/QAAhCgIAAQpMhHohh9QAAg/gfgUQhHguhoAAIAAiBQHEEdJKiNQAzgPAwAAQFRB4C3EPIRyAAIBoAAQAAA/gRAHQi9A6jSAAIhmAAg");
	this.shape_1702.setTransform(8647.125,5130.5);

	this.shape_1703 = new cjs.Shape();
	this.shape_1703.graphics.f("#50833C").s().p("AmeCQIAAiBQH+ApikjGQgggnAAhCQCYAACDA7QAWAHAAA/QA2CFBTBmQAVAbA0AAQgBA/gLAFQi7AkigAAQkQAAjGhog");
	this.shape_1703.setTransform(9103.25,5135.6922);

	this.shape_1704 = new cjs.Shape();
	this.shape_1704.graphics.f("#EBA14C").s().p("AofBaIhpAAIhmAAIAAh/IIGAAIBoAAQGfAAGUhCQALAAAAhEIAxAAQhlFXomAAQkMAAl3hSg");
	this.shape_1704.setTransform(9219.85,5141.0344);

	this.shape_1705 = new cjs.Shape();
	this.shape_1705.graphics.f("#D9A04F").s().p("AOnD6QlPhUmLgkIhoAAQoxgWnXhqQg5AAgHgQQgphxAAiDIBpAAIBmAAQNeEIPeC+QAOAAAAA/Qg1AAgxgJg");
	this.shape_1705.setTransform(9186.4,5097.9);

	this.shape_1706 = new cjs.Shape();
	this.shape_1706.graphics.f("#7E7427").s().p("AHRCBIrXAAQAAg/gWgIQiCg6iaAAIAAiAQHYBrIxAVIBoAAIAACBIhoAAg");
	this.shape_1706.setTransform(9150.05,5110.925);

	this.shape_1707 = new cjs.Shape();
	this.shape_1707.graphics.f("#BAA95D").s().p("AkXBpQhShmg2iFILWAAIBpAAIAACFIhpAAIoFAAIAACAQgzAAgWgag");
	this.shape_1707.setTransform(9165.375,5136.925);

	this.shape_1708 = new cjs.Shape();
	this.shape_1708.graphics.f("#B7913A").s().p("AmfgCIAAiBQGKAlFPBTQAwAJA2AAQAABDgMABQmUBBmfAAIAAiFg");
	this.shape_1708.setTransform(9248.525,5124.05);

	this.shape_1709 = new cjs.Shape();
	this.shape_1709.graphics.f("#F29B42").s().p("AlBBQQgRgDgFjBQPNDpmWAAQiiAAl/glg");
	this.shape_1709.setTransform(8992.3709,5278.7296);

	this.shape_1710 = new cjs.Shape();
	this.shape_1710.graphics.f("#378035").s().p("AE1CBQnQgZkCjoQIAggEdDOQAdAWAABBQgxAAg3gEg");
	this.shape_1710.setTransform(8916.65,5136.7165);

	this.shape_1711 = new cjs.Shape();
	this.shape_1711.graphics.f("#1D843E").s().p("AB2FCIhmAAIoHAAIAAiGQK5BRBQpOQAAgIA1AAQAACEAqBwQAHARA4AAIAAB/QAABCAgAnQCJCllIABQhDAAhYgIg");
	this.shape_1711.setTransform(9049.9652,5104.9502);

	this.shape_1712 = new cjs.Shape();
	this.shape_1712.graphics.f("#F49944").s().p("AFwH5QkfglBVgxQGBjulgAqQpYBEnOijQFqg9BrnIIg2AAIAAiBIDPAAIBpAAQAAA/AHAAQWBCUpPM6QjTgFhugJg");
	this.shape_1712.setTransform(9054.8505,5201.975);

	this.shape_1713 = new cjs.Shape();
	this.shape_1713.graphics.f("#9B944A").s().p("AmdBAQDtBGgYjGQgHhCAAg/IIHAAIBmAAIAACBIhmAAIhoAAIhoAAIjPAAIAACAQAAA/gaAPQhqA0hDAAQhqAAgFiCg");
	this.shape_1713.setTransform(9020.35,5156.5579);

	this.shape_1714 = new cjs.Shape();
	this.shape_1714.graphics.f("#036829").s().p("AABDEIjQAAIAAiGIAAiAQA4hBBAgqQAmgWAyAAQA2BABBApQAnAYAxAAQAABCgfAmQgSAYg1AAIAACGIhpAAg");
	this.shape_1714.setTransform(8968.3,5013.775);

	this.shape_1715 = new cjs.Shape();
	this.shape_1715.graphics.f("#017234").s().p("AkDhGQA1hCBEgsQAlgTAwAAIDRAAIBoAAQAAA/giAlQj8Erh5AAQh0AAAEkOg");
	this.shape_1715.setTransform(8952.8694,5053.3717);

	this.shape_1716 = new cjs.Shape();
	this.shape_1716.graphics.f("#026325").s().p("AiECIIAAiBQBmg+BIhaQAfgnABhBQAzAAgBAFQAmHuiCAAQg+AAhmhyg");
	this.shape_1716.setTransform(8857.4994,4876.2932);

	this.shape_1717 = new cjs.Shape();
	this.shape_1717.graphics.f("#1A5C1E").s().p("AgyFuQhCgpg1hAIAAiFQDqg9gVlHQgIhCAAg/QA2AAATAYQAgAnAABEQAABCAOA8QA9EBi0ADIAACFIAACBQgvAAgngYg");
	this.shape_1717.setTransform(8985.497,4968.075);

	this.shape_1718 = new cjs.Shape();
	this.shape_1718.graphics.f("#237736").s().p("AgtFhQgUgZg1AAQAAhBAiggQD8j5mEgsIAAiBIAAiBQA1g/A/gsQAngWAzAAQElg9hIFEQgPA9AAA/QAABDgKA9QgnD6idCQQAAhFgfgmg");
	this.shape_1718.setTransform(9001.0171,4896.2411);

	this.shape_1719 = new cjs.Shape();
	this.shape_1719.graphics.f("#44713A").s().p("AgiEYQBHlDklA8IAAiCQNjsApWT0QgMARgyAAQAAg/APg9g");
	this.shape_1719.setTransform(9025.2466,4849.5222);

	this.shape_1720 = new cjs.Shape();
	this.shape_1720.graphics.f("#E0A654").s().p("AtwBBQE8ixGbhLQAzgFAzAAIM8AAIBoAAIAAA/Qw7gKqmFMIAAiAg");
	this.shape_1720.setTransform(9191.525,5052.675);

	this.shape_1721 = new cjs.Shape();
	this.shape_1721.graphics.f("#949143").s().p("AFqCDIs8AAIAAiEQE3AAEog9QAPgDAAhBQDaAHBACHQAdAzAABEIhpAAg");
	this.shape_1721.setTransform(9232.975,5020.225);

	this.shape_1722 = new cjs.Shape();
	this.shape_1722.graphics.f("#B2BC7F").s().p("AC+BPQjyg9kEAAIAAiCQMViBjPFwQgMAUg1AAQAAg/gPgFg");
	this.shape_1722.setTransform(9176.0228,4940.3809);

	this.shape_1723 = new cjs.Shape();
	this.shape_1723.graphics.f("#FEB970").s().p("AHTBqIwNAAIAAiEQF4iaKVCQQAzAKA1AAIAACEIhoAAg");
	this.shape_1723.setTransform(9222.525,4983.5583);

	this.shape_1724 = new cjs.Shape();
	this.shape_1724.graphics.f("#527D33").s().p("ArUFOIhoAAIAAiBQBkhCBLhaQAggmAAg/IAAiFQIZjFMpBBQAzADA1AAQAABBgOADQkpA9k3AAIAACFQgzAAgzAFQmaBLk8CxIAACBIhnAAg");
	this.shape_1724.setTransform(9165.625,5038.6078);

	this.shape_1725 = new cjs.Shape();
	this.shape_1725.graphics.f("#CAA65C").s().p("AOaCPQhAiHjagIQg2AAgzgBQsphCoZDEIAACFIhmAAIhpAAIAAiFQDPiBCtilQAfgcAAhEIBpAAQgdDJDwg6QAxgKAzAAIQNAAIBpAAQBkCOgvDsQgCANgzgBQAAhDgdg0g");
	this.shape_1725.setTransform(9184.588,5007.1);

	this.shape_1726 = new cjs.Shape();
	this.shape_1726.graphics.f("#3E823B").s().p("AjVDzQgshyAAiBQDRiADVhwQAsgVAxAAQAABDggAeQisCkjOCBIAACGQg2AAgHgUg");
	this.shape_1726.setTransform(9098.025,5007.1);

	this.shape_1727 = new cjs.Shape();
	this.shape_1727.graphics.f("#638041").s().p("AkCB+IAAiAIAAiAQEDAADzA8QAPAFAAA/QgxAAgdAaQhzBrjdAAQgxAAg2gFg");
	this.shape_1727.setTransform(9170.6,4955.3378);

	this.shape_1728 = new cjs.Shape();
	this.shape_1728.graphics.f("#F29B41").s().p("AjbgNQNuhftuCdg");
	this.shape_1728.setTransform(7891.35,5294.4164);

	this.shape_1729 = new cjs.Shape();
	this.shape_1729.graphics.f("#F39944").s().p("AmqgfQaqA+6qABg");
	this.shape_1729.setTransform(7985.025,5296.2);

	this.shape_1730 = new cjs.Shape();
	this.shape_1730.graphics.f("#C7C055").s().p("ALVBAI4RAAIAAiAIYRAAIBoAAIAACAIhoAAg");
	this.shape_1730.setTransform(8501.825,5650.35);

	this.shape_1731 = new cjs.Shape();
	this.shape_1731.graphics.f("#ADB743").s().p("AE1BBIrRAAIAAiAQFlgCFsACIBoAAIAACAIhoAAg");
	this.shape_1731.setTransform(8377.575,5650.2875);

	this.shape_1732 = new cjs.Shape();
	this.shape_1732.graphics.f("#E9D079").s().p("EJuEAGGQltgCllACIhpAAIk4AAIAAiDQJtAAJnA/QAHAFAAA/IhoAAgEpkZgEEIoDAAIhpAAIhmAAIAAiBILSAAIBpAAIAACBIhpAAg");
	this.shape_1732.setTransform(4427.3,5604.875);

	this.shape_1733 = new cjs.Shape();
	this.shape_1733.graphics.f("#A3AE38").s().p("AE3BAIrWAAIAAiAIE3AAIBoAAIE3AAIBpAAIAACAIhpAAg");
	this.shape_1733.setTransform(8294.675,5650.35);

	this.shape_1734 = new cjs.Shape();
	this.shape_1734.graphics.f("#8CA325").s().p("ApshOQFlgDFuADIBmAAIE4AAIBoAAIAACAQg1AAgzAHQjLAYizAAQnNAAkmifg");
	this.shape_1734.setTransform(8190.975,5651.8281);

	this.shape_1735 = new cjs.Shape();
	this.shape_1735.graphics.f("#DCCB71").s().p("AE3BCIk3AAIhnAAIk4AAIAAiDILWAAIBpAAIAACDIhpAAg");
	this.shape_1735.setTransform(8253.075,5637.325);

	this.shape_1736 = new cjs.Shape();
	this.shape_1736.graphics.f("#C7C35C").s().p("AE3BCQlugDllADIAAiDIBoAAIJrAAIBmAAIAACDIhmAAg");
	this.shape_1736.setTransform(8170.175,5637.325);

	this.shape_1737 = new cjs.Shape();
	this.shape_1737.graphics.f("#FAB469").s().p("ApvhQIR2AAIBpAAIAACAQg2AAgzAHQjQAai2AAQnIAAkoihg");
	this.shape_1737.setTransform(8024.9,5340.0316);

	this.shape_1738 = new cjs.Shape();
	this.shape_1738.graphics.f("#F8B569").s().p("AvYhAIdLAAIBmAAQAABBgCAAQvXA/vYAAIAAiAg");
	this.shape_1738.setTransform(8185.725,5338.4);

	this.shape_1739 = new cjs.Shape();
	this.shape_1739.graphics.f("#EFAB61").s().p("Amcg/QFqgCFpACIBmAAQAABBgHAAQmUA/meAAIAAiAg");
	this.shape_1739.setTransform(8336,5325.4375);

	this.shape_1740 = new cjs.Shape();
	this.shape_1740.graphics.f("#F4A85C").s().p("AE6BCQlsgDlqADIAAiCILWAAIBjAAIAACCIhjAAg");
	this.shape_1740.setTransform(8501.825,5312.5);

	this.shape_1741 = new cjs.Shape();
	this.shape_1741.graphics.f("#63AE03").s().p("AqgAAQGfAAGVg+QAKAAAAhFIDRAAIBjAAQA2BFA/AmQAqAYAwAAQAABBgJAAQlWBDkgAAQmVAAktiEg");
	this.shape_1741.setTransform(7905.65,5643.9325);

	this.shape_1742 = new cjs.Shape();
	this.shape_1742.graphics.f("#A3BB3F").s().p("AE3BCQlsgDlqADIAAiDILWAAIBpAAIAACDIhpAAg");
	this.shape_1742.setTransform(8087.275,5637.325);

	this.shape_1743 = new cjs.Shape();
	this.shape_1743.graphics.f("#82AB1E").s().p("AFtBCIpwAAQgxAAgpgZQhAgmg1hEIM/AAIBmAAIAACDIhmAAg");
	this.shape_1743.setTransform(7999,5637.325);

	this.shape_1744 = new cjs.Shape();
	this.shape_1744.graphics.f("#EED17D").s().p("APZBAIhpAAIrXAAIhmAAIs/AAIhjAAIjRAAIAAh/QRAAAQ6A/QAHAAAABAIhoAAg");
	this.shape_1744.setTransform(8030.375,5624.325);

	this.shape_1745 = new cjs.Shape();
	this.shape_1745.graphics.f("#C3C55A").s().p("AnRhPIDRAAIBmAAQE0AAEuA9QAJACAABBQgwAAgzAHQigAYiHAAQlfAAi5ifg");
	this.shape_1745.setTransform(7760.6,5612.9806);

	this.shape_1746 = new cjs.Shape();
	this.shape_1746.graphics.f("#EDCF80").s().p("AIHCBImgAAIhnAAQAAhCgKgCQktg9k1AAIAAiAQKSAZI2CkQARACAABCIhmAAg");
	this.shape_1746.setTransform(7807.275,5605);

	this.shape_1747 = new cjs.Shape();
	this.shape_1747.graphics.f("#B8BA4A").s().p("AoGBAIAAiAIGgAAIBmAAIGfAAIBoAAIAACAIhoAAInRABInUgBg");
	this.shape_1747.setTransform(7869.525,5624.3875);

	this.shape_1748 = new cjs.Shape();
	this.shape_1748.graphics.f("#6DAD09").s().p("ECGeAIHMkVBAAAIAAiAQddi1cwkSQAJAAAAhBQMgjTO8hzQAHAAABg/IJrAAIBpAAILXAAIBmAAQGlHCOji3QAxgKAzAAQHVADHQgDIBoAAQAABFgKAAQmWA/mfAAQIDDhM2igQAKAAAAhBIJxAAIBlAAQFrgDFsADIBpAAQGYDdLahWQAzgGA1AAILXAAIBpAAILSAAIBoAAIYSAAIBpAAIbjAAIBpAAIBlAAIBpAAQAABAgYAxQhzDUkVBCIAACAIhmAAg");
	this.shape_1748.setTransform(7879.75,5656.9);

	this.shape_1749 = new cjs.Shape();
	this.shape_1749.graphics.f("#89A924").s().p("ArVifIE4AAIBoAAQD/DcJAhUQAzgHAwAAIBpAAIAAB/QgzAAgxAKQkMA1jjAAQosAAksk/g");
	this.shape_1749.setTransform(7745.025,5621.0079);

	this.shape_1750 = new cjs.Shape();
	this.shape_1750.graphics.f("#F1A65D").s().p("AmfhPQGfAAGUA/QAMAAAABBQg1AAg0AJQiNAWh2AAQk8AAiXifg");
	this.shape_1750.setTransform(7651.775,5301.0963);

	this.shape_1751 = new cjs.Shape();
	this.shape_1751.graphics.f("#F5AB62").s().p("AmchPIJrAAIBoAAQA2AAARAYQAfAsAAA+QgwAAgzAHQiOAWh3AAQk9AAiUifg");
	this.shape_1751.setTransform(7755.375,5313.9963);

	this.shape_1752 = new cjs.Shape();
	this.shape_1752.graphics.f("#F2B46A").s().p("Ao7hPQI9AAIyBCQAHAAAAA+Qg1AAgwAHQi9AYilAAQmpAAkGifg");
	this.shape_1752.setTransform(7853.85,5327.0406);

	this.shape_1753 = new cjs.Shape();
	this.shape_1753.graphics.f("#F19945").s().p("ANfGFIpsAAIhoAAIhnAAQAAhCgMAAQmSg/mgAAIhpAAIhmAAIAAhCQljAWg6jYQVbCUP8oCQAsgWAxAAQLjGXtJFyIhpAAg");
	this.shape_1753.setTransform(7689.7448,5267.025);

	this.shape_1754 = new cjs.Shape();
	this.shape_1754.graphics.f("#F7AD62").s().p("AqhhBITdAAIBmAAQAABAgDADQqfA9qhADIAAiDg");
	this.shape_1754.setTransform(7698.25,5169.525);

	this.shape_1755 = new cjs.Shape();
	this.shape_1755.graphics.f("#F3B269").s().p("AmfhAILWAAIBpAAQAABAgMAEQmUA8mfABIAAiBg");
	this.shape_1755.setTransform(7817.625,5156.5);

	this.shape_1756 = new cjs.Shape();
	this.shape_1756.graphics.f("#C9C384").s().p("AmOB2QhEgsgzg/QDpjEHqA9QA2AHAxAAIBoAAIBpAAIAACAIhpAAIrRAAIAACBQg4AAgigWg");
	this.shape_1756.setTransform(7973.25,5045.1789);

	this.shape_1757 = new cjs.Shape();
	this.shape_1757.graphics.f("#DAC686").s().p("AldCsQi0gCBLj/QGvjOHWEBQAeAPAAA+IhpAAIpuAAIAACGQgzAAgwgFg");
	this.shape_1757.setTransform(7977.3595,4885.5549);

	this.shape_1758 = new cjs.Shape();
	this.shape_1758.graphics.f("#CFC786").s().p("ACdCPIjQAAQAAhCgdgRQhJguhpAAIAAiFQGahVBXDhQAUA4AABCIhmAAg");
	this.shape_1758.setTransform(8050.925,4901.8634);

	this.shape_1759 = new cjs.Shape();
	this.shape_1759.graphics.f("#237D3A").s().p("AAwC6QgzAAgmgZQhCgsg2g/QAAhAgTg2QgdhLg2g/IDPAAIBoAAQBoAABJAuQAdARAABBQAABAAHBAQATCViAAAQgsAAg8gRg");
	this.shape_1759.setTransform(8020.2643,4923.6143);

	this.shape_1760 = new cjs.Shape();
	this.shape_1760.graphics.f("#89965A").s().p("ABPCrQinirkTg9IAAiGIJuAAIBpAAIAACGIhpAAIjPAAQA2A+AdBMQATA1AABCQgwAAgbgZg");
	this.shape_1760.setTransform(7988.675,4909.475);

	this.shape_1761 = new cjs.Shape();
	this.shape_1761.graphics.f("#F29942").s().p("EA77AF+IWrAAIBoAAQmFCgmFAAQmEAAmFiggEhUOgIRIBnAAIBoAAUAgCgAYAXEAAYIAwAAQukCjuxAAQuxAAu/ijg");
	this.shape_1761.setTransform(7859.2,5254.875);

	this.shape_1762 = new cjs.Shape();
	this.shape_1762.graphics.f("#F59744").s().p("AhrBCQhogDhmiAQQ7CDsSAAIhbAAg");
	this.shape_1762.setTransform(8336.5502,5156.6442);

	this.shape_1763 = new cjs.Shape();
	this.shape_1763.graphics.f("#5A8234").s().p("AoChMIAAiAQF2EeIuiPQA0gPAwAAQAABCgWAKQnsDNj8AAQkpAAAfkZg");
	this.shape_1763.setTransform(8325.5354,5118.5672);

	this.shape_1764 = new cjs.Shape();
	this.shape_1764.graphics.f("#C8A453").s().p("AhoCBIhmAAIhoAAIAAiAQEtgaDfhYQAsgTA1AAQAABEgdAzQhJCSjlAAQgoAAgsgEg");
	this.shape_1764.setTransform(8460.5,5137.1399);

	this.shape_1765 = new cjs.Shape();
	this.shape_1765.graphics.f("#618337").s().p("ADPEEQhRlnmBgTIAAiBQIOh8g6IDIAzAAIAACAQgzAAgCgMg");
	this.shape_1765.setTransform(8403.375,5122.8478);

	this.shape_1766 = new cjs.Shape();
	this.shape_1766.graphics.f("#A9B273").s().p("AIHDDQAAhAgHAAQr0g6njkLQLYAMJvBuQAwAHA4AAIAACCIhoAAIAACCIhpAAg");
	this.shape_1766.setTransform(8035.375,5078.6);

	this.shape_1767 = new cjs.Shape();
	this.shape_1767.graphics.f("#E1A958").s().p("AGeBAIs6AAQg2AAgTgXQgggoAAhBQIHAAH9BCQAHAAAAA+IhoAAg");
	this.shape_1767.setTransform(8139.05,5117.35);

	this.shape_1768 = new cjs.Shape();
	this.shape_1768.graphics.f("#F59844").s().p("EBIHAJKQt8qSuzIRQhmA9BMlDQQrAiH/oPQAagYA2gBQjqFqIhIjgEhJvgFDQLyBAHQjzQAegPAAhEIM6AAIBpAAIAACGQAPDOEIiHICBhFQkfF5qEhSQkvgnjBCZQkxDzj4AAQltAAjyoOg");
	this.shape_1768.setTransform(8444.95,5182.4);

	this.shape_1769 = new cjs.Shape();
	this.shape_1769.graphics.f("#39823C").s().p("AHTBAIwLAAIAAiAIBpAAIM5AAIBpAAQA1AAARAZQAgAoAAA/IhmAAg");
	this.shape_1769.setTransform(8154.625,5091.6);

	this.shape_1770 = new cjs.Shape();
	this.shape_1770.graphics.f("#1A8242").s().p("AFpCCIs6AAIAAiCIAAiBIBmAAQD/DcI9gYIAAA/IhoAAg");
	this.shape_1770.setTransform(8154.75,5072.15);

	this.shape_1771 = new cjs.Shape();
	this.shape_1771.graphics.f("#738A38").s().p("AEDA+QAAg+gIAAQn6hCoJAAIhpAAIAAiBIBpAAIBpAAIQKAAIBmAAQAPDTEuhGQAugMA1AAQAABCgKABQlxA9jzCGIAAiGg");
	this.shape_1771.setTransform(8164.95,5117.625);

	this.shape_1772 = new cjs.Shape();
	this.shape_1772.graphics.f("#EE9B47").s().p("ECcTARFQAAg/gHAAQmUhCmgAAQg1AAgzgCQyehJyzg2QAAg/gDAAQ2phE2uAAIhkAAIrXAAIAACDIhoAAQltgClqACIhmAAQlrgClqACIAACBIhpAAIhmAAI9KAAIhpAAIx2AAIhnAAImdAAQAAg/gHAAQoyhCo+AAQAAg/gfgsQgRgYg2AAQNKlyrkmXQgwAAgsAWQv9IC1ciUQA7DYFjgWIAABCIhpAAQuNARrtiUQAAg/gggnQgTgbg2AAQAAhEAKAAQTkiy6NgOQgeDHDvgHIAABEIhpAAQlqgClqACIhnAAQAAhEgHAAQqag/qiAAQg1AAgzgFQrXg9rXg/IAAiAQA1AAARgYQAigqAAhEILXAAIBnAAQGfAAGWg9QAIgCAAhCILXAAIBmAAIIIAAIBpAAQd8FGdJlGIgxAAUgXEgAYggCAAYIAAiBIE1AAIBpAAQJuAAJng/QAIAAAAhBIR0AAIBmAAQKigDKfg9QACgEAAhAIBpAAQGfAAGUg8QAMgFAAhAQRTh+PKj6QAugPA1AAIBpAAQAABCAgAnQATAYA2AAQAABEgeAPQnQDzryhAQGWN1LypaQDAiaEwAnQKDBTEfl5IiBBEQkJCIgOjOQDziGFxg9QAKgCAAhCIBpAAIBoAAQg4ILQsnAQAWgJAAhCQGCATBRFoQACAMAzAAIBpAAIBmAAQI+KbIIk8QG6kMBiLLQAnEsErg8QFniZCNnyQASg9AAhBQDMgDDRADIBmAAQJxgbF+kVQAfgWAAg/IAAiGIBpAAIBoAAQECDpHQAZQA4AEAxAAQA2BABBArQAnAWAzAAQAKDUETiGQAagOAAhAIA2AAQhrHJlqA9QHOCjJYhEQFhgpmBDtQhVAxEfAkQBuAKDTAFQJPs62CiUQgHAAAAhAIBoAAIBmAAQE6CmH3hhQAMgFAAhAIBmAAIBpAAQEVHWUChMQAzgFAwAAQAFDDAADFQgFA/AABBIhoAAIkzAAQh5HYGxhMQAzgHAwAAQAFFIgFFBIAACGQgwAAgzACQjnARjUAAQp+AAneiZgEAkcAI/IhpAAI2rAAQMKFBMKlBgEgiyAJ+QarAA6rg/gEguMAI/IAAA/QIkhiiIAAQhSAAlKAjgEB8PAIAQU+CD1UlIQAFDCARADgEBIEAF9QVqAA1qhCgEiIrgAFQPWEKvjlOQAAA/ANAFgEB1eAA3QohoiDqlrQg2AAgaAZQn/IPwrgiQhMFEBmg9QOyoSN9KSIBoAAIAAAAgEAyzgCZQIQhfuhhYQBhDxEwg6gAZHrSQOoAHx2iLQBmCBBoADg");
	this.shape_1772.setTransform(8165.075,5235.525);

	this.shape_1773 = new cjs.Shape();
	this.shape_1773.graphics.f("#EBD292").s().p("AGgB+QltAAlpAFIhpAAIhoAAIAAiEQIHBbDljEQAcgYA2AAIBpAAQAxBBAcBIQAbA4AABEQg3AAgxgFg");
	this.shape_1773.setTransform(8056.15,5020.225);

	this.shape_1774 = new cjs.Shape();
	this.shape_1774.graphics.f("#85A968").s().p("Amfg9QFqgFFsAAQAxAFA4AAQAAA/gNAAQmTBBmfAAIAAiAg");
	this.shape_1774.setTransform(8066.625,5039.55);

	this.shape_1775 = new cjs.Shape();
	this.shape_1775.graphics.f("#517D3D").s().p("AKPE+QpuhtrZgMIhmAAIhkAAIAAiBILSAAIBpAAQGfAAGThCQANAAAAg+QAAhEgbg4QgdhJgxhCQE/gYhiGhQgOA9AABCIhmAAIAACAQg4AAgxgHg");
	this.shape_1775.setTransform(8032.2426,5039.4823);

	this.shape_1776 = new cjs.Shape();
	this.shape_1776.graphics.f("#A1BA7B").s().p("AjthPQAxg/AdhLQAWg7AAg/QA1AAAPAZQF/KOhfAAQhLAAl9mjg");
	this.shape_1776.setTransform(8163.0903,4963.0204);

	this.shape_1777 = new cjs.Shape();
	this.shape_1777.graphics.f("#3A8640").s().p("AAgErQiZjMi9idQDuBDgZjGQgHhCAAhAIDQAAIBmAAIBpAAIAACCQAAA+gYANQiBA4ieAAQA1B/AgCGQATA9AABAQg1AAgTgZg");
	this.shape_1777.setTransform(8056.15,4948.5);

	this.shape_1778 = new cjs.Shape();
	this.shape_1778.graphics.f("#DEC98A").s().p("ACOEuQiIjWk7gWIAAiAQEtBNAIjOQABhCAAhEQCcCGB8CZQAdAmAABCQAAA/gWA6QgdBMgxA/Qg1AAgPgYg");
	this.shape_1778.setTransform(8118.25,4922.475);

	this.shape_1779 = new cjs.Shape();
	this.shape_1779.graphics.f("#01853F").s().p("Ai9CeIAAiBIAAkDIDQAAIBkAAQAAA/AWA6QB+FUjIAAQhcAAikhJg");
	this.shape_1779.setTransform(8137.3679,4861.2074);

	this.shape_1780 = new cjs.Shape();
	this.shape_1780.graphics.f("#0F8134").s().p("AjPhkQA2g/BBgnQAngbAyAAQBmBCBJBcQAgAnAABBQgzAAgPAWQhmCvhNAAQhsAAg+lKg");
	this.shape_1780.setTransform(8201.175,4899.9873);

	this.shape_1781 = new cjs.Shape();
	this.shape_1781.graphics.f("#D6CC8B").s().p("AjdhBQEjA3hGlBQgOg8AAhCQCzBEgbFEIA4AAQAAA/AHBAQA2GMhXAAQhlAAkgoLg");
	this.shape_1781.setTransform(8254.6345,4909.9315);

	this.shape_1782 = new cjs.Shape();
	this.shape_1782.graphics.f("#428745").s().p("AgJEGQAalCizhEIAAiBQHSgxjKIlQgIATgwAAg");
	this.shape_1782.setTransform(8269.3996,4877.0783);

	this.shape_1783 = new cjs.Shape();
	this.shape_1783.graphics.f("#027236").s().p("ADsFtQkZkwkJk+QA1AAARgbQAggmAAhCQEqGcA/mUQAFgIAwAAQhLHICXDWQAdAsAAA/QgzAAgYgYg");
	this.shape_1783.setTransform(8398.275,4760.05);

	this.shape_1784 = new cjs.Shape();
	this.shape_1784.graphics.f("#00692C").s().p("AiNikQgegxAAhCIAAiDQFtM1gYAAQgUAAkjo/g");
	this.shape_1784.setTransform(8363.3645,4788.2779);

	this.shape_1785 = new cjs.Shape();
	this.shape_1785.graphics.f("#2A7D37").s().p("AgIJyQhEgpgzhEQAzAAAAgIQByqxilnVQFiFKiKNJQgNA/AABBQgwAAgkgYg");
	this.shape_1785.setTransform(8338.5685,4604.325);

	this.shape_1786 = new cjs.Shape();
	this.shape_1786.graphics.f("#186025").s().p("ADIG5QhEjRi1DgQAAhCgggrQjbk6g8noQAxBCBDArQAlAUA1AAQA0BEBEAqQAjAXAxAAQBSELDGCjQAfAZAAA+QAABCgfAnQgSAbg1AAQgzAAgIgPg");
	this.shape_1786.setTransform(8341.25,4688.7);

	this.shape_1787 = new cjs.Shape();
	this.shape_1787.graphics.f("#97AE6E").s().p("AEUKzQivh4gxj4QAAg/gYg6QhbjtjDifQAAhBgWg4QgfhLgxhCQAxg/AfhMQAWg1AAhCIBpAAQAzBCAbBGQAbA7AAA/QA7HoDbE5QAfAsAABCQAAA/AeAnQAWAbAwAAIAACDQgwAAglgYg");
	this.shape_1787.setTransform(8310.1,4688.825);

	this.shape_1788 = new cjs.Shape();
	this.shape_1788.graphics.f("#307C39").s().p("AD6GzQjpn2lHmDQCeACCYgCIBpAAQAABFgjAmQgRAYg1ABQA1BBBCAnQAnAZAxAAQAzEAArEJQAKA9AABCQg1AAgIgUg");
	this.shape_1788.setTransform(8221.975,4792.65);

	this.shape_1789 = new cjs.Shape();
	this.shape_1789.graphics.f("#268C4B").s().p("AiMBqQhCgng1hCQA1AAARgXQAjgnAAhEIBmAAIBnAAIBpAAQAABEAfAnQARAXA4AAQAABBgaAKQiBA2idAAQgxAAgngYg");
	this.shape_1789.setTransform(8247.975,4760.2);

	this.shape_1790 = new cjs.Shape();
	this.shape_1790.graphics.f("#BDB676").s().p("Ao4gFQJ8EGComQQAWg7AAg/QDCChBfDvQAWA2AABCIhoAAIhnAAIhoAAQiaACicgCQg0AAgwAEQg1AHgvAAQkpAAgTkPg");
	this.shape_1790.setTransform(8196.2,4721.7307);

	this.shape_1791 = new cjs.Shape();
	this.shape_1791.graphics.f("#1B803A").s().p("AhJErQiIiohkjEQEpAPA7kHQAFgJA2AAQAzA/BEAsQAiAWAzAAIAACAIhkAAIjRAAIAAEEIAACAQg0AAgWgYg");
	this.shape_1791.setTransform(8118.25,4844.675);

	this.shape_1792 = new cjs.Shape();
	this.shape_1792.graphics.f("#C1BD7D").s().p("ABICtQjHiehQkPQEtgbBXCqQAbAxAABDQAABCgWA1QggBMgwA/QAAg/gigZg");
	this.shape_1792.setTransform(8263.425,4617.0213);

	this.shape_1793 = new cjs.Shape();
	this.shape_1793.graphics.f("#2B7B34").s().p("AibGFQAAhCgVg1QhfjxjDifIAAiBIAAiBQFcC2A8HSQAIA/AABCIhpAAgAFtCBIhpAAQg2AAAAgKQgzj5AAkCQDDCeBcDtQAZA7AAA/IhmAAg");
	this.shape_1793.setTransform(8268.65,4708.275);

	this.shape_1794 = new cjs.Shape();
	this.shape_1794.graphics.f("#327A36").s().p("ADaFzQmajih4oWIBpAAQA2CGBSBmQAWAaAxAAQBPEQDHCeQAiAYABA/Qg5AAgmgTg");
	this.shape_1794.setTransform(8242.75,4604.075);

	this.shape_1795 = new cjs.Shape();
	this.shape_1795.graphics.f("#0F8035").s().p("ANfU8QgggnAAhEQAAhCgHg/Qg9nTlci3QgzAAgJgVQkCoRmYllQAAhDgdgVQhGgvhpAAQAAg+gfgnQivjcjSjEIAAhCQjwAIAijIIBmAAIBoAAQE4BJDfCeQAiAbAzAAQFxCUC+FcQAOAVAxAAQB3IYGbDgQAnAUA4AAQAwBCAgBLQAWA4AABBQAAECAzD7QAAAJA1AAQAABDgfAmQhJBahmBCIAACDQg4AAgRgYg");
	this.shape_1795.setTransform(8180.4144,4623.9);

	this.shape_1796 = new cjs.Shape();
	this.shape_1796.graphics.f("#58AA22").s().p("ADhCqQjfiek3hIIAAiGQHSgYCDEoQAWA1AABCQgzAAgigbg");
	this.shape_1796.setTransform(8118.25,4493.5851);

	this.shape_1797 = new cjs.Shape();
	this.shape_1797.graphics.f("#7DAC70").s().p("AhfkjIBoAAIBoAAQADDDgDC/IAACGIAAA/QklhEBVoDg");
	this.shape_1797.setTransform(8386.9093,4555.575);

	this.shape_1798 = new cjs.Shape();
	this.shape_1798.graphics.f("#3A8F21").s().p("ABkF0QiWl0hpmGQENCWAnF2QADA/AABBIAACBQgxAAgHgTg");
	this.shape_1798.setTransform(8361.775,4461.25);

	this.shape_1799 = new cjs.Shape();
	this.shape_1799.graphics.f("#559F13").s().p("AAAFGIhoAAIAAiEIAAiAIAAiAQCzgIgVj/IAyAAIAAIHIAACEIhoAAg");
	this.shape_1799.setTransform(8387.8,4493.825);

	this.shape_1800 = new cjs.Shape();
	this.shape_1800.graphics.f("#B7B476").s().p("AARI0QhDgsgxhBQAAg/gbg7QgahGg0hCQInhfk+o7QgbgwAAhCIBpAAQClHVhyKyQAAAIgzAAQg2gBgkgTg");
	this.shape_1800.setTransform(8315.1161,4597.65);

	this.shape_1801 = new cjs.Shape();
	this.shape_1801.graphics.f("#6AAD06").s().p("AFwGGImfAAQAAg/gKgFQoghhCKpmQJFJSD8iUQCrhghEGtIhpAAg");
	this.shape_1801.setTransform(8257.8901,4500.275);

	this.shape_1802 = new cjs.Shape();
	this.shape_1802.graphics.f("#F0CB88").s().p("ABUGGQAAhEgbgxQhWiqkuAbQgwAAgWgbQhThmg2iFQE9ilH9gbQAFAAAAhBIBmAAQAABBAbAxQE+I6ooBfIhoAAg");
	this.shape_1802.setTransform(8275.8017,4578.325);

	this.shape_1803 = new cjs.Shape();
	this.shape_1803.graphics.f("#C0BF53").s().p("AnTCBIAAiBQDbgBByhnQAdgYA2AAIGeAAIBpAAQAABCgFAAQn9Abk9CkIhoAAg");
	this.shape_1803.setTransform(8258.325,4552.175);

	this.shape_1804 = new cjs.Shape();
	this.shape_1804.graphics.f("#ECCE82").s().p("AnRgLQA1AAAUgYQAfgnAAhCIDPAAIBoAAQDOgCDRAAQAxACA4AAIAACBQAABBgPACQkrA9k2AAQgxAAgzAMQg4AOgpAAQiJAAAXiag");
	this.shape_1804.setTransform(8227.044,4397.5074);

	this.shape_1805 = new cjs.Shape();
	this.shape_1805.graphics.f("#91B13F").s().p("AlrgQQE4AAEqg9QAOgCAAhCQAxBCAgBLQAWA0AABAQg2AAgxAMQh9AWhoAAQkXAAh0iig");
	this.shape_1805.setTransform(8247.85,4410.9121);

	this.shape_1806 = new cjs.Shape();
	this.shape_1806.graphics.f("#087F39").s().p("ACZZyQAAg/gfgZQjEijhTkLQAAhCAMg/QCLtJljlKIhpAAQAAg/gChCQgPllhVkmIAAiBIAAoJQAxg/AdhLQAYg7AAg/IBpAAQAAA/AdAqQAWAbA1AAQAACAAsBwQAHARAxAAIAACBQBpGICVF0QAIATAwAAIAACBIAACDQhVIDEmBEIAAg/QCvgIg6kAQgPg9AAhCQA4AAARAYQAgAqAAA/IAAYYIAACBQgxAAgFAHQgfDKhZAAQhbAAiXjRg");
	this.shape_1806.setTransform(8362.025,4556.1571);

	this.shape_1807 = new cjs.Shape();
	this.shape_1807.graphics.f("#1A8126").s().p("AhBKIQADjAgDjDIAAiDIAAoHIAAiBIAAkHIBlAAIAAQSIAACBQAABCAPA9QA6EBiuAIIAAiGg");
	this.shape_1807.setTransform(8404.8219,4500.275);

	this.shape_1808 = new cjs.Shape();
	this.shape_1808.graphics.f("#74A725").s().p("AgBEHQgnl2kOiXIAAiBIDRAAIBlAAIDRAAIBmAAIAACBIhmAAIAAEGIAACBIgzAAQAWD/i0AHQAAhBgBg/g");
	this.shape_1808.setTransform(8377.325,4448.35);

	this.shape_1809 = new cjs.Shape();
	this.shape_1809.graphics.f("#EEC98A").s().p("AAlCDIjRAAQgwAAgHgRQgshwAAh/QMJgilNDSQgiARAAA/IhmAAg");
	this.shape_1809.setTransform(8363.4905,4396.0896);

	this.shape_1810 = new cjs.Shape();
	this.shape_1810.graphics.f("#E0D17E").s().p("AE3DOIjRAAQAAg/AigRQFNjSsJAiQg1AAgWgbQgdgqAAg/IDMAAIBpAAQGZhVBYDgQATA5AAA/IAACBIhmAAg");
	this.shape_1810.setTransform(8367.125,4388.579);

	this.shape_1811 = new cjs.Shape();
	this.shape_1811.graphics.f("#619816").s().p("AjQCBIjMAAIhpAAIAAiBIAAiAIOiAAIBpAAIAACAIhpAAIoEAAIAACBIhpAAg");
	this.shape_1811.setTransform(8367.125,4357.425);

	this.shape_1812 = new cjs.Shape();
	this.shape_1812.graphics.f("#9EAB4D").s().p("ACsBJQhYjfmZBVIAAiBIIEAAIBpAAQAABAAPA8QA8EGi0ACQAAg/gTg6g");
	this.shape_1812.setTransform(8389.311,4376.85);

	this.shape_1813 = new cjs.Shape();
	this.shape_1813.graphics.f("#EBCD8D").s().p("AEDCKIhoAAIAAhBQmbAVhojXQHqhEDHDhQAgAlAABBIhmAAg");
	this.shape_1813.setTransform(7968,4720.4899);

	this.shape_1814 = new cjs.Shape();
	this.shape_1814.graphics.f("#E5CC8D").s().p("AEWC4QkWjZlqiSQJkh3BhF/QAQA8AABAQg1AAgggZg");
	this.shape_1814.setTransform(8040.45,4752.3423);

	this.shape_1815 = new cjs.Shape();
	this.shape_1815.graphics.f("#3E8743").s().p("AGfIHQmvjMi9m8Qg0AAgugRQk/h/jRj1IBpAAIBoAAIBpAAIBmAAQFqCSEXDaQAfAZA2AAQDNC1EjCGQAYAKAABBQg1AAgFAKQg5D4kOAAIgfAAg");
	this.shape_1815.setTransform(8045.7,4786.238);

	this.shape_1816 = new cjs.Shape();
	this.shape_1816.graphics.f("#A3B437").s().p("AnRAEQE4ilICAgQA2AFAzAAQAAA/gIAAQoRA9mKCHIAAiDg");
	this.shape_1816.setTransform(7936.875,4603.8408);

	this.shape_1817 = new cjs.Shape();
	this.shape_1817.graphics.f("#C6C25F").s().p("AoFADQDRAAC+g8QARgFAAhEQCdAFCZAAQAzgFA2AAQBoAABHAuQAdAWAABBQgzAAgxAHQm8BTnrAmIAAiAg");
	this.shape_1817.setTransform(8097.475,4578.175);

	this.shape_1818 = new cjs.Shape();
	this.shape_1818.graphics.f("#86A920").s().p("AhlCDIk6AAIAAiAIAAiFILWAAIBpAAQAABEgRAFQi+A8jRAAIAACAIhlAAg");
	this.shape_1818.setTransform(8045.675,4578.175);

	this.shape_1819 = new cjs.Shape();
	this.shape_1819.graphics.f("#A4B934").s().p("AmfAIQDqi/HsA4QAxAHA4AAQAABCgFAAQoAAfk6CkIAAiFg");
	this.shape_1819.setTransform(7693.375,4655.2427);

	this.shape_1820 = new cjs.Shape();
	this.shape_1820.graphics.f("#DECF6C").s().p("AlrAAQCeAACBg0QAZgKAAhCIE2AAIBpAAQAABCgYAKQk1CVmKAgIAAiBg");
	this.shape_1820.setTransform(7843.5,4630.225);

	this.shape_1821 = new cjs.Shape();
	this.shape_1821.graphics.f("#F7C786").s().p("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");
	this.shape_1821.setTransform(4665.6,4890.1398);

	this.shape_1822 = new cjs.Shape();
	this.shape_1822.graphics.f("#98BB27").s().p("AgBDMImcAAIAAiBIAAkDQHshCD7CtQAkAYAxAAQAABBgZAKQiBA1ieAAIAACBIhoAAg");
	this.shape_1822.setTransform(7796.85,4622.7487);

	this.shape_1823 = new cjs.Shape();
	this.shape_1823.graphics.f("#419610").s().p("AEDCDIhmAAQg2AAgygFQk8gRhkjvQE4BBE2A4QAzAHA2AAIAACFIhpAAg");
	this.shape_1823.setTransform(8050.9,4474.375);

	this.shape_1824 = new cjs.Shape();
	this.shape_1824.graphics.f("#69AF08").s().p("AjLCjQA1AAASgYQAigqAAhEIAAiAQA1g/A+gsQAlgWA1AAQAzAAADAPQB+G6j2AAQheAAiWhCg");
	this.shape_1824.setTransform(8045.4181,4419.157);

	this.shape_1825 = new cjs.Shape();
	this.shape_1825.graphics.f("#6EAE12").s().p("ALKP5Qi+lclyiUQAAhCgVg1QiEkpnSAYQg1AAgzgHQk3g4k4hBQBkDwE8ARQAzAFA2AAQgiDIDwgIIAABCQg1AAgzgFQuNhhlQqjQEYiZG/ATIBpAAQAABEgiAqQgSAYg1AAQIcDsivplQgDgPgzAAIAAiAQAzhFAghGQAWg6AAhAQLKgOG1D6QAnAZAzAAQAABBgfAnQgUAYg1AAQgdDKDwg9QAzgMAxAAQCeDgHThTQAwgMA2AAQBmCUA2DqQAAAJA1AAQBVEmAPFlQACBCAAA/IhmAAQBEmuiqBhQj9CUpFpTQiLJnIhBhQAKAFAAA/Qg2AAgdAYQhyBnjbACIAACBQgxAAgOgWg");
	this.shape_1825.setTransform(8133.825,4461.1853);

	this.shape_1826 = new cjs.Shape();
	this.shape_1826.graphics.f("#6BAE06").s().p("AI6DDIjPAAQgzAAgngZQm0j6rLAPIAAiBIYQAAIBpAAQA2ABAHAQQCBEtkng9IAACEIhoAAg");
	this.shape_1826.setTransform(8154.5147,4364);

	this.shape_1827 = new cjs.Shape();
	this.shape_1827.graphics.f("#F3F5DD").s().p("AkKEsQAAg/gegRQiZhigYjSQA1hCAehLQATg2AAhEILZAAIBmAAQAABEAHA9QA/I+nUAAQiMAAi8g0g");
	this.shape_1827.setTransform(7999.7327,4366.3101);

	this.shape_1828 = new cjs.Shape();
	this.shape_1828.graphics.f("#EEF6E2").s().p("AhlHCQAAhAgZg6QhLjAjUhJIAAiCIAAiBIBqAAQHTBTBflLQAFgPAxAAQAABEgUA2QgdBLg2BCQAZDSCZBiQAdARAAA/QAABCgdAuQhdCckAAAQg+AAhKgKg");
	this.shape_1828.setTransform(7931.65,4377.109);

	this.shape_1829 = new cjs.Shape();
	this.shape_1829.graphics.f("#86A823").s().p("AjSCBQgBg/gTgMQiBg2ieAAIAAiAIOjAAIBoAAIAACAQgzAAguAUQjxBtlnAAIgfAAg");
	this.shape_1829.setTransform(7983.7,4305.3855);

	this.shape_1830 = new cjs.Shape();
	this.shape_1830.graphics.f("#E1EAC3").s().p("Ak0D8IAAiBQEhA4hJlAQgJg9AAhBIBnAAQCeAACBA1QAUAMAAA/IAACBQgxAAgFAOQhMEIk6AAQhPAAhegQg");
	this.shape_1830.setTransform(7931.675,4332.232);

	this.shape_1831 = new cjs.Shape();
	this.shape_1831.graphics.f("#77AC29").s().p("AioF8Qgzj6AAkGQBEjWDygkQAzgHA2AAQAABBAJA9QBJFAkgg4IAACBIhpAAIAACBIAACDQg1AAAAgKg");
	this.shape_1831.setTransform(7901.861,4344.425);

	this.shape_1832 = new cjs.Shape();
	this.shape_1832.graphics.f("#86BD18").s().p("AlBAUQUGjp0GEog");
	this.shape_1832.setTransform(7922.4625,3939.6564);

	this.shape_1833 = new cjs.Shape();
	this.shape_1833.graphics.f("#72A125").s().p("AHQBDIuiAAQg1AAgRgbQgggnAAhDIM6AAIBoAAIBmAAIBpAAIAACFIhpAAg");
	this.shape_1833.setTransform(8362.025,4337.85);

	this.shape_1834 = new cjs.Shape();
	this.shape_1834.graphics.f("#FCCB8F").s().p("AAvDCQjygxAglJQF/hig9FnQgJA/AABCQgzAAg0gMg");
	this.shape_1834.setTransform(8424.8619,4245.8861);

	this.shape_1835 = new cjs.Shape();
	this.shape_1835.graphics.f("#1F8331").s().p("AAzKAQg0jphniUQAAg/gVg2QgghLgxhCIAAh/IAAiEQGzESjPogQgWg1AAhFIBpAAQAABFAfAnQARAaA2AAIAACBIAACBQAAA/gZA7QgdBLgwA+IAAIIIAACBQg2ABAAgLg");
	this.shape_1835.setTransform(8294.675,4396.2);

	this.shape_1836 = new cjs.Shape();
	this.shape_1836.graphics.f("#E4D27E").s().p("AGdBBIs5AAIhpAAIAAiBQIIAAH7BCQAIAAAAA/IhpAAg");
	this.shape_1836.setTransform(8346.45,4324.7);

	this.shape_1837 = new cjs.Shape();
	this.shape_1837.graphics.f("#EFC986").s().p("ALTIHIhmAAQAAg/gIAAQn8hCoHAAQg2AAgVgYQkMk+kXkwIIGAAIBoAAQHSgOFQioQAYgOAAhCIBoAAIBpAAIBmAAQggFLDzAwQA0ANAzAAQAAA/gNBAQg1EpiQDdIhoAAg");
	this.shape_1837.setTransform(8336.15,4279.25);

	this.shape_1838 = new cjs.Shape();
	this.shape_1838.graphics.f("#E0CE6F").s().p("AmcgCQDMAAC9g3QAVgIAAhBIE1AAIBmAAQAABBgYAPQlQCnnRAOIAAiFg");
	this.shape_1838.setTransform(8336,4240.475);

	this.shape_1839 = new cjs.Shape();
	this.shape_1839.graphics.f("#BDC06F").s().p("AByDEQA9lnl/BhIhmAAIAAiBQDOAAC9g9QAUgCAAhCQBmAABLAvQAdATAAA/QAABCgJA/QgqD3ibCQQAAhCAJg/g");
	this.shape_1839.setTransform(8429.375,4234.025);

	this.shape_1840 = new cjs.Shape();
	this.shape_1840.graphics.f("#74A018").s().p("AgCDFIhoAAIhmAAIk1AAIAAiBQFsArB6i8QAegzgBg/QEtgbCKCBQAeAdAzAAQAABAgUADQi+A9jOAAIAACBIhoAAg");
	this.shape_1840.setTransform(8388.05,4207.6663);

	this.shape_1841 = new cjs.Shape();
	this.shape_1841.graphics.f("#769E2E").s().p("A4QF5QFxAwB1jCQAdguAAhCQMxDghTrqQgHg9AAhEIbiAAIBpAAIAACGIhpAAI4RAAIAACBQAAA/gWA6QgfBHgzBEIAACAQg2AAgkAWQg/Asg2A/IAACBIhoAAQnAgUkYCZQgzAAgwAKQg2ANgoAAQiMAAAZicg");
	this.shape_1841.setTransform(8076.7676,4384.4482);

	this.shape_1842 = new cjs.Shape();
	this.shape_1842.graphics.f("#71AB27").s().p("ACcEDQjQAAjPACIAAiDQElA9iAktQgHgRg1AAIAAiGIBmAAQCdCQBfDjQAEAUA4AAIAACDQg4AAgwgCg");
	this.shape_1842.setTransform(8247.975,4357.3);

	this.shape_1843 = new cjs.Shape();
	this.shape_1843.graphics.f("#E5CF7D").s().p("AUTDBIhqAAI7hAAIhmAAIraAAIAAiBQF+AFD7hxQAtgTA0AAIDOAAIBpAAQMGFCLyl4QAYgKAAhBQBpCBBLCOQAbAzABA/IhmAAg");
	this.shape_1843.setTransform(8102.6,4311.825);

	this.shape_1844 = new cjs.Shape();
	this.shape_1844.graphics.f("#1E7F30").s().p("AFAKdQg4AAgEgUQhfjkieiQQAAg/gagzQhLiPhpiAQAAhEgggnQhJhahmg/QAAhCgignQgRgYg1AAQAAhCgWg4QgdhLg2hCQEVBCCoCnQAYAeA0AAQEWEwEME9QAVAYA2AAIAACBQAABEAWA2QCJFqiSAAQhKAAiShcg");
	this.shape_1844.setTransform(8241.9596,4303.4363);

	this.shape_1845 = new cjs.Shape();
	this.shape_1845.graphics.f("#81AD1E").s().p("ABpEEIoEAAQAAhBgbgPQjWhtAflKQJXBoIfCQQAzAKA2AAQAABAgWAIQi+A3jMAAIAACGIhpAAg");
	this.shape_1845.setTransform(8273.6729,4227.575);

	this.shape_1846 = new cjs.Shape();
	this.shape_1846.graphics.f("#86AB29").s().p("AlpAAQDbhoEngVQA2gDAzAAQA1AAARAYQAiAnAABBQgzAAgzAHQk4A4k1BCIAAiBg");
	this.shape_1846.setTransform(8165.075,4266.475);

	this.shape_1847 = new cjs.Shape();
	this.shape_1847.graphics.f("#9CB238").s().p("AicCCIjPAAIAAiBQD0iHF6AFIBoAAQAAA/gTAHQi+A7jNABIAACBIhpAAg");
	this.shape_1847.setTransform(8071.85,4292.3678);

	this.shape_1848 = new cjs.Shape();
	this.shape_1848.graphics.f("#ECC980").s().p("AsIB4IAAiAQDPgDC+g6QATgHAAhAIBmAAIBpAAQE0hBE5g4QAzgHAzAAQBmA/BJBaQAgAnAABEQAABAgYAKQmWDLmbAAQliAAlmiVg");
	this.shape_1848.setTransform(8144.275,4293.4074);

	this.shape_1849 = new cjs.Shape();
	this.shape_1849.graphics.f("#82BE18").s().p("AkBC3QivgCBGj/QPsj1lcEfQggAYAAA+Qg4AAgaAbQhzBkjZAHQg0AAg1gFg");
	this.shape_1849.setTransform(8247.7898,3857.9158);

	this.shape_1850 = new cjs.Shape();
	this.shape_1850.graphics.f("#BCB681").s().p("AAZHyQjBhuBLmDIAAh/QAFjDgFjFIBoAAQhLIHCYETQAbAzAAA/IAACBQgzAAgngVg");
	this.shape_1850.setTransform(8967.3944,4825.1);

	this.shape_1851 = new cjs.Shape();
	this.shape_1851.graphics.f("#06652C").s().p("AxASrQGTnfFooZQAPgbA1AAQE5Fhg4rdQAAgFgyAAIAAiEQAyhBAfhHQAWg6AAg/IAAiGQEnh1BEmHQAAgKA1AAQF+hagUNnIAxAAQhLGCDCBtQAnAVAzAAIAACBQrqDKnXHdQm6HEkjAAQiAAAhjhYg");
	this.shape_1851.setTransform(8869.975,4874.6667);

	this.shape_1852 = new cjs.Shape();
	this.shape_1852.graphics.f("#B6B580").s().p("AhnGGIAAiDIAAqIQCyBEgYFCIA1AAQAAA/gWA7QgfBGgzBCIAACDIhnAAg");
	this.shape_1852.setTransform(8864.85,4812.225);

	this.shape_1853 = new cjs.Shape();
	this.shape_1853.graphics.f("#155B23").s().p("AA0JJQATtml8BaIAAiBQC2gyBEjDQAHgPAxAAQCdAACGA4QAWAKAAA/QAABCgWA6QgdBGg2BCIAACDIAACAIhoAAQAEDGgEDCIAACBg");
	this.shape_1853.setTransform(8947.9,4766.75);

	this.shape_1854 = new cjs.Shape();
	this.shape_1854.graphics.f("#1F5F20").s().p("AAgC6QiFg4ieAAIAAiCQDRiBDahwQApgRAzAAIAACBIAACBQAAA+gfAqQhJBchmA/QAAg/gWgKg");
	this.shape_1854.setTransform(8973.525,4695.25);

	this.shape_1855 = new cjs.Shape();
	this.shape_1855.graphics.f("#62703D").s().p("AjtBzIAAiAIAAiGQOMkys6KgQgdAZg1AAIAAiBg");
	this.shape_1855.setTransform(9023.3677,4670.782);

	this.shape_1856 = new cjs.Shape();
	this.shape_1856.graphics.f("#9AAD3E").s().p("AllBxIAAiAQE3AAEtg9QAJgFAAg/QA2AAAHAUQCLENm/AAQiYAAjeggg");
	this.shape_1856.setTransform(8973.1284,4501.9569);

	this.shape_1857 = new cjs.Shape();
	this.shape_1857.graphics.f("#1D5D1F").s().p("AhXmmQCYCNArD6QAKBBAAA/IAACBIAACBIAABEQlAitBzqgg");
	this.shape_1857.setTransform(8769.8698,4763.475);

	this.shape_1858 = new cjs.Shape();
	this.shape_1858.graphics.f("#7F9D61").s().p("AgjIRQgahJg4hFIAAiAIAAiBQC3i/hDnLQgMhDAAg/IBoAAQAAA/AHBDQBHLLi2HIQAAhDgWg3g");
	this.shape_1858.setTransform(8793.5073,4760.2);

	this.shape_1859 = new cjs.Shape();
	this.shape_1859.graphics.f("#058440").s().p("EA7JAiYQgzAAgngWQhCgsg1g/QAAhCgegWQkcjOoBAfIhpAAIhoAAIAACGQg2AAgpARQjiBVkuAbIhoAAIxyAAQi3kQlSh4QgwAAgzAPQpJCNnEkcIAACAIhpAAIAACBQg2AAgrAUQjgBXktAbIg0AAQA7oDoQB8IAACAQgwAAg0APQovCQl2kfIAACAIhpAAIhoAAQg2AAguANQktBGgPjTQAAhAgggpQgRgYg1AAIAAg/Qo+AYj/jdQAAhCAOg9QBimik/AYIhpAAQAAhBgfgnQhJhdhmhBQAAhAgUg8QgfiGg2iAQCeAACBg4QAYgMAAg/QE9AWCIDVQAOAYA2AAQNaOvqyyaQgPgYg2AAQAAhCgdgnQh8iZibiGIAAiBQIDDni5nyQgWg6AAhAIAAiAQDqDdD9DOQAiAbAAA/QgzAAgnAbQhCAng1A/QBrI7DzmfQAOgWAzAAIBpAAQIcPTh1tSQgHhCAAg/QAwAAAIgTQDKomnTAxIAAiEQAAhBgKg9QgskJgzkCQCeAACBg1QAbgKAAhCIAAiDQBmhCBJhaQAfgmAAhCIBpAAIBmAAQAxD4CvB3QAkAYAxAAQAABCAdAxQKCTwqf3mQgxAAgWgbQgdgnAAg/QC3jgBEDSQAHAOAzAAQEJE/EaEwQAYAYA0AAQFlSID/tnQAKgaAAAJQBySbGRmYQFwxBCZTCQC6pFGUltQAfgdAAg/QDbgFByhkQAegdA1AAQCZAFCGA1QAWAKAABCQAAA/gZAzQjaGxirHrQBYI/KaoiQG7lqHOk8IBoAAQAABBgfAnQhJBahmA/IAACBQg2AAgOAbQloIYmUHfQFDEfJ9qLQHYncLrjKQGFAsj9D6QgiAgAABCQAAA/AHBCQAWFHjsA9IAACFQgzAAgnAWQg/Aqg4BBIAACBIAACGQgxAAgkATQhEAsg2BCQgHItHupKQAiglAAg/IAAiGQA1AAARgYQAggnAAhCQK+kfL1jaQAugPAzAAIAACBQAABBgdAnQgWAZg2AAIhoAAQgxAAgsAWQjWBvjRCBQAACBAsByQAHAUA2AAIBoAAIBnAAQAAA/ggAnQhLBahkBCIAACAQg2AAAAAIQhQJPq6hRIAACGQAAA/AIBCQARCTh9AAQgsAAg+gSg");
	this.shape_1859.setTransform(8600.425,4942.9704);

	this.shape_1860 = new cjs.Shape();
	this.shape_1860.graphics.f("#22642C").s().p("AB/JKQAAhCgVgKQiFg1iZgFIAAiBIAAsJQAzAAAVgbQAggpABg/IBnAAQhDLuDcGlg");
	this.shape_1860.setTransform(8717.15,4753.75);

	this.shape_1861 = new cjs.Shape();
	this.shape_1861.graphics.f("#D0C484").s().p("AAaEFQgrj6iZiMIAAiBIAAiDQC6DdBEjMQAIgRAwAAQAAA/AMBCQBEHKi4DAQAAg/gKhCg");
	this.shape_1861.setTransform(8778.1156,4734.175);

	this.shape_1862 = new cjs.Shape();
	this.shape_1862.graphics.f("#05632D").s().p("As8Q+QCqnrDbmxQAYgzAAg/IA2AAQjdmjBErwIAAiBQBjhBBzgvQArgRAxAAQAACBAuBwQAHARA0AAIAACDIAACBQhzKiFACtIAAhFQA4BFAbBHQAWA4AABCQE3gWDRs3IBmBCIAACDIAACBIAAKIIAACDQnOE8m5FrQlFEKi7AAQjFAAgtkog");
	this.shape_1862.setTransform(8771.475,4807.5409);

	this.shape_1863 = new cjs.Shape();
	this.shape_1863.graphics.f("#18551B").s().p("AhlJHIAAiAIAAwNIBnAAQAADzBLCdQAZA2AAA/IhkAAIAAGGIAACCIAACAIhnAAg");
	this.shape_1863.setTransform(8719.7,4636.8);

	this.shape_1864 = new cjs.Shape();
	this.shape_1864.graphics.f("#1E622D").s().p("AiYCDIAAmGIBkAAIBnAAQhID/CYA8QAWAKAABBQgxAAgrARQhyAvhjBBIAAiBg");
	this.shape_1864.setTransform(8735.25,4656.225);

	this.shape_1865 = new cjs.Shape();
	this.shape_1865.graphics.f("#215F29").s().p("AjGlFQgIhCAAg/QFAAWg/mdIA2AAQB+FxBGGgQAKA8AABCIhmhCQjRM4k2AWQC2nHhGrMg");
	this.shape_1865.setTransform(8823.275,4740.625);

	this.shape_1866 = new cjs.Shape();
	this.shape_1866.graphics.f("#E3C485").s().p("AgnHOQg0AAgHgRQguhwAAiBQAAhCgWgJQiZg9BJj/QDug8AVlGQAAgDAzAAQCyCEgUGCIAxAAIAAGHIAACBQgxAAgHARQghBig8AAQhBAAhghzg");
	this.shape_1866.setTransform(8765.0736,4648.971);

	this.shape_1867 = new cjs.Shape();
	this.shape_1867.graphics.f("#9DA268").s().p("AA3JIQATmDiwiEIAAh/IAAoIQCCEoBCFiQAJA9AABCIAAEEIAACBg");
	this.shape_1867.setTransform(8781.825,4584.75);

	this.shape_1868 = new cjs.Shape();
	this.shape_1868.graphics.f("#115D26").s().p("AhnIHIhoAAIAAiBIAAmHIAAiBIAAkEQDvETAXmRQgBgDAxAAQAzECAsEIQAKA9AAA/Ig1AAQA7GJkdAAIgggBg");
	this.shape_1868.setTransform(8812.95,4643.2806);

	this.shape_1869 = new cjs.Shape();
	this.shape_1869.graphics.f("#CFBD79").s().p("AAUF2QhElbhXkmQGJmFivOPQgKA9AABEQg1AAAAgKg");
	this.shape_1869.setTransform(8629.4911,4669.8594);

	this.shape_1870 = new cjs.Shape();
	this.shape_1870.graphics.f("#F3CD88").s().p("Ai6GGIAAiBQFbiShap5IA1AAQAAA/APA9QC2Mtn7BkIAAiBg");
	this.shape_1870.setTransform(8676.1503,4734.175);

	this.shape_1871 = new cjs.Shape();
	this.shape_1871.graphics.f("#0C612A").s().p("ABFEBQlPgWCBnvIBmAAQA1CFBSBpQAUAXA1AAIAACBIAACDQg1AAgzgEg");
	this.shape_1871.setTransform(8453.6087,4682.125);

	this.shape_1872 = new cjs.Shape();
	this.shape_1872.graphics.f("#077E3E").s().p("AmcmhIBmAAIBoAAQBaIWG/l6QAfgbAzAAQAABCgVA1QkPJLi+AAQjkAAhztDg");
	this.shape_1872.setTransform(8512.275,4750.0544);

	this.shape_1873 = new cjs.Shape();
	this.shape_1873.graphics.f("#23702B").s().p("AAgKzQhShpg2iGIAAiBQC2mEgbqJIA2AAIAAUUIAACBQg2AAgTgYg");
	this.shape_1873.setTransform(8460.5,4610.775);

	this.shape_1874 = new cjs.Shape();
	this.shape_1874.graphics.f("#2E8643").s().p("Ag1C6Qg2jthkiQIDPAAIBnAAQAABCAgAnQAWAYAzAAQAABDggAqQhJBXhnBCQgxAAgEgKg");
	this.shape_1874.setTransform(8574.4,4662.675);

	this.shape_1875 = new cjs.Shape();
	this.shape_1875.graphics.f("#04652C").s().p("AA+acQmQGYhyybQAAgKgKAaQj/NnllyIQAAg/gegsQiWjWBLnIIAAiBIAA4ZQCtF0B5GeQARA8AABAIAACAIhmAAQiBHxFQAVQAzAFA1AAQDUYAJQ0IQAWg1AAhCIAAiBQBphEBGhYQAggpAAg/QBohCBJhXQAggpAAhFIAAiAQBohABmAAIAABAQBYEmBEFcQAAAJA2AAQAVFnB8EMQAIAVA1AAIAACCIAACAIAACGQAAA/gfAdQmUFti7JFQiZzClwRCg");
	this.shape_1875.setTransform(8536.9278,4734.15);

	this.shape_1876 = new cjs.Shape();
	this.shape_1876.graphics.f("#3B8545").s().p("AhEDkQiVhrBJlFQC6jbBEDNQAIAOAzAAQAABEgMA9QgqD5iaCQQAAhEgdgWg");
	this.shape_1876.setTransform(8588.7721,4585.55);

	this.shape_1877 = new cjs.Shape();
	this.shape_1877.graphics.f("#0C7E38").s().p("AplP2IAAiDIAAiBIAAiBQA0hBAdhMQAYg3AAhCQD/mYCNn3QAPg9AAhBQA1AAAWgZQAcgnAAhBQB6jqCei4QAgglAAhEQGxC+jIHaQgYA1AAA/IAACBQgzAAgIgOQhEjMi7DaQhJFGCVBqQAdAWAABEIAACBIAACBIhpAAIjPAAQBkCPA2DvQAFAJAwAAQAABAgfApQhHBXhpBEIAACBQgyAAgfAbQi6Cdh8AAQivAAg1k5g");
	this.shape_1877.setTransform(8552.9963,4606.8328);

	this.shape_1878 = new cjs.Shape();
	this.shape_1878.graphics.f("#E7C582").s().p("AijHOQifmNBOqIQEBAADzA9QAPAFAABAQAABBgPA9QiNH2j+GZQAAg/gYg7g");
	this.shape_1878.setTransform(8516.0998,4584.75);

	this.shape_1879 = new cjs.Shape();
	this.shape_1879.graphics.f("#7BA55F").s().p("AAAONIhmAAIAAiDIAAiBIAAiBIAA0TIAAiBIBmAAQgDNJA1NIQAAAFA1AAIAACDIhnAAg");
	this.shape_1879.setTransform(8481.275,4617.325);

	this.shape_1880 = new cjs.Shape();
	this.shape_1880.graphics.f("#E6D291").s().p("Ag1NHQg1tIACtKIBoAAQhNKJCdGMQAZA6AAA/QAABCgZA4QgdBLgzBCIAACBIAACBQg1AAAAgFg");
	this.shape_1880.setTransform(8491.6194,4610.775);

	this.shape_1881 = new cjs.Shape();
	this.shape_1881.graphics.f("#B6C161").s().p("ADzA+Qjzg9kBAAIhoAAIAAiCIBoAAIIDAAIBoAAIAACCQAABCgdAnQgWAYg1AAQAAg/gPgFg");
	this.shape_1881.setTransform(8517.375,4526.275);

	this.shape_1882 = new cjs.Shape();
	this.shape_1882.graphics.f("#5FA20A").s().p("AiqB+IAAmBIDQAAIBmAAQAAA/APA/QBaFAmfBJIAAiGg");
	this.shape_1882.setTransform(8508.7004,4461.475);

	this.shape_1883 = new cjs.Shape();
	this.shape_1883.graphics.f("#1B8436").s().p("AgaGTQDHnamwi+IAAiAQA1hABCgrQAngWAzAAQBeB+DFA/QATAFAAA/IAACGIAACBIhpAAIAACAQAAA/gdA2QhLCPhlCBQAAg/AYg1g");
	this.shape_1883.setTransform(8610.775,4500.25);

	this.shape_1884 = new cjs.Shape();
	this.shape_1884.graphics.f("#4CA022").s().p("AkDFDIAAiAIAAiBQDFidBbjxQAWg6AAhAIBpAAIBoAAIAACBQgzAAgnAWQhBAsg2A/IAACBQAABDgfAlQidC4h6DqIAAiEg");
	this.shape_1884.setTransform(8579.625,4480.925);

	this.shape_1885 = new cjs.Shape();
	this.shape_1885.graphics.f("#5C9F03").s().p("AAyGFIoDAAIAAiBIAAiAQGghJhalBQgOg+AAhAIICAAIBpAAQAAA/gWA6QhdDxjFCeIAACAIAACBIhoAAg");
	this.shape_1885.setTransform(8538.175,4474.35);

	this.shape_1886 = new cjs.Shape();
	this.shape_1886.graphics.f("#A7B94E").s().p("AnRhPIBpAAIBpAAQFkAAFjBBQAKAAAAA/QgxAAgzAHQiiAYiJAAQlcAAi4ifg");
	this.shape_1886.setTransform(8538.175,4417.2309);

	this.shape_1887 = new cjs.Shape();
	this.shape_1887.graphics.f("#609627").s().p("AqgMLIAAiAIAA2VIBoAAIAAGFIAACBQD/DfJAhXQAzgHAxAAIDRAAIBlAAQAABEgfApQgRAXg1AAIhpAAIhoAAIhpAAIoDAAIhmAAIjRAAIAAGDIAACGIAACBIAACAIhoAAg");
	this.shape_1887.setTransform(8548.5,4435.325);

	this.shape_1888 = new cjs.Shape();
	this.shape_1888.graphics.f("#B2BE58").s().p("AI5BAIzaAAIAAh/ITaAAIBoAAIAAB/IhoAAg");
	this.shape_1888.setTransform(8869.95,4506.825);

	this.shape_1889 = new cjs.Shape();
	this.shape_1889.graphics.f("#225E26").s().p("AgzJTQAAhCgKg9QhCljiDknIAAiEIAAiAIAAiBIAAiGQDMCgA2FhQABAKAzAAQBEEnBzDqQAYA1AABCQgxAAAAACQgNDuhaAAQg9AAhhhvg");
	this.shape_1889.setTransform(8797.375,4544.7394);

	this.shape_1890 = new cjs.Shape();
	this.shape_1890.graphics.f("#709A22").s().p("AtyF9Qg1lhjMigIAAiAIAAiBQE3AAEoA9QAPAEAABAIhpAAIk3AAQIJHRCxlaQAdg2AAhBQJrCAJ0B6QAwALAzAAQAAA/gJAFQkuA9k3AAIhpAAIzZAAIAACBIAACDQgzAAgDgJg");
	this.shape_1890.setTransform(8885.525,4487.375);

	this.shape_1891 = new cjs.Shape();
	this.shape_1891.graphics.f("#589F07").s().p("AlqiFIE2AAIBpAAIDOAAIBoAAQAABCgdA1QhLCUiLAAQi4AAkqkLg");
	this.shape_1891.setTransform(8828.5,4474.6175);

	this.shape_1892 = new cjs.Shape();
	this.shape_1892.graphics.f("#F7C583").s().p("AiGBhIAAiAIAAiAQBpAABIgvQAdgRAAhBQA1AAAAAFQAmI8hzAAQhBAAh1jAg");
	this.shape_1892.setTransform(8743.3539,4555.3057);

	this.shape_1893 = new cjs.Shape();
	this.shape_1893.graphics.f("#EEC685").s().p("ACTURQh8kLgWloQAAhEAKg9QCvuPmJGEIAAg+QhmAAhpA+IAACBQgzAAgVgYQgggnAAhCIAAiAIAAiAQCbiQAqj6QAMg9AAhEIAAiBQBmiBBMiPQAcg2AAg/QJMiUAbGYQAHBCAAA/IAASTIAACBIg2AAQBaJ6lbCSIAACBQg1AAgIgWg");
	this.shape_1893.setTransform(8636.65,4641.257);

	this.shape_1894 = new cjs.Shape();
	this.shape_1894.graphics.f("#CCC188").s().p("AjPSPIAAiBQH7hji2svQgPg9AAg/IAAiAIAAyUIBpAAIAAWVIAACDIAAMKIAACBQg2AAgdAeQhyBjjaAFIAAiGg");
	this.shape_1894.setTransform(8678.25,4682.25);

	this.shape_1895 = new cjs.Shape();
	this.shape_1895.graphics.f("#6F7441").s().p("AhoLKIAA2VIAAiBQCzAFgaD9IA4AAIAACGIhpAAIAAQNIAACBQAAA/gfApQgWAbgzAAIAAiDg");
	this.shape_1895.setTransform(8709.5,4623.775);

	this.shape_1896 = new cjs.Shape();
	this.shape_1896.graphics.f("#E7C689").s().p("AidJJQAAg/gZg2QhLieAAjzIAAiFIBkAAQE9IKg6uHQAAgFg2AAIAAiEIBpAAIBpAAIAACEIAAIHIAACBQgzAAAAACQgWFGjuA9IhoAAg");
	this.shape_1896.setTransform(8745.725,4571.725);

	this.shape_1897 = new cjs.Shape();
	this.shape_1897.graphics.f("#F0C98C").s().p("AgwEDIg4AAQAbj9i0gFIAAiAIAAiDIGcAAIBmAAIAACDQABBCgeARQhJAthoAAIAACBIAACBIhjAAg");
	this.shape_1897.setTransform(8724.8,4539.15);

	this.shape_1898 = new cjs.Shape();
	this.shape_1898.graphics.f("#96AE4B").s().p("AhnEDQAAg/gHhCQgbmXpMCUIAAiBIBpAAIGfAAIBmAAILUAAIBpAAIAACBIhpAAIhoAAIhnAAImdAAIAACCIAACBIAACBIhoAAg");
	this.shape_1898.setTransform(8698.9,4526.275);

	this.shape_1899 = new cjs.Shape();
	this.shape_1899.graphics.f("#569215").s().p("AE2EEIrUAAIAAiBQM1AAl5ksQgegZAAhBIE2AAIBpAAIAACBIAACAIAACFIAACBIhpAAg");
	this.shape_1899.setTransform(8730.025,4474.375);

	this.shape_1900 = new cjs.Shape();
	this.shape_1900.graphics.f("#208139").s().p("AhLHMQjFg/hfh/IAAiBQA1AAARgYQAggpAAhEIAAiAQDph1B5j6QAHgWA2AAQDwhEgYDHQgHBCAAA/Qg2AAAAAFQgdIwlMDUQAAg/gTgFg");
	this.shape_1900.setTransform(8642.4839,4421.3357);

	this.shape_1901 = new cjs.Shape();
	this.shape_1901.graphics.f("#E2C875").s().p("AlJBKQgfgpAAhDQKqg1AngLIAABAQAABDgKAAQktBCk0AAQg1gBgSgYg");
	this.shape_1901.setTransform(8714.45,4425.6);

	this.shape_1902 = new cjs.Shape();
	this.shape_1902.graphics.f("#599F12").s().p("Ah8IJImgAAIAAiBIAAiHQFNjTAdoxQAAgEA2AAIBmAAQAABBggAnQgWAYgwABIAACBQAABEAfApQARAYA2AAQAMDOEthFQAwgJAzAAQAABCAgAYQF5Eus1AAIAACBIhmAAg");
	this.shape_1902.setTransform(8690.852,4448.35);

	this.shape_1903 = new cjs.Shape();
	this.shape_1903.graphics.f("#84A132").s().p("AmegKQE1AAEthCQAJAAAAhEQBpBCBHBbQAiAnAABCIhpAAIk2AAQgzAAgxAJQhLASg5AAQisAAgKibg");
	this.shape_1903.setTransform(8730.025,4436.5516);

	this.shape_1904 = new cjs.Shape();
	this.shape_1904.graphics.f("#597F3B").s().p("AjZCuQgWgag2AAIAAiBQQyqyt7ObQgZAYg1AAQAAg/gdgng");
	this.shape_1904.setTransform(8759.2679,4290.6091);

	this.shape_1905 = new cjs.Shape();
	this.shape_1905.graphics.f("#227938").s().p("AgyFGQAAg/AHhCQAYjGjwBDIAAiAQEqAOA9kGQACgPA2AAQAzBEAdBJQAYA4AABCQAAA+ggApQhLBYhmBEIAACBIhlAAg");
	this.shape_1905.setTransform(8683.475,4363.725);

	this.shape_1906 = new cjs.Shape();
	this.shape_1906.graphics.f("#2D7B38").s().p("Ah+CLQgdhKgyhDIAAiBQBjg/B0gtQApgUAzAAQA1AAAXAaQAcAnAAA/QAABDgcAmQh/CeiYCAQAAhCgZg3g");
	this.shape_1906.setTransform(8719.7,4331.4);

	this.shape_1907 = new cjs.Shape();
	this.shape_1907.graphics.f("#A1B040").s().p("Ao7AAQGeBaCPjCQARgYAzAAIDOAAIBpAAIBmAAIBoAAQAAA/gQAFQoYCRpOAsIAAiBg");
	this.shape_1907.setTransform(8807.7,4136.4);

	this.shape_1908 = new cjs.Shape();
	this.shape_1908.graphics.f("#50A403").s().p("ADFCMIjOAAIAAhBQktAOgMjSQK7hHg6DOQgRA9AABBIhpAAg");
	this.shape_1908.setTransform(8814.0219,4109.4778);

	this.shape_1909 = new cjs.Shape();
	this.shape_1909.graphics.f("#DECD8C").s().p("AgKKJIhpAAIAAiBIAAmFIAAiAIAAiFQCuhEg8lBQgJhCAAg/QCyHHhILJQgDBCAAA/IhnAAg");
	this.shape_1909.setTransform(8503.2429,4344.275);

	this.shape_1910 = new cjs.Shape();
	this.shape_1910.graphics.f("#447F37").s().p("Ah0GGIAAiAIAAmHQCzgCgYkCIA1AAQAAA/AKBCQA9FAivBEIAACGIAACAIhoAAg");
	this.shape_1910.setTransform(8492.8867,4318.375);

	this.shape_1911 = new cjs.Shape();
	this.shape_1911.graphics.f("#337F39").s().p("AhvE0QgshwAAiBQCbiPBfjkQAHgUA2AAIAACEIAACBQAAA/gbA0QhLCQhoCBQg1AAgIgRg");
	this.shape_1911.setTransform(8507.175,4194.875);

	this.shape_1912 = new cjs.Shape();
	this.shape_1912.graphics.f("#0C7F37").s().p("EgCrAkKQh6mditl0QAAg/gggqQgRgYg3AAIAAiBIAAwTIAAiBIAAiAQCzgCg8kHQgPg8AAhAIAAiAIAAiGQCQjdA1kpQAMhCAAg/QCciPApj4QAKhAAAhBQFUpnEPAaQAKAFAAA/Qg1AAgHAUQhfDkicCQQAACBAsBwQAIARA1AAIAAGHIAACBIg2AAQAYECizACIAAGIIAACAIAAWVIAACBIAACDIhmAAIAACBIg2AAQAbKJi2GFQAAg/gQg9g");
	this.shape_1912.setTransform(8465.6,4399.2953);

	this.shape_1913 = new cjs.Shape();
	this.shape_1913.graphics.f("#59A009").s().p("AlLJ4QhMguhmAAQgzAAgdgdQiLiBktAbIAAiBQMzm1IspAQAYgbA2AAQJnBCiUJHIAwAAQCmDTiGBcQggAWAABCQgwAAgUAYQiPDAmZhXIAAiBIAAiEQAAg/gKgFQkQgalTJnQAAhAgdgTg");
	this.shape_1913.setTransform(8490.8477,4142.975);

	this.shape_1914 = new cjs.Shape();
	this.shape_1914.graphics.f("#6EB110").s().p("AjRhMQNGiStBFWg");
	this.shape_1914.setTransform(8564.1877,4013.9704);

	this.shape_1915 = new cjs.Shape();
	this.shape_1915.graphics.f("#9EAB3C").s().p("AnRAMQETjLInBEQA1ACA0AAQAABEgPAAQncBom4BaIAAiBg");
	this.shape_1915.setTransform(8963.45,4109.4);

	this.shape_1916 = new cjs.Shape();
	this.shape_1916.graphics.f("#52A505").s().p("AlZggQVoBB1oAAg");
	this.shape_1916.setTransform(8992.6375,4074.775);

	this.shape_1917 = new cjs.Shape();
	this.shape_1917.graphics.f("#A0B039").s().p("ApsCBIAAiBIBoAAQG0iWJVATIBoAAIAACDQgwAAgxAOQmOB4oPAAQhrAAhwgFg");
	this.shape_1917.setTransform(9269.075,4058.6073);

	this.shape_1918 = new cjs.Shape();
	this.shape_1918.graphics.f("#F5C786").s().p("EALUBIGIAAiGQC0gCg9kDQgOg8AAhBQCeiQAnj7QAKg9AAhDQAzAAAMgRQJWz2tkMAIAACEQgzAAgnAWQg/Arg2BAQAAhAgbgyQiZkTBMoIIAAiCIAAiDQA1hBAehHQAVg6AAhCQBng/BJhdQAfgpAAg/QA1AAAdgYQM7qiuNEyIAACGQgzAAgqARQjaBwjSCBIAACDQgwAAgHAPQhEDDi3AzIAACAQg0AAAAAKQhEGHknB1IAACGIg1AAQAZlEi1hDIAAiCIAAiDQAAhBgKg9QhGmgh+lyQAAg+gKg+QgrkJg0kCQAAhBgYg1QhzjqhDknIAAiEITZAAIBoAAQNnB8i7lqQgIgUg1AAQgzAAgxgMQpzh6priAIhpAAIjOAAQAAhAgPgEQkpg9k3AAQAAhCgigmQhGhdhphBIAAhAQgnAKqrA2IAAiCQAwABAWgZQAggmAAhCIAAiBQBmhEBLhYQAggpAAg/QCZiBB/ifQAdgmAAhCQA1AAAZgYQN8ucwyKyIAACBQg0AAgpAUQh1AuhjA/IAACBQg2AAgCAPQg9EGkrgOIAACAQg2AAgHAXQh5D6jqB0IAACCIhmAAIjRAAQAAhAgKAAQlihBlmgBQAAg+AChCQBJrLi0nHIAAiBIAAmHQBpiBBLiPQAbg2AAg/QGYBXCQjAQATgYAxAAQOGgIKTjuQAxgRAwAAQJPgsIXiSQARgEAAhAIGgAAIBnAAQG4haHdhoQAOAAAAhEIDQAAIBoAAQJug/Jjh/QAJgCABhCIBoAAIBoAAIBmAAIBpAAQKbAdHeiPQAxgPAwABMAAACOEIAACBIhoAAImbAAQg2AAgzgKQqViQl4CaIAACGQg0AAgwAKQjxA5AdjJQA1AAAWgYQAegoAAhBQErAdCMiDQAegbAwAAQA2AAAMgUQDPlxsWCBIAACEIAACAQgzAAgvAPQr0Dbq/EeIAAiAg");
	this.shape_1918.setTransform(8916.65,4532.85);

	this.shape_1919 = new cjs.Shape();
	this.shape_1919.graphics.f("#90A731").s().p("ApsAAQH8h7J0gFIBpAAQAABCgKACQpiB+ptA/IAAiBg");
	this.shape_1919.setTransform(9103.275,4084.375);

	this.shape_1920 = new cjs.Shape();
	this.shape_1920.graphics.f("#6DAE0D").s().p("AAADDIhmAAQAAhAgWg6QgdhKg2hAQA2AAARgaQAignAAhAQDXAIBECIQAbAxAABDIhpAAIAACBIhnAAg");
	this.shape_1920.setTransform(9196.625,4052.025);

	this.shape_1921 = new cjs.Shape();
	this.shape_1921.graphics.f("#D6F0FA").s().p("AmKj7IMVC0QiVFDitAAQjXAAj8n3g");
	this.shape_1921.setTransform(8852.575,1939.4729);

	this.shape_1922 = new cjs.Shape();
	this.shape_1922.graphics.f("#492D15").s().p("AmdCMQHzrsEwKUQBeDOkRAAQjPAAmhh2g");
	this.shape_1922.setTransform(8470.8311,2121.3448);

	this.shape_1923 = new cjs.Shape();
	this.shape_1923.graphics.f("#84BF19").s().p("AhMAGQFKwjk7WXQgPBDgHAAQgUAAAbm3g");
	this.shape_1923.setTransform(8633.9613,3577.0963);

	this.shape_1924 = new cjs.Shape();
	this.shape_1924.graphics.f("#6DAF0F").s().p("AjXieQgiggAAhCQIEIBgSAAQgPAAnBmfg");
	this.shape_1924.setTransform(8775.5515,3239.3079);

	this.shape_1925 = new cjs.Shape();
	this.shape_1925.graphics.f("#6DB108").s().p("EgCXBGlIAAiBQADlFgDlBQFPhTjpOcgAiXFoIAAiBIAA6ZQFdDbg1U/QgPFjh6AAQhAAAhfhjgEgCXg7VIAAiBQADlEgDlFQFPhTjpOcg");
	this.shape_1925.setTransform(9201.4797,3320.6579);

	this.shape_1926 = new cjs.Shape();
	this.shape_1926.graphics.f("#82BE17").s().p("AoHi0QD1CDF7AAIBoAAQCcAACBA0QAaANAAA/QAABBgMADQi2AiiaAAQnyAAjBlpg");
	this.shape_1926.setTransform(8014.575,3089.069);

	this.shape_1927 = new cjs.Shape();
	this.shape_1927.graphics.f("#5CA106").s().p("Aujh3QO6jqN1GfQAYAOAABCQkwA+kjAAQqaAApalDg");
	this.shape_1927.setTransform(8035.6,2809.9279);

	this.shape_1928 = new cjs.Shape();
	this.shape_1928.graphics.f("#6FA01E").s().p("AGeBAIujAAIAAh/ILUAAIBoAAIBnAAIBoAAIAAB/IhoAAg");
	this.shape_1928.setTransform(8128.6,2635.575);

	this.shape_1929 = new cjs.Shape();
	this.shape_1929.graphics.f("#642D23").s().p("AIGBAIhpAAIwLAAIAAh/QJtAAJoA/QAHAAAABAIhoAAg");
	this.shape_1929.setTransform(8139.05,2596.675);

	this.shape_1930 = new cjs.Shape();
	this.shape_1930.graphics.f("#2D1300").s().p("AHSBAIwMAAIAAiAIBoAAIBmAAIM+AAIBqAAIAACAIhqAAg");
	this.shape_1930.setTransform(8248,2609.55);

	this.shape_1931 = new cjs.Shape();
	this.shape_1931.graphics.f("#6C9E1B").s().p("AI9BAIzfAAIAAh/ITfAAIBmAAIAAB/IhmAAg");
	this.shape_1931.setTransform(8247.875,2635.575);

	this.shape_1932 = new cjs.Shape();
	this.shape_1932.graphics.f("#261400").s().p("AJtBAIhoAAIzaAAIAAh/IR0AAIBmAAQBoAABMAuQAdARAABAIhpAAg");
	this.shape_1932.setTransform(7786.625,2609.55);

	this.shape_1933 = new cjs.Shape();
	this.shape_1933.graphics.f("#2F4B00").s().p("AI5BCIxxAAIhpAAIAAiDITaAAIBoAAIAACDIhoAAg");
	this.shape_1933.setTransform(7781.4,2622.575);

	this.shape_1934 = new cjs.Shape();
	this.shape_1934.graphics.f("#2F1707").s().p("AASCzQidhhgWjQIAAiDQHPgxjHInQgHARgzAAQAAg/gbgUg");
	this.shape_1934.setTransform(7699.147,2524.8791);

	this.shape_1935 = new cjs.Shape();
	this.shape_1935.graphics.f("#4D2E0A").s().p("AI5BBIjPAAIhpAAIs5AAIhpAAIAAiBIBpAAIBmAAIQLAAIBoAAIAACBIhoAAg");
	this.shape_1935.setTransform(8123.5,2609.55);

	this.shape_1936 = new cjs.Shape();
	this.shape_1936.graphics.f("#68A01F").s().p("A7gA5IAAiAIRxAAIBpAAMAgZAAAIBpAAIBlAAIAACAIhlAAQt0APtWAAQtYAAs6gPg");
	this.shape_1936.setTransform(7900.65,2636.3125);

	this.shape_1937 = new cjs.Shape();
	this.shape_1937.graphics.f("#314D00").s().p("APZBCMggZAAAIAAiDIBoAAIBmAAIBpAAIZ5AAIBpAAIBoAAIAACDIhoAAg");
	this.shape_1937.setTransform(7957.675,2622.575);

	this.shape_1938 = new cjs.Shape();
	this.shape_1938.graphics.f("#425300").s().p("AFpBCIrUAAIhmAAIAAiDIM6AAIBpAAIAACDIhpAAg");
	this.shape_1938.setTransform(8113.175,2622.575);

	this.shape_1939 = new cjs.Shape();
	this.shape_1939.graphics.f("#3C1E10").s().p("AidFCIAAsJQJ2Jwp2Efg");
	this.shape_1939.setTransform(7895.6,2531.75);

	this.shape_1940 = new cjs.Shape();
	this.shape_1940.graphics.f("#331A09").s().p("AMJDBI56AAIAAiBQIJAAH7hAQAHAAAAg/QCfAACDg2QAWgMgBg/QDWBGCBCgQAUAaA2AAIAACBIhpAAg");
	this.shape_1940.setTransform(7968,2596.675);

	this.shape_1941 = new cjs.Shape();
	this.shape_1941.graphics.f("#391B0B").s().p("Ag0H8Qh3ogiLnkIBmAAQDAHMEoFbQAfAkAABEQAAA/gVANQiEA2ieAAQgygBgCgMg");
	this.shape_1941.setTransform(7983.425,2538.2);

	this.shape_1942 = new cjs.Shape();
	this.shape_1942.graphics.f("#704427").s().p("AmdhPQGcAAGVA9QAKAFABA+QgxAAg1AIQiPAXh3AAQk7AAiVifg");
	this.shape_1942.setTransform(7796.85,1935.3537);

	this.shape_1943 = new cjs.Shape();
	this.shape_1943.graphics.f("#633417").s().p("Amfg/ILWAAIBpAAQAABAgKAAQmWBAmfAAIAAiAg");
	this.shape_1943.setTransform(8211.525,2310.75);

	this.shape_1944 = new cjs.Shape();
	this.shape_1944.graphics.f("#733A17").s().p("AlqB0IAAiAQGvA3DRifQAggZA1AAQAAA/gfAsQh/Cwk0AAQh1AAiOgag");
	this.shape_1944.setTransform(8258.3,2266.6633);

	this.shape_1945 = new cjs.Shape();
	this.shape_1945.graphics.f("#7D4623").s().p("AkCgOQA2AAAVgbQAbgnAAg/IDQAAIBpAAQA1A/AbBHQAWA5AABCQgxAAgzAKQhdAUhIAAQjPAAgtieg");
	this.shape_1945.setTransform(8185.625,2266.8595);

	this.shape_1946 = new cjs.Shape();
	this.shape_1946.graphics.f("#4A2D14").s().p("AkBgZQQGguwGBug");
	this.shape_1946.setTransform(8320.425,2098.7533);

	this.shape_1947 = new cjs.Shape();
	this.shape_1947.graphics.f("#59A300").s().p("AingLQgPgFAAg/QGbCfg0AAQgoAAkwhbg");
	this.shape_1947.setTransform(9132.1456,2676.2552);

	this.shape_1948 = new cjs.Shape();
	this.shape_1948.graphics.f("#6EAF08").s().p("Ak2A2IAAiAQC9i+GdB1QATAFAABEQAAA/ggAmQiECliaAAQiOAAihiKg");
	this.shape_1948.setTransform(9217.425,2675.7663);

	this.shape_1949 = new cjs.Shape();
	this.shape_1949.graphics.f("#582516").s().p("AE1BsIrRAAIAAiAQIfi+D7DfQAfAdAABCIhoAAg");
	this.shape_1949.setTransform(8958.225,2592.3151);

	this.shape_1950 = new cjs.Shape();
	this.shape_1950.graphics.f("#3F1F00").s().p("AMJBAIjSAAIhmAAI1CAAIAAh/IBpAAIDPAAIBoAAILRAAIBpAAIBoAAIE4AAIBoAAIAAB/IhoAAg");
	this.shape_1950.setTransform(8963.45,2609.55);

	this.shape_1951 = new cjs.Shape();
	this.shape_1951.graphics.f("#5B2C11").s().p("AnSCDIAAiDQCeACCDg5QAWgKAAg/QDOAAC9g6QAUgIAAhBIBmAAIBpAAQAABBgZAPQnKDhnCDWIAAiBg");
	this.shape_1951.setTransform(8984,2525.075);

	this.shape_1952 = new cjs.Shape();
	this.shape_1952.graphics.f("#7B4220").s().p("AhlBwQjsAIAbjJQEkjsEDFTQAWAZAzAAQAABBgUAIQi9A6jOAAg");
	this.shape_1952.setTransform(8978.6162,2494.3566);

	this.shape_1953 = new cjs.Shape();
	this.shape_1953.graphics.f("#465200").s().p("ALWBCI4UAAIAAiDIDSAAIBoAAITaAAIBpAAIAACDIhpAAg");
	this.shape_1953.setTransform(9103.25,2622.575);

	this.shape_1954 = new cjs.Shape();
	this.shape_1954.graphics.f("#6E9E1C").s().p("EBCaABAIhoAAMiE0AAAIAAh/MBsiAAAIBmAAIYUAAIBpAAIAAB/IhpAAg");
	this.shape_1954.setTransform(8750.825,2635.575);

	this.shape_1955 = new cjs.Shape();
	this.shape_1955.graphics.f("#502D09").s().p("AJuBAIhoAAIzaAAIAAh/IVCAAIBnAAIAAB/IhnAAg");
	this.shape_1955.setTransform(9124.05,2609.55);

	this.shape_1956 = new cjs.Shape();
	this.shape_1956.graphics.f("#452301").s().p("AZGDGMgyLAAAIAAiBQAAhBgbg3QgahJg0g/QEng9glE9IA2AAMAm0AAAIBoAAIGgAAIBpAAIAACBIhpAAg");
	this.shape_1956.setTransform(8465.725,2596.1847);

	this.shape_1957 = new cjs.Shape();
	this.shape_1957.graphics.f("#5A2814").s().p("AExDEImeAAIAAhCQl+AgBGllIDPAAIBpAAQJSA0g6DUQgRA9AABCIhpAAg");
	this.shape_1957.setTransform(8595.7582,2583.525);

	this.shape_1958 = new cjs.Shape();
	this.shape_1958.graphics.f("#4B2110").s().p("AnrGGQAkk+kmA9QAzA/AbBJQAbA4AABBIhpAAItAAAIAAiAQJjnjQUhkQADAAAAhEQTOBEETHGIgzAAQtKkmhcEmIDPAAIDRAAQk8DYxvgYIAABBg");
	this.shape_1958.setTransform(8369.675,2564.075);

	this.shape_1959 = new cjs.Shape();
	this.shape_1959.graphics.f("#5E2C15").s().p("ABqGGIhpAAIrWAAIAAiAQBih/DEg/QARgHAAhBIBpAAQE2g/Efh3QAYgKAAhCQDZgHB1hhQAdgbAzAAIAACDIAACBQAABCgUAHQkXBPjZBuIAACBIAACAIhoAAg");
	this.shape_1959.setTransform(8864.725,2564.075);

	this.shape_1960 = new cjs.Shape();
	this.shape_1960.graphics.f("#6F3C1B").s().p("Ak2AHQCWiuFxAnQAwAHA2AAQAABCgYAKQkfB2k2A/IAAiBg");
	this.shape_1960.setTransform(8864.85,2550.3529);

	this.shape_1961 = new cjs.Shape();
	this.shape_1961.graphics.f("#69321C").s().p("AAzDEIoFAAIAAiBQH0gxFXi/QApgWAxAAQAABCgRAHQjFBAhhB9IAACBIhpAAg");
	this.shape_1961.setTransform(8776.575,2583.525);

	this.shape_1962 = new cjs.Shape();
	this.shape_1962.graphics.f("#482700").s().p("AKgBBI2oAAIAAiBIBkAAIIGAAIBoAAILWAAIBpAAIAACBIhpAAg");
	this.shape_1962.setTransform(8797.625,2609.55);

	this.shape_1963 = new cjs.Shape();
	this.shape_1963.graphics.f("#733D20").s().p("AoEEEIhoAAIAAiAIAAiCQJdhgIYiWQAvgPA1AAIAACBIhpAAQgwAAgpAVQlXC/n0AyIAACAIhkAAg");
	this.shape_1963.setTransform(8771.625,2577.1);

	this.shape_1964 = new cjs.Shape();
	this.shape_1964.graphics.f("#3C4D00").s().p("EBBoABCMhshAAAIhmAAIzgAAIhoAAIhmAAIAAiDIDOAAIBpAAIQOAAIBpAAMAyKAAAIBpAAILXAAIBpAAIWpAAIBoAAIVDAAIBmAAIAACDIhmAAg");
	this.shape_1964.setTransform(8589.975,2622.575);

	this.shape_1965 = new cjs.Shape();
	this.shape_1965.graphics.f("#57350C").s().p("AE3BAIrWAAIAAh/IJuAAIBoAAIBpAAIAAB/IhpAAg");
	this.shape_1965.setTransform(8678.375,2609.55);

	this.shape_1966 = new cjs.Shape();
	this.shape_1966.graphics.f("#7C441E").s().p("AlEgYIAAiDIBmAAIBpAAQA1AAAlAWQHQEhiUAAQh0AAnxi0g");
	this.shape_1966.setTransform(8803.9671,2514.6798);

	this.shape_1967 = new cjs.Shape();
	this.shape_1967.graphics.f("#D7E6ED").s().p("AkCGtQAAhBgWg4QiNlUgum/QNNkmAlMpQAAACA1AAIAACBQg1AAgWAbQjsESmfBaIAAiBg");
	this.shape_1967.setTransform(8589.975,2079.4738);

	this.shape_1968 = new cjs.Shape();
	this.shape_1968.graphics.f("#D4DEE2").s().p("ABMF2Ig1AAQAWlDiuhDIAAiBIAAiBQEgl0ggP8g");
	this.shape_1968.setTransform(8525.5798,1954.9097);

	this.shape_1969 = new cjs.Shape();
	this.shape_1969.graphics.f("#D1D9DB").s().p("AmfDCIAAiAIAAiDQIDAZDrkCQAZgYA4AAIAACAIAACBQAABDgWADQmzCXl2CnIAAiBg");
	this.shape_1969.setTransform(8678.375,2063.825);

	this.shape_1970 = new cjs.Shape();
	this.shape_1970.graphics.f("#CFD2CB").s().p("AjNAAIAAiAIDMAAIBlAAQA2AAATAYQAhAngBBBQAAA/gRAHQi9A7jMAAIAAiBg");
	this.shape_1970.setTransform(8740.5,2044.375);

	this.shape_1971 = new cjs.Shape();
	this.shape_1971.graphics.f("#D1DBDB").s().p("Am9BmQgUgYg1AAIAAiAQFGjRJhBJQAxACA1AAQAABCgbARQmODZn7BaQAAhBgggng");
	this.shape_1971.setTransform(8802.475,2023.7301);

	this.shape_1972 = new cjs.Shape();
	this.shape_1972.graphics.f("#653014").s().p("AkDDAIAAiGQEPg8CqiqQAZgbA1AAQAABCgPA9Qg2EQlLAAQg4AAg/gIg");
	this.shape_1972.setTransform(8880.425,2103.2097);

	this.shape_1973 = new cjs.Shape();
	this.shape_1973.graphics.f("#794425").s().p("Eg3bAXWQAAhCgWg6QgbhHg1g/UAWTgOLAiUgDJQAFAAAAhAQGehZDskSQAWgbA2AAQF2ioGziXQAWgCAAhEQDMAAC+g7QARgHAAg/QH8haGPjbQAbgRAAhCQE1g/Ehh8QAbgFAAhBIBjAAQA2BBgKANQtmQf7mKlUgZeAJzggzACfIAACFQg1AAggAZQjRCgmxg4IAACBIhoAAg");
	this.shape_1973.setTransform(8566.3466,2128.875);

	this.shape_1974 = new cjs.Shape();
	this.shape_1974.graphics.f("#D0DEDF").s().p("AoDEZIAAiEIAAiDQDdnXMXERQAUAHAAA/QAABCggAnQgRAXg1AAQg0AAgwAPQluB0ltCEIhjAAg");
	this.shape_1974.setTransform(8968.55,1951.363);

	this.shape_1975 = new cjs.Shape();
	this.shape_1975.graphics.f("#6B3A1E").s().p("EhUQAl4IAAiFIAAiBQLIwnSNpdQAsgRAwAAQAAA/gaAnQgWAbg2AAQA9DWFlhMQA0gJAwAAIBoAAQIJBcCvjzQAggsAAg/IAAiGUAgygCeAZegJyQbmqnNnwfQAJgMg2hCQFuiDFuh1QAxgOAzAAQCZCDCtBrQAkAYA2AAQAABCgeAMQsMGnqBIZQg2AAgZAbQiqCqkQA9IAACGQ0wMd1YL5IhpAAQ7ugq2dEuIhoAAIrYAAIAACBQroDTllJPQljJOkkAAQh0AAhphcg");
	this.shape_1975.setTransform(8512.3,2204.8437);

	this.shape_1976 = new cjs.Shape();
	this.shape_1976.graphics.f("#723720").s().p("AhZDsQishriaiCQA2AAARgZQAfgnAAhBQEuBQA5jCQADgPA1AAQAMDREugPIAABAQg4AAgCANQg7DFkrhQIAACDQg0AAglgYg");
	this.shape_1976.setTransform(9051.575,1953.425);

	this.shape_1977 = new cjs.Shape();
	this.shape_1977.graphics.f("#7CB31D").s().p("Ar9ihQAzAAAWgZQAggnAAhBQAAhEgWgIQieg8BLj9QHTEOFHGRQAiAoAAA/IhnAAIhpAAQCdGIKkh6QAzgHAzAAQAAA/giAbQkjDokPAAQoCABm9tKg");
	this.shape_1977.setTransform(7375.8294,3438.0457);

	this.shape_1978 = new cjs.Shape();
	this.shape_1978.graphics.f("#61901F").s().p("AoGhUIBpAAIBoAAIBmAAIBpAAIBnAAQEtBTA5jFQAHgPAzAAIBmAAQAABCgTA4QgjBJgwBDIAACAQgzAAgzAIQigAdiDAAQmlAAh5kqg");
	this.shape_1978.setTransform(7413.15,3456.0638);

	this.shape_1979 = new cjs.Shape();
	this.shape_1979.graphics.f("#FDFDFB").s().p("AhTEDIhoAAIAAiBQAFi/gFjFQJaBulqE6QggAeAAA/IhoAAg");
	this.shape_1979.setTransform(7411.1898,3421.65);

	this.shape_1980 = new cjs.Shape();
	this.shape_1980.graphics.f("#85BC19").s().p("ACYMAQigtNljo3IAAiBQC2FEG4A8QAyAIA2AAQAPGJjWLoQgFASgDAAQgDAAgBgGg");
	this.shape_1980.setTransform(7511.8991,3499.1891);

	this.shape_1981 = new cjs.Shape();
	this.shape_1981.graphics.f("#69962A").s().p("ADAEIQm3g9i2lCIAACAIhpAAIhmAAIAAiAQDWkJMzDJIAAhBIBoAAQD/CBjfCmQggAbAAA/IhoAAIhkAAIAACGQg2AAgzgHg");
	this.shape_1981.setTransform(7518.5447,3433.8482);

	this.shape_1982 = new cjs.Shape();
	this.shape_1982.graphics.f("#84B71E").s().p("AkeFCQAAg/AggbQDfioj/iAIAAiDQA2hCAdhLQAWg2AAg/QBhB8DVAFIBoAAIA2AAQABMKkgAAQh2AAioiEg");
	this.shape_1982.setTransform(7597.3255,3415.3737);

	this.shape_1983 = new cjs.Shape();
	this.shape_1983.graphics.f("#85BE12").s().p("ABCGuQjaiIgDlpIAAiBIAAiBIAAiBQCzCBgZGHIA0AAQhKD9CdA8QAWAIAABEQg2AAgkgZg");
	this.shape_1983.setTransform(7294.125,3363.425);

	this.shape_1984 = new cjs.Shape();
	this.shape_1984.graphics.f("#84BC18").s().p("AjPk1QFMnWAdFSQAAADA2AAIAACBIg2AAQAIN8hbAAQhZAAi9t8g");
	this.shape_1984.setTransform(7257.775,3387.6761);

	this.shape_1985 = new cjs.Shape();
	this.shape_1985.graphics.f("#56861D").s().p("AA0DEQjVgFhhh8IAAiFQDPAAC8g6QATgFAAhCIBnAAQAABCgUA4QgdBKg2BCIAACBIhoAAg");
	this.shape_1985.setTransform(7605,3363.325);

	this.shape_1986 = new cjs.Shape();
	this.shape_1986.graphics.f("#84BC13").s().p("AAmguQgMhOhmhCQgzAAgmgYQhCgng2hCQAAg/gOg9QgiiIg2iBQMzEJgvHyQg8KOhTAAQhZAAhzrzg");
	this.shape_1986.setTransform(7628.3248,3310.7712);

	this.shape_1987 = new cjs.Shape();
	this.shape_1987.graphics.f("#F0F8E3").s().p("AgpEFQAAhEgUgHQibg9BLj8QAzAAAWgaQAbgnAAhEQA0BEBCAnQAnAaAzAAQAAA/gWA2QgdBKg2BCIAACDIhnAAg");
	this.shape_1987.setTransform(7562.4298,3382.775);

	this.shape_1988 = new cjs.Shape();
	this.shape_1988.graphics.f("#B6CDA5").s().p("AiOBpQhCgng1hDQgxAAgWgZQgdgnAAhBIJrAAIBoAAQAABBgTAFQi+A7jNAAIAACEQgzAAgngag");
	this.shape_1988.setTransform(7584.425,3356.875);

	this.shape_1989 = new cjs.Shape();
	this.shape_1989.graphics.f("#F1E8A7").s().p("AmfjKIJwAAIBpAAIBmAAQAABAggAkQj9Ewi+ABQjbAAiJmVg");
	this.shape_1989.setTransform(7465.075,3338.201);

	this.shape_1990 = new cjs.Shape();
	this.shape_1990.graphics.f("#FCFDF8").s().p("AoFAPIhmAAQAAhDgWg2QgihLgxhCQKsjsI9FaQAmATAzAAQA2CFAkCDQANA9AABCIhnAAIhoAAIprAAQg2AAgfAYQhBAug2AAQiPABhFlJg");
	this.shape_1990.setTransform(7558.425,3316.4691);

	this.shape_1991 = new cjs.Shape();
	this.shape_1991.graphics.f("#83BB10").s().p("AjOD3QAAhBgYg2QhOidAAjzQCZEeHNAkQADAAAABFQgxAAgMARQhDCJjBAAQhVAAhtgag");
	this.shape_1991.setTransform(7527.325,3215.1938);

	this.shape_1992 = new cjs.Shape();
	this.shape_1992.graphics.f("#8CBC3A").s().p("AGVDwQjAlxqmCBIAAiBQFoBVBfjFQALgRAxAAQCeAACFA2QAWAJAABCQA2CBAiCHQAOA9AAA/QgwAAgMgTg");
	this.shape_1992.setTransform(7553.2,3252.925);

	this.shape_1993 = new cjs.Shape();
	this.shape_1993.graphics.f("#FEFDFE").s().p("AmSgjQgJgFAAg/QOGDPhWAAQhHAArgiLg");
	this.shape_1993.setTransform(7361.3566,3341.2711);

	this.shape_1994 = new cjs.Shape();
	this.shape_1994.graphics.f("#C7DDA4").s().p("AlAB7IAAiFQECAADyg9QAPgCAAhCIBoAAQAABCARA9QAsCYl6AAQh/AAivgRg");
	this.shape_1994.setTransform(7352.2269,3305.6844);

	this.shape_1995 = new cjs.Shape();
	this.shape_1995.graphics.f("#8EB848").s().p("AkBDDQGChniYksQgbgzAAhAIBnAAIBkAAQAAECAzD6QADAJAzABQAABBgPACQjzA9kBAAIAAiAg");
	this.shape_1995.setTransform(7345.925,3272.25);

	this.shape_1996 = new cjs.Shape();
	this.shape_1996.graphics.f("#F3F8E5").s().p("AnSQCQAAg/AggeQFqk8pbhtQAFDFgFDAIAACBIhmAAQAAg/gigqQlJmRnSkOIAAiFIAAmCIBpAAIBoAAQK3BEg6jMQgRg9AAhCQEoibC+kAQAggrAAhAIBoAAQAABAAgApQAWAYAzAAQBFG9GglgQAggdAAhAQKmiBDAFyQAMATAxAAQA1BCBDAnQAmAYAzAAIAACBQgzAAgmgTQo/laqrDsQAxBCAiBLQAWA2AABEIhpAAIpwAAQEALzIfqPQAgglAAg/QBfHDDriqQAggXA2AAQAABAAdAnQAWAZAwAAQAABEgaAnQgXAagyAAQhMD9CcA9QATAHAABEIAABCQszjKjVEJIAACBQgzAAgIAPQgnCLihAAQhEAAhZgZgA1rhIQZgE25ql6QAAA/AKAFg");
	this.shape_1996.setTransform(7459.95,3344.9552);

	this.shape_1997 = new cjs.Shape();
	this.shape_1997.graphics.f("#F8FBEF").s().p("AkCE/QgzAAgCgKQg0j6AAkBQDqjFHeCBQAOACAABCQAAA/gfAsQi+D+koCcIhoAAg");
	this.shape_1997.setTransform(7397.6,3259.8477);

	this.shape_1998 = new cjs.Shape();
	this.shape_1998.graphics.f("#83BC12").s().p("AiVCvQgggpAAg/IAAiAIAAiGQJrg8m1GqQgdAYgwABQgzgBgWgYg");
	this.shape_1998.setTransform(7462.5749,3232.85);

	this.shape_1999 = new cjs.Shape();
	this.shape_1999.graphics.f("#9DC152").s().p("AE3DEQAAhCgOgCQneiAjqDEIAAiBIAAiFQDdhmEqgWQA2gFAxAAQA4BCA/ApQAnAWAzAAIAACFIAACBIhpAAg");
	this.shape_1999.setTransform(7402.825,3220.325);

	this.shape_2000 = new cjs.Shape();
	this.shape_2000.graphics.f("#84BC10").s().p("AhkGGIhpAAQAAhBgfgqQjlkqibl2QGYG5NBhzIAAA/QgxAAg1AEQkrAWjcBmIAACGIAACAIhkAAg");
	this.shape_2000.setTransform(7361.375,3200.875);

	this.shape_2001 = new cjs.Shape();
	this.shape_2001.graphics.f("#85BD18").s().p("ElpCB7nQhXhajsBEIhpAAIhmAAQg2AAgzAKQoIBTjPjeQS7iNDeFcQAJAPgEAAQgHAAhFhHgEFd7h8bQRhhENTC7QAzAKAzAAQmBBVmMAAQp3AAqWjWg");
	this.shape_2001.setTransform(4354.6,3581.3582);

	this.shape_2002 = new cjs.Shape();
	this.shape_2002.graphics.f("#85BE19").s().p("AlYgfQVkA/1kAAg");
	this.shape_2002.setTransform(6545.975,2775.275);

	this.shape_2003 = new cjs.Shape();
	this.shape_2003.graphics.f("#68330F").s().p("ACaEEImcAAIAAiBQEqBOgnjFQgCgJgzAAIAAiAQAzhEBEgqQAigYA1AAQhLECCbA7QAZAIAABBIAACBIhpAAg");
	this.shape_2003.setTransform(6537.35,2589.975);

	this.shape_2004 = new cjs.Shape();
	this.shape_2004.graphics.f("#783D1C").s().p("Ag1MBQiFrggUsuQB1KnENH7QAbAzAAA/Qg2AAgiAYQhEAqgzBEIAACBQg1AAAAgNg");
	this.shape_2004.setTransform(6532.125,2512.075);

	this.shape_2005 = new cjs.Shape();
	this.shape_2005.graphics.f("#85BE17").s().p("Ek8bCe6QVmA/1mAAgEExmif4QVqBA1qAAg");
	this.shape_2005.setTransform(4430.85,3795.375);

	this.shape_2006 = new cjs.Shape();
	this.shape_2006.graphics.f("#6EAD0E").s().p("A55htQZ5AAZ6A/IAABBQqJBbqKAAQvwAAvwjbg");
	this.shape_2006.setTransform(6023.925,2692.174);

	this.shape_2007 = new cjs.Shape();
	this.shape_2007.graphics.f("#91482E").s().p("AR1BAMglRAAAIAAh/QTaAATaA/QAFAAAABAIhoAAg");
	this.shape_2007.setTransform(6386.95,2596.675);

	this.shape_2008 = new cjs.Shape();
	this.shape_2008.graphics.f("#7E4C1B").s().p("ATdBAMgoiAAAIAAiAIBpAAIBpAAMAlQAAAIBoAAIAACAIhoAAg");
	this.shape_2008.setTransform(6376.5,2609.55);

	this.shape_2009 = new cjs.Shape();
	this.shape_2009.graphics.f("#696A07").s().p("ATdBCMgoiAAAIAAiDMAoiAAAIBoAAIAACDIhoAAg");
	this.shape_2009.setTransform(6376.5,2622.575);

	this.shape_2010 = new cjs.Shape();
	this.shape_2010.graphics.f("#4E5A00").s().p("AYUBCMgyQAAAIAAiDMAoiAAAIBoAAIIGAAIBpAAIAACDIhpAAg");
	this.shape_2010.setTransform(5992.825,2622.575);

	this.shape_2011 = new cjs.Shape();
	this.shape_2011.graphics.f("#505B00").s().p("AE3BCIrTAAIAAiDILTAAIBmAAIAACDIhmAAg");
	this.shape_2011.setTransform(6200.225,2622.575);

	this.shape_2012 = new cjs.Shape();
	this.shape_2012.graphics.f("#57290D").s().p("AJuGFIrTAAIhpAAIoGAAIAAiBIIGAAIBpAAIBoAAIBjAAIBoAAQCalJDCkpQARgWAzAAQAACBAvBvQAHASAxgBIAAEGIAACBIAACBIhnAAg");
	this.shape_2012.setTransform(6169.1,2577.1);

	this.shape_2013 = new cjs.Shape();
	this.shape_2013.graphics.f("#854C2A").s().p("AhELLIhjAAIAAiBQCwiGhDmFQgKg8AAhEIAAiAIAAoJQA2A/BDAsQAkAWAxAAQAAA/AMBCQBEGHi2CDIAAIIIAACBIhoAAg");
	this.shape_2013.setTransform(6186.198,2531.625);

	this.shape_2014 = new cjs.Shape();
	this.shape_2014.graphics.f("#4D220E").s().p("AimKNQAAhEgPg9QiBnzAnqgIAAiGQAzBEBEAqQAiAYA2AAQBAGpC2FKQAKAWA4AAQAABEANA9QB0HwofAbIAAiBg");
	this.shape_2014.setTransform(6113.399,2512.075);

	this.shape_2015 = new cjs.Shape();
	this.shape_2015.graphics.f("#5C2917").s().p("ADPHHIoFAAIAAiBQIfgbh0nvQgNg9AAhEIAAiBQChFIAnHEQAHA/AABCIhoAAg");
	this.shape_2015.setTransform(6127.775,2557.65);

	this.shape_2016 = new cjs.Shape();
	this.shape_2016.graphics.f("#713B1D").s().p("AgSJ5QguhvAAiBIAAiEIAAuOQC1HLhJLIQgHBBAAA/QgwAAgHgRg");
	this.shape_2016.setTransform(6237.8679,2498.925);

	this.shape_2017 = new cjs.Shape();
	this.shape_2017.graphics.f("#602D0F").s().p("AjPLtIAAoIQC2iEhEmGQgMhCAAg/QDajFBfkCIAABAIAAOOIAACEQgzAAgRAWQjCEoiZFLIAAiBg");
	this.shape_2017.setTransform(6210.55,2515.325);

	this.shape_2018 = new cjs.Shape();
	this.shape_2018.graphics.f("#70AB0F").s().p("AsIhCIWoAAIBpAAQAABCgMACQl9BBlIAAQnVAAlriFg");
	this.shape_2018.setTransform(6309.025,2648.6713);

	this.shape_2019 = new cjs.Shape();
	this.shape_2019.graphics.f("#5B2B12").s().p("ABbJzQi1lKhCmpQCziGgXmCIA0AAQg7J4COGcQAWA6AABCIAACBQg4AAgKgWg");
	this.shape_2019.setTransform(6122.525,2460.15);

	this.shape_2020 = new cjs.Shape();
	this.shape_2020.graphics.f("#55301C").s().p("AgyGuQhEgpgzhEIAACGIhoAAIAAiGIAAiBQBoAABLguQAegRAAhCIAAiAQAwg/AhhMQAUg5AAhAQAzAAAWgaQAfgoAAg+QCvABg4ECQgOBCAAA/Ig2AAQAZGCi0CGQg1AAgigZg");
	this.shape_2020.setTransform(6103.1538,2401.8);

	this.shape_2021 = new cjs.Shape();
	this.shape_2021.graphics.f("#763F21").s().p("ABcUSQAAhBgIg/QgnnFiflIQAAhCgWg6QiPmcA8p4QAAhAAPhBQA4kCivgCIAAiBIBoAAQC0A/hBFGQgKBBAABAQDjHVCEM1QAAAHAzAAQAABEAKA9QBEGFiyCGIAACAIhoAAg");
	this.shape_2021.setTransform(6149.7418,2473.275);

	this.shape_2022 = new cjs.Shape();
	this.shape_2022.graphics.f("#844B2E").s().p("AhCFGQBClGi0g+IAAiGQC1guBHjFQAFgPA1AAIAzAAQhLKEi2EJQAAhAAKhBg");
	this.shape_2022.setTransform(6145.875,2349.775);

	this.shape_2023 = new cjs.Shape();
	this.shape_2023.graphics.f("#C6BFBC").s().p("AnQIKIAAkHQFgoDHylxQAfgYAwAAQAABBgXAMQj5B1iKDFIAACBIAACCQg1AAgFAPQhGDFi2AuIAACGIhpAAIAACBQAAA/ggAnQgWAagyAAIAAiAg");
	this.shape_2023.setTransform(6153.4,2304.175);

	this.shape_2024 = new cjs.Shape();
	this.shape_2024.graphics.f("#A96334").s().p("ApUgiIAAiDIBoAAIBpAAQD9DhJChWQAwgIAzAAIA2AAQlQDIkpAAQkrAAkFjIg");
	this.shape_2024.setTransform(6373.95,2164.7875);

	this.shape_2025 = new cjs.Shape();
	this.shape_2025.graphics.f("#8A5129").s().p("AnRhQIJrAAIBnAAIBoAAIBpAAIAACCQgzAAgxAHQiiAYiIAAQleAAi3ihg");
	this.shape_2025.setTransform(6381.725,2156.3461);

	this.shape_2026 = new cjs.Shape();
	this.shape_2026.graphics.f("#B6B7AD").s().p("AE3BAIprAAIhpAAIAAiAQGgAAGTBAQAHAAAABAIhmAAg");
	this.shape_2026.setTransform(6366.05,2141.75);

	this.shape_2027 = new cjs.Shape();
	this.shape_2027.graphics.f("#945632").s().p("AFpBBIs6AAIAAiBQHRAAHKBBQAIAAAABAIhpAAg");
	this.shape_2027.setTransform(6754.95,2180.65);

	this.shape_2028 = new cjs.Shape();
	this.shape_2028.graphics.f("#825231").s().p("ApshBIDPAAIBoAAIM6AAIBoAAQAABBgJAAQk/BCkKAAQl4AAkPiDg");
	this.shape_2028.setTransform(6521.525,2167.8675);

	this.shape_2029 = new cjs.Shape();
	this.shape_2029.graphics.f("#D4C4B8").s().p("AEBCGIs6AAIAAiDIIIAAIBlAAQB1iZEpAUQA1AFAzAAQAAA/gdATQhMAuhoAAIAACDIhoAAg");
	this.shape_2029.setTransform(6547.55,2147.9401);

	this.shape_2030 = new cjs.Shape();
	this.shape_2030.graphics.f("#E6F4F9").s().p("AGhBBIoHAAIhpAAIk3AAIAAiAQIHAAH8A/QAKAAAABBIhmAAg");
	this.shape_2030.setTransform(6500.875,2141.75);

	this.shape_2031 = new cjs.Shape();
	this.shape_2031.graphics.f("#C6C3BB").s().p("AE2BAIrTAAIAAiAILTAAIBpAAIAACAIhpAAg");
	this.shape_2031.setTransform(6760.05,2089.7);

	this.shape_2032 = new cjs.Shape();
	this.shape_2032.graphics.f("#DAF5FD").s().p("AGeBkIhnAAIhpAAIrTAAIAAh/IBoAAQGIioIFDcQAWAMAAA/IhoAAg");
	this.shape_2032.setTransform(6770.4,2073.2019);

	this.shape_2033 = new cjs.Shape();
	this.shape_2033.graphics.f("#6DB00F").s().p("Ak0jYQRSFWsbBYQgiADgfAAQllAABvmxg");
	this.shape_2033.setTransform(7579.063,2728.639);

	this.shape_2034 = new cjs.Shape();
	this.shape_2034.graphics.f("#5DA106").s().p("EAwFB2cQCGhcimjUQCQgsDRiiQA/g0CvgkQEVgxMWkyQpYmRGKn8QCXivEhCvQP4Juhr38QIonGMbpIIBpAAQiv3jBG1LQmRh3BauWQiZDEAniHQEfuSpNnAImbAAQjRAAgHgdQiqxyqOKHQhmg/hJhaIiBihQEmBkDbmxImgAAQjPAAgHgkQjYyjpeK/QpRBaj/mSQlcoej9g4QhQF5kMjFIhEgzQGvq6oXAxQAABCgRACQx3E3Din+QgzAAgzgIQzVjiwTqkQAzhBAqAHQKQBTAdmgQAvqVGij2IjPAAQk3AAjFCUQtfKWpWsqQicAAhaBLQq8JbsxieQoQgYGshQICZgZQoxhBjbjFIicAAQTAkw1bhVQhnAAhmgUQi7gfBHgnQLSmPxmDnQhpA/gVBYIgbBrQ29A13So+MA1fAAAIBpAAQZ1AebogeIBmAAIOjAAIBpAAITeAAIBmAAMCE1AAAIBoAAQA2BCAdBLQAWA2AABEIAACBIAAaXIAACEQACFFgCFEIAACBMAAAAiiIAACBIAAaaIAACBMAAAAyvIAACGQACFBgCFFIAACBQAABCACBEQBLSPi2OOQA2CFAkCEQAPA8AABCQAAA/giAnQgRAbg2AAQA2A/AdBLQAWA7AAA/IhpAAIhoAAIhpAAQp2AFn8B8IAACBIhoAAIjPAAQgzAAg2gDQoohEkSDMIAACBIhpAAImgAAIhoAAIhmAAQAAhBARg9QA6jPq8BHQAMDTEtgOIAABBQgzAAgRAZQiPDCmehaIAACBQgwAAgxARQqTDuuGAIQAAhCAggWgEBp6BolQVpAA1phCgECCfhyoQLGDUrVkYQAAA/APAFg");
	this.shape_2034.setTransform(8280.2194,3408.775);

	this.shape_2035 = new cjs.Shape();
	this.shape_2035.graphics.f("#84BE19").s().p("AkagQQgMgCAAhCQKVCphQAAQg/AAn6hlg");
	this.shape_2035.setTransform(7297.6196,2884.4455);

	this.shape_2036 = new cjs.Shape();
	this.shape_2036.graphics.f("#84BD18").s().p("EnM4CeqQE3g/E3g6QAzgHAxAAIA4AAQjWFdjZAAQitAAiujdgEG5aiDqIDRAAIBpAAQGdCBGlB3QAuAMA1AAQAABCgCAAQgyACgxAAQrDAAm3lIgEE58ignQgigfAAg/QX6gNjZF5QgOAZgzAAQiWAOiHAAQppAAk4k1g");
	this.shape_2036.setTransform(4971.725,3861.5946);

	this.shape_2037 = new cjs.Shape();
	this.shape_2037.graphics.f("#83BC14").s().p("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");
	this.shape_2037.setTransform(4748.5613,4225.6371);

	this.shape_2038 = new cjs.Shape();
	this.shape_2038.graphics.f("#6CAD0A").s().p("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");
	this.shape_2038.setTransform(4505,3623.1);

	this.shape_2039 = new cjs.Shape();
	this.shape_2039.graphics.f("#7F4C19").s().p("EAkcABAMhKfAAAIAAh/IBjAAIBpAAMBHTAAAIBoAAIAAB/IhoAAg");
	this.shape_2039.setTransform(6806.875,2609.55);

	this.shape_2040 = new cjs.Shape();
	this.shape_2040.graphics.f("#91492E").s().p("AE5AyIhpAAMhHTAAAIAAh/MCGeAAAIBpAAQ0ZCb25AAQpuAAqLgcg");
	this.shape_2040.setTransform(7019.25,2598.0918);

	this.shape_2041 = new cjs.Shape();
	this.shape_2041.graphics.f("#686808").s().p("EBcVABCMhFsAAAIhmAAMhy/AAAIAAiDIGdAAIBpAAMBKgAAAIBpAAMBmCAAAIBoAAIAACDIhoAAg");
	this.shape_2041.setTransform(7112.75,2622.575);

	this.shape_2042 = new cjs.Shape();
	this.shape_2042.graphics.f("#779C1E").s().p("EAi2ABAMg1fAAAIhoAAIrTAAIhoAAIjRAAIAAh/MBFqAAAIBpAAIBoAAIAAB/IhoAAg");
	this.shape_2042.setTransform(7491.075,2635.575);

	this.shape_2043 = new cjs.Shape();
	this.shape_2043.graphics.f("#70AC10").s().p("AyohBIexAAIBmAAIDRAAIBpAAQgBBBgHAAQouBCn4AAQrHAApciDg");
	this.shape_2043.setTransform(7169.75,2648.6282);

	this.shape_2044 = new cjs.Shape();
	this.shape_2044.graphics.f("#83AA22").s().p("ECq9ABAI+yAAIhpAAMhmFAAAIhpAAI2pAAIhoAAI7iAAIhpAAMhmAAAAIhoAAIpvAAIhpAAI56AAIhoAAIrYAAIAAh/Ie1AAIBmAAIR3AAIBoAAIZ7AAIBoAAMAodAAAIBmAAMAySAAAIBnAAILUAAIBmAAMAojAAAIBpAAMBzAAAAIBmAAIAAB/IhmAAg");
	this.shape_2044.setTransform(6153.4,2635.575);

	this.shape_2045 = new cjs.Shape();
	this.shape_2045.graphics.f("#E2E2DE").s().p("Ak2guQEEAADyg9QAPgDAAhBQAzAAAWAbQAfAmAABAQAABAgfAlQh3B5h9AAQinAAizjeg");
	this.shape_2045.setTransform(7081.625,2191.8424);

	this.shape_2046 = new cjs.Shape();
	this.shape_2046.graphics.f("#DCF1F4").s().p("AKJEKQg1AAgsgUQopj5q6h6IAAiBIBmAAIBpAAQFxguCsCXQAbAYA1AAQF+inC9Iug");
	this.shape_2046.setTransform(6871.525,2108.7379);

	this.shape_2047 = new cjs.Shape();
	this.shape_2047.graphics.f("#3A1D10").s().p("APaQPIxzAAQAAhBgZg2QhLiegFjzQAzAAAHgRQDIonnRAxIAACCQg1AAgHgTQitmCkfjzQAAhCgMg9QgliIg1iBQA1AAASgYQAfgnAAhBQKCC9IAEzQAnAYAzAAQIZKSEkODIhmAAg");
	this.shape_2047.setTransform(7729.475,2499.175);

	this.shape_2048 = new cjs.Shape();
	this.shape_2048.graphics.f("#3F1D09").s().p("AG3FuQmZl/oijzIAAiBQDPA/DRA2QAxAMAzAAQDSBEDPAwQAzAPAxAAQAABCggAnQgRAYg2AAQA2CAAkCIQANA9AABBQgxAAgdgYg");
	this.shape_2048.setTransform(7579.225,2408.225);

	this.shape_2049 = new cjs.Shape();
	this.shape_2049.graphics.f("#412311").s().p("AIKD4QjSg1jOhAIAACBQg2AAgigWQjeigk6hLQAAhBgggnQgWgYgwAAIAAiGIBmAAQHrEUJ6CvQAOADAABBQgzAAgwgMg");
	this.shape_2049.setTransform(7516.975,2356.075);

	this.shape_2050 = new cjs.Shape();
	this.shape_2050.graphics.f("#804C31").s().p("AiggyIAAiBIBoAAIBoAAQAwAAAWAYQAgAnAABCQAAA+AHBBQARBngwAAQhIAAjWjmg");
	this.shape_2050.setTransform(7450.0849,2361.489);

	this.shape_2051 = new cjs.Shape();
	this.shape_2051.graphics.f("#4A2A14").s().p("AABFGIhnAAQAAhEgggqQgRgYg4AAIAAiBQAFi/gFjFQCUECDrCuQAgAWAAA/IhmAAIAACGIhpAAg");
	this.shape_2051.setTransform(7444.275,2310.875);

	this.shape_2052 = new cjs.Shape();
	this.shape_2052.graphics.f("#894B26").s().p("EFGbAhgMhmDAAAIAAiAUAiIABfAdEgDgIhpAAMiGfAAAIAACBIhpAAIhjAAQAAhCgZgIQibg8BLkCQAAg/gbgzQkOn8h0qmQATMuCGLhQAAAMA1AAQAzAAADAJQAnDGkrhOQAAhCgFAAQzbg/zaAAIAACBIhpAAIhoAAIAAiBIAAkHQAAg/AHhCQBJrIi2nLIAAhAQhfECjbDFQgxAAgkgWQhEgsg2g/IAAIJIAACAQgzAAAAgHQiDs2jlnUQC3kJBLqEIgzAAIAAiEIAAiAQCLjFD4h1QAYgNAAhBIBpAAQN3FQkOHBIDWgFUAnLgClAYSgRVQAigbA1ABIM7AAIBoAAQRODRNuGnQArAVAzAAQosJvt/EfQTYg9VSo+QApgQA1AAQRCAmMRFNQApARA2AAQAMDUEthHQAxgMAzAAQCvDbFXAkQA4AIAxAAQFnGCgpkCQgHhBAAg/QE6BLDfChQAiAWA2gBQIjDyGYGBQAdAYAxAAQEfD0CtGCQAHAUA1AAQAWDQCeBiQAbATAAA/QAFD0BLCdQAZA2AABCIAACAIhpAAgEiV3AhgMgiDAAAQg/kmAxpnIATjCQg9Bhj6LtUg6GgCjg4/ABmQ17AniXp2QEwiBinijQgigfAAhCQE5iNDnjgQAbgYA1AAQE4hQDdicQAkgbAzABQIaAHF0i+QAYgKAAhAQFNhfF5hiQARgEAAhAQSUjJP2G4QApAWAzAAQWgHZwMpEQgngZg1AAQgxAAgTgaQiajKjCieQA1AAAWgeQAdgmAAhCQDbgDByhlQAggZAzAAQDziDFyg9QAKAAAAhEQIliIK1AIIBpAAUAXhAPyAi9ABiQBEAFhmmBQgih8FvgTQA4gCAzhCIBoAAQDPFGDxEtQARAZA1AAIAAB/IAACCIAAGHIAACBQg1AAAAAJQiLL6lGISQAAhCAPg9QA9kCi0gHIAAiBIAAiAQAAhAAChCQAdnElXhGIAAQTIAACBIAACBIAACAIhoAAg");
	this.shape_2052.setTransform(5614.475,2401.55);

	this.shape_2053 = new cjs.Shape();
	this.shape_2053.graphics.f("#865032").s().p("ADPC8QlWgkivjaQA1AAAWgYQAdgnAAhCQDYAFB0BkQAgAYAxAAQA4AAARAYQAfAqAABDIAACBQgwAAg4gIg");
	this.shape_2053.setTransform(7402.825,2336.775);

	this.shape_2054 = new cjs.Shape();
	this.shape_2054.graphics.f("#865133").s().p("AkCAzQDvBIgXjLQgHg9AAhEQBjBEByAvQAsARAzAAIAACAQAABBgdAnQgWAYg2AAQgzAAgwANQhLASg5AAQisAAgJifg");
	this.shape_2054.setTransform(7356.25,2312.1063);

	this.shape_2055 = new cjs.Shape();
	this.shape_2055.graphics.f("#9B613C").s().p("EAjkAFHQgzAAgsgWQtummxNjRQAAhAgHAAQnLhBnQAAIAACBQg2AAgiAaUgYSARUgnKACmIjWAFQEOnCt4lQIAAiBQGZmBIWjzQAqgUA1AAQILGRKfmRIg1AAIAAiDIBoAAIBmAAIE4AAIBoAAIAACDIhoAAIjPAAQHODgMDieQAJAAAAhCIAAiDQBpAABLgvQAdgSAAhAQG7kBK1hDQAFgCAAhBILTAAIBpAAQK6B5IqD6QAsAUA1AAQGWF0J5CIQAzAKAzAAQE3GEEYkeQAfglAAhBQHCJVPlBoQFlAlEOCtQCeAACBA4QAYAHAABBQAABFAIA8QAWDNjvhJQg1AAgpgRQsSlOxBgmQg2AAgpARQ1SI9zYA9QN/keItpvg");
	this.shape_2055.setTransform(6781.3179,2219.8);

	this.shape_2056 = new cjs.Shape();
	this.shape_2056.graphics.f("#4E2A14").s().p("ADXC1QhyguhkhEQAAhCgXgGQiBg4ieAAIAAiBQHqgzBtE7QAUA9AAA/QgzAAgsgRg");
	this.shape_2056.setTransform(7351.15,2284.4956);

	this.shape_2057 = new cjs.Shape();
	this.shape_2057.graphics.f("#5B351C").s().p("AqhhCIDNAAIBoAAIOlAAIBpAAQgBBCgOACQlRBBkdAAQmXAAkviFg");
	this.shape_2057.setTransform(7418.6,2011.8713);

	this.shape_2058 = new cjs.Shape();
	this.shape_2058.graphics.f("#734931").s().p("AGeBAIukAAIAAh/IOkAAIBpAAIAAB/IhpAAg");
	this.shape_2058.setTransform(7434.05,1998.775);

	this.shape_2059 = new cjs.Shape();
	this.shape_2059.graphics.f("#4D2D1A").s().p("EAFqAxvIhmAAQAAhCgdgRQhLguhpAAQkjuEoZqTQg0AAgmgYQoBkyqCi+QgxAAgzgPQjOgwjUhEQAAhCgOgCQp7ivnrkWQAAg/gggWQjsiviUkAQAEDDgEDBIAACAQgxAAgfgYQh1hkjZgEIAAiBQABhAgUg7Qhuk8nrAzIAACBQkNitlmglQvlhonCpWQAAhAgfgmQgWgbgzAAIAAiBIAAySQAzAAAWgaQAfgnAAg/QBsH0DwF+QAPAbA1AAQHHELHuDUQBUAnBpAAQKhkEKsjlQBegdBnAAQCckHC9jnQARgaA2AAQMwjqRnpWQAcgMAAhCQQ9EuMrIvQBJAxBmAAMADRAwsQAd7TEa3dQSxyUaaOkQHzESAfLrQCBkuIyoDQAlgdgBhAQbjAKHCLoQAOAbA0AAIAACBQAAA/gFAAUgiTADKgWUAOLIhoAAIjRAAQgxAAgsARQyNJcrIQnIAACBIAACFIhoAAIAAECIAACDIhnAAQCLHkB3IhQACAMA0AAQgBA/gHAAQn8BCoJAAIAACBIhoAAgEAHSApmIAACGQJ2kfp2pxIAAMKgEBdKgZXQPKETimlrQiOk2i6AAQjSAAkKGOgEBIHgffIAABCQLZhPkvAAQh9AAktANg");
	this.shape_2059.setTransform(7833.2,2297.725);

	this.shape_2060 = new cjs.Shape();
	this.shape_2060.graphics.f("#D7E5E7").s().p("AjuBcQgRgag4AAIAAiDQEtgaDhhVQAsgRA1gBQAABAgaAMQkhCCjMC3QAAhAgfgng");
	this.shape_2060.setTransform(7454.725,1829.9);

	this.shape_2061 = new cjs.Shape();
	this.shape_2061.graphics.f("#D0DAD9").s().p("AmdiCIJrAAIBnAAQA4AAARAbQAfAnAAA/QAABBgRACQjaBBiiAAQlGAAhnkFg");
	this.shape_2061.setTransform(7392.6,1849.5667);

	this.shape_2062 = new cjs.Shape();
	this.shape_2062.graphics.f("#D4E2E6").s().p("AkBCjIAAkDQDNi3E2gMIAABCQgzAAAAACQgWDFjthGIAACCQAABCgdAmQhMBahkBAIAAiBg");
	this.shape_2062.setTransform(7180.075,1924.025);

	this.shape_2063 = new cjs.Shape();
	this.shape_2063.graphics.f("#65341F").s().p("AjlDEQktAOgMjRQFxAsCtiWQAcgYAxAAQDbgFByhkQAfgYA0AAQAAA/AdAzQCWD6uFCZg");
	this.shape_2063.setTransform(9116.126,1927.3);

	this.shape_2064 = new cjs.Shape();
	this.shape_2064.graphics.f("#B7A89B").s().p("AmfAAQA2AAAWgYQAdgpAAg/IJtAAIBpAAQAABAgRAEQi+A8jRAAQgyAAggAZQhyBjjbAFIAAiBg");
	this.shape_2064.setTransform(9165.375,1901.4);

	this.shape_2065 = new cjs.Shape();
	this.shape_2065.graphics.f("#D8EFF1").s().p("AE3BDIptAAQgzAAgWgYQgggqAAhDILWAAIBpAAIAACFIhpAAg");
	this.shape_2065.setTransform(9165.375,1881.825);

	this.shape_2066 = new cjs.Shape();
	this.shape_2066.graphics.f("#D9F0FC").s().p("AA2CDIk3AAIAAiBQBdh9DagCQAzgFAwAAQAABEAgApQAWAXAzAAQAABAgdApQgWAYg2AAIhjAAg");
	this.shape_2066.setTransform(9108.475,1888.275);

	this.shape_2067 = new cjs.Shape();
	this.shape_2067.graphics.f("#C9CAC9").s().p("Ak1B9IAAiCIAAiBIBoAAIBpAAIE2AAIBkAAIAACBQgxAAgdAXQiGB1j6AAQhKAAhTgKg");
	this.shape_2067.setTransform(9092.8,1914.8964);

	this.shape_2068 = new cjs.Shape();
	this.shape_2068.graphics.f("#D5F1FC").s().p("AkmAAQgHgFAAg/QK+CJh0AAQhSAAnxhFg");
	this.shape_2068.setTransform(8666.9753,1921.1809);

	this.shape_2069 = new cjs.Shape();
	this.shape_2069.graphics.f("#5B3D2B").s().p("AhoBhIAAiAIAAiDIAAiBIBoAAQAzA/AbBMQAbA1AABEIAACAIAACBIAABCQhphChoiBg");
	this.shape_2069.setTransform(8502.075,1930.575);

	this.shape_2070 = new cjs.Shape();
	this.shape_2070.graphics.f("#895935").s().p("AjAjFIDOAAIBoAAQA0BEAdBJQAYA4AABBIhpAAIAACBQg1AAgzACIgeACQkdAABtmLg");
	this.shape_2070.setTransform(8479.7948,1894.9029);

	this.shape_2071 = new cjs.Shape();
	this.shape_2071.graphics.f("#D8E6E7").s().p("AECCCIk2AAQg0AAgpgRQh1guhjhCIAAiAQG+gWDzC9QAiAbAAA/IhoAAg");
	this.shape_2071.setTransform(8362.025,1758.3106);

	this.shape_2072 = new cjs.Shape();
	this.shape_2072.graphics.f("#926A4C").s().p("Ak1g6QBkAABLguQAdgRABhCIE1AAIBpAAIAACBQgzAAgIAUQhJDiiIAAQiNAAjSj2g");
	this.shape_2072.setTransform(8367.25,1790.0988);

	this.shape_2073 = new cjs.Shape();
	this.shape_2073.graphics.f("#DAEFF4").s().p("AE6CLIhpAAIAAhAQnUAZiZjcQIihJD4DqQAfAiAABAIhjAAg");
	this.shape_2073.setTransform(8107.925,1731.6863);

	this.shape_2074 = new cjs.Shape();
	this.shape_2074.graphics.f("#93572E").s().p("ElKeAooIAAiDIIGAAIBoAAQAABEgKAAQlxA9jzCEIAAiCgEEu/gqoIBjAAIYXAAIBmAAQAABBgMACQn0BvmOAAQn7AAlXiyg");
	this.shape_2074.setTransform(6200.225,2044.25);

	this.shape_2075 = new cjs.Shape();
	this.shape_2075.graphics.f("#784E2F").s().p("ALYBAI4WAAIAAh/IE4AAIBoAAIR2AAIBmAAIAAB/IhmAAg");
	this.shape_2075.setTransform(8232.3,1764.875);

	this.shape_2076 = new cjs.Shape();
	this.shape_2076.graphics.f("#C8D0CE").s().p("AI6BBIhmAAIx2AAIAAiAITcAAIBpAAIAACAIhpAAg");
	this.shape_2076.setTransform(8258.325,1752);

	this.shape_2077 = new cjs.Shape();
	this.shape_2077.graphics.f("#5D3921").s().p("AE2rJQhmABhJgxQsroww9ktQAABCgdAMQxmJWsxDpQg1ABgRAaQi+DnibEGQhnAAheAeQqsDkqhEDQhpAAhVgmQntjUnHkLQg2AAgOgaQjxl+hrn0IAAiBQCZk6DijuQAlglAAhCQBkg/BLhaQAdgmAAhDQA2AAAAAFQAkHKkmC7QBrI+NJmZQH6j6M4BVIAACAIhoAAIjNAAQIBDjM0ieQAOgCAAhDIAAiAQUwkhT1lcQAugNA0AAQDODbIJhSQA1gHAxgBQQxgpNukVQAUgHAAhAQfTBTPsRCQW9G6BVzKQBpCCBoBBIAAhCQCvBEgWFEIA2AAQAADCAuC3QAFAPAwAAQAvG/CNFUQAWA4AABBQg0AAgOgaQnCro7jgKQAABAgkAcQoyIEiBEtQgfrqnzkSQ6aukyxSUQkaXbgdbUMgDRgwsg");
	this.shape_2077.setTransform(7838.425,2141.75);

	this.shape_2078 = new cjs.Shape();
	this.shape_2078.graphics.f("#95562E").s().p("Am5hKILRAAIBpAAQA1AAAAAHQAdCOjWAAQjcAAnaiVg");
	this.shape_2078.setTransform(7976.0716,1753.051);

	this.shape_2079 = new cjs.Shape();
	this.shape_2079.graphics.f("#71492B").s().p("AFpBCIrRAAQg2AAgWgZQgdgnAAhDIM6AAIBpAAIAACDIhpAAg");
	this.shape_2079.setTransform(7968,1738.975);

	this.shape_2080 = new cjs.Shape();
	this.shape_2080.graphics.f("#BECAC7").s().p("AFpBAIs6AAIAAh/QHTAAHJA/QAHAAAABAIhpAAg");
	this.shape_2080.setTransform(7968,1725.975);

	this.shape_2081 = new cjs.Shape();
	this.shape_2081.graphics.f("#C1B8B2").s().p("AmfgKIAAiBIBpAAIBoAAQCZDcHVgYIAAA/Qg2AAgzAFQh0APhlAAQlKAAiziWg");
	this.shape_2081.setTransform(8087.275,1733.5107);

	this.shape_2082 = new cjs.Shape();
	this.shape_2082.graphics.f("#875737").s().p("EBQNAVcQvsxB/UhTQABA/gUAIQtuEVwzApQABg/gKgFQmWg9mdAAQgzAAguANQz1Fb0wEiIhpAAIulAAQs5hVn5D6QtKGYhqo9QEmi8glnJQAAgFg1AAIAAiDQDuBHAWjFQAAgDAzAAQKFliLFkSQAvgUA1AAQCaGIKQjDQARgCAAhCQDMi2EhiEQAbgMAAg/QEyhCElh5QAXgIABhEQGJiDIaACIBoAAQMIAAMHg/QADAAAAhBQBpAABKgvQAdgRABhBQIlBEEmivQAlgZA1AAQAABEAdAnQAWAZA2AAQOqEog6khQAAgHg2AAIAAiEIDRAAIBmAAQDqDFHug8QAygFA2AAIBoAAIBkAAIE4AAIBoAAIAACBIhoAAIk4AAIAACAIhkAAQJlE/Rwj7QAMgCAAhCIAAiAIBoAAQBkBBB1AuQApARAzAAQAABCgdARQhMAuhjAAQGbHkCWnQQAIgUAzAAQIjE4FjHrQAfArAABAIhoAAIjPAAQhyGeFBgVQAzgDA1AAIAACDIAACBQg+OFspAAQkkAAmGh2g");
	this.shape_2082.setTransform(7822.95,1881.3695);

	this.shape_2083 = new cjs.Shape();
	this.shape_2083.graphics.f("#A68D7F").s().p("AsIg/IWoAAIBpAAQAABAgDAAQsGA/sIAAIAAh/g");
	this.shape_2083.setTransform(7729.475,1764.875);

	this.shape_2084 = new cjs.Shape();
	this.shape_2084.graphics.f("#D6E2E6").s().p("A13BHIAAiAQTSi0W0AxQA1ACAzAAQAABCgdARQhLAuhpAAIhpAAI2nAAIAACAIhpAAQoagDmKCEIAAiBg");
	this.shape_2084.setTransform(7688.15,1764.2353);

	this.shape_2085 = new cjs.Shape();
	this.shape_2085.graphics.f("#B4E7FB").s().p("AiWASQCbhICSBIg");
	this.shape_2085.setTransform(8932.675,500.275);

	this.shape_2086 = new cjs.Shape();
	this.shape_2086.graphics.f("#B7E8FD").s().p("AkYghQRiA3xiAMg");
	this.shape_2086.setTransform(8994.575,488.25);

	this.shape_2087 = new cjs.Shape();
	this.shape_2087.graphics.f("#6DAE0A").s().p("Eo6PDKBImbAAIhpAAIs/AAIhmAAQAAhBgMAAQmUhAmdAAIhnAAIoIAAQAAhBgKgDQmWg9mfAAIhnAAIhoAAQAAhBgHgDQmWhBmeAAIhoAAIhpAAQAAg/gKAAQmWhCmfAAQAAg/gIAAQmThCmgAAQAAg/gKgFQmWg9mgAAIAAiDIBpAAIBoAAUAolgL3AaEgQMQAlgaA1AAQJPwRDbsqQCDntoNAHIAAiBQDPAAC7g6QAWgHAAhCIBjAAIBpAAIBmAAQFNhfF+hhQAOgFAAg/IBnAAIBoAAIE3AAIBpAAQT6B+FoixQAYgPAAg/IBpAAILSAAIBoAAQLXAALQhCQAHAAAAg/QDPgFDMAFIBpAAQFtgFFqAFIBoAAQJ+A1FxjpQAdgRAAhCIDPAAIBpAAQGJgfEziXQAbgKAAhBQHJB3hdlyQgCgKgzAAQAAhBgPgDQnchom9haIhmAAQkCAFkHgFQAAg/gdgnQgWgbgxAAIAAg/QnVAYiZjbQCZAACEg4QAagMAAg/QCZACCegCIBkAAQGgAAGUg9QAMgFAAg/ILXAAIBoAAIEzAAIBoAAQECDdI+hVQAwgHA4AAQYDCDaJAAIBpAAIDPAAIBoAAQDPDbIIhTQAxgHA1AAQFNEVHzBmQAzANAwAAQBpEECPDpQAPAYAzAAQAACBAuBwQAIARAwAAQAABEgYA2Qo+Uc4qiBIAACBQgzAAg1AFQiaAAiegFQgzAAg1AFUgg6ABEgbDAHCIAACBQgxAAgzAHQk3A6k3A/Qg2AAgsAWQmRC3obA6IAACBIhpAAImgAAIAACBQgzAAguARUguZAQEgkUAaTIAACBQgxAAAAAHQgWDFjxhHIAACBIAACBIhoAAgEKcsANbQhEiIjYgHQAAhCgPg8QgkiEg2iFQC2uNhLyPQgChEAAhCIBmBCQDpuclPBTIAAiGMAAAgywQESEeAWoeQA21AlejbIAAiBMAAAgiiIBmA/QDpuclPBTIAAiEIAA6XQFSEhD8k8QAggnAAg/QFqgFFoAFIBpAAMAAADNCIAACBQgxAAgiAYQjTCjmsg7QAfGZJPiIQAzgKAxAAIAACBIhpAAQpWgUmzCXQAAhEgbgxg");
	this.shape_2087.setTransform(4935.125,3960.975);

	this.shape_2088 = new cjs.Shape();
	this.shape_2088.graphics.f("#70AC0E").s().p("AKgCDQlogElpAEQAAhEgTgFQmeh0i9C9QAAhEgWg1QgdhKg2hCIBpAAIU/AAIBpAAIAACAIAACFIhpAAg");
	this.shape_2088.setTransform(9253.525,2655.15);

	this.shape_2089 = new cjs.Shape();
	this.shape_2089.graphics.f("#82AA27").s().p("AJsBAI1AAAIAAh/IVAAAIBoAAIAAB/IhoAAg");
	this.shape_2089.setTransform(9258.75,2635.575);

	this.shape_2090 = new cjs.Shape();
	this.shape_2090.graphics.f("#545D01").s().p("AJsBCI1AAAIAAiDIBmAAITaAAIBoAAIAACDIhoAAg");
	this.shape_2090.setTransform(9258.75,2622.575);

	this.shape_2091 = new cjs.Shape();
	this.shape_2091.graphics.f("#5D380D").s().p("AI5BAIzaAAIAAh/ITaAAIBoAAIAAB/IhoAAg");
	this.shape_2091.setTransform(9263.85,2609.55);

	this.shape_2092 = new cjs.Shape();
	this.shape_2092.graphics.f("#6A351C").s().p("AI4GGIzaAAIAAiAQHFATDyjAQAfgYAAhBQEfilD7jIQAigYAwAAQAFFGgFFFIAACAIhoAAg");
	this.shape_2092.setTransform(9263.975,2564.075);

	this.shape_2093 = new cjs.Shape();
	this.shape_2093.graphics.f("#5E2A17").s().p("AHTEEI1CAAIhoAAIk4AAIAAiAQONAmHOmVQAcgYAxAAQIIBCIJA8QAwADA2gBQAABDggAXQjzDAnEgTIAACAIhmAAg");
	this.shape_2093.setTransform(9139.6,2577.1);

	this.shape_2094 = new cjs.Shape();
	this.shape_2094.graphics.f("#592D13").s().p("ACgGDQoIg9oJhBIAAiCQNgjjMhkWQAxgOAwAAIAAEFIAAB/QgwAAgiAYQj7DIkfClQg1AAgwgCg");
	this.shape_2094.setTransform(9243.05,2525.05);

	this.shape_2095 = new cjs.Shape();
	this.shape_2095.graphics.f("#613415").s().p("AlqAAQE3g+E2g6QAzgIA2AAQAABCgYAOQk1CSmJAfIAAiBg");
	this.shape_2095.setTransform(9243.3,2421);

	this.shape_2096 = new cjs.Shape();
	this.shape_2096.graphics.f("#51250E").s().p("AxCPPQAAhCgfgdQj7jgogC+IAACBIhpAAIjPAAIAAiBIAAiAQDZhuEXhQQAUgHAAhCQHCjWHLjiQAZgPAAhAQOujWLZmbQAogbAyAAQGLgfE0iTQAYgOABhCIGaAAIBpAAQAFFGgFFDIAACDQgxABgwAOQsjEVtfDkIAACBQgxAAgcAYQnOGWuNgnIAACBIhpAAg");
	this.shape_2096.setTransform(9108.6,2505.6);

	this.shape_2097 = new cjs.Shape();
	this.shape_2097.graphics.f("#6C391C").s().p("A3gTRIhmAAIAAiBQZAxiX4ylQAigZAxAAQAFLJgFLKIAACAIhpAAImbAAQg1AAgzAIQk3A6k4A/IAACBQgzAAgnAbQrYGbuvDWIhpAAg");
	this.shape_2097.setTransform(9170.725,2375.775);

	this.shape_2098 = new cjs.Shape();
	this.shape_2098.graphics.f("#7C4623").s().p("EgmBAt3IpuAAQAAhCARg9QA6jVpUg0QABg/gXgMQiCg1ifAAIAAiBQUQB+MUlvQAsgTAzAAQRoGas/oIQglgWg1ABIAAiCQGgqtRwAiIBpAAQD/kwHYhMQAzgJA2AAQOZ+KSA6oQFmhYAVDbQAlFDijCvQmMGxnfFtQhpRmE3AkQA2AIAzAAQHVlEHpkaQBLgsBpAAIAAECIAACGQgwAAgjAYQ35Sl5ARiIAACCQgzgBgWgYQkElUkkDrQgbDKDtgHIAABCQAAA/gXAKQiDA6idgDQgzAAgdAbQh1BhjYAIQg2AAgxgIQlxgmiXCvQg1AAgvAOQoZCXpdBhIAACBIAACBIhpAAg");
	this.shape_2098.setTransform(8942.4,2309.601);

	this.shape_2099 = new cjs.Shape();
	this.shape_2099.graphics.f("#6C391D").s().p("Eg3oAtWQhEgqgzhBUAxbgjiAoygsKQAgggAAg/QK/kdLvjiQAugMA2AAQAABEgIBAQgRDTi2AuIAACGQyAapuZeJQg2AAgzAJQnYBMj/EwIhpAAQxxgimgKtIAACBIhoAAIhmAAIAACEQgzAAgsAUQsUFu0Qh+IAACBQgzAAgigWg");
	this.shape_2099.setTransform(8901.2,2258.7);

	this.shape_2100 = new cjs.Shape();
	this.shape_2100.graphics.f("#7E4521").s().p("An4bTQk3glBpxmQHflsGLmwQCjivgllDQgVjbllBYIAAiGQC1gvARjTQAIg/AAhEQGWgxCZlBQAMgUAxABMAAAAqlIAACFQhpAAhLAsQnpEanUFDQgzABg2gIg");
	this.shape_2100.setTransform(9257.4359,2102.85);

	this.shape_2101 = new cjs.Shape();
	this.shape_2101.graphics.f("#5D2E17").s().p("EgLVA31Mgm1AAAIAAhBQRwAYE8jZIjRAAIjPAAQBckmNKEmIAzAAQkTnGzOhEQAABEgDAAQwVBkpjHkIAACAIhmAAQAAhCgHABQpqhApsABIAACAIhmAAIhoAAQg2AAgTgbQiBigjWhHQAAhEgggkQkolcjAnMIAAiDIAAkCIBoAAQF0FHHws5QFmpPLojTQGfAAGWg/QAKgBAAhBQWdktbvApIBpAAQVYr5UvsdQG7A1A/k+QAPg9AAhBQKBoaMNmmQAdgNAAhCIAAiDQErBQA7jFQACgOA4AAQOGiZiXj6Qgdg0AAg/QDRAAC+g9QARgFAAg/IGgAAIBoAAQE3E6FNkiQAegYAwAAIAAECIAACDQgwAAgMAUQiaFAmWAxQg1AAguANQrwDhq+EdQAAA/ggAgUgozAsKgxbAjiQAzBCBEApQAiAWAzAAQCfAACDA1QAWAMAAA/IhpAAIjPAAQhGFmF+gfIAABBIhpAAg");
	this.shape_2101.setTransform(8646.875,2245.8);

	this.shape_2102 = new cjs.Shape();
	this.shape_2102.graphics.f("#623220").s().p("AloAyQFPhoEliIQAtgWAwAAIAACBIAACFQgxAAgdAYQigCLiZAAQioAAiiijg");
	this.shape_2102.setTransform(9295.1,1883.5437);

	this.shape_2103 = new cjs.Shape();
	this.shape_2103.graphics.f("#C0BEBC").s().p("AjMDEImgAAIAAiGQIUiiJihXQAzgIAwAAIAACBQgwAAgsAWQkmCHlPBpIhoAAg");
	this.shape_2103.setTransform(9269.075,1868.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2103},{t:this.shape_2102},{t:this.shape_2101},{t:this.shape_2100},{t:this.shape_2099},{t:this.shape_2098},{t:this.shape_2097},{t:this.shape_2096},{t:this.shape_2095},{t:this.shape_2094},{t:this.shape_2093},{t:this.shape_2092},{t:this.shape_2091},{t:this.shape_2090},{t:this.shape_2089},{t:this.shape_2088},{t:this.shape_2087},{t:this.shape_2086},{t:this.shape_2085},{t:this.shape_2084},{t:this.shape_2083},{t:this.shape_2082},{t:this.shape_2081},{t:this.shape_2080},{t:this.shape_2079},{t:this.shape_2078},{t:this.shape_2077},{t:this.shape_2076},{t:this.shape_2075},{t:this.shape_2074},{t:this.shape_2073},{t:this.shape_2072},{t:this.shape_2071},{t:this.shape_2070},{t:this.shape_2069},{t:this.shape_2068},{t:this.shape_2067},{t:this.shape_2066},{t:this.shape_2065},{t:this.shape_2064},{t:this.shape_2063},{t:this.shape_2062},{t:this.shape_2061},{t:this.shape_2060},{t:this.shape_2059},{t:this.shape_2058},{t:this.shape_2057},{t:this.shape_2056},{t:this.shape_2055},{t:this.shape_2054},{t:this.shape_2053},{t:this.shape_2052},{t:this.shape_2051},{t:this.shape_2050},{t:this.shape_2049},{t:this.shape_2048},{t:this.shape_2047},{t:this.shape_2046},{t:this.shape_2045},{t:this.shape_2044},{t:this.shape_2043},{t:this.shape_2042},{t:this.shape_2041},{t:this.shape_2040},{t:this.shape_2039},{t:this.shape_2038},{t:this.shape_2037},{t:this.shape_2036},{t:this.shape_2035},{t:this.shape_2034},{t:this.shape_2033},{t:this.shape_2032},{t:this.shape_2031},{t:this.shape_2030},{t:this.shape_2029},{t:this.shape_2028},{t:this.shape_2027},{t:this.shape_2026},{t:this.shape_2025},{t:this.shape_2024},{t:this.shape_2023},{t:this.shape_2022},{t:this.shape_2021},{t:this.shape_2020},{t:this.shape_2019},{t:this.shape_2018},{t:this.shape_2017},{t:this.shape_2016},{t:this.shape_2015},{t:this.shape_2014},{t:this.shape_2013},{t:this.shape_2012},{t:this.shape_2011},{t:this.shape_2010},{t:this.shape_2009},{t:this.shape_2008},{t:this.shape_2007},{t:this.shape_2006},{t:this.shape_2005},{t:this.shape_2004},{t:this.shape_2003},{t:this.shape_2002},{t:this.shape_2001},{t:this.shape_2000},{t:this.shape_1999},{t:this.shape_1998},{t:this.shape_1997},{t:this.shape_1996},{t:this.shape_1995},{t:this.shape_1994},{t:this.shape_1993},{t:this.shape_1992},{t:this.shape_1991},{t:this.shape_1990},{t:this.shape_1989},{t:this.shape_1988},{t:this.shape_1987},{t:this.shape_1986},{t:this.shape_1985},{t:this.shape_1984},{t:this.shape_1983},{t:this.shape_1982},{t:this.shape_1981},{t:this.shape_1980},{t:this.shape_1979},{t:this.shape_1978},{t:this.shape_1977},{t:this.shape_1976},{t:this.shape_1975},{t:this.shape_1974},{t:this.shape_1973},{t:this.shape_1972},{t:this.shape_1971},{t:this.shape_1970},{t:this.shape_1969},{t:this.shape_1968},{t:this.shape_1967},{t:this.shape_1966},{t:this.shape_1965},{t:this.shape_1964},{t:this.shape_1963},{t:this.shape_1962},{t:this.shape_1961},{t:this.shape_1960},{t:this.shape_1959},{t:this.shape_1958},{t:this.shape_1957},{t:this.shape_1956},{t:this.shape_1955},{t:this.shape_1954},{t:this.shape_1953},{t:this.shape_1952},{t:this.shape_1951},{t:this.shape_1950},{t:this.shape_1949},{t:this.shape_1948},{t:this.shape_1947},{t:this.shape_1946},{t:this.shape_1945},{t:this.shape_1944},{t:this.shape_1943},{t:this.shape_1942},{t:this.shape_1941},{t:this.shape_1940},{t:this.shape_1939},{t:this.shape_1938},{t:this.shape_1937},{t:this.shape_1936},{t:this.shape_1935},{t:this.shape_1934},{t:this.shape_1933},{t:this.shape_1932},{t:this.shape_1931},{t:this.shape_1930},{t:this.shape_1929},{t:this.shape_1928},{t:this.shape_1927},{t:this.shape_1926},{t:this.shape_1925},{t:this.shape_1924},{t:this.shape_1923},{t:this.shape_1922},{t:this.shape_1921},{t:this.shape_1920},{t:this.shape_1919},{t:this.shape_1918},{t:this.shape_1917},{t:this.shape_1916},{t:this.shape_1915},{t:this.shape_1914},{t:this.shape_1913},{t:this.shape_1912},{t:this.shape_1911},{t:this.shape_1910},{t:this.shape_1909},{t:this.shape_1908},{t:this.shape_1907},{t:this.shape_1906},{t:this.shape_1905},{t:this.shape_1904},{t:this.shape_1903},{t:this.shape_1902},{t:this.shape_1901},{t:this.shape_1900},{t:this.shape_1899},{t:this.shape_1898},{t:this.shape_1897},{t:this.shape_1896},{t:this.shape_1895},{t:this.shape_1894},{t:this.shape_1893},{t:this.shape_1892},{t:this.shape_1891},{t:this.shape_1890},{t:this.shape_1889},{t:this.shape_1888},{t:this.shape_1887},{t:this.shape_1886},{t:this.shape_1885},{t:this.shape_1884},{t:this.shape_1883},{t:this.shape_1882},{t:this.shape_1881},{t:this.shape_1880},{t:this.shape_1879},{t:this.shape_1878},{t:this.shape_1877},{t:this.shape_1876},{t:this.shape_1875},{t:this.shape_1874},{t:this.shape_1873},{t:this.shape_1872},{t:this.shape_1871},{t:this.shape_1870},{t:this.shape_1869},{t:this.shape_1868},{t:this.shape_1867},{t:this.shape_1866},{t:this.shape_1865},{t:this.shape_1864},{t:this.shape_1863},{t:this.shape_1862},{t:this.shape_1861},{t:this.shape_1860},{t:this.shape_1859},{t:this.shape_1858},{t:this.shape_1857},{t:this.shape_1856},{t:this.shape_1855},{t:this.shape_1854},{t:this.shape_1853},{t:this.shape_1852},{t:this.shape_1851},{t:this.shape_1850},{t:this.shape_1849},{t:this.shape_1848},{t:this.shape_1847},{t:this.shape_1846},{t:this.shape_1845},{t:this.shape_1844},{t:this.shape_1843},{t:this.shape_1842},{t:this.shape_1841},{t:this.shape_1840},{t:this.shape_1839},{t:this.shape_1838},{t:this.shape_1837},{t:this.shape_1836},{t:this.shape_1835},{t:this.shape_1834},{t:this.shape_1833},{t:this.shape_1832},{t:this.shape_1831},{t:this.shape_1830},{t:this.shape_1829},{t:this.shape_1828},{t:this.shape_1827},{t:this.shape_1826},{t:this.shape_1825},{t:this.shape_1824},{t:this.shape_1823},{t:this.shape_1822},{t:this.shape_1821},{t:this.shape_1820},{t:this.shape_1819},{t:this.shape_1818},{t:this.shape_1817},{t:this.shape_1816},{t:this.shape_1815},{t:this.shape_1814},{t:this.shape_1813},{t:this.shape_1812},{t:this.shape_1811},{t:this.shape_1810},{t:this.shape_1809},{t:this.shape_1808},{t:this.shape_1807},{t:this.shape_1806},{t:this.shape_1805},{t:this.shape_1804},{t:this.shape_1803},{t:this.shape_1802},{t:this.shape_1801},{t:this.shape_1800},{t:this.shape_1799},{t:this.shape_1798},{t:this.shape_1797},{t:this.shape_1796},{t:this.shape_1795},{t:this.shape_1794},{t:this.shape_1793},{t:this.shape_1792},{t:this.shape_1791},{t:this.shape_1790},{t:this.shape_1789},{t:this.shape_1788},{t:this.shape_1787},{t:this.shape_1786},{t:this.shape_1785},{t:this.shape_1784},{t:this.shape_1783},{t:this.shape_1782},{t:this.shape_1781},{t:this.shape_1780},{t:this.shape_1779},{t:this.shape_1778},{t:this.shape_1777},{t:this.shape_1776},{t:this.shape_1775},{t:this.shape_1774},{t:this.shape_1773},{t:this.shape_1772},{t:this.shape_1771},{t:this.shape_1770},{t:this.shape_1769},{t:this.shape_1768},{t:this.shape_1767},{t:this.shape_1766},{t:this.shape_1765},{t:this.shape_1764},{t:this.shape_1763},{t:this.shape_1762},{t:this.shape_1761},{t:this.shape_1760},{t:this.shape_1759},{t:this.shape_1758},{t:this.shape_1757},{t:this.shape_1756},{t:this.shape_1755},{t:this.shape_1754},{t:this.shape_1753},{t:this.shape_1752},{t:this.shape_1751},{t:this.shape_1750},{t:this.shape_1749},{t:this.shape_1748},{t:this.shape_1747},{t:this.shape_1746},{t:this.shape_1745},{t:this.shape_1744},{t:this.shape_1743},{t:this.shape_1742},{t:this.shape_1741},{t:this.shape_1740},{t:this.shape_1739},{t:this.shape_1738},{t:this.shape_1737},{t:this.shape_1736},{t:this.shape_1735},{t:this.shape_1734},{t:this.shape_1733},{t:this.shape_1732},{t:this.shape_1731},{t:this.shape_1730},{t:this.shape_1729},{t:this.shape_1728},{t:this.shape_1727},{t:this.shape_1726},{t:this.shape_1725},{t:this.shape_1724},{t:this.shape_1723},{t:this.shape_1722},{t:this.shape_1721},{t:this.shape_1720},{t:this.shape_1719},{t:this.shape_1718},{t:this.shape_1717},{t:this.shape_1716},{t:this.shape_1715},{t:this.shape_1714},{t:this.shape_1713},{t:this.shape_1712},{t:this.shape_1711},{t:this.shape_1710},{t:this.shape_1709},{t:this.shape_1708},{t:this.shape_1707},{t:this.shape_1706},{t:this.shape_1705},{t:this.shape_1704},{t:this.shape_1703},{t:this.shape_1702},{t:this.shape_1701},{t:this.shape_1700},{t:this.shape_1699},{t:this.shape_1698},{t:this.shape_1697},{t:this.shape_1696},{t:this.shape_1695},{t:this.shape_1694},{t:this.shape_1693},{t:this.shape_1692},{t:this.shape_1691},{t:this.shape_1690},{t:this.shape_1689},{t:this.shape_1688},{t:this.shape_1687},{t:this.shape_1686},{t:this.shape_1685},{t:this.shape_1684},{t:this.shape_1683},{t:this.shape_1682},{t:this.shape_1681},{t:this.shape_1680},{t:this.shape_1679},{t:this.shape_1678},{t:this.shape_1677},{t:this.shape_1676},{t:this.shape_1675},{t:this.shape_1674},{t:this.shape_1673},{t:this.shape_1672},{t:this.shape_1671},{t:this.shape_1670},{t:this.shape_1669},{t:this.shape_1668},{t:this.shape_1667},{t:this.shape_1666},{t:this.shape_1665},{t:this.shape_1664},{t:this.shape_1663},{t:this.shape_1662},{t:this.shape_1661},{t:this.shape_1660},{t:this.shape_1659},{t:this.shape_1658},{t:this.shape_1657},{t:this.shape_1656},{t:this.shape_1655},{t:this.shape_1654},{t:this.shape_1653},{t:this.shape_1652},{t:this.shape_1651},{t:this.shape_1650},{t:this.shape_1649},{t:this.shape_1648},{t:this.shape_1647},{t:this.shape_1646},{t:this.shape_1645},{t:this.shape_1644},{t:this.shape_1643},{t:this.shape_1642},{t:this.shape_1641},{t:this.shape_1640},{t:this.shape_1639},{t:this.shape_1638},{t:this.shape_1637},{t:this.shape_1636},{t:this.shape_1635},{t:this.shape_1634},{t:this.shape_1633},{t:this.shape_1632},{t:this.shape_1631},{t:this.shape_1630},{t:this.shape_1629},{t:this.shape_1628},{t:this.shape_1627},{t:this.shape_1626},{t:this.shape_1625},{t:this.shape_1624},{t:this.shape_1623},{t:this.shape_1622},{t:this.shape_1621},{t:this.shape_1620},{t:this.shape_1619},{t:this.shape_1618},{t:this.shape_1617},{t:this.shape_1616},{t:this.shape_1615},{t:this.shape_1614},{t:this.shape_1613},{t:this.shape_1612},{t:this.shape_1611},{t:this.shape_1610},{t:this.shape_1609},{t:this.shape_1608},{t:this.shape_1607},{t:this.shape_1606},{t:this.shape_1605},{t:this.shape_1604},{t:this.shape_1603},{t:this.shape_1602},{t:this.shape_1601},{t:this.shape_1600},{t:this.shape_1599},{t:this.shape_1598},{t:this.shape_1597},{t:this.shape_1596},{t:this.shape_1595},{t:this.shape_1594},{t:this.shape_1593},{t:this.shape_1592},{t:this.shape_1591},{t:this.shape_1590},{t:this.shape_1589},{t:this.shape_1588},{t:this.shape_1587},{t:this.shape_1586},{t:this.shape_1585},{t:this.shape_1584},{t:this.shape_1583},{t:this.shape_1582},{t:this.shape_1581},{t:this.shape_1580},{t:this.shape_1579},{t:this.shape_1578},{t:this.shape_1577},{t:this.shape_1576},{t:this.shape_1575},{t:this.shape_1574},{t:this.shape_1573},{t:this.shape_1572},{t:this.shape_1571},{t:this.shape_1570},{t:this.shape_1569},{t:this.shape_1568},{t:this.shape_1567},{t:this.shape_1566},{t:this.shape_1565},{t:this.shape_1564},{t:this.shape_1563},{t:this.shape_1562},{t:this.shape_1561},{t:this.shape_1560},{t:this.shape_1559},{t:this.shape_1558},{t:this.shape_1557},{t:this.shape_1556},{t:this.shape_1555},{t:this.shape_1554},{t:this.shape_1553},{t:this.shape_1552},{t:this.shape_1551},{t:this.shape_1550},{t:this.shape_1549},{t:this.shape_1548},{t:this.shape_1547},{t:this.shape_1546},{t:this.shape_1545},{t:this.shape_1544},{t:this.shape_1543},{t:this.shape_1542},{t:this.shape_1541},{t:this.shape_1540},{t:this.shape_1539},{t:this.shape_1538},{t:this.shape_1537},{t:this.shape_1536},{t:this.shape_1535},{t:this.shape_1534},{t:this.shape_1533},{t:this.shape_1532},{t:this.shape_1531},{t:this.shape_1530},{t:this.shape_1529},{t:this.shape_1528},{t:this.shape_1527},{t:this.shape_1526},{t:this.shape_1525},{t:this.shape_1524},{t:this.shape_1523},{t:this.shape_1522},{t:this.shape_1521},{t:this.shape_1520},{t:this.shape_1519},{t:this.shape_1518},{t:this.shape_1517},{t:this.shape_1516},{t:this.shape_1515},{t:this.shape_1514},{t:this.shape_1513},{t:this.shape_1512},{t:this.shape_1511},{t:this.shape_1510},{t:this.shape_1509},{t:this.shape_1508},{t:this.shape_1507},{t:this.shape_1506},{t:this.shape_1505},{t:this.shape_1504},{t:this.shape_1503},{t:this.shape_1502},{t:this.shape_1501},{t:this.shape_1500},{t:this.shape_1499},{t:this.shape_1498},{t:this.shape_1497},{t:this.shape_1496},{t:this.shape_1495},{t:this.shape_1494},{t:this.shape_1493},{t:this.shape_1492},{t:this.shape_1491},{t:this.shape_1490},{t:this.shape_1489},{t:this.shape_1488},{t:this.shape_1487},{t:this.shape_1486},{t:this.shape_1485},{t:this.shape_1484},{t:this.shape_1483},{t:this.shape_1482},{t:this.shape_1481},{t:this.shape_1480},{t:this.shape_1479},{t:this.shape_1478},{t:this.shape_1477},{t:this.shape_1476},{t:this.shape_1475},{t:this.shape_1474},{t:this.shape_1473},{t:this.shape_1472},{t:this.shape_1471},{t:this.shape_1470},{t:this.shape_1469},{t:this.shape_1468},{t:this.shape_1467},{t:this.shape_1466},{t:this.shape_1465},{t:this.shape_1464},{t:this.shape_1463},{t:this.shape_1462},{t:this.shape_1461},{t:this.shape_1460},{t:this.shape_1459},{t:this.shape_1458},{t:this.shape_1457},{t:this.shape_1456},{t:this.shape_1455},{t:this.shape_1454},{t:this.shape_1453},{t:this.shape_1452},{t:this.shape_1451},{t:this.shape_1450},{t:this.shape_1449},{t:this.shape_1448},{t:this.shape_1447},{t:this.shape_1446},{t:this.shape_1445},{t:this.shape_1444},{t:this.shape_1443},{t:this.shape_1442},{t:this.shape_1441},{t:this.shape_1440},{t:this.shape_1439},{t:this.shape_1438},{t:this.shape_1437},{t:this.shape_1436},{t:this.shape_1435},{t:this.shape_1434},{t:this.shape_1433},{t:this.shape_1432},{t:this.shape_1431},{t:this.shape_1430},{t:this.shape_1429},{t:this.shape_1428},{t:this.shape_1427},{t:this.shape_1426},{t:this.shape_1425},{t:this.shape_1424},{t:this.shape_1423},{t:this.shape_1422},{t:this.shape_1421},{t:this.shape_1420},{t:this.shape_1419},{t:this.shape_1418},{t:this.shape_1417},{t:this.shape_1416},{t:this.shape_1415},{t:this.shape_1414},{t:this.shape_1413},{t:this.shape_1412},{t:this.shape_1411},{t:this.shape_1410},{t:this.shape_1409},{t:this.shape_1408},{t:this.shape_1407},{t:this.shape_1406},{t:this.shape_1405},{t:this.shape_1404},{t:this.shape_1403},{t:this.shape_1402},{t:this.shape_1401},{t:this.shape_1400},{t:this.shape_1399},{t:this.shape_1398},{t:this.shape_1397},{t:this.shape_1396},{t:this.shape_1395},{t:this.shape_1394},{t:this.shape_1393},{t:this.shape_1392},{t:this.shape_1391},{t:this.shape_1390},{t:this.shape_1389},{t:this.shape_1388},{t:this.shape_1387},{t:this.shape_1386},{t:this.shape_1385},{t:this.shape_1384},{t:this.shape_1383},{t:this.shape_1382},{t:this.shape_1381},{t:this.shape_1380},{t:this.shape_1379},{t:this.shape_1378},{t:this.shape_1377},{t:this.shape_1376},{t:this.shape_1375},{t:this.shape_1374},{t:this.shape_1373},{t:this.shape_1372},{t:this.shape_1371},{t:this.shape_1370},{t:this.shape_1369},{t:this.shape_1368},{t:this.shape_1367},{t:this.shape_1366},{t:this.shape_1365},{t:this.shape_1364},{t:this.shape_1363},{t:this.shape_1362},{t:this.shape_1361},{t:this.shape_1360},{t:this.shape_1359},{t:this.shape_1358},{t:this.shape_1357},{t:this.shape_1356},{t:this.shape_1355},{t:this.shape_1354},{t:this.shape_1353},{t:this.shape_1352},{t:this.shape_1351},{t:this.shape_1350},{t:this.shape_1349},{t:this.shape_1348},{t:this.shape_1347},{t:this.shape_1346},{t:this.shape_1345},{t:this.shape_1344},{t:this.shape_1343},{t:this.shape_1342},{t:this.shape_1341},{t:this.shape_1340},{t:this.shape_1339},{t:this.shape_1338},{t:this.shape_1337},{t:this.shape_1336},{t:this.shape_1335},{t:this.shape_1334},{t:this.shape_1333},{t:this.shape_1332},{t:this.shape_1331},{t:this.shape_1330},{t:this.shape_1329},{t:this.shape_1328},{t:this.shape_1327},{t:this.shape_1326},{t:this.shape_1325},{t:this.shape_1324},{t:this.shape_1323},{t:this.shape_1322},{t:this.shape_1321},{t:this.shape_1320},{t:this.shape_1319},{t:this.shape_1318},{t:this.shape_1317},{t:this.shape_1316},{t:this.shape_1315},{t:this.shape_1314},{t:this.shape_1313},{t:this.shape_1312},{t:this.shape_1311},{t:this.shape_1310},{t:this.shape_1309},{t:this.shape_1308},{t:this.shape_1307},{t:this.shape_1306},{t:this.shape_1305},{t:this.shape_1304},{t:this.shape_1303},{t:this.shape_1302},{t:this.shape_1301},{t:this.shape_1300},{t:this.shape_1299},{t:this.shape_1298},{t:this.shape_1297},{t:this.shape_1296},{t:this.shape_1295},{t:this.shape_1294},{t:this.shape_1293},{t:this.shape_1292},{t:this.shape_1291},{t:this.shape_1290},{t:this.shape_1289},{t:this.shape_1288},{t:this.shape_1287},{t:this.shape_1286},{t:this.shape_1285},{t:this.shape_1284},{t:this.shape_1283},{t:this.shape_1282},{t:this.shape_1281},{t:this.shape_1280},{t:this.shape_1279},{t:this.shape_1278},{t:this.shape_1277},{t:this.shape_1276},{t:this.shape_1275},{t:this.shape_1274},{t:this.shape_1273},{t:this.shape_1272},{t:this.shape_1271},{t:this.shape_1270},{t:this.shape_1269},{t:this.shape_1268},{t:this.shape_1267},{t:this.shape_1266},{t:this.shape_1265},{t:this.shape_1264},{t:this.shape_1263},{t:this.shape_1262},{t:this.shape_1261},{t:this.shape_1260},{t:this.shape_1259},{t:this.shape_1258},{t:this.shape_1257},{t:this.shape_1256},{t:this.shape_1255},{t:this.shape_1254},{t:this.shape_1253},{t:this.shape_1252},{t:this.shape_1251},{t:this.shape_1250},{t:this.shape_1249},{t:this.shape_1248},{t:this.shape_1247},{t:this.shape_1246},{t:this.shape_1245},{t:this.shape_1244},{t:this.shape_1243},{t:this.shape_1242},{t:this.shape_1241},{t:this.shape_1240},{t:this.shape_1239},{t:this.shape_1238},{t:this.shape_1237},{t:this.shape_1236},{t:this.shape_1235},{t:this.shape_1234},{t:this.shape_1233},{t:this.shape_1232},{t:this.shape_1231},{t:this.shape_1230},{t:this.shape_1229},{t:this.shape_1228},{t:this.shape_1227},{t:this.shape_1226},{t:this.shape_1225},{t:this.shape_1224},{t:this.shape_1223},{t:this.shape_1222},{t:this.shape_1221},{t:this.shape_1220},{t:this.shape_1219},{t:this.shape_1218},{t:this.shape_1217},{t:this.shape_1216},{t:this.shape_1215},{t:this.shape_1214},{t:this.shape_1213},{t:this.shape_1212},{t:this.shape_1211},{t:this.shape_1210},{t:this.shape_1209},{t:this.shape_1208},{t:this.shape_1207},{t:this.shape_1206},{t:this.shape_1205},{t:this.shape_1204},{t:this.shape_1203},{t:this.shape_1202},{t:this.shape_1201},{t:this.shape_1200},{t:this.shape_1199},{t:this.shape_1198},{t:this.shape_1197},{t:this.shape_1196},{t:this.shape_1195},{t:this.shape_1194},{t:this.shape_1193},{t:this.shape_1192},{t:this.shape_1191},{t:this.shape_1190},{t:this.shape_1189},{t:this.shape_1188},{t:this.shape_1187},{t:this.shape_1186},{t:this.shape_1185},{t:this.shape_1184},{t:this.shape_1183},{t:this.shape_1182},{t:this.shape_1181},{t:this.shape_1180},{t:this.shape_1179},{t:this.shape_1178},{t:this.shape_1177},{t:this.shape_1176},{t:this.shape_1175},{t:this.shape_1174},{t:this.shape_1173},{t:this.shape_1172},{t:this.shape_1171},{t:this.shape_1170},{t:this.shape_1169},{t:this.shape_1168},{t:this.shape_1167},{t:this.shape_1166},{t:this.shape_1165},{t:this.shape_1164},{t:this.shape_1163},{t:this.shape_1162},{t:this.shape_1161},{t:this.shape_1160},{t:this.shape_1159},{t:this.shape_1158},{t:this.shape_1157},{t:this.shape_1156},{t:this.shape_1155},{t:this.shape_1154},{t:this.shape_1153},{t:this.shape_1152},{t:this.shape_1151},{t:this.shape_1150},{t:this.shape_1149},{t:this.shape_1148},{t:this.shape_1147},{t:this.shape_1146},{t:this.shape_1145},{t:this.shape_1144},{t:this.shape_1143},{t:this.shape_1142},{t:this.shape_1141},{t:this.shape_1140},{t:this.shape_1139},{t:this.shape_1138},{t:this.shape_1137},{t:this.shape_1136},{t:this.shape_1135},{t:this.shape_1134},{t:this.shape_1133},{t:this.shape_1132},{t:this.shape_1131},{t:this.shape_1130},{t:this.shape_1129},{t:this.shape_1128},{t:this.shape_1127},{t:this.shape_1126},{t:this.shape_1125},{t:this.shape_1124},{t:this.shape_1123},{t:this.shape_1122},{t:this.shape_1121},{t:this.shape_1120},{t:this.shape_1119},{t:this.shape_1118},{t:this.shape_1117},{t:this.shape_1116},{t:this.shape_1115},{t:this.shape_1114},{t:this.shape_1113},{t:this.shape_1112},{t:this.shape_1111},{t:this.shape_1110},{t:this.shape_1109},{t:this.shape_1108},{t:this.shape_1107},{t:this.shape_1106},{t:this.shape_1105},{t:this.shape_1104},{t:this.shape_1103},{t:this.shape_1102},{t:this.shape_1101},{t:this.shape_1100},{t:this.shape_1099},{t:this.shape_1098},{t:this.shape_1097},{t:this.shape_1096},{t:this.shape_1095},{t:this.shape_1094},{t:this.shape_1093},{t:this.shape_1092},{t:this.shape_1091},{t:this.shape_1090},{t:this.shape_1089},{t:this.shape_1088},{t:this.shape_1087},{t:this.shape_1086},{t:this.shape_1085},{t:this.shape_1084},{t:this.shape_1083},{t:this.shape_1082},{t:this.shape_1081},{t:this.shape_1080},{t:this.shape_1079},{t:this.shape_1078},{t:this.shape_1077},{t:this.shape_1076},{t:this.shape_1075},{t:this.shape_1074},{t:this.shape_1073},{t:this.shape_1072},{t:this.shape_1071},{t:this.shape_1070},{t:this.shape_1069},{t:this.shape_1068},{t:this.shape_1067},{t:this.shape_1066},{t:this.shape_1065},{t:this.shape_1064},{t:this.shape_1063},{t:this.shape_1062},{t:this.shape_1061},{t:this.shape_1060},{t:this.shape_1059},{t:this.shape_1058},{t:this.shape_1057},{t:this.shape_1056},{t:this.shape_1055},{t:this.shape_1054},{t:this.shape_1053},{t:this.shape_1052},{t:this.shape_1051},{t:this.shape_1050},{t:this.shape_1049},{t:this.shape_1048},{t:this.shape_1047},{t:this.shape_1046},{t:this.shape_1045},{t:this.shape_1044},{t:this.shape_1043},{t:this.shape_1042},{t:this.shape_1041},{t:this.shape_1040},{t:this.shape_1039},{t:this.shape_1038},{t:this.shape_1037},{t:this.shape_1036},{t:this.shape_1035},{t:this.shape_1034},{t:this.shape_1033},{t:this.shape_1032},{t:this.shape_1031},{t:this.shape_1030},{t:this.shape_1029},{t:this.shape_1028},{t:this.shape_1027},{t:this.shape_1026},{t:this.shape_1025},{t:this.shape_1024},{t:this.shape_1023},{t:this.shape_1022},{t:this.shape_1021},{t:this.shape_1020},{t:this.shape_1019},{t:this.shape_1018},{t:this.shape_1017},{t:this.shape_1016},{t:this.shape_1015},{t:this.shape_1014},{t:this.shape_1013},{t:this.shape_1012},{t:this.shape_1011},{t:this.shape_1010},{t:this.shape_1009},{t:this.shape_1008},{t:this.shape_1007},{t:this.shape_1006},{t:this.shape_1005},{t:this.shape_1004},{t:this.shape_1003},{t:this.shape_1002},{t:this.shape_1001},{t:this.shape_1000},{t:this.shape_999},{t:this.shape_998},{t:this.shape_997},{t:this.shape_996},{t:this.shape_995},{t:this.shape_994},{t:this.shape_993},{t:this.shape_992},{t:this.shape_991},{t:this.shape_990},{t:this.shape_989},{t:this.shape_988},{t:this.shape_987},{t:this.shape_986},{t:this.shape_985},{t:this.shape_984},{t:this.shape_983},{t:this.shape_982},{t:this.shape_981},{t:this.shape_980},{t:this.shape_979},{t:this.shape_978},{t:this.shape_977},{t:this.shape_976},{t:this.shape_975},{t:this.shape_974},{t:this.shape_973},{t:this.shape_972},{t:this.shape_971},{t:this.shape_970},{t:this.shape_969},{t:this.shape_968},{t:this.shape_967},{t:this.shape_966},{t:this.shape_965},{t:this.shape_964},{t:this.shape_963},{t:this.shape_962},{t:this.shape_961},{t:this.shape_960},{t:this.shape_959},{t:this.shape_958},{t:this.shape_957},{t:this.shape_956},{t:this.shape_955},{t:this.shape_954},{t:this.shape_953},{t:this.shape_952},{t:this.shape_951},{t:this.shape_950},{t:this.shape_949},{t:this.shape_948},{t:this.shape_947},{t:this.shape_946},{t:this.shape_945},{t:this.shape_944},{t:this.shape_943},{t:this.shape_942},{t:this.shape_941},{t:this.shape_940},{t:this.shape_939},{t:this.shape_938},{t:this.shape_937},{t:this.shape_936},{t:this.shape_935},{t:this.shape_934},{t:this.shape_933},{t:this.shape_932},{t:this.shape_931},{t:this.shape_930},{t:this.shape_929},{t:this.shape_928},{t:this.shape_927},{t:this.shape_926},{t:this.shape_925},{t:this.shape_924},{t:this.shape_923},{t:this.shape_922},{t:this.shape_921},{t:this.shape_920},{t:this.shape_919},{t:this.shape_918},{t:this.shape_917},{t:this.shape_916},{t:this.shape_915},{t:this.shape_914},{t:this.shape_913},{t:this.shape_912},{t:this.shape_911},{t:this.shape_910},{t:this.shape_909},{t:this.shape_908},{t:this.shape_907},{t:this.shape_906},{t:this.shape_905},{t:this.shape_904},{t:this.shape_903},{t:this.shape_902},{t:this.shape_901},{t:this.shape_900},{t:this.shape_899},{t:this.shape_898},{t:this.shape_897},{t:this.shape_896},{t:this.shape_895},{t:this.shape_894},{t:this.shape_893},{t:this.shape_892},{t:this.shape_891},{t:this.shape_890},{t:this.shape_889},{t:this.shape_888},{t:this.shape_887},{t:this.shape_886},{t:this.shape_885},{t:this.shape_884},{t:this.shape_883},{t:this.shape_882},{t:this.shape_881},{t:this.shape_880},{t:this.shape_879},{t:this.shape_878},{t:this.shape_877},{t:this.shape_876},{t:this.shape_875},{t:this.shape_874},{t:this.shape_873},{t:this.shape_872},{t:this.shape_871},{t:this.shape_870},{t:this.shape_869},{t:this.shape_868},{t:this.shape_867},{t:this.shape_866},{t:this.shape_865},{t:this.shape_864},{t:this.shape_863},{t:this.shape_862},{t:this.shape_861},{t:this.shape_860},{t:this.shape_859},{t:this.shape_858},{t:this.shape_857},{t:this.shape_856},{t:this.shape_855},{t:this.shape_854},{t:this.shape_853},{t:this.shape_852},{t:this.shape_851},{t:this.shape_850},{t:this.shape_849},{t:this.shape_848},{t:this.shape_847},{t:this.shape_846},{t:this.shape_845},{t:this.shape_844},{t:this.shape_843},{t:this.shape_842},{t:this.shape_841},{t:this.shape_840},{t:this.shape_839},{t:this.shape_838},{t:this.shape_837},{t:this.shape_836},{t:this.shape_835},{t:this.shape_834},{t:this.shape_833},{t:this.shape_832},{t:this.shape_831},{t:this.shape_830},{t:this.shape_829},{t:this.shape_828},{t:this.shape_827},{t:this.shape_826},{t:this.shape_825},{t:this.shape_824},{t:this.shape_823},{t:this.shape_822},{t:this.shape_821},{t:this.shape_820},{t:this.shape_819},{t:this.shape_818},{t:this.shape_817},{t:this.shape_816},{t:this.shape_815},{t:this.shape_814},{t:this.shape_813},{t:this.shape_812},{t:this.shape_811},{t:this.shape_810},{t:this.shape_809},{t:this.shape_808},{t:this.shape_807},{t:this.shape_806},{t:this.shape_805},{t:this.shape_804},{t:this.shape_803},{t:this.shape_802},{t:this.shape_801},{t:this.shape_800},{t:this.shape_799},{t:this.shape_798},{t:this.shape_797},{t:this.shape_796},{t:this.shape_795},{t:this.shape_794},{t:this.shape_793},{t:this.shape_792},{t:this.shape_791},{t:this.shape_790},{t:this.shape_789},{t:this.shape_788},{t:this.shape_787},{t:this.shape_786},{t:this.shape_785},{t:this.shape_784},{t:this.shape_783},{t:this.shape_782},{t:this.shape_781},{t:this.shape_780},{t:this.shape_779},{t:this.shape_778},{t:this.shape_777},{t:this.shape_776},{t:this.shape_775},{t:this.shape_774},{t:this.shape_773},{t:this.shape_772},{t:this.shape_771},{t:this.shape_770},{t:this.shape_769},{t:this.shape_768},{t:this.shape_767},{t:this.shape_766},{t:this.shape_765},{t:this.shape_764},{t:this.shape_763},{t:this.shape_762},{t:this.shape_761},{t:this.shape_760},{t:this.shape_759},{t:this.shape_758},{t:this.shape_757},{t:this.shape_756},{t:this.shape_755},{t:this.shape_754},{t:this.shape_753},{t:this.shape_752},{t:this.shape_751},{t:this.shape_750},{t:this.shape_749},{t:this.shape_748},{t:this.shape_747},{t:this.shape_746},{t:this.shape_745},{t:this.shape_744},{t:this.shape_743},{t:this.shape_742},{t:this.shape_741},{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716},{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1051},{t:this.shape_1050},{t:this.shape_1049},{t:this.shape_1048},{t:this.shape_1047},{t:this.shape_1045},{t:this.shape_1046},{t:this.shape_1044},{t:this.shape_1043},{t:this.shape_1042},{t:this.shape_1041},{t:this.shape_1040},{t:this.shape_1039},{t:this.shape_1038},{t:this.shape_1037},{t:this.shape_1036},{t:this.shape_1035},{t:this.shape_1034},{t:this.shape_1033},{t:this.shape_1032},{t:this.shape_1031},{t:this.shape_1030},{t:this.shape_1029},{t:this.shape_1028},{t:this.shape_1027},{t:this.shape_1026},{t:this.shape_1025},{t:this.shape_1024},{t:this.shape_1023},{t:this.shape_1022},{t:this.shape_1021},{t:this.shape_1020},{t:this.shape_1019},{t:this.shape_1018},{t:this.shape_1017},{t:this.shape_1016},{t:this.shape_1015},{t:this.shape_1014},{t:this.shape_1013},{t:this.shape_1012},{t:this.shape_1009},{t:this.shape_1011},{t:this.shape_1010},{t:this.shape_1008},{t:this.shape_1007},{t:this.shape_1005},{t:this.shape_1006},{t:this.shape_1004},{t:this.shape_1003},{t:this.shape_1002},{t:this.shape_1001},{t:this.shape_1000},{t:this.shape_999},{t:this.shape_998},{t:this.shape_997},{t:this.shape_996},{t:this.shape_994},{t:this.shape_995},{t:this.shape_993},{t:this.shape_991},{t:this.shape_992},{t:this.shape_990},{t:this.shape_989},{t:this.shape_988},{t:this.shape_987},{t:this.shape_986},{t:this.shape_985},{t:this.shape_984},{t:this.shape_983},{t:this.shape_982},{t:this.shape_981},{t:this.shape_980},{t:this.shape_979},{t:this.shape_978},{t:this.shape_977},{t:this.shape_976},{t:this.shape_975},{t:this.shape_974},{t:this.shape_973},{t:this.shape_972},{t:this.shape_971},{t:this.shape_970},{t:this.shape_969},{t:this.shape_968},{t:this.shape_967},{t:this.shape_966},{t:this.shape_965},{t:this.shape_964},{t:this.shape_963},{t:this.shape_962},{t:this.shape_961},{t:this.shape_960},{t:this.shape_959},{t:this.shape_958},{t:this.shape_957},{t:this.shape_956},{t:this.shape_955},{t:this.shape_954},{t:this.shape_953},{t:this.shape_952},{t:this.shape_951},{t:this.shape_950},{t:this.shape_949},{t:this.shape_948},{t:this.shape_947},{t:this.shape_946},{t:this.shape_945},{t:this.shape_944},{t:this.shape_943},{t:this.shape_942},{t:this.shape_941},{t:this.shape_940},{t:this.shape_939},{t:this.shape_938},{t:this.shape_937},{t:this.shape_936},{t:this.shape_935},{t:this.shape_934},{t:this.shape_933},{t:this.shape_932},{t:this.shape_931},{t:this.shape_930},{t:this.shape_929},{t:this.shape_928},{t:this.shape_927},{t:this.shape_926},{t:this.shape_925},{t:this.shape_924},{t:this.shape_923},{t:this.shape_922},{t:this.shape_920},{t:this.shape_921},{t:this.shape_918},{t:this.shape_919},{t:this.shape_917},{t:this.shape_916},{t:this.shape_915},{t:this.shape_914},{t:this.shape_913},{t:this.shape_912},{t:this.shape_911},{t:this.shape_910},{t:this.shape_909},{t:this.shape_908},{t:this.shape_907},{t:this.shape_906},{t:this.shape_905},{t:this.shape_904},{t:this.shape_903},{t:this.shape_901},{t:this.shape_902},{t:this.shape_900},{t:this.shape_899},{t:this.shape_898},{t:this.shape_897},{t:this.shape_896},{t:this.shape_894},{t:this.shape_895},{t:this.shape_893},{t:this.shape_892},{t:this.shape_891},{t:this.shape_890},{t:this.shape_889},{t:this.shape_888},{t:this.shape_887},{t:this.shape_886},{t:this.shape_884},{t:this.shape_885},{t:this.shape_883},{t:this.shape_882},{t:this.shape_881},{t:this.shape_880},{t:this.shape_879},{t:this.shape_878},{t:this.shape_876},{t:this.shape_877},{t:this.shape_875},{t:this.shape_874},{t:this.shape_873},{t:this.shape_872},{t:this.shape_871},{t:this.shape_870},{t:this.shape_869},{t:this.shape_868},{t:this.shape_867},{t:this.shape_865},{t:this.shape_866},{t:this.shape_864},{t:this.shape_863},{t:this.shape_862},{t:this.shape_861},{t:this.shape_860},{t:this.shape_859},{t:this.shape_858},{t:this.shape_857},{t:this.shape_856},{t:this.shape_855},{t:this.shape_854},{t:this.shape_853},{t:this.shape_852},{t:this.shape_851},{t:this.shape_850},{t:this.shape_849},{t:this.shape_848},{t:this.shape_846},{t:this.shape_847},{t:this.shape_845},{t:this.shape_844},{t:this.shape_843},{t:this.shape_842},{t:this.shape_841},{t:this.shape_840},{t:this.shape_839},{t:this.shape_838},{t:this.shape_837},{t:this.shape_836},{t:this.shape_835},{t:this.shape_834},{t:this.shape_833},{t:this.shape_832},{t:this.shape_831},{t:this.shape_830},{t:this.shape_829},{t:this.shape_828},{t:this.shape_826},{t:this.shape_827},{t:this.shape_825},{t:this.shape_824},{t:this.shape_823},{t:this.shape_822},{t:this.shape_821},{t:this.shape_820},{t:this.shape_819},{t:this.shape_818},{t:this.shape_817},{t:this.shape_816},{t:this.shape_815},{t:this.shape_814},{t:this.shape_813},{t:this.shape_812},{t:this.shape_811},{t:this.shape_810},{t:this.shape_809},{t:this.shape_808},{t:this.shape_807},{t:this.shape_806},{t:this.shape_805},{t:this.shape_804},{t:this.shape_803},{t:this.shape_802},{t:this.shape_801},{t:this.shape_800},{t:this.shape_799},{t:this.shape_798},{t:this.shape_797},{t:this.shape_796},{t:this.shape_795},{t:this.shape_794},{t:this.shape_793},{t:this.shape_792},{t:this.shape_791},{t:this.shape_790},{t:this.shape_789},{t:this.shape_788},{t:this.shape_787},{t:this.shape_786},{t:this.shape_785},{t:this.shape_784},{t:this.shape_783},{t:this.shape_782},{t:this.shape_781},{t:this.shape_780},{t:this.shape_779},{t:this.shape_777},{t:this.shape_778},{t:this.shape_776},{t:this.shape_775},{t:this.shape_773},{t:this.shape_774},{t:this.shape_772},{t:this.shape_771},{t:this.shape_770},{t:this.shape_769},{t:this.shape_768},{t:this.shape_767},{t:this.shape_766},{t:this.shape_765},{t:this.shape_764},{t:this.shape_763},{t:this.shape_762},{t:this.shape_761},{t:this.shape_760},{t:this.shape_759},{t:this.shape_758},{t:this.shape_757},{t:this.shape_756},{t:this.shape_755},{t:this.shape_754},{t:this.shape_753},{t:this.shape_752},{t:this.shape_750},{t:this.shape_751},{t:this.shape_749},{t:this.shape_748},{t:this.shape_747},{t:this.shape_746},{t:this.shape_745},{t:this.shape_744},{t:this.shape_743},{t:this.shape_742},{t:this.shape_741},{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716},{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_702},{t:this.shape_703},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_697},{t:this.shape_698},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_675},{t:this.shape_677},{t:this.shape_676},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_662},{t:this.shape_664},{t:this.shape_663},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_645},{t:this.shape_644},{t:this.shape_646},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_629},{t:this.shape_630},{t:this.shape_627},{t:this.shape_628},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_610},{t:this.shape_611},{t:this.shape_608},{t:this.shape_609},{t:this.shape_607},{t:this.shape_606},{t:this.shape_603},{t:this.shape_605},{t:this.shape_604},{t:this.shape_601},{t:this.shape_602},{t:this.shape_600},{t:this.shape_599},{t:this.shape_597},{t:this.shape_596},{t:this.shape_598},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_590},{t:this.shape_588},{t:this.shape_591},{t:this.shape_589},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_581},{t:this.shape_582},{t:this.shape_580},{t:this.shape_579},{t:this.shape_577},{t:this.shape_578},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_545},{t:this.shape_546},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_527},{t:this.shape_528},{t:this.shape_526},{t:this.shape_524},{t:this.shape_523},{t:this.shape_525},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_513},{t:this.shape_514},{t:this.shape_511},{t:this.shape_512},{t:this.shape_510},{t:this.shape_509},{t:this.shape_507},{t:this.shape_508},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_454},{t:this.shape_455},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_449},{t:this.shape_450},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_440},{t:this.shape_442},{t:this.shape_441},{t:this.shape_443},{t:this.shape_438},{t:this.shape_439},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_416},{t:this.shape_417},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_408},{t:this.shape_409},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_402},{t:this.shape_403},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_380},{t:this.shape_381},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_368},{t:this.shape_369},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_358},{t:this.shape_359},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_320},{t:this.shape_319},{t:this.shape_321},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_304},{t:this.shape_305},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_252},{t:this.shape_253},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_184},{t:this.shape_185},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_151},{t:this.shape_153},{t:this.shape_152},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_145},{t:this.shape_146},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_123},{t:this.shape_124},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_113},{t:this.shape_115},{t:this.shape_114},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_76},{t:this.shape_77},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_15},{t:this.shape_16},{t:this.shape_14},{t:this.shape_12},{t:this.shape_13},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape},{t:this.shape_1}]},198).to({state:[]},1).wait(8));

	// sky
	this.shape_2104 = new cjs.Shape();
	this.shape_2104.graphics.f().s("#945526").ss(1,1,1).p("EioNgySMFQbAAAMAAABklMlQbAAAg");
	this.shape_2104.setTransform(976.175,292.2);

	this.shape_2105 = new cjs.Shape();
	this.shape_2105.graphics.lf(["#53C8F6","#E2FAFA"],[0,1],-757.1,-840.9,-757.1,227.2).s().p("EioNAyTMAAAhklMFQbAAAMAAABklg");
	this.shape_2105.setTransform(976.175,292.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2105},{t:this.shape_2104}]}).to({state:[{t:this.shape_2105},{t:this.shape_2104}]},198).to({state:[]},1).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-290.8,-30.7,9750.699999999999,5763.5);


// stage content:
(lib.TimeTale_final = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,773,1016];
	this.streamSoundSymbolsList[1] = [{id:"section1",startFrame:1,endFrame:773,loop:1,offset:0},{id:"ttwav",startFrame:1,endFrame:1017,loop:1,offset:0}];
	this.streamSoundSymbolsList[773] = [{id:"lastsc_5kq7JBn4wav",startFrame:773,endFrame:1017,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var stage=this; 
		stage.stop(); 
		
		stage.startShell.addEventListener("click",start)
		
		function start(){
			stage.gotoAndPlay(2);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("ttwav",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1017,1);
		var soundInstance = playSound("section1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,773,1);
	}
	this.frame_773 = function() {
		var soundInstance = playSound("lastsc_5kq7JBn4wav",0);
		this.InsertIntoSoundStreamData(soundInstance,773,1017,1);
	}
	this.frame_1016 = function() {
		var stage=this; 
		stage.stop(); 
		
		stage.replay.addEventListener("click",playAgain); 
		
		function playAgain(){
			stage.gotoAndPlay(2); 
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(772).call(this.frame_773).wait(243).call(this.frame_1016).wait(1));

	// buttons
	this.startShell = new lib.start();
	this.startShell.name = "startShell";
	this.startShell.setTransform(978.15,574.25);
	new cjs.ButtonHelper(this.startShell, 0, 1, 2);

	this.replay = new lib.play_again();
	this.replay.name = "replay";
	this.replay.setTransform(1216.75,824);
	new cjs.ButtonHelper(this.replay, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.startShell}]}).to({state:[]},1).to({state:[{t:this.replay}]},1015).wait(1));

	// movie
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(490.8,157.6,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(-264.6,-135.05,0.5,0.5);

	this.instance_2 = new lib.scene1("synched",0);
	this.instance_2.setTransform(894.15,883.15,1,1,0,0,0,893.4,877.7);

	this.instance_3 = new lib.scene2("synched",0,false);
	this.instance_3.setTransform(768.9,539.5,1.3654,1.3797,0,0,0,170.6,115.5);

	this.instance_4 = new lib.scene3("synched",0);
	this.instance_4.setTransform(884.8,542.55,1.3825,1.3825,0,0,0,640,381.1);

	this.instance_5 = new lib.scene4("synched",0);
	this.instance_5.setTransform(937.6,604.75,1,1,0,0,0,961.4,615.4);

	this.instance_6 = new lib.LASTSCENE("synched",0);
	this.instance_6.setTransform(979.15,499.8,1,1,0,0,0,976.1,574.3);
	this.instance_6._off = true;

	this.instance_7 = new lib.snail_walkin_12("synched",0);
	this.instance_7.setTransform(436.75,871.15,1.3231,1.3231,0,0,0,34.2,34.6);

	this.instance_8 = new lib.CachedBmp_4();
	this.instance_8.setTransform(687.25,9.25,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_3();
	this.instance_9.setTransform(-128.5,-132.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},190).to({state:[{t:this.instance_4}]},141).to({state:[{t:this.instance_5}]},261).to({state:[{t:this.instance_6}]},180).to({state:[{t:this.instance_6}]},127).to({state:[{t:this.instance_6}]},36).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]},80).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(773).to({_off:false},0).wait(127).to({mode:"single",startPosition:119},0).to({regX:975.8,regY:574.1,scaleX:2.4315,scaleY:2.4315,x:2351.05,y:-352.5,mode:"synched"},36).to({_off:true},80).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-3889.9,-1281.8,26869.600000000002,13472.4);
// library properties:
lib.properties = {
	id: 'F1A9E47821F862489AC811C173992C42',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_72.png?1650927298315", id:"CachedBmp_72"},
		{src:"images/CachedBmp_71.png?1650927298315", id:"CachedBmp_71"},
		{src:"images/CachedBmp_70.png?1650927298315", id:"CachedBmp_70"},
		{src:"images/CachedBmp_65.png?1650927298315", id:"CachedBmp_65"},
		{src:"images/CachedBmp_64.png?1650927298315", id:"CachedBmp_64"},
		{src:"images/CachedBmp_51.png?1650927298315", id:"CachedBmp_51"},
		{src:"images/CachedBmp_48.png?1650927298315", id:"CachedBmp_48"},
		{src:"images/CachedBmp_21.png?1650927298315", id:"CachedBmp_21"},
		{src:"images/CachedBmp_19.png?1650927298315", id:"CachedBmp_19"},
		{src:"images/CachedBmp_3.png?1650927298315", id:"CachedBmp_3"},
		{src:"images/CachedBmp_1.png?1650927298315", id:"CachedBmp_1"},
		{src:"images/TimeTale_final_atlas_1.png?1650927294889", id:"TimeTale_final_atlas_1"},
		{src:"images/TimeTale_final_atlas_2.png?1650927294890", id:"TimeTale_final_atlas_2"},
		{src:"images/TimeTale_final_atlas_3.png?1650927294890", id:"TimeTale_final_atlas_3"},
		{src:"images/TimeTale_final_atlas_4.png?1650927294890", id:"TimeTale_final_atlas_4"},
		{src:"images/TimeTale_final_atlas_5.png?1650927294890", id:"TimeTale_final_atlas_5"},
		{src:"images/TimeTale_final_atlas_6.png?1650927294890", id:"TimeTale_final_atlas_6"},
		{src:"images/TimeTale_final_atlas_7.png?1650927294890", id:"TimeTale_final_atlas_7"},
		{src:"images/TimeTale_final_atlas_8.png?1650927294890", id:"TimeTale_final_atlas_8"},
		{src:"images/TimeTale_final_atlas_9.png?1650927294890", id:"TimeTale_final_atlas_9"},
		{src:"images/TimeTale_final_atlas_10.png?1650927294890", id:"TimeTale_final_atlas_10"},
		{src:"images/TimeTale_final_atlas_11.png?1650927294890", id:"TimeTale_final_atlas_11"},
		{src:"images/TimeTale_final_atlas_12.png?1650927294890", id:"TimeTale_final_atlas_12"},
		{src:"images/TimeTale_final_atlas_13.png?1650927294891", id:"TimeTale_final_atlas_13"},
		{src:"images/TimeTale_final_atlas_14.png?1650927294891", id:"TimeTale_final_atlas_14"},
		{src:"images/TimeTale_final_atlas_15.png?1650927294891", id:"TimeTale_final_atlas_15"},
		{src:"images/TimeTale_final_atlas_16.png?1650927294892", id:"TimeTale_final_atlas_16"},
		{src:"sounds/lastsc_5kq7JBn4wav.mp3?1650927298315", id:"lastsc_5kq7JBn4wav"},
		{src:"sounds/section1.mp3?1650927298315", id:"section1"},
		{src:"sounds/ttwav.mp3?1650927298315", id:"ttwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F1A9E47821F862489AC811C173992C42'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;