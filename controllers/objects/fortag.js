function Fortag(o) {
	
	/** 
	 * PRIVATE
	 */
	 
	var self = this;
	
	this._$mainInput = $('#' + o + 'MainInput');
	this._$enNameInput = $('#' + o + 'EnNameInput');
	this._$bgNameInput = $('#' + o + 'BgNameInput');
	this._$tagInput = $('#' + o + 'TagInput');
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.main = "C:/fakepath/object-tag-index.png";
	this.enName = "Title Case String";
	this.bgName = "Title Case String";
	this.tag = "object-tag";
}

Fortag.prototype.save = function() {
	/**
	 * TODO: Validate fields.
	 */
	 
	this.main = utils.parseImgIndex(this._$mainInput.val());
	this.enName = this._$enNameInput.val();
	this.bgName = this._$bgNameInput.val();
	this.tag = this._$tagInput.val();
}