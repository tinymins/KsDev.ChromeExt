/* ====================================================================================
 * KsDev: net.kingsoft.xsj.devsimple.task.js v0.0.1
 * http://derzh.com/
 * ====================================================================================
 * Copyright 2015 ZYM
 * Licensed under MIT (https://github.com/tinymins/KsDev.ChromeExt/blob/master/LICENSE)
 * ==================================================================================== */
!(function () {
	'use strict';

	Array.prototype.move = function (old_index, new_index) {
		while (old_index < 0) {
			old_index += this.length;
		}
		while (new_index < 0) {
			new_index += this.length;
		}
		if (new_index >= this.length) {
			var k = new_index - this.length;
			while ((k--) + 1) {
				this.push(undefined);
			}
		}
		this.splice(new_index, 0, this.splice(old_index, 1)[0]);
		return this; // for testing purposes
	};

	var prefixes = Ext.util.JSON.decode(localStorage.getItem("svn_prefixes"));
	if(!Array.isArray(prefixes))
		prefixes = ["svn://xsjreposvr1.rdev.kingsoft.net/sword3-products/trunk/client/ui/"];

	var textarea = Ext.getDom("commiteorderForm_ctl05_ctl00_txtExpectResult") || Ext.getDom("commiteorderForm_ctl06_ContentPanel1_txtExpectResult");
	var div = textarea.parentNode.previousElementSibling;

	// 下拉框
	var select = document.createElement("select");
	for (var i = prefixes.length - 1; i >= 0; i--) {
		var option = document.createElement("option");
		option.innerText = prefixes[i];
		option.value = prefixes[i];
		select.appendChild(option);
	}
	var option = document.createElement("option");
	option.innerText = "添加预设值";
	option.value = "add new";
	select.appendChild(option);
	select.style.marginLeft = "10px";
	div.appendChild(select);

	// 确认按钮
	var btnApply = document.createElement("button");
	btnApply.onclick = function(e) {
		var prefix = select.options[select.selectedIndex].value;
		if (prefix == "add new") { // 新增预设
			var text = (window.prompt("请输入您要补全的SVN地址前缀", "svn://") || "").trim().replace(/\\/ig, "/");
			if (text != "" && text != "svn://") {
				if (text.substr(-1) != "/")
					text = text + "/";
				var option = document.createElement("option");
				option.innerText = text;
				option.value = text;
				select.insertBefore(option, select.childNodes[0]);
				select.selectedIndex = 0;
				select.onchange();
				prefixes.push(text);
				localStorage.setItem("svn_prefixes", Ext.util.JSON.encode(prefixes))
			}
		} else { // 添加svn头部
			var text = textarea.value;
			var pathlist = text.split("\n");
			for (var i = pathlist.length - 1; i >= 0; i--) {
				var line = pathlist[i].trim();
				if (line != "" && line.substr(0,6) != "svn://") {
					pathlist[i] = prefix + line;
				}
			}
			textarea.value = pathlist.join("\n");
			// 调整次序 最后用过的提前
			for (var i = prefixes.length - 1; i >= 0; i--) {
				if (prefixes[i] == prefix)
					prefixes.move(i, prefixes.length - 1);
			}
			localStorage.setItem("svn_prefixes", Ext.util.JSON.encode(prefixes))
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	btnApply.style.marginLeft = "5px";
	btnApply.innerHTML = "确定";
	div.appendChild(btnApply);

	// 删除预设按钮
	var btnDelete = document.createElement("button");
	btnDelete.onclick = function(e) {
		var text = select.options[select.selectedIndex].value;
		if (text != "add new") {
			if (text != null) {
				var options = select.options;
				for (var i = options.length - 1; i >= 0; i--) {
					if (options[i].value == text)
						select.remove(i);
				}
				for (var i = prefixes.length - 1; i >= 0; i--) {
					if (prefixes[i] == text)
						prefixes.splice(i, 1);
				}
				select.onchange();
				localStorage.setItem("svn_prefixes", Ext.util.JSON.encode(prefixes))
			}
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	btnDelete.style.marginLeft = "5px";
	btnDelete.style.visibility = "inherit";
	btnDelete.innerHTML = "删除";
	div.appendChild(btnDelete);

	// 下拉框改变时切换按钮状态
	select.onchange = function(e) {
		var text = select.options[select.selectedIndex].value;
		if (text == "add new") {
			btnApply.innerText = "确定";
			btnDelete.style.visibility = "hidden";
		} else {
			btnApply.innerText = "补全";
			btnDelete.style.visibility = "inherit";
		}
	}
	select.onchange();
}());
