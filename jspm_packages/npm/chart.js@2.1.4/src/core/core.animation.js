/* */ 
(function(process) {
  "use strict";
  module.exports = function(Chart) {
    var helpers = Chart.helpers;
    Chart.defaults.global.animation = {
      duration: 1000,
      easing: "easeOutQuart",
      onProgress: helpers.noop,
      onComplete: helpers.noop
    };
    Chart.Animation = Chart.Element.extend({
      currentStep: null,
      numSteps: 60,
      easing: "",
      render: null,
      onAnimationProgress: null,
      onAnimationComplete: null
    });
    Chart.animationService = {
      frameDuration: 17,
      animations: [],
      dropFrames: 0,
      request: null,
      addAnimation: function(chartInstance, animationObject, duration, lazy) {
        if (!lazy) {
          chartInstance.animating = true;
        }
        for (var index = 0; index < this.animations.length; ++index) {
          if (this.animations[index].chartInstance === chartInstance) {
            this.animations[index].animationObject = animationObject;
            return;
          }
        }
        this.animations.push({
          chartInstance: chartInstance,
          animationObject: animationObject
        });
        if (this.animations.length === 1) {
          this.requestAnimationFrame();
        }
      },
      cancelAnimation: function(chartInstance) {
        var index = helpers.findIndex(this.animations, function(animationWrapper) {
          return animationWrapper.chartInstance === chartInstance;
        });
        if (index !== -1) {
          this.animations.splice(index, 1);
          chartInstance.animating = false;
        }
      },
      requestAnimationFrame: function() {
        var me = this;
        if (me.request === null) {
          me.request = helpers.requestAnimFrame.call(window, function() {
            me.request = null;
            me.startDigest();
          });
        }
      },
      startDigest: function() {
        var startTime = Date.now();
        var framesToDrop = 0;
        if (this.dropFrames > 1) {
          framesToDrop = Math.floor(this.dropFrames);
          this.dropFrames = this.dropFrames % 1;
        }
        var i = 0;
        while (i < this.animations.length) {
          if (this.animations[i].animationObject.currentStep === null) {
            this.animations[i].animationObject.currentStep = 0;
          }
          this.animations[i].animationObject.currentStep += 1 + framesToDrop;
          if (this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps) {
            this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps;
          }
          this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject);
          if (this.animations[i].animationObject.onAnimationProgress && this.animations[i].animationObject.onAnimationProgress.call) {
            this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance, this.animations[i]);
          }
          if (this.animations[i].animationObject.currentStep === this.animations[i].animationObject.numSteps) {
            if (this.animations[i].animationObject.onAnimationComplete && this.animations[i].animationObject.onAnimationComplete.call) {
              this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance, this.animations[i]);
            }
            this.animations[i].chartInstance.animating = false;
            this.animations.splice(i, 1);
          } else {
            ++i;
          }
        }
        var endTime = Date.now();
        var dropFrames = (endTime - startTime) / this.frameDuration;
        this.dropFrames += dropFrames;
        if (this.animations.length > 0) {
          this.requestAnimationFrame();
        }
      }
    };
  };
})(require('process'));
