var AUDIO_BOSS = function() {
    this.ambience_1 = {};
    this.ambience_2 = {};
    this.oneShot_1 = {};
    this.oneShot_2 = {};

    function getHowl(urls){
        return new Howl({src:urls});
    }
}
AUDIO_BOSS.prototype.loop = function(url) {
	var sound = new Howl({
		src: [url],
		autoplay: true,
		loop: true,
		volume: 0.5
	});
};
var audioBoss = new AUDIO_BOSS();
