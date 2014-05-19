=begin
-*- coding: utf-8 -*-
Copyright (C) 2014 MATOBA Akihiro <matobaa+github@gmail.com>
All rights reserved.

This software is licensed as described in the file LICENSE, which
you should have received as part of this distribution.
=end

class LDRizeHooks < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('ld_rize.js', :plugin => 'ld_rize') +
    stylesheet_link_tag('ld_rize.css', :plugin => 'ld_rize')
  end
end
