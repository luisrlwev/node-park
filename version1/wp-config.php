<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'barberss_wp736' );

/** MySQL database username */
define( 'DB_USER', 'barberss_wp736' );

/** MySQL database password */
define( 'DB_PASSWORD', '12iAZpS@-2' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'nyiyyxkmvrfvmvcygexht0glqqyrmlajcthp6rnbne5blr7z3ogvgcscbmbtzdhf' );
define( 'SECURE_AUTH_KEY',  'r9gksrmng78tkikkpe5irmbtljtmknc0g5hszqkscl58kbktlgedlmuubst51ys3' );
define( 'LOGGED_IN_KEY',    '6v9tmticygysjcqd3yhgwujamnvbfkvwbbddusaonmi1swikjqczffdpo68c7chm' );
define( 'NONCE_KEY',        'rdjhyxmhg9lvwnz8v2neuqn54qvywqipgqrcek6hzucoaibwt5ud8k0wwrge8lff' );
define( 'AUTH_SALT',        '53ug9k1yhaj3hmd8fxz1mqjomayputyjq36bjvbqjhoiyu8zze12pzfyezs8hn4v' );
define( 'SECURE_AUTH_SALT', 'nyajng68wb2cz7fqlnugp6t0j26z1smjbffb4rcrirkwlfwhprqqitujapnftaa3' );
define( 'LOGGED_IN_SALT',   '8qjtepxylpfc2l8m6flb4y4sjgoibr1beqfkmuidcjmx5xbdzyx6lebphnxajhvx' );
define( 'NONCE_SALT',       'qxcuvjvq9xogpig4ihwitlpwnebm7gmvx1zvf28bta43cyzarzsshjp5rrt0rasd' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpn8_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
