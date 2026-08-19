(function(){
  // Scroll progress bar
  var bar = document.getElementById('progressBar');
  function updateProgress(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var height = h.scrollHeight - h.clientHeight;
    var pct = height > 0 ? (scrolled / height) * 100 : 0;
    if(bar) bar.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Mobile menu toggle
  var toggle = document.getElementById('mobileToggle');
  var menu = document.getElementById('mobileMenu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');
  if(prefersReduced || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function(el){ revealObserver.observe(el); });
  }

  // Scroll-spy sidebar nav
  var navLinks = document.querySelectorAll('[data-nav]');
  var sections = document.querySelectorAll('section[id]');
  if(navLinks.length && sections.length && 'IntersectionObserver' in window){
    var spyObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var id = entry.target.getAttribute('id');
        var link = document.querySelector('[data-nav][href="#' + id + '"]');
        if(!link) return;
        if(entry.isIntersecting){
          navLinks.forEach(function(l){ l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(function(sec){ spyObserver.observe(sec); });
  }

  // Hero typed rotating tagline
  var heroEl = document.getElementById('heroTyped');
  if(heroEl){
    var heroLines = [
      'Building REST APIs in Go.',
      'Structuring PostgreSQL schemas.',
      'Documenting what I learn, one bug at a time.'
    ];
    if(prefersReduced){
      heroEl.textContent = heroLines[0];
    } else {
      (function(){
        var li = 0, ci = 0, deleting = false;
        function tick(){
          var current = heroLines[li];
          if(!deleting){
            ci++;
            heroEl.textContent = current.slice(0, ci);
            if(ci === current.length){ deleting = true; setTimeout(tick, 1500); return; }
            setTimeout(tick, 45);
          } else {
            ci--;
            heroEl.textContent = current.slice(0, ci);
            if(ci === 0){ deleting = false; li = (li + 1) % heroLines.length; setTimeout(tick, 350); return; }
            setTimeout(tick, 25);
          }
        }
        tick();
      })();
    }
  }

  // API terminal: type commands, then reveal outputs, on scroll into view
  var apiTerminal = document.getElementById('apiTerminal');
  if(apiTerminal){
    function playTerminal(){
      var typeTargets = apiTerminal.querySelectorAll('.type-target');
      var fadeLines = apiTerminal.querySelectorAll('.fade-line');

      if(prefersReduced){
        typeTargets.forEach(function(el){ el.textContent = el.getAttribute('data-text'); });
        fadeLines.forEach(function(el){ el.classList.add('shown'); });
        return;
      }

      var cursor = apiTerminal.querySelector('.term-cursor');
      var step = 0;

      function typeInto(el, cb){
        var text = el.getAttribute('data-text');
        var i = 0;
        (function typeChar(){
          i++;
          el.textContent = text.slice(0, i);
          if(i < text.length){ setTimeout(typeChar, 32); }
          else { setTimeout(cb, 300); }
        })();
      }

      function showFadeLine(order, cb){
        var line = apiTerminal.querySelector('.fade-line[data-order="' + order + '"]');
        if(line){ line.classList.add('shown'); }
        setTimeout(cb, 450);
      }

      function runSequence(){
        typeInto(typeTargets[0], function(){
          showFadeLine(1, function(){
            showFadeLine(2, function(){
              if(cursor) cursor.style.display = 'none';
              typeInto(typeTargets[1], function(){
                showFadeLine(3, function(){});
              });
            });
          });
        });
      }
      runSequence();
    }

    if('IntersectionObserver' in window){
      var termObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            playTerminal();
            termObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      termObserver.observe(apiTerminal);
    } else {
      playTerminal();
    }
  }
})();
