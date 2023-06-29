<!-- # <a href="https://urcv.netlify.app/" > UrCV </a> -->
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
  
   
### UrCV low level design :-

---

Features to support :-

1. Provide custom templates for the users to edit
2. Each website is forked out from a template
3. Users can Login via github/google/twitter
4. Each website can be edited by users
5. Deploy the user’s website to their connect Github account

### Template component design :-

---

A template should contain pre-created html components that can be edited by the users.

1. New HTML elements can be added
2. Existing can be deleted/modified
3. Move HTML elements across the template

A typical CS grad/professional’s template is divided into some sections, like the introduction part, education, skills, experience and projects part.

Each section should be separately editable, users should be able to do crud on sections. Each section is a html **DIV** element and can have sub-sections, each of them are **DIV** too

The outermost section can be moved at the template level. Similarly the first level section, can be moved inside its outermost section.

The entire template/website consists of a tree of sections.

Each section/sub-section must be a flex-box and can render/divide its sub-sections vertically/horizontally. 

The leaf elements of the template tree are the html elements :- p, span, image, link.

If a section is rendered vertically, it’s subsections can only move vertically and likewise for horizontally rendered sections.

Subsection sizes are according to, bootstrap component sizes (size 1 to 12). 

Each of the leaf elements are edited differently :-

1. To edit p/span, we have a text editor.
2. To edit img, a separate editor.
3. To edit link, a link editor that displays a text behind a link :- (text)[link]

When a user creates a website, the template is deep cloned and stored separately. Edits happen to this deep cloned version.

Each section/sub-section can have custom edits like changing background colour, section level CSS properties like font, text size etc (can be overridden by children’s properties).

| Template |
| --- |
| template_id: uuid |
| global_css_properties: json |
| sections: List<Section> |
| template_meta_info: str |
| moveSection() |
| addSection() |
| deleteSection() |

| Section |
| --- |
| section_id: uuid |
| section_css_properties: json |
| child_sections: List<Section> |
| moveChildren() |
| addChildren() |
| removeChildren() |

| Span: Section |
| --- |
| element_id: uuid |
| element_css_properties: json |
| text_content: List<dict> |
| setText(List<dict> text) |

| Img: Section |
| --- |
| element_id: uuid |
| image_path: str |
| element_css_properties: json |
| setImage(string path) |

| Link: Section |
| --- |
| element_id: uuid |
| element_css_properties: json |

| TextEditor - Singleton |
| --- |
| TextEditor() |
| preprocess_input(List<dict> string) |
| edit_string(List<dict> string, userEvent: dict) → List<dict> (userEvent applied string)
The event handler gets a reference to the section being edited, passes it to this method along with the event, assigns the result back to the section |

edit_string implementation :-

The input List<dict> contains a newline delimited string. Each with its own CSS properties

```jsx
[
	{
		'bold' : 'true',
		'italic': 'false',
	  'text' : [
			'abc',
			{
				'bold' : 'false',
				'italic': 'true',
			  'text' : 'def',
			},
			'ghi',	
	  ] 
	}
]
```

final rendered text :- **abc***def***ghi**

The userEvent contains start and end positions of the string to be edited, along with event. Add/edit the css attributes of the string such that those styles are added as well.

### Database design/choices :-

---

1. Template/websites are multivalued, recursive entities with varying schema. To store a tree in an RDBMS would require a separate table to store the edges, and every time the tree is to be read, it has to be reconstructed. In a NoSQL db, the child sections can be stored along with parent components, hence can be read as a whole entity.
2. If the edges table and the website table were to be stored in different nodes, it would require multiple cross joins bw nodes to fetch the entire website - Not scalable

Hence all sections/templates/sites are stored as mongo documents, with each parent component storing reference to child components in a list.

A reference is stored in parent and not the entire component because, each child component may undergo multiple edits independent of parent and need to reflect these in database. If it was coupled with parent, the parent component would need to be modified for each child entry.