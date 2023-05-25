<?php if(aarhus_select_core_plugin_installed()) { ?>
    <div class="qodef-blog-like">
        <?php if( function_exists('aarhus_select_get_like') ) aarhus_select_get_like(); ?>
    </div>
<?php } ?>