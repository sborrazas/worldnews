require "cuba"
require "webapp/routes/assets"

module Webapp
  module Routes
    class Main < Cuba

      define do
        on get, root do
          render_view("dashboard.html")
        end

        on ENVIRONMENT == "development" do
          run(Webapp::Routes::Assets)
        end
      end

    end
  end
end
