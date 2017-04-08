FROM python:3.5

RUN mkdir repo
ADD ./requirements.txt /repo/requirements.txt
RUN cd repo && pip install -r requirements.txt
ADD /service /repo   
WORKDIR repo

ENTRYPOINT ["python", "main.py"]
