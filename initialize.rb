Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

APP_DIR = Dir.pwd
WEBAPP_DIR = File.join(APP_DIR, "webapp")

$LOAD_PATH.unshift(APP_DIR)

require "config/settings"

ENVIRONMENT = Worldnews::Settings::ENVIRONMENT
