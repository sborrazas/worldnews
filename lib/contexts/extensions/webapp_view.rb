module Contexts
  module Extensions
    module WebappView

      # Get the path for the page given, using the current path and params.
      #
      # @param page [Fixnum]
      #
      # @return [String]
      def paginate_path(page)
        build_path(current_path, params.merge("page" => page.to_s))
      end

      # Transform a ruby structure to a json string
      #
      # @param object [Object]
      #
      # @return [String]
      def json(object)
        JSON.generate(object)
      end

      # Build a relative URL path based on the path and the params.
      #
      # @param path [String]
      # @param params [Hash] ({})
      #
      # @return [String]
      def build_path(path, params = {})
        if params.empty?
          path
        else
          "#{path}?#{Rack::Utils.build_nested_query(params)}"
        end
      end

      # Build an URL based on the path and the params.
      #
      # @param path [String]
      # @param params [Hash] ({})
      #
      # @return [String]
      def build_url(path, params = {})
        "#{::Worldnews::Settings::APP_URL}/#{build_path(path, params)}"
      end

    end
  end
end
