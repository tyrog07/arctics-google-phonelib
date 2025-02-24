#!/bin/bash

BASEDIR=../..
CLOSURE_LIBRARY_DIR=${BASEDIR}/node_modules/google-closure-library/closure/goog
COMPILATION_LEVEL=SIMPLE
LOGFILE=compile-glib.log

# Clear the log file
> $LOGFILE

{
    echo "Starting compilation process..."
    echo "Current directory: $(pwd)"

    rm -rf src/providers/* \
    && echo "Compiling using Google Closure Compiler..." \
    && ${BASEDIR}/node_modules/.bin/google-closure-compiler \
        --compilation_level=${COMPILATION_LEVEL} \
        --js=${CLOSURE_LIBRARY_DIR}/array/array.js \
        --js=${CLOSURE_LIBRARY_DIR}/asserts/asserts.js \
        --js=${CLOSURE_LIBRARY_DIR}/asserts/dom.js \
        --js=${CLOSURE_LIBRARY_DIR}/base.js \
        --js=${CLOSURE_LIBRARY_DIR}/debug/error.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/asserts.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/htmlelement.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/nodetype.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/safe.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/tagname.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/tags.js \
        --js=${CLOSURE_LIBRARY_DIR}/dom/element.js \
        --js=${CLOSURE_LIBRARY_DIR}/fs/blob.js \
        --js=${CLOSURE_LIBRARY_DIR}/fs/url.js \
        --js=${CLOSURE_LIBRARY_DIR}/functions/functions.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/safehtml.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/safescript.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/safestyle.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/safestylesheet.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/safeurl.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/trustedresourceurl.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/trustedtypes.js \
        --js=${CLOSURE_LIBRARY_DIR}/html/uncheckedconversions.js \
        --js=${CLOSURE_LIBRARY_DIR}/i18n/bidi.js \
        --js=${CLOSURE_LIBRARY_DIR}/labs/useragent/browser.js \
        --js=${CLOSURE_LIBRARY_DIR}/labs/useragent/util.js \
        --js=${CLOSURE_LIBRARY_DIR}/object/object.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/descriptor.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/fielddescriptor.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/lazydeserializer.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/message.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/pbliteserializer.js \
        --js=${CLOSURE_LIBRARY_DIR}/proto2/serializer.js \
        --js=${CLOSURE_LIBRARY_DIR}/string/const.js \
        --js=${CLOSURE_LIBRARY_DIR}/string/internal.js \
        --js=${CLOSURE_LIBRARY_DIR}/string/string.js \
        --js=${CLOSURE_LIBRARY_DIR}/string/stringbuffer.js \
        --js=${CLOSURE_LIBRARY_DIR}/string/typedstring.js \
        --js=${CLOSURE_LIBRARY_DIR}/flags/flags.js \
        --js=${CLOSURE_LIBRARY_DIR}/labs/userAgent/userAgent.js \
        --js=${CLOSURE_LIBRARY_DIR}/labs/userAgent/highEntropy/highEntropyValue.js \
        --js=${CLOSURE_LIBRARY_DIR}/labs/userAgent/highEntropy/highEntropyData.js \
        --js=glib/metadata.js \
        --js=glib/phonemetadata.pb.js \
        --js=glib/phonenumber.pb.js \
        --js=glib/phonenumberutil.js \
        --js=glib/shortnumberinfo.js \
        --js=glib/shortnumbermetadata.js \
        --js=glib/asyoutypeformatter.js \
        --js=src/template/index.js \
        --language_in=ECMASCRIPT_2020 \
        --language_out=ECMASCRIPT_2020 \
        --module_resolution=NODE \
        --js_output_file=src/providers/libphonenumber.original.js \
    && ./node_modules/.bin/browserify src/providers/libphonenumber.original.js --standalone libphonenumber --no-browser-field --outfile src/providers/libphonenumber.js \
    && rm src/providers/libphonenumber.original.js \
    && echo "Build completed!"
} &> $LOGFILE