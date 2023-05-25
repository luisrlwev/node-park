<?php

if ( ! function_exists( 'aarhus_select_like' ) ) {
	/**
	 * Returns AarhusSelectClassLike instance
	 *
	 * @return AarhusSelectClassLike
	 */
	function aarhus_select_like() {
		return AarhusSelectClassLike::get_instance();
	}
}

function aarhus_select_get_like() {
	
	echo wp_kses( aarhus_select_like()->add_like(), array(
		'span' => array(
			'class'       => true,
			'aria-hidden' => true,
			'style'       => true,
			'id'          => true
		),
		'i'    => array(
			'class' => true,
			'style' => true,
			'id'    => true
		),
		'a'    => array(
			'href'  => true,
			'class' => true,
			'id'    => true,
			'title' => true,
			'style' => true
		)
	) );
}