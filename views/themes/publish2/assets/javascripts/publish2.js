"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(e){function t(i,n){this.$element=e(i),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(n)&&n),this.init()}var i=e(document),n="qor.publish2";return t.prototype={constructor:t,init:function(){this.actionType=this.options.element,this.bind(),this.initActionTemplate()},bind:function(){i.on("click.qor.publish2",".qor-publish2__version",this.loadPublishVersion.bind(this)).on("change.qor.publish2",".qor-pulish2__action-input",this.action.bind(this)).on("qor.selectone.selected qor.selectone.unselected",".qor-pulish2__eventid",this.eventidChanged.bind(this)).on("added.qor.replicator",this.replicatorAdded.bind(this))},unbind:function(){i.off("click.qor.publish2",".qor-publish2__version",this.loadPublishVersion.bind(this)).off("change.qor.publish2",".qor-pulish2__action-input",this.action.bind(this)).off("qor.selectone.selected qor.selectone.unselected",".qor-pulish2__eventid",this.eventidChanged.bind(this)).off("added.qor.replicator",this.replicatorAdded.bind(this))},initActionTemplate:function(){e(".qor-pulish2__action").closest(".qor-slideout").length||e(".qor-pulish2__action").prependTo(e(".mdl-layout__content .qor-page__body form").first()).show(),t.initSharedVersion()},replicatorAdded:function(e,i){t.generateSharedVersionLabel(i)},action:function(t){var i=e(t.target),n="checkbox"==i.prop("type"),o=i.val(),r=e(this.actionType[i.data().actionType]),s=r.closest("label");r.length&&(n?(r.prop("checked",i.is(":checked")),i.is(":checked")?s.addClass("is-checked"):s.removeClass("is-checked")):r.val(o))},eventidChanged:function(t,i){i?e(".qor-pulish2__eventid-input").val(i.primaryKey):e(".qor-pulish2__eventid-input").val(""),this.updateDate(i,t.target),e(".qor-pulish2__eventid-input").trigger("change")},updateDate:function(t,i){var n=e(i).closest(".qor-pulish2__action"),o=n.find(".qor-pulish2__action-start"),r=n.find(".qor-pulish2__action-end"),s=n.find(".qor-action__picker-button"),a=s.parent().find("input");t?(o.val(t.ScheduledStartAt),r.val(t.ScheduledEndAt),s.hide(),a.attr("disabled",!0)):(s.show(),a.attr("disabled",!1).closest(".is-disabled").removeClass("is-disabled")),o.trigger("change"),r.trigger("change")},loadPublishVersion:function(t){var i,n=e(t.target).parent("a"),o=n.data().versionUrl,r=n.closest("table"),s=n.closest("tr"),a=s.find("td").length,l=r.hasClass("qor-table--medialibrary"),d=e('<tr class="qor-table__inner-list"><td colspan="'+a+'"></td></tr>'),c=e('<div class="qor-table__inner-block"><div style="text-align: center;"><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>');if(s.hasClass("is-showing"))return e(".qor-table__inner-list").remove(),r.find("tr").removeClass("is-showing"),!1;if(e(".qor-table__inner-list").remove(),e("table tr").removeClass("is-showing"),s.addClass("is-showing"),l){var h=r.find(">tbody>tr"),u=parseInt(r.width()/217),p=h.index(s)+1,f=Math.ceil(h.length/u),b=Math.ceil(p/u);s=e(h.get(u*b-1)),s.length||(s=h.last()),d=e('<tr class="qor-table__inner-list"><td></td></tr>'),f>1&&d.width(217*u-16)}return s.after(d),i=e(".qor-table__inner-list").find("td"),c.appendTo(i).trigger("enable"),o&&e.get(o,function(t){e(".qor-table__inner-block").html(t).trigger("enable")}),!1},destroy:function(){this.unbind(),this.$element.removeData(n)}},t.generateSharedVersionLabel=function(t){var i,n=e('[name="shared-version-checkbox"]').html(),o=e('input[name$="ShareableVersion"]'),r={};t&&(o=t.find('input[name$="ShareableVersion"]')),o.each(function(){var o,s=e(this),a=s.closest(".qor-fieldset");a.hasClass(".qor-fieldset--new")||(t&&a.find(".qor-pulish2__action-sharedversion").remove(),i=(Math.random()+1).toString(36).substring(7),r.id=["ShareableVersion",i].join("_"),o=e(window.Mustache.render(n,r)),o.find("input").on("click.qor.publish2",function(){e(this).is(":checked")?s.val("true"):s.val("")}),"true"==s.val()&&o.find("input").prop("checked",!0),o.prependTo(a).trigger("enable"),s.closest(".qor-field").hide())})},t.initSharedVersion=function(){e(".qor-pulish2__action").length&&t.generateSharedVersionLabel()},e.fn.qorSliderAfterShow.initSharedVersion=t.initSharedVersion,e.fn.qorSliderAfterShow.initPublishForm=function(){var i=e(".qor-pulish2__action"),n=i.find("[data-action-type]"),o=t.ELEMENT;i.length&&i.prependTo(e(".qor-slideout__body form").first()),i.length&&n.length&&(n.each(function(){var t=e(this);e(o[t.data("actionType")]).closest(".qor-form-section").hide()}),e(".qor-pulish2__action-input").trigger("change.qor.publish2"))},t.DEFAULTS={},t.ELEMENT={scheduledstart:'[name="QorResource.ScheduledStartAt"]',scheduledend:'[name="QorResource.ScheduledEndAt"]',publishready:'[name="QorResource.PublishReady"]',versionname:'[name="QorResource.VersionName"]',eventid:'[name="QorResource.ScheduledEventID"]'},t.plugin=function(i){return this.each(function(){var o,r=e(this),s=r.data(n);if(!s){if(/destroy/.test(i))return;r.data(n,s=new t(this,i))}"string"==typeof i&&e.isFunction(o=s[i])&&o.apply(s)})},e(function(){var i={};i.element=t.ELEMENT,e(document).on("disable.qor.publish2",function(i){t.plugin.call(e(".qor-theme-publish2",i.target),"destroy")}).on("enable.qor.publish2",function(n){t.plugin.call(e(".qor-theme-publish2",n.target),i)}).triggerHandler("enable.qor.publish2")}),t});