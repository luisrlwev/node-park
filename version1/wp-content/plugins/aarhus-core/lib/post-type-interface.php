<?php

namespace AarhusCore\Lib;

/**
 * interface PostTypeInterface
 * @package AarhusCore\Lib;
 */
interface PostTypeInterface {
	/**
	 * @return string
	 */
	public function getBase();
	
	/**
	 * Registers custom post type with WordPress
	 */
	public function register();
}