function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	this._$enNameInput = $('#' + o + 'EnNameInput');
	this._$bgNameInput = $('#' + o + 'BgNameInput');
	this._$tagInput = $('#' + o + 'TagInput');
	this._$dateInput = $('#' + o + 'DateInput');
	this._$typeSelect = $('#' + o + 'TypeSelect');
	this._$subtypeSelect = $('#' + o + 'SubtypeSelect');
	this._$relatedInput = $('#' + o + 'RelatedInput');
	this._$akaInput = $('#' + o + 'AkaInput');
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.enName;
	this.bgName;
	this.tag;
	this.date;
	this.type;
	this.subtype;
	this.aka;
	this.related;
	this.object = o;
}

Fortag.prototype.save = function() {
	this.enName = this._$enNameInput.val();
	this.bgName = this._$bgNameInput.val();
	this.date = this._$dateInput.val() || null;
	this.tag = this._$tagInput.val();
	this.type = this._$typeSelect.val();
	this.subtype = this._$subtypeSelect.val() || null;
	
	var o = {
		enName: this.enName,
		bgName: this.bgName,
		date: this.date,
		tag: this.tag,
		type: this.type,
		subtype: this.subtype,
		object: this.object
	};
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: 'http://localhost/forapi/save.php',
		data: JSON.stringify(o),
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
		console.log('success');
	}).fail(function (data, textStatus, jqXHR) {
		console.log('fail');
	}).fail(function (data, textStatus, jqXHR) {
		console.log('always');
	});
}