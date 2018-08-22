# Ian's Toolkit

[![CircleCI](https://circleci.com/gh/eponymz/prerelease-toolkit/tree/master.svg?style=svg)](https://circleci.com/gh/eponymz/prerelease-toolkit/tree/master)

A home for all tools and nifty items used by me and members of my previous team.

# Heroku App URL

[Ian's Toolkit](https://slick-triage.herokuapp.com/)

### Things to Note About This Project As of Now:

1.  This currently only contains docker commands and a loan calculator that I wrote in vanilla and refactored to react
2.  PRs are welcomed if PR rules are followed.
3.  Collaboration will bring more features and ultimately make this more useful for everyone involved!

### PR RULES

##### Just the one rule right now.

1. Any PR made MUST be approved by repo owner
2. Preferrably, if PR is made, it will have been versioned correctly.

- If not, repo owner will git pull, version and push.
- 'standard-version' node module IS part of the package.json, scripts are in there accordingly.
- Run 'npm run release' to version if not done already.

3. Ensure `git pull` has been done to prevent any merge conflicts.

- Always rebase! :D

4. PR content must be developed to its own branch. On approval, branch will be merged into master.

### TODOS

- [ ] Write up test cases.
  > currently the pass is coming from the addTwoNumbers() test. These are next on the list. Getting this migrated from CircleCI 1.0 to 2.0 and successfully wired up was the highest priority. Tests coming soon.
- [ ] Implement 'authorized users only' DB?
  > [ ] implement CRUD interface as an 'authorize' application.
  > [x] create user interface
  > [x] read/search user interface
  > [ ] update user interface
  > [ ] delete user interface
  > [x] enable client and server side validation based on 'role' property defined in the user object.
  > [x] define roles based on needs of access. Currently only 'admin' and 'user' are needed.
  > currently access is determined by pre-existing auth in the database. If you would like to request access, feel free to post an issue [here](https://github.com/eponymz/prerelease-toolkit/issues/new) or [email](mailto:sabeyfox@gmail.com) me directly.
- [ ] Write loggers and store output to mongoDB
  > [x] Logger implementation
  > [ ] mongoDB transport

## SESSION STORAGE IS ACTIVE BY COOKIE AND STORED SECURELY IN MONGODB.

#### If there are any questions or concerns, you can reach out to me directly through [email](mailto:isabey.dev@gmail.com) or submit an issue to the repo [here](https://github.com/eponymz/prerelease-toolkit/issues/new).
