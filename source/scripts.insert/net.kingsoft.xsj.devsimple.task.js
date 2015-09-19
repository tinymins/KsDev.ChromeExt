/* ====================================================================================
 * KsDev: net.kingsoft.xsj.devsimple.task.js v0.0.1
 * http://derzh.com/
 * ====================================================================================
 * Copyright 2015 ZYM
 * Licensed under MIT (https://github.com/tinymins/KsDev.ChromeExt/blob/master/LICENSE)
 * ==================================================================================== */
!(function () {
	'use strict';

	var isBusy = false;

	function getCSRF() {
		return document.getElementById("mz_csrf_tks").value;
	}

	function getPrev(selectionDiv) {
		var divs = selectionDiv.parentElement;
		for(var i = 0; i <= divs.childElementCount; i++)
			if(divs.childNodes[i] == selectionDiv)
				return divs.childNodes[i - 1];
	}

	var textarea = Ext.getDom("commiteorderForm_ctl05_ctl00_txtExpectResult");
	var button = document.createElement("button");
	button.onclick = function(e) {
		var text = textarea.value;
		var pathlist = text.split("\n");
		var prefix = window.prompt("请输入您要补全的SVN地址前缀","svn://xsjreposvr1.rdev.kingsoft.net/sword3-products/trunk/client/ui/");
		if (prefix != null)
			if (prefix.substr(-1) != "/")
				prefix = prefix + "/";
			for (var i = pathlist.length - 1; i >= 0; i--) {
				var line = pathlist[i];
				if (line.length > 6 && line.substr(0,6) != "svn://") {
					pathlist[i] = prefix + line;
				}
			}
		textarea.value = pathlist.join("\n");
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	button.style.marginLeft = "10px";
	button.innerHTML = "补全SVN地址";
	textarea.parentNode.previousElementSibling.appendChild(button);

}());
