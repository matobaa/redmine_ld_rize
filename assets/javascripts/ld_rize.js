// -*- coding: utf-8 -*-
// Copyright (C) 2014 MATOBA Akihiro <matobaa+github@gmail.com>
// All rights reserved.
//
// This software is licensed as described in the file LICENSE, which
// you should have received as part of this distribution.

$(document).ready(function($) {
  var index = -1;
  var rows;
  welcome_index = $('body.controller-welcome.action-index').length;
  projects_index = $('body.controller-projects.action-index').length;
  projects_show = $('body.controller-projects.action-show').length;
  issues_show = $('body.controller-issues.action-show').length;
  issues_index = $('body.controller-issues.action-index').length;
  activities_index = $('body.controller-activities.action-index').length;
  search_index = $('body.controller-search.action-index').length;
  my_page = $('body.controller-my.action-page').length;
  wiki_index = $('body.controller-wiki.action-index,body.controller-wiki.action-date_index').length;
  rowselector =
    welcome_index ? "div.box > ul > li, div.box > p" :
    projects_index ? '#projects-index > ul > li' :
    projects_show ? 'div.box > ul > li, div.box > p' :
    issues_show ? 'div.description, #history div.journal' :
    issues_index ? 'table.list.issues tr.issue' :
    activities_index ? '#activity dt' :
    search_index ? '#search-results dt' :
    my_page ? 'tr.issue' :
    wiki_index ? '#content > ul > li' :
    null ;
  function rescan() {
    // support for dynamic add by autopagerized or some
    rows = $(rowselector).filter(function() {
      return this.style.display != "none";
    });
  };
  move = function(moveindex) {
    return function(event) {
      if(index >= 0) {
        selected = $(rows[index])
        selected.removeClass('ldrize-focus');
      }
      if (index == -1) {
        rescan();  // rescan will do after ticket.commentOnly hiding at document.ready...
      }
      index = moveindex(index);
      index = index < 0 ? 0 : index >= rows.length ? rows.length-1 : index;
      if (index == rows.length-1) {
        rescan();
      }
      selected = $(rows[index])
      selected.addClass('ldrize-focus');
      $('html, body').stop(true, true).animate({ scrollTop: selected.offset().top }, 'swing');

      event.preventDefault();
    }
  }
  j = move(function(index) {return ++index})
  k = move(function(index) {return --index})
  g = move(function(index) {return Number.MAX_VALUE})
  h = move(function(index) {return 0})
  p = function(event) {
    selected = $(rows[index])
    selected.toggleClass('ldrize-pinned');
  }
  o = function(event) {
    var pinned = $('.ldrize-pinned');
    if(!pinned.length) {
      return v(event);  // if no pinned, open selected
    } // otherwise
    pinned.removeClass('ldrize-pinned');
    var opener = function(pinned) {
      if(!pinned.length) { return; }
      // works well in firefox and IE, but chrome opens only one window... 
      window.setTimeout(function() {
        var url = $('a', pinned.splice(0,1))[0].href;
        window.open(url, "_blank"); opener(pinned);
      }, 200);
    };
    opener(pinned);
  };
  v = function(event) {
    url = $('a', selected[0])[0].href
    window.open(url, "_blank")
  }
  hash = function() {
    window.location.hash = '#' + selected.attr('id');
  }
  $(document).bind('keydown',
    issues_show ? function(event) {
      if (!enable_key_nav()) return true;
      if (event.which == 71) { g(event); hash(); }
      if (event.which == 72) { h(event); hash(); }
      if (event.which == 40) { j(event); hash(); } // down arrow
      if (event.which == 74) { j(event); hash(); }
      if (event.which == 38) { k(event); hash(); } // up arrow
      if (event.which == 75) { k(event); hash(); }
      if (event.which == 48) { h(event); hash(); } // '0'
      if (event.which == 49) { move(function(i) {return 1})(event); hash(); }
      if (event.which == 50) { move(function(i) {return 2})(event); hash(); }
      if (event.which == 51) { move(function(i) {return 3})(event); hash(); }
      if (event.which == 52) { move(function(i) {return 4})(event); hash(); }
      if (event.which == 53) { move(function(i) {return 5})(event); hash(); }
      if (event.which == 54) { move(function(i) {return 6})(event); hash(); }
      if (event.which == 55) { move(function(i) {return 7})(event); hash(); }
      if (event.which == 56) { move(function(i) {return 8})(event); hash(); }
      if (event.which == 57) { move(function(i) {return 9})(event); hash(); }
      if (event.which == 191) { $("#q").focus(); event.preventDefault(); }
    } :
      welcome_index | 
      projects_index | projects_show |
      activities_index |
      issues_index | search_index |
      my_page | wiki_index ? function(event) {
      if (!enable_key_nav()) return true;
      if (event.which == 40) { j(event) } // down arrow
      if (event.which == 74) { j(event) }
      if (event.which == 38) { k(event) } // up arrow
      if (event.which == 75) { k(event) }
      if (event.which == 79) { o(event) }
      if (event.which == 80) { p(event) }
      if (event.which == 86) { v(event) }
      if (event.which == 13) { v(event) } // Enter key
      if (event.which == 71) { g(event) }
      if (event.which == 72) { h(event) }
      if (event.which == 48) { h(event) } // '0'
      if (event.which == 191) { $("#q").focus(); event.preventDefault(); }
    } :
    function() { /* default; pass */ }
  )
  enable_key_nav = function() {
  	var element = (document.activeElement || window.getSelection().focusNode);
  	return $.inArray(element.nodeName.toLowerCase(),
	  	["a","input","select","textarea","button"]) == -1; // not found
  }
})
