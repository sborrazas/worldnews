require "lib/assets/javascript_compiler"
require "lib/assets/less_compiler"

module Webapp
  module Routes
    class Assets < Cuba

      define do
        on "stylesheets/:name.css" do |filename|
          # Always respond with css content
          res.headers["Content-Type"] = "text/css"
          base_dir = File.join(WEBAPP_DIR, "less")
          filename = "#{filename}.less"

          if filename
            res.write(::Assets::LessCompiler.compile_stylesheet(base_dir, filename, true))
          else
            res.status = 404
            res.write("/*\nNot Found\n*/")
          end
          halt(res.finish)
        end

        on "javascripts/:name.js" do |name|
          # Always respond with javascript content
          res.headers["Content-Type"] = "application/javascript"

          filename = ::Assets::JavascriptCompiler.javascript_asset_path(name)

          if filename
            res.write(::Assets::JavascriptCompiler.compile_javascript(filename, true))
          else
            res.status = 404
            res.write("/*\nNot found\n*/\n")
          end
          halt(res.finish)
        end

        not_found!
      end

    end
  end
end
