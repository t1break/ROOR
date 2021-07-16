var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function show_custom_tab(t){for(var e=!1,a=parseInt(parseInt(t)/Math.pow(10,parseInt(t).toString().length-1))*Math.pow(10,parseInt(t).toString().length-1);!e;){var n=document.getElementById("tabcontent"+a),r=document.getElementById("tab"+a);n?a==parseInt(t)?(n.style.display="",r.className="currenttab",document.getElementById("tab_title_"+parseInt(parseInt(t)/Math.pow(10,parseInt(t).toString().length-1))*Math.pow(10,parseInt(t).toString().length-1)).innerHTML=document.getElementById("tab"+t).firstChild.text):(n.style.display="none",r.className=""):e=!0,a++}}$(document).ready(function(){$("#myfantasyleague_tabs > table.report").parent().addClass("mobile-wrap"),$("div.mobile-wrap #myfantasyleague_tabs > table.report").parent().removeClass("mobile-wrap"),$("#myfantasyleague_tabs .mobile-wrap table").not("#custom_draftroom #myfantasyleague_tabs .mobile-wrap table").unwrap()});

}
