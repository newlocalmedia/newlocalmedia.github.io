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

### Fixed

- horizontal overflow below 320px that had failed the site-quality reflow check
  on every run since the accessibility smoke checks landed: card header rows
  could not wrap, so their min-content width held the page above the viewport

### Changed

- updated the Keel feature and project pages for the current 0.6 release line: 39 defaults,
  current Settings and Playground links, WordPress.org availability, the same-line
  security-patch workflow, live-matrix coverage, and the four release screenshots
- moved the featured repo's banner from the sidebar into the main column
- demoted Sudo from the lead feature to More Projects, rewritten as a postmortem
  of its concluded research prototype and marked with a Concluded badge
- kept curated repos in the data snapshot after they are archived, so an archived
  project page still builds — this is what broke the scheduled snapshot workflow
- excluded archived repos from each account's latest-repo slot
- made the lead feature's kicker and side notes configurable per project instead
  of hardcoded to Sudo
- expanded repository README to document the site, scripts, and workflow
- improved stat-card alignment for top-of-page metrics on the homepage
