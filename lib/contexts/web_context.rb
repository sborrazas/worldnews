require "lib/contexts/extensions/text"
require "lib/contexts/extensions/webapp_view"

module Contexts
  class WebContext

    attr_reader :notifications
    attr_reader :params
    attr_reader :authenticity_token

    include Contexts::Extensions::Text
    include Contexts::Extensions::WebappView

    # Initialize the Contexts::WebContext.
    #
    # @option options [Array<(Symbol, String)>] :notifications ([])
    # @option options [Hash] :params ({})
    # @option options [String] :authenticity_token (nil)
    def initialize(options = {})
      @notifications = options.fetch(:notifications, [])
      @params = options.fetch(:params, {})
      @authenticity_token = options.fetch(:authenticity_token, nil)
    end

  end
end
