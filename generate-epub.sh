#!/usr/bin/env bash

# Description: This script generates an epub file from the README.md files in the repository.
# Usage: ./generate-epub.sh

# The scripts expects a paramater to be passed to it. If no parameter is passed, it will exit.
if [ $# -eq 0 ]; then
    echo "No arguments provided. The script expects you to provide the type of ebook to generate, e.g. 'prerequisites', 'prerequisites-required-reading' or 'full' ebook."
    exit
fi

# Validate that pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "pandoc could not be found. Check out https://pandoc.org/installing.html for installation instructions."
    exit
fi

# Check if the first argument is "prerequisites"
if [ "$1" == "full" ]; then
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
elif [ "$1" == "prerequisites-required-reading" ]; then
    pandoc --toc --toc-depth=2 --output event-driven-integrations-codejam-prerequisites-required-reading.epub README.md \
        prerequisites.md \
        exercises/01-events-sap-ecosystem/README.md \
        exercises/02-cloudevents/README.md \
        exercises/03-cloudevents-at-sap/README.md \
        metadata-prerequisites.yml
elif [ "$1" == "prerequisites-required-reading-AUSAPE" ]; then
    pandoc --toc --toc-depth=2 --output event-driven-integrations-AUSAPE-prerequisites-required-reading.epub README.md \
        prerequisites.md \
        exercises/01-events-sap-ecosystem/README.md \
        exercises/02-cloudevents/README.md \
        exercises/03-cloudevents-at-sap/README.md \
        exercises/04-event-driven-architectures/README.md \
        metadata-prerequisites-AUSAPE.yml
elif [ "$1" == "prerequisites" ]; then
    pandoc --toc --toc-depth=2 --output event-driven-integrations-codejam-prerequisites.epub README.md \
        prerequisites.md \
        metadata-prerequisites.yml
else
    echo "Invalid argument provided. The script expects you to provide the type of ebook to generate, e.g. 'prerequisites', 'prerequisites-required-reading' or 'full' ebook."
    exit
fi

