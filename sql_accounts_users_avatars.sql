/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Login]
      ,[Password]
      ,[RoleId]
  FROM [BlogWebExam].[dbo].[Accounts]

  SELECT TOP (1000) [Id]
      ,[Email]
      ,[Description]
      ,[IsBlocked]
      ,[RegistrationDate]
      ,[AccountId]
  FROM [BlogWebExam].[dbo].[Users]

  SELECT TOP (1000) [Id]
      ,[Url]
      ,[UserId]
  FROM [BlogWebExam].[dbo].[Avatars]