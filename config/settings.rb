require "json"

module Worldnews
  module Settings

    settings = JSON.load(
      File.open(File.join(File.dirname(__FILE__), "settings.json"))
    )

    LOGS_DIR = settings.fetch("logs_dir")
    ENVIRONMENT = settings.fetch("environment")

    APP_URL = settings.fetch("app_url")
    SESSION_SECRET = settings.fetch("session_secret")

  end
end
