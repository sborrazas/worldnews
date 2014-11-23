require "less"

module Assets
  # Handle CSS assets compilation using Less.
  module LessCompiler

    # Compile a stylesheet given a filename.
    #
    # @param base_dir [String]
    #   The directory where the less files are located.
    # @param file_path [String]
    # @param development [Boolean]
    #   If true, the file is going to be compiled for development.
    #
    # @return [String]
    #   The compiled css.
    def self.compile_stylesheet(base_dir, file_path, development)
      parser = Less::Parser.new(:paths => [base_dir])
      file_path = File.join(base_dir, file_path)

      parse_stylesheet(parser, file_path, development)
    end

    # Compile a list of stylesheets. Assume that the destination files are not
    # for development.
    #
    # @example
    #
    #   filenames = [ "less/css1.less", "less/css2.less"]
    #   Compiler.compile_stylesheets(filenames) do |filename, content|
    #     destination = "css/#{File.basename(filename, ".less")}.css"
    #     File.open(destination, "w") { |stream| stream.print(content) }
    #   end
    #
    # @param filenames [Array<String>]
    # @param base_dir [String]
    #   The path where the stylesheets are located.
    # @param block [Block]
    #   Will recive:
    #     filename [String] Original filename.
    #     content [String] Compiled css.
    def self.compile_stylesheets(file_paths, base_dir, &block)
      file_paths.each do |file_path|
        parser = Less::Parser.new(:paths => [base_dir])
        block.call(file_path, parse_stylesheet(parser, file_path, false))
      end
    end

    # Parse the file into raw CSS.
    #
    # @param parser [Less:Parser]
    # @param file_path [String]
    # @param development [Boolean]
    #   If false it compresses the CSS.
    #
    # @return [String]
    def self.parse_stylesheet(parser, file_path, development)
      tree = File.open(file_path) do |stream|
        parser.parse(stream.read)
      end
      tree.to_css(:compress => !development)
    end

  end
end
