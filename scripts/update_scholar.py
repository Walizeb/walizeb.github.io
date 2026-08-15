import json
import os
from datetime import datetime, timezone

from scholarly import scholarly


# =====================================================
# CONFIGURATION
# =====================================================

SCHOLAR_ID = os.environ.get(
    "SCHOLAR_ID",
    "nG62zRIAAAAJ"
)

OUTPUT_FILE = "data/scholar.json"


# =====================================================
# GET GOOGLE SCHOLAR PROFILE
# =====================================================

print("Searching Google Scholar...")

author = scholarly.search_author_id(
    SCHOLAR_ID
)

print(
    "Found:",
    author.get("name", "Unknown")
)


# =====================================================
# FILL CITATION INDICES
# =====================================================

print("Retrieving Scholar metrics...")

author = scholarly.fill(
    author,
    sections=["indices"]
)


# =====================================================
# EXTRACT METRICS
# =====================================================

citations = int(
    author.get("citedby", 0) or 0
)

h_index = int(
    author.get("hindex", 0) or 0
)

i10_index = int(
    author.get("i10index", 0) or 0
)


# =====================================================
# PUBLICATION COUNT
# =====================================================

# The publications section is required to determine
# the number of publications listed on the profile.

print("Retrieving publication count...")

author = scholarly.fill(
    author,
    sections=["publications"]
)

publications = len(
    author.get("publications", [])
)


# =====================================================
# CREATE OUTPUT
# =====================================================

data = {

    "publications": publications,

    "citations": citations,

    "h_index": h_index,

    "i10_index": i10_index,

    "updated": datetime.now(
        timezone.utc
    ).strftime(
        "%Y-%m-%d %H:%M UTC"
    )

}


# =====================================================
# SAVE JSON
# =====================================================

os.makedirs(
    os.path.dirname(OUTPUT_FILE),
    exist_ok=True
)


with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        data,
        file,
        indent=2,
        ensure_ascii=False
    )


# =====================================================
# DISPLAY RESULT
# =====================================================

print()
print("======================================")
print("Google Scholar Updated")
print("======================================")
print(
    "Publications:",
    publications
)
print(
    "Citations:",
    citations
)
print(
    "h-index:",
    h_index
)
print(
    "i10-index:",
    i10_index
)
print(
    "Updated:",
    data["updated"]
)
print("======================================")