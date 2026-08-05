# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Keel project page, featured as the lead repo
- Dirtbag project page at the end of the More Projects section
- repository community-health files
- GitHub issue and pull request templates
- dependency update configuration

### Changed

- demoted Sudo from the lead feature to More Projects, rewritten as a postmortem
  of its concluded research prototype and marked with a Concluded badge
- kept curated repos in the data snapshot after they are archived, so an archived
  project page still builds — this is what broke the scheduled snapshot workflow
- excluded archived repos from each account's latest-repo slot
- made the lead feature's kicker and side notes configurable per project instead
  of hardcoded to Sudo
- expanded repository README to document the site, scripts, and workflow
- improved stat-card alignment for top-of-page metrics on the homepage
