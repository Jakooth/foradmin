function Forobject(o) {
	Fortag.call(this, o);
	
	/** 
	 * PRIVATE
	 */
	
	var self = this;
	
	this._$serieInput = $('#' + o + 'SerieInput');
	
	/** 
	 * PUBLIC
	 * Variables without value are objects.
	 */

	this.serie = "object-tag";
};

Forobject.prototype = Object.create(Fortag.prototype);
Forobject.prototype.constructor = Forobject;

Forobject.prototype.save = function() { 
	Fortag.prototype.save.call(this);
	
	this.serie = this._$serieInput.val();
}