module Assets
  # Handle Javascripts assets compilation using browserify.
  module JavascriptCompiler

    # Compile a javascript given a filename
    #
    # @param base_dir [String]
    #   The directory where the less files are located.
    # @param file_path [String]
    # @param development [Boolean]
    #   If true, the file is going to be compiled for development.
    #
    # @return [String]
    #   The compiled javascript.
    def self.compile_javascript(base_dir, file_path, development)
      file_path = File.join(base_dir, file_path)
      parse_javascript(file_path, development)
    end

    # Compile a list of javascripts.
    #
    # @param base_dir [String]
    #   The path where the stylesheets are located.
    # @param file_paths [Array<String>]
    # @param block [Block]
    #   Will receive:
    #     file_path [String] Original file_path
    #     content [String] Compiled js
    def self.compile_javascripts(base_dir, file_paths, &block)
      file_paths.each do |file_path|
        block.call(file_path, parse_javascript(file_path, false))
      end
    end

    # Use browserify to compile into a javascript output.
    #
    # @param file_path [String]
    # @param development [Boolean]
    #   If false it uglifies the output.
    #
    # @return [String]
    def self.parse_javascript(file_path, development)
      debug = development ? "-d" : ""

      output = `browserify -t reactify #{debug} #{file_path}`

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
