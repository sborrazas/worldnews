module Assets
  # Handle Javascripts assets compilation using browserify.
  module JavascriptCompiler

    JS_PATH = "assets/javascripts"

    # Compile a javascript given a filename
    #
    # @param filename [String]
    # @param development [Boolean]
    #
    # @return [String]
    #   The compiled javascript
    def self.compile_javascript(filename, development)
      parse_javascript(filename, development)
    end

    # Compile a list of javascripts
    #
    # @param filenames [Array<String>]
    # @param block [Block]
    #   Will receive:
    #     filename [String] Original filename
    #     content [String] Compiled js
    def self.compile_javascripts(filenames, &block)
      filenames.each do |filename|
        block.call(filename, compile_javascript(filename, false))
      end
    end

    # Find a javascript asset
    #
    # @param name [String]
    #
    # @return [String]
    #   nil if the file does not exist
    def self.javascript_asset_path(name)
      name = File.basename(name, ".js")
      filename = "#{JS_PATH}/#{name}.js"
      File.exists?(filename) && filename
    end

    # Use browserify to compile into a javascript output.
    #
    # @param filename [String]
    # @param development [Boolean]
    #   If false it uglifies the output.
    #
    # @return [String]
    def self.parse_javascript(filename, development)
      debug = development ? "-d" : ""

      output = `browserify -t reactify #{debug} #{filename}`

      if $?.success?
        development ? output : uglify_javascript(output)
      else
        raise output
      end
    end

    # Use uglifyjs to uglify the input javascript.
    #
    # @param code [String]
    #
    # @return [String]
    def self.uglify_javascript(code)
      command = "uglifyjs -b 'beautify=false,quote_keys=true,ascii-only=true'"
      uglify = IO.popen(command, "r+")

      uglify.puts(code)
      uglify.close_write
      ugly = uglify.read
      uglify.close_read

      ugly
    end

  end
end
