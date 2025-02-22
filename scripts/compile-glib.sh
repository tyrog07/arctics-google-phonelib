#!/bin/bash

rm -rf src/providers/google-libphonenumber/* \
&& echo "Compiling using Google Closure Compiler..." \
&& ./node_modules/.bin/google-closure-compiler \
    --compilation_level=ADVANCED \
    --jscomp_off=undefinedVars \
    --js=node_modules/google-closure-library/closure/goog/array/array.js \
    --js=node_modules/google-closure-library/closure/goog/asserts/asserts.js \
    --js=node_modules/google-closure-library/closure/goog/base.js \
    --js=node_modules/google-closure-library/closure/goog/debug/error.js \
    --js=node_modules/google-closure-library/closure/goog/dom/asserts.js \
    --js=node_modules/google-closure-library/closure/goog/dom/htmlelement.js \
    --js=node_modules/google-closure-library/closure/goog/dom/nodetype.js \
    --js=node_modules/google-closure-library/closure/goog/dom/safe.js \
    --js=node_modules/google-closure-library/closure/goog/dom/tagname.js \
    --js=node_modules/google-closure-library/closure/goog/dom/tags.js \
    --js=node_modules/google-closure-library/closure/goog/fs/blob.js \
    --js=node_modules/google-closure-library/closure/goog/fs/url.js \
    --js=node_modules/google-closure-library/closure/goog/functions/functions.js \
    --js=node_modules/google-closure-library/closure/goog/html/safehtml.js \
    --js=node_modules/google-closure-library/closure/goog/html/safescript.js \
    --js=node_modules/google-closure-library/closure/goog/html/safestyle.js \
    --js=node_modules/google-closure-library/closure/goog/html/safestylesheet.js \
    --js=node_modules/google-closure-library/closure/goog/html/safeurl.js \
    --js=node_modules/google-closure-library/closure/goog/html/trustedresourceurl.js \
    --js=node_modules/google-closure-library/closure/goog/html/trustedtypes.js \
    --js=node_modules/google-closure-library/closure/goog/html/uncheckedconversions.js \
    --js=node_modules/google-closure-library/closure/goog/i18n/bidi.js \
    --js=node_modules/google-closure-library/closure/goog/labs/useragent/browser.js \
    --js=node_modules/google-closure-library/closure/goog/labs/useragent/util.js \
    --js=node_modules/google-closure-library/closure/goog/object/object.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/descriptor.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/fielddescriptor.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/lazydeserializer.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/message.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/pbliteserializer.js \
    --js=node_modules/google-closure-library/closure/goog/proto2/serializer.js \
    --js=node_modules/google-closure-library/closure/goog/string/const.js \
    --js=node_modules/google-closure-library/closure/goog/string/internal.js \
    --js=node_modules/google-closure-library/closure/goog/string/string.js \
    --js=node_modules/google-closure-library/closure/goog/string/stringbuffer.js \
    --js=node_modules/google-closure-library/closure/goog/string/typedstring.js \
    --js=glib/phonenumbers/index.js \
    --js=glib/phonenumbers/metadata.js \
    --js=glib/phonenumbers/phonemetadata.pb.js \
    --js=glib/phonenumbers/phonenumber.pb.js \
    --js=glib/phonenumbers/phonenumberutil.js \
    --js=glib/phonenumbers/shortnumberinfo.js \
    --js=glib/phonenumbers/shortnumbermetadata.js \
    --js=glib/phonenumbers/asyoutypeformatter.js \
    --language_in=ECMASCRIPT_2020 \
    --language_out=ECMASCRIPT_2020 \
    --module_resolution=NODE \
    --js_output_file=src/providers/google-libphonenumber/libphonenumber.original.js \
&& ./node_modules/.bin/browserify src/providers/google-libphonenumber/libphonenumber.original.js --standalone libphonenumber --no-browser-field --outfile src/providers/google-libphonenumber/libphonenumber.js \
&& rm src/providers/google-libphonenumber/libphonenumber.original.js \
&& echo "Build completed!"



