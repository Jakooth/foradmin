function Aside() {
	
	/** 
	 * PRIVATE
	 */
	 
	this._o = 'aside';
	this._url = 'http://localhost/forapi/save_aside.php';
	this._isValid = true;
	
	this._$shot = $('#' + this._o + 'MainShotInput');
	
	this._$typeInput = $('#' + this._o + 'TypeSelect');
	this._$subtypeInput = $('#' + this._o + 'SubtypeSelect');
	this._$titleInput = $('#' + this._o + 'TitleInput');
	this._$subtitleInput = $('#' + this._o + 'SubtitleInput');
	this._$authorInput = $('#' + this._o + 'AuthorInput');
	
	this._$tagsInput = $('#publishTagsInput');
	this._$siteInput = $('#publishSiteInput');
	this._$urlInput = $('#publishUrlInput');
	this._$dateInput = $('#publishDateInput');
	this._$issueInput = $('#publishIssueDateInput');
	this._$previewInput = $('#publishPreviewInput');
	this._$prioritySelect = $('#publishPriorityInput');
	
	/** 
	 * PUBLIC
	 */

	this.shot_img;
	this.layouts = [];
	
	this.type;
	this.subtype;
	this.title;
	this.subtitle;
	this.author;
	
	this.prime;
	this.tags;
	this.site;
	this.url;
	this.date;
	this.issue;
	this.preview;
	this.priority;
	
	this.json = {};
}

/** 
 * PRIVATE
 */

Aside.prototype._getTypeaheadValue = function(_$input) {
	Fortag.prototype._getTypeaheadValue.call(this, _$input);
}

Aside.prototype._getInputValue = function(_$input) {
	Fortag.prototype._getInputValue.call(this, _$input);
}

/** 
 * PUBLIC
 */

Aside.prototype.save = function() {
	this.type = this._getInputValue(this._$typeInput);
	this.subtype = this._getInputValue(this._$subtypeInput);
	this.title = this._getInputValue(this._$titleInput);
	this.subtitle = this._getInputValue(this._$subtitleInput);
	this.author = this._getTypeaheadValue(this._$authorInput);
	
	this.json = {
		type: this.type,
		subtype: this.subtype,
		title: this.title,
		subtitle: this.subtitle,
		author: this.author
	};
}

Aside.prototype.publish = function() {
	this.tags = this._getTypeaheadValue(this._$tagsInput);
	this.prime = this.tags ? this.tags[0] : this.tags;
	this.site = this._getInputValue(this._$siteInput);
	this.url = this._getInputValue(this._$urlInput);
	this.date = this._getInputValue(this._$dateInput);
	this.issue = this._getInputValue(this._$issueInput);
	this.preview = this._getInputValue(this._$previewInput);
	this.priority = this._getInputValue(this._$priorityInput);
	
	this.json.tags = this.tags;
	this.json.prime = this.prime;
	this.json.site = this.site;
	this.json.url = this.url;
	this.json.date = this.date;
	this.json.issue = this.issue;
	this.json.preview = this.preview;
	this.json.priority = this.priority;
}

Aside.prototype.post = function() {
	var self = this;
		
	if (!this._isValid) {
		return false;
	}
	
	admin.showAlert({message: 'Записвам...', status: 'loading'});
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: this._url,
		data: JSON.stringify(this.json),
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
		if (!data.events.mysql.connection) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else if (!data.events.mysql.result) {
			admin.showAlert({message: data.events.mysql.error, status: 'error'});
		} else {
			admin.showAlert({message: self.json.object
										  .charAt(0).toUpperCase() + 
									  self.json.object
									  	  .slice(1) + ' saved', status: 'success'});
		}
	}).fail(function (data, textStatus, jqXHR) {
		console.log(data);
	});
	
	return true;
}