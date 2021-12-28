=begin
-*- coding: utf-8 -*-
Copyright (C) 2014,2021 MATOBA Akihiro <matobaa+github@gmail.com>
All rights reserved.

This software is licensed as described in the file LICENSE, which
you should have received as part of this distribution.
=end

Redmine::Plugin.register :redmine_ld_rize do
  name 'LDRize plugin'
  author 'Akihiro MATOBA'
  description 'vi-like keyboard navigation with j or k key'
  version '0.0.2'
  url 'https://github.com/matobaa/redmine_ld_rize'
  author_url 'https://www.github.com/matobaa'
end

Class.new(Redmine::Hook::ViewListener) do |c|
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('ld_rize.js', :plugin => 'redmine_ld_rize') +
    stylesheet_link_tag('ld_rize.css', :plugin => 'redmine_ld_rize')
  end
end
