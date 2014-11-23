require "webapp/presenters/base"

module Presenters
  class Collection < Presenters::Base

    include Enumerable

    # Iterate through the items.
    #
    # @param block [Proc]
    #
    # @api public
    def each(&block)
      presented_items.each(&block)
    end

    # Determine if there are any items.
    #
    # @return [Boolean]
    #
    # @api public
    def any?
      items.any?
    end

    # Get the page from the collection.
    #
    # @return [Fixnum]
    def page
      attributes["page"]
    end

    # Get the amount of items per page used to paginate the collection.
    #
    # @return [Fixnum]
    def per_page
      attributes["per_page"]
    end

    # Get the total pages of the matching items.
    #
    # @return [Fixnum]
    def total_pages
      attributes["total_pages"]
    end

    private

    # Retrieve the items with the #items_presenter presenter, if any.
    #
    # @return [Array<Object>]
    #
    # @api private
    def presented_items
      @presented_items ||= if items_presenter
        items.map { |i| items_presenter.new(i) }
      else
        items
      end
    end

    # The default presenter to use for each collection item, if any. Overriden
    # in subclases.
    #
    # @return [Class, nil]
    #
    # @api private
    def items_presenter
    end

    # Retrieve the items list.
    #
    # @return [Array<Hash>]
    def items
      attributes["items"]
    end

  end
end
