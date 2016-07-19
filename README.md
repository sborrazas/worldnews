# Worldnews

# Development

## Setup

First install the NPM packages.

```
npm install
```

## Run

```
npm run start # Assets watching
python3 -m http.server # Server
```

Go to [http://localhost:8000](http://localhost:8000).

# Production

## Setup

First clone the repo and install all Ansible extensions.

```
git clone git@github.com:sborrazas/fandf.git
ansible-galaxy install -r ansible/requirements.yml
```

## Provision & deploy

First, make sure you have all the NPM dependancies installed and compiling the
assets works.

```
npm install
npm run dist
```

Ansible can be installed with brew, be sure to install version 2.1 or higher:
`brew install ansible` – if no Homebrew, try any other method
[listed here](http://docs.ansible.com/intro_installation.html).

Make sure the production configuration file is complete, then run the provision
or deploy Ansible playbooks.

```
make provision-production
# or
make deploy-production
```
