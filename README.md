Wrappie
=======

Wrapper around cli commands that can provide environment variables.  

Use
---
Create a env.json file in the directory you are going to run things in.

```
wrappie <command>

wrappie ls
```

env.json
--------

Regular environment variable
```
{
    "SOMEVAR": "value to SOMEVAR"
}
```

AWS Parameter Store variable
```
{
    AWS_ENV: {
        type: "ssm",
        name: "<parametername>",
    },
}
```

Todo
----
1. Template environment variables to combine env variables.
2. Add using env.json from HOME directory
3. Add env.json based on git project folder root
4. Define env.json hierarchy
5. AWS profile for initial credentials