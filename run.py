# -*- coding: utf-8 -*-
from BNC_Ansible import create_app

app = create_app()

if __name__ == "__main__":

    app.run(port=5000)
