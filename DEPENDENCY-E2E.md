# Dependency Security many-project regression

13 independent npm projects under `projects/`, each with a locked vulnerable lodash 4.17.15 and a legitimate-use test. Each must be independently upgraded and verified. The existing root, `hb/`, and `svc/` projects are retained, including the Handlebars adaptation path and Rust no-fix guidance. No fix PR is merged.
