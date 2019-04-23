require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
    erb :home
end

get '/about' do
    erb :about
end

get '/contact' do
    erb :contact
end

__END__
@@layout
<% title = "Songs by Ol Blue Eyes" %>
<!doctype html>
<html lang="en">
<head>
    <title><%= title %></title>
    <meta charset="utf-8">
</head>
    <body>
        <header>
            <h1>Songs By Sinatra</h1>
            <nav>
                <ul>
                    <li><a href="/" title="HOME">Home</a></li>
                    <li><a href="/about" title="ABOUT">About</a></li>
                    <li><a href="/contact" title="CONTACT">Contact</a></li>
                </ul>
            </nav>
        </header>
        <section>
            <%= yield %>
        </section>
    </body>

</head>
</html>

@@home
<p>This page is all about the smooth stylings of that sweet, sweet crooner: Ol' Frankie Blue Eyes.</p>

@@about
<p>This is how you learn to build an entire app with Sinatra, a DSL.</p>

@@contact
<p>Contact me by sending an email to emailAddress@emaildomain.com</p>
