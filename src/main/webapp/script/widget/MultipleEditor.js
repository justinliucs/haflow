dojo.provide("widget.MultipleEditor");
dojo.require("dojox.grid.cells.dijit");

dojo.declare(
				"widget.MultipleEditor",
				[ dojox.grid.cells._Widget ],
				{

					_types : {
						"number": {
						     widgetClass: dijit.form.NumberTextBox
						 },
						"bool" : {
							widgetClass : dijit.form.CheckBox
						},
						"string" : {
							widgetClass : dijit.form.TextBox
						},
						"date" : {
							widgetClass : dijit.form.DateTextBox
						},
						"combo" : {
							widgetClass : dijit.form.ComboBox
						},
						"select" : {
							widgetClass : dijit.form.FilteringSelect
						}
					},
					setType : function(type, typeProps) {
						this.type = type;
						this.widgetClass = this._types[type] ? this._types[type].widgetClass
								: this.widgetClass;
						var props = {};

						var wprops = typeProps ? typeProps
								: this._types[type].widgetProps;
						for ( var i in wprops) {
							if (dojo.getObject(wprops[i])) {
								props[i] = dojo.getObject(wprops[i]);
							} else {
								props[i] = wprops[i];
							}
						}
						this.widgetProps = this._types[type] ? props
								: this.widgetProps;
					},
					format : function(inRowIndex, inItem) {
						//console.log("format");
						var f, i = this.grid.edit.info;
						var d = this.get ? this.get(inRowIndex, inItem)
								: (this.value || this.defaultValue);
						var s = this.grid.store;
						this.editableProp = true;

						if (s.isItem(inItem)
								&& s.hasAttribute(inItem, "editable")) {
							this.editableProp = s.getValue(inItem, "editable");
						}

						if (this.editable
								&& (this.alwaysEditing || (i.rowIndex == inRowIndex && i.cell == this))
								&& this.editableProp) {
							try {
								var type = this.grid.store.getValue(inItem,
										"type"), typeProps = {};
								var tprops = this.grid.store.getValue(inItem,
										"typeProps");
								if (tprops) {
									typeProps = dojo.isObject(tprops) ? tprops
											: dojo.getObject(tprops) ? dojo
													.getObject(tprops)
													: typeProps;
								}
								if (type) {
									this.widget = null;
									this.value = null;
									delete typeProps._value;
									this.constraint = typeProps.constraint ? typeProps.constraint
											: {};
									this.setType(type, typeProps);

								}
							} catch (e) {
							}
							//console.log("formatEditing!!!!!!!");
							return this.formatEditing(d, inRowIndex);
						} else {

							var v = (d != this.defaultValue && (f = this.formatter)) ? f
									.call(this, d, inRowIndex)
									: d;
							if (!this.editableProp) {
								this.value = d;
								//this.widget = null;	
							}
							return (typeof v == "undefined" ? this.defaultValue
									: v);
						}
					},
					sizeWidget : function(_32, _33, _34) {
						if (this.type != "bool") {
							this.inherited(arguments);
						} else {
							return;
						}
					},
					setValue : function(_30, _31) {
						if (this.editableProp == false) {
							return;
						}
						if (this.type == "bool") {
							//console.log("set value!!!!!!!!!!!!");
							this.widget.attr("checked", _31);
						} else if (this.type == "date") {
							this.widget.attr("value", new Date(_31));
						} else {
							this.inherited(arguments);
						}
					},
					isEditable : function(rowIndex) {
						var item = this.grid.getItem(rowIndex);

						var s = this.grid.store;

						if (s.isItem(item) && s.hasAttribute(item, "editable")) {
							return s.getValue(item, "editable");
						} else {
							return true;
						}
					},
					getValue : function(rowIndex) {
						//console.log("get value");
						if (this.isEditable(rowIndex) == false) {
							var item = this.grid.getItem(rowIndex);
							return this.grid.store.getValue(item, "value");
						}

						var val = this.widget ? this.widget.attr('value')
								|| this.value : this.value;

						if (this.type == "bool") {
							return this.widget.attr("checked");
						} else if (this.type == "date") {

							return val ? dojo.isString(val) ? val
									: dojo.date.locale.format(val,
											this.widget.constraints)
									: dojo.date.locale.format(new Date(),
											this.widget.constraints);
						} else if (this.type == "number") {
							return val ? val : 0;
						} else if (this.type == "select") {
							return val ? val : "";
						} else {
							return this.inherited(arguments);
						}
					},
					markupFactory : function() {
						this.inherited(arguments);
					},
					attachWidget : function(_d, _e, _f) {
						_d.appendChild(this.widget.domNode);
						this.setValue(_f, _e);
					},
					getWidgetProps : function(_2d) {
						if (this.type == "date") {

							var val = this.constraint.datePattern ? dojo.date.locale
									.parse(_2d, dojo.mixin(this.constraint, {
										selector : "date"
									}))
									: dojo.date.locale.parse(_2d, {
										datePattern : "dd/MM/yyyy",
										selector : "date"
									});
							return dojo.mixin(this.inherited(arguments), {
								value : val
							});
						} else {
							return this.inherited(arguments);
						}
					},
					formatNode : function(_10, _11, _12) {
						//console.log("formatNode ");
						//console.log(this.widget);
						//console.log("this!!!!!!!");
						//console.log(this);
						if (!this.widgetClass) {
							return _11;
						}

						if (!this.widget) {
							//console.log("create widget!!!!!");
							this.widget = this.createWidget.apply(this,
									arguments);
							if (this.type == "bool") {
								this.widget.attr("checked", _11 == "true"
										|| _11 == true ? true : false);
							}

						} else {
							//console.log("change widget value");
							this.attachWidget.apply(this, arguments);
						}

						this.sizeWidget.apply(this, arguments);
						this.focus();
						this.save();

					}
				});
