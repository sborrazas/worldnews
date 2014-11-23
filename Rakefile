task :environment do
  require "./initialize"
end

namespace :assets do
  desc "Compile the assets into public"
  task :compile => :environment do
    require "lib/assets/javascript_compiler"
    require "lib/assets/less_compiler"

    print "Compiling assets... "

    js_dir = File.join(WEBAPP_DIR, "javascripts")
    filenames = Dir[File.join(js_dir, "*.js")]

    Assets::JavascriptCompiler.compile_javascripts(js_dir, filenames) do |filename, content|
      dest_file = "./public/javascripts/#{File.basename(filename)}"

      File.open(dest_file, "w") do |stream|
        stream.print(content)
      end
    end

    less_dir = File.join(WEBAPP_DIR, "less")
    filenames = Dir[File.join(less_dir, "*.less")]

    Assets::LessCompiler.compile_stylesheets(less_dir, filenames) do |filename, content|
      dest_file = "./public/stylesheets/#{File.basename(filename, ".less")}.css"

      File.open(dest_file, "w") do |stream|
        stream.print(content)
      end
    end

    puts "Done."
  end
end

task :console => :environment do
  require "irb"
  require "irb/completion"
  Dir["./services/**/*.rb"].each { |rb| require rb }
  ARGV.clear
  IRB.start
end
