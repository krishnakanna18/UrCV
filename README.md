# <a href="https://urcv.netlify.app/" > UrCV </a>
UrCV is a portfolio website builder, made using React, Node and MongoDB. It aims to make portfolio website building easier for computer science students / engineers.
Users can edit custom templates and deploy the created site to their github pages.
<br>
It supports the following features :-
<ul>
  <li> Text editors that supports the following features :- Bold, Italic, Underline, Color Change, Font Change </li>
  <li> Image editor with features :- Crop, Transform, Adjust </li>
  <li> Custom templates to add projects, skillset </li>
</ul>

# Project Working
<ul>
  <li> Every website is made by editing an already existing template </li>
  <li> Templates are stored as mongodb documents. Templates are composed of individual recursive containers. Containers store metadata about the HTML element they represent ( div, p, img, span, ..). Further, every container may container a list of containers present inside it ( ex :- div inside, p inside div). </li>
  <li> When users want to create websites, first a recursive copy (deep clone) of the template is create in the database, which later users can edit. </li>
  <li> Every change made in the editor is autosaved, which alters the information present in the containers in the database </li>
  <li> While deploying, the JSON object of the entire portfolio webiste is written to a JS File, which has additional code to create HTML elements by parsing this JSON document and writes it to a HTML File. </li>
  <li> Finally, this JS File and HTML File, along with a CSS File if any is pushed to user's github pages and deplpyed </li>
</ul>
  
   
