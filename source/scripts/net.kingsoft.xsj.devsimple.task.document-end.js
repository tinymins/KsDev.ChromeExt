/* ====================================================================================
 * KsDev: net.kingsoft.xsj.devsimple.task.document-end.js v0.0.1
 * http://derzh.com/
 * ====================================================================================
 * Copyright 2015 ZYM
 * Licensed under MIT (https://github.com/tinymins/KsDev.ChromeExt/blob/master/LICENSE)
 * ==================================================================================== */
'use strict';

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('scripts.insert/net.kingsoft.xsj.devsimple.task.js');
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);
