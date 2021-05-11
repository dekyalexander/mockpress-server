<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<script type="text/html" id="tmpl-mockpress-template-library-keywords">
<#
	if ( ! _.isEmpty( keywords ) ) {
#>
<select class="mockpress-library-keywords">
	<option value=""><?php esc_html_e( 'Show All', 'mockpress' ); ?></option>
	<# _.each( keywords, function( title, slug ) { #>
	<option value="{{ title }}">{{ title }}</option>
	<# } ); #>
</select>
<#
	}
#>
</script>
