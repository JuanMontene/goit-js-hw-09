!function(){function e(e,n){return new Promise((function(t,o){var a=Math.random()>.3;setTimeout((function(){var c={position:e,delay:n};a?t(c):o(c)}),n)}))}document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();var t=document.querySelector('input[name="delay"]'),o=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]');!function(n,t,o){for(var a=n,c=1;c<=o;c++)e(c,a).then((function(e){var n=e.position,t=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),a+=t}(parseInt(t.value),parseInt(o.value),parseInt(a.value))}))}();
//# sourceMappingURL=03-promises.20b06ec7.js.map
