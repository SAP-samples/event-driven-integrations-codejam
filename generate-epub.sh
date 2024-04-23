#!/usr/bin/env bash

# Description: This script generates an epub file from the README.md files in the repository.
# Usage: ./generate-epub.sh

# Validate that pandoc is installed
if ! command -v pandoc &> /dev/null
then
    echo "pandoc could not be found. Check out https://pandoc.org/installing.html for installation instructions."
    exit
else 
    pandoc --toc --toc-depth=2 --output event-driven-integrations-codejam.epub README.md \
        prerequisites.md \
        exercises/01-events-sap-ecosystem/README.md \
        exercises/02-cloudevents/README.md \
        exercises/03-cloudevents-at-sap/README.md \
        exercises/04-event-driven-architectures/README.md \
        exercises/05-explore-aem/README.md \
        exercises/06-publish-and-subscribe-events/README.md \
        exercises/07-dynamic-message-routing/README.md \
        exercises/08-cloudevents-sdk/README.md \
        exercises/09-rest-delivery-points/README.md \
        exercises/10-consume-message-from-CAP/README.md \
        exercises/11-aem-cloud-integration-adapter/README.md \
        metadata.yml
fi
